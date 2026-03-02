import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/analytics-auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("analytics_session")?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL("/analytics/auth/error", request.url)
    );
  }

  const user = await verifySessionToken(token);
  if (!user) {
    return NextResponse.redirect(
      new URL("/analytics/auth/error", request.url)
    );
  }

  // Pass user info to downstream pages via headers
  const response = NextResponse.next();
  response.headers.set("x-user-id", user.userId);
  response.headers.set("x-user-name", user.name);
  response.headers.set("x-user-role", user.role);
  response.headers.set("x-user-farm", user.farm);
  response.headers.set("x-user-farm-id", user.farmId);

  return response;
}

export const config = {
  matcher: [
    // Protect /analytics and all sub-routes EXCEPT /analytics/auth/*
    "/analytics",
    "/analytics/((?!auth).*)",
  ],
};
