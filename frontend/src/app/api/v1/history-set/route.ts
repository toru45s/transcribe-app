import { API_ROOT_V1 } from "@/shared/constants/config";
import { apiClient } from "@/bff/lib/api-client";
import { networkErrorResponse } from "@/bff/lib/response";

export async function GET() {
  try {
    return await apiClient(`${API_ROOT_V1}/history-set/`);
  } catch (error) {
    return networkErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    return await apiClient(`${API_ROOT_V1}/history-set/`, {
      method: "POST",
      body: { title },
    });
  } catch (error) {
    return networkErrorResponse(error);
  }
}
