import Link from "next/link";

import DeleteUserButton from "./DeleteUserButton";
import ResetPasswordButton from "./ResetPasswordButton";
import UserStatusButton from "./UserStatusButton";

interface UserActionsProps {
  userId: string;
  status: "ACTIVE" | "SUSPENDED";
}

export default function UserActions({
  userId,
  status,
}: UserActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">

      <Link
        href={`/admin/users/${userId}`}
        className="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        👁 View
      </Link>

      <Link
        href={`/admin/users/${userId}/edit`}
        className="rounded bg-amber-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
      >
        ✏ Edit
      </Link>

      <DeleteUserButton userId={userId} />

      <UserStatusButton
        userId={userId}
        currentStatus={status}
      />

      <ResetPasswordButton
        userId={userId}
      />

    </div>
  );
}