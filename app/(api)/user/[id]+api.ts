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
