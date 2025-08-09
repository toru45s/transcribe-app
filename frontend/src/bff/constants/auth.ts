import { IS_DEV } from "@/shared/constants/config";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !IS_DEV,
  path: "/",
  sameSite: "lax" as const,
};
