import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

export async function POST(request: Request) {
  try {
    const paymentData = await request.json();

    const response = await axios.post(`${BACKEND_URL}/api/chat`, paymentData, {
      headers: {
        "Content-Type": "application/json",
      },
      // eslint-disable-next-line prettier/prettier
    });

    console.log("Dem response", response.data);
    return new Response(JSON.stringify(response.data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error initiating chat:", error);

    return new Response(JSON.stringify({ error: "Failed to initiate chat." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
      // eslint-disable-next-line prettier/prettier
    });
  }
}
