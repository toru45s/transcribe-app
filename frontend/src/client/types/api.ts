export type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
};

export type ResponseError = {
  code?: string;
  message: string;
  details?: unknown;
};

export type DeleteResponse = null;

export type ApiEnvelope<T> = {
  data: T | null;
  error: ResponseError | null;
};
