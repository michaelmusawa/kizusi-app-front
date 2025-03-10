import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export async function GET(request: Request) {
  try {
    // Build the API request URL with query parameters
    const response = await axios.get(`${API_BASE_URL}/api/categories`);

    const categories = response.data;

    return new Response(JSON.stringify({ data: categories }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
