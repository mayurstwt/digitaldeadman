import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { sessionCookieName, verifySessionValue } from "@/lib/session";

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export function proxy(request: NextRequest) {
  const sessionValue = request.cookies.get(sessionCookieName)?.value;
  const userId = verifySessionValue(sessionValue);

  if (!userId) {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create/:path*", "/projects/:path*"],
};
