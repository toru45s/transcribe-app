"use server";

import { API_ROOT } from "@/config";
import { fetchWithToken } from "@/actions/utils";

export const createHistory = async ({
  token,
  historyId,
  content,
}: {
  token: string;
  historyId: string;
  content: string;
}) => {
  try {
    const response = await fetch(
      `${API_ROOT}/history-set/${historyId}/history/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ history_set: historyId, content }),
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error creating history:", error);
  }
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
