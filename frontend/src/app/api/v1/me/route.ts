import { API_ROOT_V1 } from "@/shared/constants/config";
import { apiClient } from "@/bff/lib/api-client";
import { networkErrorResponse } from "@/bff/lib/response";

export async function GET() {
  try {
    return await apiClient(`${API_ROOT_V1}/me/`);
  } catch (error) {
    return networkErrorResponse(error);
  }
}
