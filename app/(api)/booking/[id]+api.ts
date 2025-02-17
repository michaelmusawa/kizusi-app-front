import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export async function GET(request: Request, { id }: Record<string, string>) {
  try {
    // Fetch the user by ID from the API
    const response = await axios.get(`${API_BASE_URL}/bookings/${id}`);

    const booking = response.data;

    return new Response(JSON.stringify({ data: booking }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    return new Response(
      JSON.stringify({ error: "Booking not found or internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request: Request, { id }: Record<string, string>) {
  try {
    const refundData = await request.json();

    const response = await axios.post(
      `${API_BASE_URL}/bookings/cancel/${id}`,
      refundData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return new Response(JSON.stringify({ error: "Failed to cancel booking" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
