"use client";

import { useTransition } from "react";

import { deleteUserAction } from "@/actions/users/delete-user";

interface Props {
  userId: string;
}

export default function DeleteUserButton({
  userId,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteUserAction(userId);

      alert(result.message);
    });
  };

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleDelete}
      className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "🗑 Delete"}
    </button>
  );
}
