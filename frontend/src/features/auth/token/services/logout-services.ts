import { apiClient } from "@/client/lib/api";
import { ApiEnvelope } from "@/client/types/api";
import { DeleteResponse } from "@/client/types/api";
import { API_ROUTES } from "@/client/constants/api";

export const logoutService = (): Promise<ApiEnvelope<DeleteResponse>> => {
  return apiClient<DeleteResponse>(API_ROUTES.tokenLogout, {
    method: "POST",
  });
};
