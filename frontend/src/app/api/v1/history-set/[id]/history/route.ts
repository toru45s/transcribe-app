import { API_ROOT_V1 } from "@/config";
import { apiClient } from "@/lib/bff/api-client";
import { networkErrorResponse } from "@/lib/bff/response";

type Params = { params: { id: string } };

export async function POST(request: Request, { params }: Params) {
  const { content } = await request.json();

  try {
    return await apiClient(`${API_ROOT_V1}/history-set/${params.id}/history/`, {
      method: "POST",
      body: { content },
    });
  } catch (error) {
    return networkErrorResponse(error);
  }
}

export async function GET(request: Request, { params }: Params) {
  try {
    return await apiClient(`${API_ROOT_V1}/history-set/${params.id}/history/`);
  } catch (error) {
    return networkErrorResponse(error);
  }
}
