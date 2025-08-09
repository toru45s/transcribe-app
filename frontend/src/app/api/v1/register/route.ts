import { API_ROOT_V1 } from "@/shared/constants/config";
import { networkErrorResponse } from "@/bff/lib/response";
import { apiClient } from "@/bff/lib/api-client";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    return await apiClient(`${API_ROOT_V1}/register/`, {
      method: "POST",
      body: { email, password },
      requireAuth: false,
    });
  } catch (error) {
    return networkErrorResponse(error);
  }
}
