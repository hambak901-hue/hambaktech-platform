export default function Testimonials() {
  const testimonials = [
    {
      name: "Amina Yusuf",
      service: "NIN Services",
      review:
        "HambakTech helped me complete my NIN correction quickly and professionally.",
    },
    {
      name: "John Musa",
      service: "ICT Training",
      review:
        "The ICT training was practical and helped me improve my computer skills.",
    },
    {
      name: "Grace Ibrahim",
      service: "Website Development",
      review:
        "Our business website was delivered on time and exceeded our expectations.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-4">
          What Our Clients Say
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Trusted by students, businesses and professionals.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
            >
              <div className="text-yellow-500 text-2xl mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-700 italic mb-6">
                "{item.review}"
              </p>

              <h3 className="font-bold text-lg">
                {item.name}
              </h3>

              <p className="text-blue-600">
                {item.service}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}