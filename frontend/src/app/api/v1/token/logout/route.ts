import { NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/route-handler";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(ACCESS_TOKEN_KEY, "", {
    path: "/",
    maxAge: 0,
  });

  response.cookies.set(REFRESH_TOKEN_KEY, "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
