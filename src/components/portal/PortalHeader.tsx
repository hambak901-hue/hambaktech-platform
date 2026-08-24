import Link from "next/link";

import { getCurrentUser } from "@/services/current-user.service";
import { getRoleLabel } from "@/lib/roles";

export default async function PortalHeader() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <header className="flex min-h-[73px] items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            HambakTech Portal
          </h2>
        </div>
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
    <header className="flex min-h-[73px] items-center justify-between border-b bg-white px-4 shadow-sm sm:px-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          HambakTech Portal
        </h2>

        <p className="hidden text-sm text-gray-500 sm:block">
          Your digital services
        </p>
      </div>

      <Link
        href="/portal/settings"
        className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-100 sm:px-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {initials || "U"}
        </div>

        <div className="hidden text-right sm:block">
          <p className="font-semibold text-gray-900">
            {fullName || "User"}
          </p>

          <p className="text-xs text-gray-500">
            {getRoleLabel(user.role.type)}
          </p>
        </div>
      </Link>
    </header>
  );
}