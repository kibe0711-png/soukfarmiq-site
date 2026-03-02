import { NextRequest, NextResponse } from "next/server";
import { clearSession } from "@/lib/analytics-auth";

export async function POST(request: NextRequest) {
  await clearSession();
  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
