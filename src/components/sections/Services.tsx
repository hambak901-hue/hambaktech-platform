import {
  FaIdCard,
  FaGraduationCap,
  FaLaptopCode,
  FaPrint,
  FaGlobe,
  FaBook,
} from "react-icons/fa";

const services = [
  {
    icon: <FaIdCard className="text-5xl text-blue-600" />,
    title: "NIN Services",
    description:
      "Professional NIN enrollment, modification, correction and printing.",
  },
  {
    icon: <FaGraduationCap className="text-5xl text-green-600" />,
    title: "JAMB Registration",
    description:
      "Fast UTME, Direct Entry registration and profile creation.",
  },
  {
    icon: <FaBook className="text-5xl text-red-600" />,
    title: "WAEC Registration",
    description:
      "WAEC registration, result checking and PIN sales.",
  },
  {
    icon: <FaLaptopCode className="text-5xl text-cyan-600" />,
    title: "ICT Training",
    description:
      "Professional computer training with certification.",
  },
  {
    icon: <FaGlobe className="text-5xl text-purple-600" />,
    title: "Website Development",
    description:
      "Modern websites and business software solutions.",
  },
  {
    icon: <FaPrint className="text-5xl text-orange-600" />,
    title: "Printing & Photocopy",
    description:
      "High-quality printing, scanning and photocopy services.",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-4">
          Our Professional Services
        </h2>

        <p className="text-center text-gray-600 mb-14 max-w-2xl mx-auto">
          HambakTech provides reliable digital solutions for students,
          individuals, businesses and organizations.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <div className="mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6">
                {service.description}
              </p>

              <button
                className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Learn More →
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}