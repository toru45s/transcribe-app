"use server";

import { API_ROOT } from "@/config";
import dayjs from "dayjs";

export const createHistorySet = async (token: string | null) => {
  try {
    const title = `Subtitle of ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`;
    const response = await fetch(`${API_ROOT}/api/history-set/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    return response.json();
  } catch (error) {
    console.error("Error creating history set:", error);
  }
};

export const getHistorySets = async (token: string | null) => {
  try {
    const response = await fetch(`${API_ROOT}/api/history-set/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching histories:", error);
  }
};

export const getHistorySet = async ({
  token,
  historySetId,
}: {
  token: string;
  historySetId: string;
}) => {
  try {
    const response = await fetch(
      `${API_ROOT}/api/history-set/${historySetId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error retrieving history set:", error);
  }
};

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
    const response = await fetch(`${API_ROOT}/api/history/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ history_set: historyId, content }),
    });
    return response.json();
  } catch (error) {
    console.error("Error creating history:", error);
  }
};

export const getHistory = async ({
  token,
  historySetId,
}: {
  token: string;
  historySetId: string;
}) => {
  try {
    const response = await fetch(
      `${API_ROOT}/api/history-set/${historySetId}/history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching history:", error);
  }
};
