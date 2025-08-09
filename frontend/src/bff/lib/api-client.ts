import { cookies } from "next/headers";
import { ACCESS_TOKEN_KEY } from "@/bff/constants/auth";
import { NextResponse } from "next/server";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS,
} from "@/shared/constants/http";
import { networkErrorResponse } from "./response";

import { shouldSendBody } from "@/client/lib/api";

type ApiClientOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
  body?: unknown;
  requireAuth?: boolean;
};

export const apiClient = async (
  url: string,
  options: ApiClientOptions = {}
) => {
  const { method = "GET", body, requireAuth = true } = options;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (requireAuth) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: ERROR_CODES.UNAUTHORIZED,
            message: ERROR_MESSAGES.UNAUTHORIZED,
          },
        },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body && shouldSendBody(method) ? JSON.stringify(body) : undefined,
    });

    return response;
  } catch (error) {
    return networkErrorResponse(error);
  }
};
