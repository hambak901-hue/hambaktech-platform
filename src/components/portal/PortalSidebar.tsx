"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Dashboard",
    href: "/portal/dashboard",
  },
  {
    label: "Wallet",
    href: "/portal/wallet",
  },
  {
    label: "Services",
    href: "/portal/services",
  },
  {
    label: "Academy",
    href: "/portal/academy",
  },
  {
    label: "NIN Centre",
    href: "/portal/nin",
  },
  {
    label: "History",
    href: "/portal/history",
  },
  {
    label: "Settings",
    href: "/portal/settings",
  },
];

export default function PortalSidebar() {
  const pathname = usePathname();

  async function handleLogout() {
    await signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-700 px-6 py-6">
        <h1 className="text-2xl font-bold">
          HambakTech
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Customer Portal
        </p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-700 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}