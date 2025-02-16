// api/car/[id]+api.ts

import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export async function GET(request: Request, { id }: Record<string, string>) {
  try {
    // Fetch the car by ID from the API
    const response = await axios.get(`${API_BASE_URL}/cars/${id}`);

    const car = response.data;

    return new Response(JSON.stringify({ data: car }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    return new Response(
      JSON.stringify({ error: "Car not found or internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
