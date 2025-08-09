import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "@/constants/http";
import { NextResponse } from "next/server";

export function networkErrorResponse(error: unknown) {
  return NextResponse.json(
    {
      data: null,
      error: {
        code: ERROR_CODES.NETWORK_ERROR,
        message: ERROR_MESSAGES.NETWORK_ERROR,
        details: String(error),
      },
    },
    { status: HTTP_STATUS.BAD_GATEWAY }
  );
}
