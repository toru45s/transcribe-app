"use server";

import { API_ROOT } from "@/config";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/global";

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  return accessToken;
};

export const getRefreshToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;
  return refreshToken;
};

export async function loginUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${API_ROOT}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
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

    cookieStore.set(REFRESH_TOKEN_KEY, data.refresh, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "lax",
    });

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

export async function logout() {
  const cookieStore = await cookies();
  
  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
}
