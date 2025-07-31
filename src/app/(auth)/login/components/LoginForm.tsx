"use client";

import { useState } from "react";
import { loginAction } from "../actions/loginAction";

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError("");

    try {
      const result = await loginAction(formData);

      if (!result?.success) {
        setError(result?.error || "Invalid password");
      }
      // If successful, the server action will handle the redirect
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="mt-8 space-y-6">
      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Enter admin password"
          disabled={isLoading}
          autoComplete="current-password"
        />
      </div>

      {error && <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md border border-red-200">{error}</div>}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
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
        </button>
      </div>

      <div className="text-xs text-gray-500 text-center">
        <p>🔒 Secure login with encrypted JWT tokens</p>
      </div>
    </form>
  );
}
