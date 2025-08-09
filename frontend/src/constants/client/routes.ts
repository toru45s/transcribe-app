export const API_ROUTES = {
  base: "/api/v1",
  me: "/api/v1/me/",
  token: "/api/v1/token/",
  tokenRefresh: "/api/v1/token/refresh/",
  tokenLogout: "/api/v1/token/logout/",
  register: "/api/v1/register/",
  historySet: "/api/v1/history-set/",
  history: (id: string) => `/api/v1/history-set/${id}/history/`,
  historySetId: (id: string) => `/api/v1/history-set/${id}/`,
};
