"use client";

import { useTransition } from "react";

import { resetUserPasswordAction } from "@/actions/users/reset-user-password";

interface ResetPasswordButtonProps {
  userId: string;
}

export default function ResetPasswordButton({
  userId,
}: ResetPasswordButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleReset() {
    const confirmed = window.confirm(
      "Are you sure you want to reset this user's password?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await resetUserPasswordAction(userId);

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert(
        `Password reset successfully.\n\nTemporary Password:\n${result.temporaryPassword}\n\nPlease save this password and provide it securely to the user.`
      );
    });
  }

  return (
    <button
      type="button"
      onClick={handleReset}
      disabled={isPending}
      className="rounded bg-purple-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "Resetting..." : "🔑 Reset Password"}
    </button>
  );
}