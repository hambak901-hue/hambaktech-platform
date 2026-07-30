export default function WhyChoose() {
  const features = [
    {
      title: "Trusted Services",
      description: "Reliable digital solutions with professional support.",
    },
    {
      title: "Affordable Pricing",
      description: "Quality services at competitive and transparent prices.",
    },
    {
      title: "Experienced Team",
      description: "Skilled professionals dedicated to customer satisfaction.",
    },
    {
      title: "Fast Delivery",
      description: "Quick processing and timely completion of every service.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          Why Choose HambakTech
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}