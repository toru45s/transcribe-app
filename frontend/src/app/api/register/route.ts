import { API_ROOT } from "@/config";
import { apiClient } from "@/lib/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const response = await apiClient({
    uri: `${API_ROOT}/register/`,
    method: "POST",
    body: { email, password },
    isAuth: false,
  });

  return NextResponse.json(response);
}
