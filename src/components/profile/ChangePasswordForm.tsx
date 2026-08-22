"use client";

import { useState } from "react";

import { changePasswordAction } from "@/actions/profile/change-password";

export default function ChangePasswordForm() {
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

    const formData = new FormData(
      event.currentTarget,
    );

    try {
      const result =
        await changePasswordAction(formData);

      if (result.success) {
        setMessage(result.message);

        event.currentTarget.reset();
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to change password.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border bg-white p-6 shadow"
    >
      <div>
        <h2 className="text-xl font-semibold">
          Change Password
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Change the password for your own account.
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

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Current Password
          </label>

          <input
            type="password"
            name="currentPassword"
            autoComplete="current-password"
            required
            className="mt-1 w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            autoComplete="new-password"
            minLength={8}
            required
            className="mt-1 w-full rounded-lg border p-3"
          />

          <p className="mt-1 text-xs text-gray-500">
            Minimum 8 characters.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Confirm New Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            minLength={8}
            required
            className="mt-1 w-full rounded-lg border p-3"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Changing Password..."
          : "Change Password"}
      </button>
    </form>
  );
}
