import { company } from "@/config/company";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-3">
          Contact HambakTech
        </h1>

        <p className="text-center text-gray-600 mb-12">
          We'd love to hear from you. Reach out through any of the channels below.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-semibold mb-8">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-blue-600 text-xl" />
                <span>{company.phone}</span>
              </div>

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-blue-600 text-xl" />
                <span>{company.email}</span>
              </div>

              <div className="flex items-center gap-4">
                <FaWhatsapp className="text-green-600 text-xl" />
                <span>{company.whatsapp}</span>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-red-600 text-xl" />
                <span>{company.address}</span>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-semibold mb-8">
              Send Us a Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-xl px-4 py-3"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full border rounded-xl px-4 py-3"
              />

              <button
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition"
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