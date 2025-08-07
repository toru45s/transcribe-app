"use server";

import { APP_ROOT } from "@/config";

export const registerAction = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${APP_ROOT}/api/v1/register/`, {
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
