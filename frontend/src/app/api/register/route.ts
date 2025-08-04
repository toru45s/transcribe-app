import { API_ROOT } from "@/config";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const response = await fetch(`${API_ROOT}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}
