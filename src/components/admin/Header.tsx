import Image from "next/image";
import Link from "next/link";

import { getRoleLabel } from "@/lib/roles";
import { getCurrentUser } from "@/services/current-user.service";

export default async function Header() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
        <h2 className="text-2xl font-bold">
          HambakTech Dashboard
        </h2>
      </header>
    );
  }

  const fullName = [
    user.firstName,
    user.otherName,
    user.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
      <h2 className="text-2xl font-bold">
        HambakTech Dashboard
      </h2>

      <Link
        href="/admin/profile"
        className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-gray-100"
      >
        {user.profilePhoto ? (
          <Image
            src={user.profilePhoto}
            alt={`${fullName} profile`}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            {initials}
          </div>
        )}

        <div className="hidden text-right sm:block">
          <p className="font-semibold text-gray-900">
            {fullName}
          </p>

          <p className="text-sm text-gray-500">
            {getRoleLabel(user.role.type)}
          </p>
        </div>
      </Link>
    </header>
  );
}
