"use server";

import { API_ROOT, APP_ROOT } from "@/config";
import { STATUS_CODE_UNAUTHORIZED } from "@/constants/global";
import { logout } from "@/actions/authentications";
import { getAccessToken } from "@/lib/api";

export const createHistorySet = async ({
  title,
  token,
}: {
  title: string;
  token: string;
}) => {
  try {
    const response = await fetch(`${APP_ROOT}/api/history-set/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateHistorySet = async ({
  historySetId,
  formData,
}: {
  historySetId: string;
  formData: FormData;
}) => {
  const title = formData.get("title") as string;
  const accessToken = await getAccessToken();

  const response = await fetch(`${API_ROOT}/history-set/${historySetId}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return response.json();
};

export const deleteHistorySet = async ({
  historySetId,
}: {
  historySetId: string;
}) => {
  const accessToken = await getAccessToken();

  const response = await fetch(`${API_ROOT}/history-set/${historySetId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  console.log("--------------------------------");
  console.log(response);
  return response?.json();
};

export const getHistorySetList = async () => {
  const response = await fetch(`${APP_ROOT}/api/history-set/`, {
    method: "GET",
  });

  if (response.status === STATUS_CODE_UNAUTHORIZED) {
    logout();
  }

  return response.json();
};

export const getHistorySet = async ({
  historySetId,
}: {
  historySetId: string;
}) => {
  const accessToken = await getAccessToken();
  console.log("--------------------------------");
  console.log(accessToken);
  // const response = await fetchWithToken({
  //   url: `${API_ROOT}/history-set/${historySetId}/`,
  //   method: "GET",
  // });

  return response;
};
