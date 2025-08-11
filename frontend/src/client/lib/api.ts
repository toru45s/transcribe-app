import { ApiEnvelope, Options } from "@/client/types/api";
import { TIMEOUT_MS } from "@/client/constants/api";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "@/shared/constants/http";
import { refreshTokenService } from "@/features/auth/token/services/refresh-token-services";
import { logoutService } from "@/features/auth/token/services/logout-services";
import { useUserStore } from "@/features/auth/me/stores/use-user-store";
import { useAlertInvalidTokenStore } from "../stores/use-alert-invalid-token-store";

let refreshingPromise: Promise<boolean> | null = null;

const refreshOnce = async (): Promise<boolean> => {
  try {
    const response = await refreshTokenService();
    if (response.error) return false;

    return true;
  } catch {
    return false;
  }
};

const ensureRefreshed = async (): Promise<boolean> => {
  if (!refreshingPromise) {
    refreshingPromise = refreshOnce().finally(() => {
      refreshingPromise = null;
    });
  }
  return refreshingPromise;
};

export const apiClient = async <T = unknown>(
  path: string,
  {
    method = "GET",
    body,
    headers: baseHeaders = { Accept: "application/json" },
    timeoutMs = TIMEOUT_MS,
  }: Options = {}
): Promise<ApiEnvelope<T>> => {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);

  const headers: Record<string, string> = {
    ...(body && shouldSendBody(method)
      ? { "Content-Type": "application/json" }
      : {}),
    ...baseHeaders,
  };

  const requestOptions: RequestInit = {
    method,
    headers,
    body: body && shouldSendBody(method) ? JSON.stringify(body) : undefined,
    signal: ctrl.signal,
  };

  try {
    let response = await fetch(path, requestOptions);

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
      const refreshed = await ensureRefreshed();

      if (refreshed) {
        response = await fetch(path, requestOptions);
      } else {
        await logoutService();
        useUserStore.getState().logout();
        useAlertInvalidTokenStore.getState().onOpen();
      }
    }

    const json = (await toJsonSafe(response)) as ApiEnvelope<T> | null;

    return json ?? { data: null, error: null };
  } catch (e) {
    const aborted = e instanceof Error && e.name === "AbortError";

    return {
      data: null,
      error: {
        code: aborted ? ERROR_CODES.TIMEOUT : ERROR_CODES.NETWORK_ERROR,
        message: aborted
          ? ERROR_MESSAGES.TIMEOUT
          : ERROR_MESSAGES.NETWORK_ERROR,
        details: String(e),
      },
    };
  } finally {
    clearTimeout(timer);
  }
};

export const shouldSendBody = (method: string) =>
  !["GET", "HEAD", "DELETE"].includes(method);

export const toJsonSafe = async (res: Response) => {
  try {
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
};
