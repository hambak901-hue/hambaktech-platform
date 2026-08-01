type Props = {
  title: string;
  value: number | string;
  icon: string;
  color: string;
};

export default function StatCard({
  title,
  value,
  icon,
  color,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

        </div>

        <div
          className={`h-14 w-14 rounded-full flex items-center justify-center text-white text-2xl ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}