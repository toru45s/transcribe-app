export type RegisterResponse = {
  message: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
};

export type RefreshTokenResponse = {
  access: string;
};

export type DeleteResponse = null;

export type MeResponse = {
  email: string;
};

export type HistorySetResponse = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export type HistoryResponse = {
  id: string;
  content: string;
  created_at: string;
};
