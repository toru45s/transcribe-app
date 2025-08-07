import { APP_ROOT } from "@/config";

export async function getMe() {
  try {
    const response = await fetch(`${APP_ROOT}/api/me/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}
