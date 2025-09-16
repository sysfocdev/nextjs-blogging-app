import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });

  // ✅ cookie clear karna
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    expires: new Date(0), // expire now
    path: "/",
  });

  return response;
}
