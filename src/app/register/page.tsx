"use client";

import Link from "next/link";
import { useState } from "react";

import { registerUserAction } from "@/actions/auth/register";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(
      event.currentTarget,
    );

    try {
      await registerUserAction(formData);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account.",
      );

      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-6 rounded-xl bg-white p-8 shadow-lg"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Create your HambakTech customer account.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium"
            >
              First Name
            </label>

            <input
              id="firstName"
              name="firstName"
              required
              autoComplete="given-name"
              className="mt-1 w-full rounded-lg border p-3"
              placeholder="John"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium"
            >
              Last Name
            </label>

            <input
              id="lastName"
              name="lastName"
              required
              autoComplete="family-name"
              className="mt-1 w-full rounded-lg border p-3"
              placeholder="Doe"
            />
          </div>

          <div>
            <label
              htmlFor="otherName"
              className="block text-sm font-medium"
            >
              Other Name
            </label>

            <input
              id="otherName"
              name="otherName"
              autoComplete="additional-name"
              className="mt-1 w-full rounded-lg border p-3"
              placeholder="Optional"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-lg border p-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium"
            >
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className="mt-1 w-full rounded-lg border p-3"
              placeholder="08012345678"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium"
            >
              Gender
            </label>

            <select
              id="gender"
              name="gender"
              className="mt-1 w-full rounded-lg border p-3"
              defaultValue=""
            >
              <option value="">
                Prefer not to say
              </option>

              <option value="MALE">
                Male
              </option>

              <option value="FEMALE">
                Female
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
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
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-1 w-full rounded-lg border p-3"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
