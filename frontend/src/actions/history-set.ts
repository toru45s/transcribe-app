"use server";

import { API_ROOT } from "@/config";
import { ACCESS_TOKEN_KEY } from "@/constants";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { fetchWithToken } from "./utils";

export const createHistorySet = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
    console.log("--------------------------------");
    console.log(accessToken);
    const title = `Subtitle of ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`;
    const response = await fetch(`${API_ROOT}/history-set/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    return response.json();
  } catch (error) {
    console.error("Error creating history set:", error);
  }
};

export const updateHistorySet = async ({
  token,
  historySetId,
  formData,
}: {
  token: string;
  historySetId: string;
  formData: FormData;
}) => {
  try {
    const title = formData.get("title") as string;

    const response = await fetch(`${API_ROOT}/history-set/${historySetId}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    return response.json();
  } catch (error) {
    console.error("Error updating history set:", error);
  }
};

export const deleteHistorySet = async ({
  token,
  historySetId,
}: {
  token: string;
  historySetId: string;
}) => {
  try {
    await fetch(`${API_ROOT}/history-set/${historySetId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting history set:", error);
  }
};

export const getHistorySetList = async () => {
  const response = await fetchWithToken({
    url: `${API_ROOT}/history-set/`,
    method: "GET",
  });

  return response?.json();
};

export const getHistorySet = async ({
  historySetId,
}: {
  historySetId: string;
}) => {
  const response = await fetchWithToken({
    url: `${API_ROOT}/history-set/${historySetId}/`,
    method: "GET",
  });

  return response?.json();
};
