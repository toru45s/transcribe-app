import { apiClient } from "@/client/lib/api";
import { ApiEnvelope } from "@/client/types/api";
import { HistorySetResponse } from "@/features/transcript/types/transcript";
import { API_ROUTES } from "@/client/constants/api";
import { DeleteResponse } from "@/client/types/api";

export const listHistorySetService = (): Promise<
  ApiEnvelope<HistorySetResponse[]>
> => {
  return apiClient<HistorySetResponse[]>(API_ROUTES.historySet, {
    method: "GET",
  });
};

export const retrieveHistorySetService = (
  id: string
): Promise<ApiEnvelope<HistorySetResponse>> => {
  return apiClient<HistorySetResponse>(API_ROUTES.historySetId(id), {
    method: "GET",
  });
};

export const createHistorySetService = ({
  title,
}: {
  title: string;
}): Promise<ApiEnvelope<HistorySetResponse>> => {
  return apiClient<HistorySetResponse>(API_ROUTES.historySet, {
    method: "POST",
    body: { title },
  });
};

export const patchHistorySetService = (
  id: string,
  title: string
): Promise<ApiEnvelope<HistorySetResponse>> => {
  return apiClient<HistorySetResponse>(API_ROUTES.historySetId(id), {
    method: "PATCH",
    body: { title },
  });
};

export const deleteHistorySetService = (
  id: string
): Promise<ApiEnvelope<DeleteResponse>> => {
  return apiClient<DeleteResponse>(API_ROUTES.historySetId(id), {
    method: "DELETE",
  });
};
