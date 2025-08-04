import { API_ROOT } from "@/config";
import { apiClient } from "@/lib/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title } = await request.json();

  const response = await apiClient({
    uri: `${API_ROOT}/history-set/`,
    method: "POST",
    body: { title },
    isAuth: true,
  });

  return NextResponse.json(response);
}

export async function GET() {
  const response = await apiClient({
    uri: `${API_ROOT}/history-set/`,
    method: "GET",
    isAuth: true,
  });

  return NextResponse.json(response);
}