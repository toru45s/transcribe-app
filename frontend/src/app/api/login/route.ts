import { API_ROOT } from "@/config";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/global";
import { apiClient } from "@/lib/api";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const responseData = await apiClient({
    uri: `${API_ROOT}/token/`,
    method: "POST",
    body: { email, password },
    isAuth: false,
  });

  const nextResponse = NextResponse.json(responseData);

  if (responseData.data) {
    nextResponse.cookies.set(ACCESS_TOKEN_KEY, responseData.data.access, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "lax",
    });

    nextResponse.cookies.set(REFRESH_TOKEN_KEY, responseData.data.refresh, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "lax",
    });
  }

  return nextResponse;
}
