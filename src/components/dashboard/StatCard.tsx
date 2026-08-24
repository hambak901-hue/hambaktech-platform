import type { ReactNode } from "react";

type Props = {
  title: string;
  value: number | string;
  icon: ReactNode;
  iconBackground: string;
};

export default function StatCard({
  title,
  value,
  icon,
  iconBackground,
}: Props) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 truncate text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white ${iconBackground}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}