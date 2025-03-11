// api/car/[id]+api.ts

import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export async function GET(request: Request, { id }: Record<string, string>) {
  try {
    // Fetch the car by ID from the API
    const response = await axios.get(`${API_BASE_URL}/api/cars/${id}`);

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
        // eslint-disable-next-line prettier/prettier
      }
    );
  }
}
