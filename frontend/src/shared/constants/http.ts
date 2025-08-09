export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  GATEWAY_TIMEOUT: 504,
} as const;

export const ERROR_CODES = {
  VALIDATION_ERROR: "validation_error",
  UNAUTHORIZED: "unauthorized",
  FORBIDDEN: "forbidden",
  NOT_FOUND: "not_found",
  CONFLICT: "conflict",
  UNPROCESSABLE_ENTITY: "unprocessable_entity",

  NETWORK_ERROR: "network_error",
  TIMEOUT: "timeout",

  INTERNAL_SERVER_ERROR: "internal_server_error",
} as const;

export const ERROR_MESSAGES = {
  VALIDATION_ERROR: "The request is invalid.",
  UNAUTHORIZED: "Authentication required.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "Resource not found.",
  CONFLICT: "Conflict occurred.",
  UNPROCESSABLE_ENTITY: "Request could not be processed.",

  NETWORK_ERROR: "Failed to reach upstream.",
  TIMEOUT: "Upstream timeout.",

  INTERNAL_SERVER_ERROR: "Internal server error occurred.",
} as const;
