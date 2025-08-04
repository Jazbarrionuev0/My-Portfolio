"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutAction } from "../../../(auth)/login/actions/logoutAction";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setIsLoading(true);

    try {
      const result = await logoutAction();

      if (result?.success) {
        toast.success("Logged out successfully!");
        // Small delay to show the toast before redirecting
        setTimeout(() => {
          router.push(result.redirectTo || "/login");
        }, 1000);
      } else {
        toast.error("Failed to logout. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("An error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
