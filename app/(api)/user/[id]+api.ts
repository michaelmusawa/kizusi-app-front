// api/car/[id]+api.ts

import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export async function GET(request: Request, { id }: Record<string, string>) {
  try {
    // Fetch the user by ID from the API
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);

    const user = response.data;

    return new Response(JSON.stringify({ data: user }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return new Response(
      JSON.stringify({ error: "User not found or internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request: Request, { id }: Record<string, string>) {
  try {
    // Parse the JSON data from the request body
    const body = await request.json();

    const { name, email, password, phone, image } = body;

    // Update the user with the provided data
    const response = await axios.post(`${API_BASE_URL}/users/${id}`, {
      name,
      email,
      password,
      phone,
      image,
    });

    return new Response(
      JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
      }),
      {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error updating user by ID:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to update user or internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
