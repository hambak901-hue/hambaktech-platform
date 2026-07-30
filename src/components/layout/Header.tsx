"use client";

import Link from "next/link";
import Image from "next/image";
import { company } from "@/config/company";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import { FaWhatsapp } from "react-icons/fa";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link href="/" className="flex items-center gap-3">

          <Image
            src={company.logo}
            alt={company.name}
            width={50}
            height={50}
            priority
          />

          <div>
            <h2 className="font-bold text-2xl text-blue-500">
              {company.name}
            </h2>

            <p className="text-xs text-gray-200">
              {company.slogan}
            </p>
          </div>

        </Link>

        <nav className="hidden md:flex gap-8 text-white font-medium">

          <Link href="/">Home</Link>

          <Link href="/services">Services</Link>

          <Link href="/academy">Academy</Link>

          <Link href="/contact">Contact</Link>

        </nav>

        <div className="flex items-center gap-5">

          <button>
            <MagnifyingGlassIcon className="h-6 w-6 text-cyan-300" />
          </button>

          <button>
            <MoonIcon className="h-6 w-6 text-yellow-400" />
          </button>

          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="text-2xl text-green-400" />
          </a>

        </div>

      </div>

    </header>
  );
}