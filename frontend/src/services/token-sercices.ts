export const logoutService = async () => {
  try {
    const response = await fetch(`/api/v1/token/logout/`, {
      method: "POST",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Register error:", error);
    return { data: null, error };
  }
};

export const loginService = async (email: string, password: string) => {
  try {
    const response = await fetch(`/api/v1/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Register error:", error);
    return { data: null, error };
  }
};

export const refreshTokenService = async () => {
  try {
    const response = await fetch(`/api/v1/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Register error:", error);
    return { data: null, error };
  }
};
