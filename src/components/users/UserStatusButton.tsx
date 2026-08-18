"use client";

import { UserStatus } from "@prisma/client";
import { useTransition } from "react";

import { updateUserStatus } from "@/actions/users/update-user-status";

interface Props {
  userId: string;
  currentStatus: UserStatus;
}

export default function UserStatusButton({
  userId,
  currentStatus,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const nextStatus: UserStatus =
    currentStatus === UserStatus.ACTIVE
      ? UserStatus.SUSPENDED
      : UserStatus.ACTIVE;

  function handleClick() {
    startTransition(async () => {
      await updateUserStatus(userId, nextStatus);
    });
  }

  const isActive = currentStatus === UserStatus.ACTIVE;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={`rounded px-3 py-2 text-sm text-white transition ${
        isActive
          ? "bg-orange-500 hover:bg-orange-600"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {isPending
        ? "Updating..."
        : isActive
          ? "Suspend"
          : "Activate"}
    </button>
  );
}
