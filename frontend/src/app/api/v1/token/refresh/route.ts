import { API_ROOT_V1, IS_DEV } from "@/config";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/route-handler";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  if (!refreshToken) {
    return NextResponse.json(
      {
        data: null,
        error: "No refresh token found",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const response = await fetch(`${API_ROOT_V1}/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { data: null, error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const { data } = await response.json();
    const accessTokenNew = data.access;

    if (!accessTokenNew) {
      return NextResponse.json(
        { data: null, error: "No access token returned from backend" },
        { status: 500 }
      );
    }

    const responseNext = NextResponse.json(data);

    responseNext.cookies.set(ACCESS_TOKEN_KEY, accessTokenNew, {
      httpOnly: true,
      secure: !IS_DEV,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return responseNext;
  } catch (err) {
    console.error("Refresh token error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
