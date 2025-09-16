import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // ⚠️ use .env.local

export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;

  // ❌ If no token → redirect to login
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // ✅ Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ Example: Only allow admins inside dashboard
    if (
      request.nextUrl.pathname.startsWith("/dashboard/admin") &&
      decoded.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // You can also allow normal users for other dashboard pages if needed
    return NextResponse.next();
  } catch (err) {
    // ❌ Invalid or expired token
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // protect all dashboard routes
};
