import Image from "next/image";
import Link from "next/link";

import AdminIcon from "./AdminIcon";

import { getRoleLabel } from "@/lib/roles";
import { getCurrentUser } from "@/services/current-user.service";

export default async function Header() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <header className="sticky top-0 z-20 flex min-h-[82px] items-center border-b border-slate-200 bg-white px-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Dashboard
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
    <header className="sticky top-0 z-20 flex min-h-[82px] items-center justify-between border-b border-slate-200 bg-white px-5 shadow-sm sm:px-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Dashboard
        </h2>
      </div>

      <Link
        href="/admin/profile"
        className="group flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50 sm:px-3"
      >
        {user.profilePhoto ? (
          <Image
            src={user.profilePhoto}
            alt={`${fullName || "Administrator"} profile`}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#172b55] text-sm font-bold text-white">
            {initials || "SA"}
          </div>
        )}

        <div className="hidden text-left sm:block">
          <p className="font-semibold leading-5 text-slate-900">
            {fullName || "Administrator"}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {getRoleLabel(user.role.type)}
          </p>
        </div>

        <AdminIcon
          name="chevron"
          className="hidden h-5 w-5 text-slate-400 sm:block"
        />
      </Link>
    </header>
  );
}