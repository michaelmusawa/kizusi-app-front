import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

export async function POST(request: Request) {
  try {
    const paymentData = await request.json();

    const response = await axios.post(
      `${BACKEND_URL}/api/payments`,
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Return the response back to the frontend
    return new Response(JSON.stringify(response.data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error initiating payment:", error);

    return new Response(
      JSON.stringify({ error: "Failed to initiate payment." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
