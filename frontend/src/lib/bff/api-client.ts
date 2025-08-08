import { cookies } from "next/headers";
import { ACCESS_TOKEN_KEY } from "@/constants/route-handler";
import { NextResponse } from "next/server";

export const apiClient = async (
  url: string,
  method: string,
  body?: unknown
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  return response;
};
