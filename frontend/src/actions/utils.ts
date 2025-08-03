import { API_ROOT } from "@/config";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/global";
import { cookies } from "next/headers";

export const fetchWithToken = async ({
  url,
  body,
  method,
}: {
  url: string;
  body?: string;
  method?: "POST" | "GET" | "PUT" | "DELETE";
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // if (response.status === 401) {
    //   const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

    //   if (!refreshToken) {
    //     throw new Error("No refresh token");
    //   }

    //   const refreshResponse = await fetch(`${API_ROOT}/token/refresh/`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ refresh: refreshToken }),
    //   });

    //   if (refreshResponse.status === 200) {
    //     const { data, error } = await refreshResponse.json();

    //     if (error) {
    //       throw new Error(error);
    //     }

    //     cookieStore.set(ACCESS_TOKEN_KEY, data.access, {
    //       httpOnly: true,
    //       secure: true,
    //       path: "/",
    //       sameSite: "lax",
    //     });

    //     return await fetch(url, {
    //       method,
    //       headers: {
    //         Authorization: `Bearer ${data.access}`,
    //         "Content-Type": "application/json",
    //       },
    //       body: body ? JSON.stringify(body) : undefined,
    //     });
    //   } else {
    //     throw new Error("Failed to refresh token");
    //   }
    // }

    return response;
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch" };
  }
};
