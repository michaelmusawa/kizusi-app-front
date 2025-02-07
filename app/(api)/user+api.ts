import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export async function POST(request: Request) {
  try {
    const { name, email, clerkId, phone } = await request.json();

    if (!name || !email || !clerkId || !phone) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await axios.post(`${API_BASE_URL}/users`, {
      name,
      email,
      clerkId,
      phone,
    });
    const res = response.data;
    return new Response(JSON.stringify({ data: res }), { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);

    const users = response.data;

    return new Response(JSON.stringify({ data: users }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
