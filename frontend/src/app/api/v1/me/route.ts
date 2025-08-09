import { API_ROOT_V1 } from "@/shared/constants/config";
import { apiClient } from "@/shared/lib/bff/api-client";
import { networkErrorResponse } from "@/shared/lib/bff/response";

export async function GET() {
  try {
    return await apiClient(`${API_ROOT_V1}/me/`);
  } catch (error) {
    return networkErrorResponse(error);
  }
}
