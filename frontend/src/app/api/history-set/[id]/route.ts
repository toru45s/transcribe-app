import { API_ROOT } from "@/config";
import { apiClient } from "@/lib/api";
import { NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = params;
  const { title } = await request.json();

  const response = await apiClient({
    uri: `${API_ROOT}/history-set/${id}/`,
    method: "PUT",
    body: { title },
    isAuth: true,
  });

  return NextResponse.json(response);
}
