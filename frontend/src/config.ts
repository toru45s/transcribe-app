import packageJson from "../package.json";

export const VERSION = packageJson.version;
export const APP_ROOT = process.env.APP_ROOT || "http://localhost:3000";
export const API_ROOT = process.env.API_ROOT || "http://localhost:8000/v1";
export const WS_ROOT = process.env.WS_ROOT || "ws://localhost:8000";
