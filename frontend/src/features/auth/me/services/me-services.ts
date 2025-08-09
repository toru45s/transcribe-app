import { API_ROUTES } from "@/client/constants/api";
import { apiClient } from "@/client/lib/api";
import { ApiEnvelope } from "@/client/types/api";
import { MeResponse } from "@/features/auth/me/types/me";

export const meService = (): Promise<ApiEnvelope<MeResponse>> => {
  return apiClient<MeResponse>(API_ROUTES.me, {
    method: "GET",
  });
};
