import { API_ROOT } from "@/config";

/**
 * Registers a new user with the provided form data.
 *
 * @param {FormData} formData - The form data containing user registration details.
 * @returns {Promise<any>} The response from the registration API.
 */
export async function registerUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${API_ROOT}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
}
