import { NextRequest, NextResponse } from "next/server";
import { verifyAnalyticsToken, createSession } from "@/lib/analytics-auth";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/analytics/auth/error", request.url)
    );
  }

  try {
    const user = await verifyAnalyticsToken(token);
    await createSession(user);
    return NextResponse.redirect(new URL("/analytics", request.url));
  } catch {
    return NextResponse.redirect(
      new URL("/analytics/auth/error", request.url)
    );
  }
}
