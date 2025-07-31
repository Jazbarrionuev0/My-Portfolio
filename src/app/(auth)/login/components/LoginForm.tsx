"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { toast } from "sonner";
import { loginAction } from "../actions/loginAction";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    try {
      const result = await loginAction(formData);

      if (result?.success) {
        toast.success("Login successful!");
        // Small delay to show the toast before redirecting
        setTimeout(() => {
          router.push(result.redirectTo || "/admin/blog");
        }, 1000);
      } else {
        toast.error(result?.error || "Invalid password");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="mt-8 space-y-6">
      <div className="relative">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          required
          className="pr-10"
          placeholder="Enter admin password"
          disabled={isLoading}
          autoComplete="current-password"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
          disabled={isLoading}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </div>

      <div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Authenticating...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </div>

      <div className="text-xs text-gray-500 text-center">
        <p className="flex items-center justify-center gap-1">
          <Lock className="h-3 w-3" />
          Secure login with encrypted JWT tokens
        </p>
      </div>
    </form>
  );
}
