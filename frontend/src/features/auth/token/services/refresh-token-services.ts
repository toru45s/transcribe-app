import { apiClient } from "@/client/lib/api";
import { ApiEnvelope } from "@/client/types/api";
import { RefreshTokenResponse } from "@/features/auth/token/types/token";
import { API_ROUTES } from "@/client/constants/api";

export const refreshTokenService = (): Promise<
  ApiEnvelope<RefreshTokenResponse>
> => {
  return apiClient<RefreshTokenResponse>(API_ROUTES.tokenRefresh, {
    method: "POST",
  });
};
