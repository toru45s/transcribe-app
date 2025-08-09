import { apiClient } from "@/shared/lib/api-client";
import { ApiEnvelope } from "@/client/types/api";
import { HistoryResponse } from "@/shared/types/client/responses";
import { API_ROUTES } from "@/client/constants/routes";

export const listHistoryService = (
  id: string
): Promise<ApiEnvelope<HistoryResponse[]>> => {
  return apiClient<HistoryResponse[]>(API_ROUTES.history(id), {
    method: "GET",
  });
};

export const postHistoryService = (
  id: string,
  content: string
): Promise<ApiEnvelope<HistoryResponse>> => {
  return apiClient<HistoryResponse>(API_ROUTES.history(id), {
    method: "POST",
    body: { content },
  });
};
