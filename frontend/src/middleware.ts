import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/bff/constants/auth";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = req.cookies.get(REFRESH_TOKEN_KEY)?.value;

  console.log("🔍 middleware access_token:", accessToken);
  console.log("🔍 middleware refresh_token:", refreshToken);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // すべてのパスに適用
};
