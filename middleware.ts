import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "./src/lib/auth";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("auth-token");

    if (!authCookie?.value) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = verifyAuthToken(authCookie.value);

    if (!payload || !payload.authenticated) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth-token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
