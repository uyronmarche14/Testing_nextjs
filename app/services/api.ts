const API_URL = "http://localhost:8080/api/auth/register";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Registration failed");
  }

  return response.json();
};

export const getRegistrations = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch registrations");
  const data = await response.json();
  return data.registrations;
};

export const updateRegistration = async (
  id: string,
  userData: { name: string; email: string; password: string },
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error("Failed to update registration");
  return response.json();
};
