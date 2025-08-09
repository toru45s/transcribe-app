import { API_ROUTES } from "@/client/constants/routes";
import { apiClient } from "@/shared/lib/api-client";
import { ApiEnvelope } from "@/client/types/api";
import { MeResponse } from "@/shared/types/client/responses";

export const meService = (): Promise<ApiEnvelope<MeResponse>> => {
  return apiClient<MeResponse>(API_ROUTES.me, {
    method: "GET",
  });
};
