export type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
};

export type ApiEnvelope<T> = {
  data: T | null;
  error: { code?: string; message: string; details?: unknown } | null;
};
