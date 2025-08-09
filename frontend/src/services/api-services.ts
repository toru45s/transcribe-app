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
} from "@/types/client/responses";
import { API_ROUTES } from "@/constants/client/routes";

const registerService = (
  email: string,
  password: string
): Promise<ApiEnvelope<RegisterResponse>> => {
  return apiClient<RegisterResponse>(API_ROUTES.register, {
    method: "POST",
    body: { email, password },
  });
};

const logoutService = (): Promise<ApiEnvelope<DeleteResponse>> => {
  return apiClient<DeleteResponse>(API_ROUTES.tokenLogout, {
    method: "POST",
  });
};

const loginService = (
  email: string,
  password: string
): Promise<ApiEnvelope<LoginResponse>> => {
  return apiClient<LoginResponse>(API_ROUTES.token, {
    method: "POST",
    body: { email, password },
  });
};

const refreshTokenService = (): Promise<ApiEnvelope<RefreshTokenResponse>> => {
  return apiClient<RefreshTokenResponse>(API_ROUTES.tokenRefresh, {
    method: "POST",
  });
};

const meService = (): Promise<ApiEnvelope<MeResponse>> => {
  return apiClient<MeResponse>(API_ROUTES.me, {
    method: "GET",
  });
};

const listHistorySetService = (): Promise<
  ApiEnvelope<HistorySetResponse[]>
> => {
  return apiClient<HistorySetResponse[]>(API_ROUTES.historySet, {
    method: "GET",
  });
};

const retrieveHistorySetService = (
  id: string
): Promise<ApiEnvelope<HistorySetResponse>> => {
  return apiClient<HistorySetResponse>(API_ROUTES.historySetId(id), {
    method: "GET",
  });
};

const postHistorySetService = (
  title: string
): Promise<ApiEnvelope<HistorySetResponse>> => {
  return apiClient<HistorySetResponse>(API_ROUTES.historySet, {
    method: "POST",
    body: { title },
  });
};

const patchHistorySetService = (
  id: string,
  title: string
): Promise<ApiEnvelope<HistorySetResponse>> => {
  return apiClient<HistorySetResponse>(API_ROUTES.historySetId(id), {
    method: "PATCH",
    body: { title },
  });
};

const deleteHistorySetService = (
  id: string
): Promise<ApiEnvelope<DeleteResponse>> => {
  return apiClient<DeleteResponse>(API_ROUTES.historySetId(id), {
    method: "DELETE",
  });
};

const listHistoryService = (
  id: string
): Promise<ApiEnvelope<HistoryResponse[]>> => {
  return apiClient<HistoryResponse[]>(API_ROUTES.history(id), {
    method: "GET",
  });
};

const postHistoryService = (
  id: string,
  content: string
): Promise<ApiEnvelope<HistoryResponse>> => {
  return apiClient<HistoryResponse>(API_ROUTES.history(id), {
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
