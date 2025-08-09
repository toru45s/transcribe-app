import { apiClient } from "@/lib/client/api-client";
import { ApiEnvelope } from "@/types/client/api";
import {
  LoginResponse,
  RegisterResponse,
  RefreshTokenResponse,
  MeResponse,
  HistorySetResponse,
  DeleteResponse,
  HistoryResponse,
} from "@/types/client/resposes";

const registerService = async (
  email: string,
  password: string
): Promise<ApiEnvelope<RegisterResponse>> => {
  return await apiClient<RegisterResponse>(`/api/v1/register/`, {
    method: "POST",
    body: { email, password },
  });
};

const logoutService = async (): Promise<ApiEnvelope<DeleteResponse>> => {
  return await apiClient<DeleteResponse>(`/api/v1/token/logout/`, {
    method: "POST",
  });
};

const loginService = async (
  email: string,
  password: string
): Promise<ApiEnvelope<LoginResponse>> => {
  return await apiClient<LoginResponse>(`/api/v1/token/`, {
    method: "POST",
    body: { email, password },
  });
};

const refreshTokenService = async (): Promise<
  ApiEnvelope<RefreshTokenResponse>
> => {
  return await apiClient<RefreshTokenResponse>(`/api/v1/token/refresh/`, {
    method: "POST",
  });
};

const meService = async (): Promise<ApiEnvelope<MeResponse>> => {
  return await apiClient<MeResponse>(`/api/v1/me/`, {
    method: "GET",
  });
};

const listHistorySetService = async (): Promise<
  ApiEnvelope<HistorySetResponse[]>
> => {
  return await apiClient<HistorySetResponse[]>(`/api/v1/history-set/`, {
    method: "GET",
  });
};

const retrieveHistorySetService = async (
  id: string
): Promise<ApiEnvelope<HistorySetResponse>> => {
  return await apiClient<HistorySetResponse>(`/api/v1/history-set/${id}/`, {
    method: "GET",
  });
};

const postHistorySetService = async (
  title: string
): Promise<ApiEnvelope<HistorySetResponse>> => {
  return await apiClient<HistorySetResponse>(`/api/v1/history-set/`, {
    method: "POST",
    body: { title },
  });
};

const patchHistorySetService = async (
  id: string,
  title: string
): Promise<ApiEnvelope<HistorySetResponse>> => {
  return await apiClient<HistorySetResponse>(`/api/v1/history-set/${id}/`, {
    method: "PATCH",
    body: { title },
  });
};

const deleteHistorySetService = async (
  id: string
): Promise<ApiEnvelope<DeleteResponse>> => {
  return await apiClient<DeleteResponse>(`/api/v1/history-set/${id}/`, {
    method: "DELETE",
  });
};

const listHistoryService = async (
  id: string
): Promise<ApiEnvelope<HistoryResponse>> => {
  return await apiClient<HistoryResponse>(`/api/v1/history-set/${id}/history`, {
    method: "GET",
  });
};

const postHistoryService = async (
  id: string,
  content: string
): Promise<ApiEnvelope<HistoryResponse>> => {
  return await apiClient<HistoryResponse>(`/api/v1/history-set/${id}/history`, {
    method: "POST",
    body: { content },
  });
};

export {
  registerService,
  logoutService,
  loginService,
  refreshTokenService,
  meService,
  listHistorySetService,
  retrieveHistorySetService,
  postHistorySetService,
  patchHistorySetService,
  deleteHistorySetService,
  listHistoryService,
  postHistoryService,
};
