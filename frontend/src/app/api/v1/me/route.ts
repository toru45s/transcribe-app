import { API_ROOT_V1 } from "@/config";
import { NextResponse } from "next/server";
import { apiClient } from "@/lib/bff/api-client";

export async function GET() {
  try {
    const response = await apiClient(`${API_ROOT_V1}/me/`, "GET");

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error });
  }
}
