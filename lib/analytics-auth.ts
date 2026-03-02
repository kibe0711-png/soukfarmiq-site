import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export interface AnalyticsUser {
  userId: string;
  name: string;
  role: string;
  farm: string;
  farmId: string;
}

const COOKIE_NAME = "analytics_session";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(secret);
}

/** Verify the one-time handoff token from FarmIQ */
export async function verifyAnalyticsToken(
  token: string
): Promise<AnalyticsUser> {
  const { payload } = await jwtVerify(token, getJwtSecret());

  return {
    userId: String(payload.userId),
    name: String(payload.name),
    role: String(payload.role),
    farm: String(payload.farm),
    farmId: String(payload.farmId),
  };
}

/** Create a session cookie (24h expiry) signed with our own secret */
export async function createSession(user: AnalyticsUser) {
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSessionSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/analytics",
    maxAge: 60 * 60 * 24,
  });
}

/** Read and verify the session cookie, return user or null */
export async function getSession(): Promise<AnalyticsUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    return {
      userId: String(payload.userId),
      name: String(payload.name),
      role: String(payload.role),
      farm: String(payload.farm),
      farmId: String(payload.farmId),
    };
  } catch {
    return null;
  }
}

/** Clear the session cookie */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/analytics",
    maxAge: 0,
  });
}

/** Verify session from a raw cookie value (for middleware) */
export async function verifySessionToken(
  token: string
): Promise<AnalyticsUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    return {
      userId: String(payload.userId),
      name: String(payload.name),
      role: String(payload.role),
      farm: String(payload.farm),
      farmId: String(payload.farmId),
    };
  } catch {
    return null;
  }
}
