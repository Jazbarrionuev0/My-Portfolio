"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyPassword, createAuthToken } from "../../../../lib/auth";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;

  if (!password) {
    return {
      success: false,
      error: "Password is required",
    };
  }

  const isValidPassword = await verifyPassword(password);

  if (!isValidPassword) {
    // Add a small delay to prevent brute force attacks
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: false,
      error: "Invalid password",
    };
  }

  // Create encrypted JWT token
  const authToken = createAuthToken();

  // Set secure authentication cookie
  const cookieStore = await cookies();
  cookieStore.set("auth-token", authToken, {
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict", // CSRF protection
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  // Return success instead of redirecting immediately
  return {
    success: true,
    redirectTo: "/admin",
  };
}
