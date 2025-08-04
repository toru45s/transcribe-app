import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  STATUS_CODE_UNAUTHORIZED,
} from "@/constants/global";
import { API_ROOT } from "@/config";

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

type ApiClientProps = {
  uri: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  isAuth?: boolean;
};

export const apiClient = async ({
  uri,
  method,
  body,
  isAuth,
}: ApiClientProps) => {
  const accessToken = await getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(isAuth && accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  let response = await fetch(uri, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  if (response.status === STATUS_CODE_UNAUTHORIZED) {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const responseRefreshToken = await fetch(`${API_ROOT}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const { data, error } = await responseRefreshToken.json();

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

    response = await fetch(uri, {
      method,
      headers: {
        Authorization: `Bearer ${data.access}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  const responseData = await response.json();
  return responseData;
};
