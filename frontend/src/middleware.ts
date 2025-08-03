// middleware.ts
import { ACCESS_TOKEN_KEY } from "@/constants/global";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY);

  if (!accessToken && request.nextUrl.pathname.startsWith("/histories")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
