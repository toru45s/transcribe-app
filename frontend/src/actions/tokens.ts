"use server";

import { APP_ROOT } from "@/config";
import { cookies } from "next/headers";

export const loginAction = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${APP_ROOT}/api/v1/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Register error:", error);
    return { data: null, error };
  }
};

export const refreshTokenAction = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${APP_ROOT}/api/v1/token/refresh`, {
      method: "POST",
      headers: { Cookie: cookieStore.toString() },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Refresh token error:", error);
    return { data: null, error };
  }
};

export const logoutAction = async () => {
  try {
    const response = await fetch(`${APP_ROOT}/api/v1/token/logout/`, {
      method: "POST",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Register error:", error);
    return { data: null, error };
  }
};
