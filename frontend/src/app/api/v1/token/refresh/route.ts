import { API_ROOT_V1 } from "@/config";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_KEY,
  COOKIE_OPTIONS,
  REFRESH_TOKEN_KEY,
} from "@/constants/auth";
import { cookies } from "next/headers";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "@/constants/http";
import { networkErrorResponse } from "@/lib/bff/response";
import { apiClient } from "@/lib/bff/api-client";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  if (!refreshToken) {
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

  try {
    const response = await apiClient(`${API_ROOT_V1}/token/refresh/`, {
      method: "POST",
      body: { refresh: refreshToken },
      requireAuth: false,
    });

    const responseData = await response.json();
    const { access: accessTokenNew } = responseData.data;

    const responseNext = NextResponse.json(responseData, {
      status: response.status,
    });

    if (response.ok && accessTokenNew) {
      responseNext.cookies.set(
        ACCESS_TOKEN_KEY,
        accessTokenNew,
        COOKIE_OPTIONS
      );
    }

    return responseNext;
  } catch (error) {
    return networkErrorResponse(error);
  }
}
