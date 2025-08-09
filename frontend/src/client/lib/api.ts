import { ApiEnvelope, Options } from "@/client/types/api";
import { TIMEOUT_MS } from "@/client/constants/api";
import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/constants/http";

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

  try {
    const response = await fetch(path, {
      method,
      headers,
      body: body && shouldSendBody(method) ? JSON.stringify(body) : undefined,
      signal: ctrl.signal,
    });

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
