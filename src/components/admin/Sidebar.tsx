import Link from "next/link";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Users", href: "/admin/users" },
  { label: "Services", href: "/admin/services" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Payments", href: "/admin/payments" },
  { label: "Wallet", href: "/admin/wallet" },
  { label: "Academy", href: "/admin/academy" },
  { label: "NIN Centre", href: "/admin/nin" },
  { label: "Reports", href: "/admin/reports" },
  { label: "Website CMS", href: "/admin/cms" },
  { label: "Settings", href: "/admin/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h1 className="mb-8 text-2xl font-bold">
        HambakTech
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 hover:bg-slate-700"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}