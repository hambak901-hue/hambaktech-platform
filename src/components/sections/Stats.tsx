export default function Stats() {
  const stats = [
    {
      number: "10,000+",
      title: "Happy Customers",
    },
    {
      number: "500+",
      title: "Students Trained",
    },
    {
      number: "15+",
      title: "Digital Services",
    },
    {
      number: "24/7",
      title: "Customer Support",
    },
  ];

  return (
    <section className="bg-blue-700 text-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          HambakTech in Numbers
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="text-center bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <h3 className="text-4xl font-extrabold">
                {item.number}
              </h3>

              <p className="mt-3 text-blue-100">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}