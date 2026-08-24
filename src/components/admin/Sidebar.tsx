"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import AdminIcon from "./AdminIcon";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "dashboard" as const,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: "users" as const,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: "services" as const,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: "orders" as const,
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: "payments" as const,
  },
  {
    label: "Wallet",
    href: "/admin/wallet",
    icon: "wallet" as const,
  },
  {
    label: "Academy",
    href: "/admin/academy",
    icon: "academy" as const,
  },
  {
    label: "NIN Centre",
    href: "/admin/nin",
    icon: "nin" as const,
  },
  {
    label: "Reports",
    href: "/admin/reports",
    icon: "reports" as const,
  },
  {
    label: "Website CMS",
    href: "/admin/cms",
    icon: "cms" as const,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: "settings" as const,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  async function handleLogout() {
    await signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-[#0b172a] text-white">
      <div className="border-b border-white/10 px-6 py-7">
        <Link href="/admin/dashboard" className="block">
          <div className="text-2xl font-extrabold tracking-tight">
            Hambak<span className="text-blue-500">Tech</span>
          </div>

          <p className="mt-1 text-sm font-medium text-slate-400">
            Admin Panel
          </p>
        </Link>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <AdminIcon
                  name={item.icon}
                  className="h-5 w-5 shrink-0"
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-950/20 transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#0b172a]"
        >
          <AdminIcon name="logout" className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}