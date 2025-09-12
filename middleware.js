import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("auth")?.value; // 👈 login ke time set karna hoga

  // agar user login nahi hai aur dashboard open kar raha hai
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // dashboard aur uske nested routes protect honge
};
