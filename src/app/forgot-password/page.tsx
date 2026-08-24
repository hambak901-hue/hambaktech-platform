"use client";

import Link from "next/link";
import { useState } from "react";

import { forgotPasswordAction } from "@/actions/auth/forgot-password";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setResetToken("");
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();

      formData.set("email", email);

      const result =
        await forgotPasswordAction(formData);

      setMessage(result.message);

      if (result.resetToken) {
        setResetToken(result.resetToken);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to process your request.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg"
      >
        <div>
          <h1 className="text-3xl font-bold">
            Forgot Password
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your account email to reset your password.
          </p>
        </div>

        {message && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {resetToken && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-900">
              Development reset link
            </p>

            <Link
              href={`/reset-password?token=${encodeURIComponent(resetToken)}`}
              className="mt-2 block break-all text-sm text-blue-600 hover:underline"
            >
              Open password reset page
            </Link>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
            autoComplete="email"
            className="mt-1 w-full rounded-lg border p-3"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : "Reset Password"}
        </button>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </main>
  );
}
