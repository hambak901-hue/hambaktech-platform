export default function Academy() {
  const courses = [
    "Computer Appreciation",
    "Microsoft Office",
    "Graphic Design",
    "Web Development",
    "Computer Maintenance",
    "Digital Marketing",
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          HambakTech Academy
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course}
              className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">
                {course}
              </h3>

              <p className="mt-3 text-gray-600">
                Professional ICT training with practical experience and certification.
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}