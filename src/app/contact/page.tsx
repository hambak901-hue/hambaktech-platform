import { company } from "@/config/company";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-3 text-center text-4xl font-bold text-blue-700">
          Contact HambakTech
        </h1>

        <p className="mb-12 text-center text-gray-600">
          We&apos;d love to hear from you. Reach out through any of the
          channels below.
        </p>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact Information */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-8 text-2xl font-semibold">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-xl text-blue-600" />
                <span>{company.phone}</span>
              </div>

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-xl text-blue-600" />
                <span>{company.email}</span>
              </div>

              <div className="flex items-center gap-4">
                <FaWhatsapp className="text-xl text-green-600" />
                <span>{company.whatsapp}</span>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-xl text-red-600" />
                <span>{company.address}</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-8 text-2xl font-semibold">
              Send Us a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border px-4 py-3"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border px-4 py-3"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full rounded-xl border px-4 py-3"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}