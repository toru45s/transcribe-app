import { API_ROOT_V1 } from "@/config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  try {
    const response = await fetch(`${API_ROOT_V1}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    const responseNext = NextResponse.json(data);

    return responseNext;
  } catch (error) {
    return NextResponse.json({ error });
  }
}
