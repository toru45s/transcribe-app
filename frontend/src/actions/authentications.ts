"use server";

import { API_ROOT, APP_ROOT } from "@/config";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_KEY } from "@/constants/global";
import { getRefreshToken } from "@/lib/api";

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${APP_ROOT}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    const { error } = responseData;

    if (error) {
      throw new Error(error);
    }

    return responseData;
  } catch (error) {
    return { error };
  }
}

export async function refreshAccessToken() {
  try {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const response = await fetch(`${API_ROOT}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const responseData = await response.json();
    const { data, error } = responseData;

    if (error) {
      throw new Error(error);
    }

    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN_KEY, data.access, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "lax",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to refresh token");
  }
}

export async function logout() {}
