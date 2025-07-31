import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Get environment variables with fallbacks
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";

export interface AuthPayload {
  authenticated: boolean;
  timestamp: number;
  role: "admin";
}

export async function verifyPassword(inputPassword: string): Promise<boolean> {
  try {
    // For now, we'll hash the plain text password and compare
    // In production, you should store the hashed password in your database
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}

export function createAuthToken(): string {
  const payload: AuthPayload = {
    authenticated: true,
    timestamp: Date.now(),
    role: "admin",
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
    issuer: "portfolio-auth",
    audience: "portfolio-admin",
  });
}

export function verifyAuthToken(token: string): AuthPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: "portfolio-auth",
      audience: "portfolio-admin",
    }) as AuthPayload;

    // Additional check: ensure token is not too old (7 days)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    if (decoded.timestamp < sevenDaysAgo) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("auth-token");

    if (!authCookie?.value) {
      return false;
    }

    const payload = verifyAuthToken(authCookie.value);
    return payload !== null && payload.authenticated === true;
  } catch (error) {
    console.error("Authentication check error:", error);
    return false;
  }
}

export async function requireAuth(): Promise<boolean> {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    throw new Error("Authentication required");
  }
  return true;
}

export async function getAuthPayload(): Promise<AuthPayload | null> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("auth-token");

    if (!authCookie?.value) {
      return null;
    }

    return verifyAuthToken(authCookie.value);
  } catch (error) {
    console.error("Get auth payload error:", error);
    return null;
  }
}
