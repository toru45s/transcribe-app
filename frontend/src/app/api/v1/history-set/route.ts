import { API_ROOT_V1 } from "@/config";
import { NextResponse } from "next/server";
import { apiClient } from "@/lib/bff/api-client";

export async function GET() {
  try {
    const response = await apiClient(`${API_ROOT_V1}/history-set/`, "GET");

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error });
  }
}

export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    const response = await apiClient(`${API_ROOT_V1}/history-set/`, "POST", {
      title,
    });

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error });
  }
}
