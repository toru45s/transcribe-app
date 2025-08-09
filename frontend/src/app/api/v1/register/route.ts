import { API_ROOT_V1 } from "@/shared/constants/config";
import { networkErrorResponse } from "@/shared/lib/bff/response";
import { apiClient } from "@/shared/lib/bff/api-client";

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
