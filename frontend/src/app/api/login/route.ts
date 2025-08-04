import { API_ROOT } from "@/config";
import { NextResponse } from "next/server"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/global";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const apiResponse = await fetch(`${API_ROOT}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await apiResponse.json();

    const { data, error } = responseData;

    if (error) {
      throw new Error(error);
    }

    const response = NextResponse.json(responseData);
    
    response.cookies.set(ACCESS_TOKEN_KEY, data.access, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "lax",
    });
    
    response.cookies.set(REFRESH_TOKEN_KEY, data.refresh, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
