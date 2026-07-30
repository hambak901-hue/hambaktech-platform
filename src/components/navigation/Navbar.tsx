import Link from "next/link";
import { navigation } from "@/data/navigation";

export default function Navbar() {
  return (
    <nav className="flex items-center gap-6">
      {navigation.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}