import { ApiEnvelope } from "@/client/types/api";
import { HistoryResponse } from "@/features/transcript/types/transcript";
import { API_ROUTES } from "@/client/constants/api";
import { apiClient } from "@/client/lib/api";

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
