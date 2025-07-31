import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "./src/lib/auth";

export function middleware(request: NextRequest) {
  // Check if the user is trying to access admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("auth-token");

    // If no auth cookie, redirect to login
    if (!authCookie?.value) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Verify the JWT token
    const payload = verifyAuthToken(authCookie.value);

    // If token is invalid or expired, redirect to login
    if (!payload || !payload.authenticated) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      // Clear the invalid cookie
      response.cookies.delete("auth-token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
