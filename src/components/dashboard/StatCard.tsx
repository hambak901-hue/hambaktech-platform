import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
  iconBackground?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
  iconBackground,
}: Props) {
  const backgroundClass =
    iconBackground ?? color ?? "bg-blue-600";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl text-white ${backgroundClass}`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
    </div>
  );
}