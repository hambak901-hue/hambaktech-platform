import Image from "next/image";
import Link from "next/link";
import { company } from "@/config/company";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <Image
        src={company.heroImage}
        alt="HambakTech Hero"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Blue Overlay */}
      <div className="absolute inset-0 bg-blue-900/70"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">

        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
          Welcome to
          <br />
          <span className="text-cyan-300">
            {company.name}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-blue-100 mb-10">
          {company.slogan}
        </p>

        <div className="flex justify-center gap-5 flex-wrap">

          <Link
            href="/services"
            className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
          >
            Our Services
            <FaArrowRight />
          </Link>

          <Link
            href="/contact"
            className="bg-white text-blue-700 hover:bg-gray-100 transition px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
          >
            Contact Us
            <FaArrowRight />
          </Link>

        </div>

      </div>

    </section>
  );
}