import { API_ROOT_V1 } from "@/config";
import { apiClient } from "@/lib/bff/api-client";
import { networkErrorResponse } from "@/lib/bff/response";

export async function GET() {
  try {
    return await apiClient(`${API_ROOT_V1}/me/`);
  } catch (error) {
    return networkErrorResponse(error);
  }
}
