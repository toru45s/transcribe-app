"use server";

import { API_ROOT } from "@/config";
import { fetchWithToken } from "@/actions/utils";

export const createHistory = async ({
  historyId,
  content,
}: {
  historyId: string;
  content: string;
}) => {
  const response = await fetchWithToken({
    url: `${API_ROOT}/history-set/${historyId}/history/`,
    method: "POST",
    body: JSON.stringify({ history_set: historyId, content }),
  });

  return response?.json();
};

export const getHistories = async ({
  historySetId,
}: {
  historySetId: string;
}) => {
  const response = await fetchWithToken({
    url: `${API_ROOT}/history-set/${historySetId}/history`,
    method: "GET",
  });

  return response?.json();
};
