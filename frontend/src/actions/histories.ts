"use server";

import { API_ROOT } from "@/config";

export const getHistories = async (token: string | null) => {
  console.log("token", token);
  try {
    const response = await fetch(`${API_ROOT}/api/transcribe-set/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching histories:", error);
  }
};
