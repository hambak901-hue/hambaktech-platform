import Link from "next/link";
import type { ReactNode } from "react";

import type { UserProfile } from "@/types/user";

interface UserProfileCardProps {
  user: UserProfile;
}

export default function UserProfileCard({
  user,
}: UserProfileCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h2>

          {user.otherName && (
            <p className="text-gray-500">
              {user.otherName}
            </p>
          )}
        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          {user.role?.name ?? "-"}
        </span>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Info
          title="Email"
          value={user.email}
        />

        <Info
          title="Phone"
          value={user.phone || "-"}
        />

        <Info
          title="Gender"
          value={user.gender || "-"}
        />

        <Info
          title="Status"
          value={user.status}
        />

        <Info
          title="Email Verified"
          value={user.emailVerified ? "Yes" : "No"}
        />

        <Info
          title="Phone Verified"
          value={user.phoneVerified ? "Yes" : "No"}
        />

        <Info
          title="Last Login"
          value={
            user.lastLogin
              ? new Date(user.lastLogin).toLocaleString()
              : "Never"
          }
        />

        <Info
          title="Created"
          value={new Date(
            user.createdAt
          ).toLocaleDateString()}
        />
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href={`/admin/users/${user.id}/edit`}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          Edit User
        </Link>

        <Link
          href="/admin/users"
          className="rounded-lg border px-5 py-2"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: ReactNode;
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs uppercase text-gray-500">
        {title}
      </p>

      <p className="mt-2 font-semibold">
        {value}
      </p>
    </div>
  );
}