import { API_ROUTES } from "@/client/constants/api";
import { apiClient } from "@/client/lib/api";
import { ApiEnvelope } from "@/client/types/api";
import { RegisterResponse } from "@/features/auth/register/types/register";

export const registerService = (
  email: string,
  password: string
): Promise<ApiEnvelope<RegisterResponse>> => {
  return apiClient<RegisterResponse>(API_ROUTES.register, {
    method: "POST",
    body: { email, password },
  });
};
