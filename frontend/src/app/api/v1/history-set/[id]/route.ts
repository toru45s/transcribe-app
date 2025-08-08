import { API_ROOT_V1 } from "@/config";
import { apiClient } from "@/lib/bff/api-client";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(request: Request, { params }: Params) {
  try {
    const response = await apiClient(
      `${API_ROOT_V1}/history-set/${params.id}/`,
      "GET"
    );

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const response = await apiClient(
      `${API_ROOT_V1}/history-set/${params.id}/`,
      "DELETE"
    );

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { title } = await request.json();
    const response = await apiClient(
      `${API_ROOT_V1}/history-set/${params.id}/`,
      "PUT",
      { title }
    );

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error });
  }
}
