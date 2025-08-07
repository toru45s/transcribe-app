import packageJson from "../package.json";

export const VERSION = packageJson.version;
export const APP_ROOT = process.env.APP_ROOT || "http://localhost:3000";
export const API_ROOT = process.env.API_ROOT || "http://127.0.0.1:8000";
export const API_ROOT_V1 = process.env.API_ROOT_V1 || `${API_ROOT}/v1`;
export const WS_ROOT = process.env.WS_ROOT || "ws://localhost:8000";
export const IS_DEV = process.env.NODE_ENV === "development";
