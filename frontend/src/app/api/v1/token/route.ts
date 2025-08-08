import { API_ROOT_V1, IS_DEV } from "@/config";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/route-handler";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const response = await fetch(`${API_ROOT_V1}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();
    const responseNext = NextResponse.json(responseData);
    const { access, refresh } = responseData.data;

    responseNext.cookies.set(ACCESS_TOKEN_KEY, access, {
      httpOnly: true,
      secure: !IS_DEV,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    responseNext.cookies.set(REFRESH_TOKEN_KEY, refresh, {
      httpOnly: true,
      secure: !IS_DEV,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return responseNext;
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error });
  }
}
