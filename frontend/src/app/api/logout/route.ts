import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/global";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
