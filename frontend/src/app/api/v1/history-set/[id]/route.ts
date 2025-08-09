import { API_ROOT_V1 } from "@/shared/constants/config";
import { apiClient } from "@/shared/lib/bff/api-client";
import { networkErrorResponse } from "@/shared/lib/bff/response";

type Params = { params: { id: string } };

export async function GET(request: Request, { params }: Params) {
  try {
    return await apiClient(`${API_ROOT_V1}/history-set/${params.id}/`);
  } catch (error) {
    return networkErrorResponse(error);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    return await apiClient(`${API_ROOT_V1}/history-set/${params.id}/`, {
      method: "DELETE",
    });
  } catch (error) {
    return networkErrorResponse(error);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { title } = await request.json();
    return await apiClient(`${API_ROOT_V1}/history-set/${params.id}/`, {
      method: "PUT",
      body: { title },
    });
  } catch (error) {
    return networkErrorResponse(error);
  }
}
