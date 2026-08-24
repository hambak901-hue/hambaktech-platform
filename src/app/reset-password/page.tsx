"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { resetPasswordAction } from "@/actions/auth/reset-password";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.set("token", token);

    try {
      const result = await resetPasswordAction(formData);

      if (result.success) {
        setMessage(result.message);
        form.reset();
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to reset password.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold">
            Invalid Reset Link
          </h1>

          <p className="mt-2 text-gray-500">
            This password reset link is missing its token.
          </p>

          <Link
            href="/forgot-password"
            className="mt-6 inline-block font-medium text-blue-600 hover:underline"
          >
            Request a new reset link
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg"
      >
        <div>
          <h1 className="text-3xl font-bold">
            Reset Password
          </h1>

          <p className="mt-2 text-gray-500">
            Choose a new password for your account.
          </p>
        </div>

        {message && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            <p>{message}</p>

            <div className="mt-3">
              <Link
                href="/login"
                className="font-medium underline"
              >
                Continue to Login
              </Link>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium"
          >
            New Password
          </label>

          <input
            id="newPassword"
            type="password"
            name="newPassword"
            minLength={8}
            required
            autoComplete="new-password"
            className="mt-1 w-full rounded-lg border p-3"
          />

          <p className="mt-1 text-xs text-gray-500">
            Minimum 8 characters.
          </p>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium"
          >
            Confirm New Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            minLength={8}
            required
            autoComplete="new-password"
            className="mt-1 w-full rounded-lg border p-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Resetting Password..."
            : "Set New Password"}
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