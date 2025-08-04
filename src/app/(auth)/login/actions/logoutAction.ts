"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");

  return {
    success: true,
    redirectTo: "/login",
  };
}
