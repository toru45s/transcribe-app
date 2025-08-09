import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_KEY,
  COOKIE_OPTIONS,
  REFRESH_TOKEN_KEY,
} from "@/bff/constants/auth";
import { HTTP_STATUS } from "@/shared/constants/http";

export async function POST() {
  const response = new NextResponse(null, { status: HTTP_STATUS.NO_CONTENT });

  response.cookies.set(ACCESS_TOKEN_KEY, "", {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });

  response.cookies.set(REFRESH_TOKEN_KEY, "", {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });

  return response;
}
