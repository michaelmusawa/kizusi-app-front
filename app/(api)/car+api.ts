import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export async function GET(request: Request) {
  try {
    // Extract query parameters from the request
    const url = new URL(request.url);
    const filter = url.searchParams.get("filter") || "";
    const query = url.searchParams.get("query") || "";
    const limit = url.searchParams.get("limit") || "6";

    // Build the API request URL with query parameters
    const response = await axios.get(`${API_BASE_URL}/cars`, {
      params: {
        filter,
        query,
        limit,
      },
    });

    const cars = response.data;

    return new Response(JSON.stringify({ data: cars }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
