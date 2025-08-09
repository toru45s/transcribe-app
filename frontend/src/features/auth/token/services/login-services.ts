import { apiClient } from "@/client/lib/api";
import { ApiEnvelope } from "@/client/types/api";
import { LoginResponse } from "@/features/auth/token/types/token";
import { API_ROUTES } from "@/client/constants/api";

export const loginService = (
  email: string,
  password: string
): Promise<ApiEnvelope<LoginResponse>> => {
  return apiClient<LoginResponse>(API_ROUTES.token, {
    method: "POST",
    body: { email, password },
  });
};
