import { API_ROOT_V1 } from "@/config";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_KEY,
  COOKIE_OPTIONS,
  REFRESH_TOKEN_KEY,
} from "@/constants/auth";
import { networkErrorResponse } from "@/lib/bff/response";
import { apiClient } from "@/lib/bff/api-client";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const response = await apiClient(`${API_ROOT_V1}/token/`, {
      method: "POST",
      body: { email, password },
      requireAuth: false,
    });

    const responseData = await response.json();
    const { access, refresh } = responseData.data;

    const responseNext = NextResponse.json(responseData, {
      status: response.status,
    });

    if (response.ok && access && refresh) {
      responseNext.cookies.set(ACCESS_TOKEN_KEY, access, COOKIE_OPTIONS);
      responseNext.cookies.set(REFRESH_TOKEN_KEY, refresh, COOKIE_OPTIONS);
    }

    return responseNext;
  } catch (error) {
    return networkErrorResponse(error);
  }
}
