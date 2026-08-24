import Link from "next/link";

import AdminIcon from "@/components/admin/AdminIcon";
import { getActivityLogs } from "@/services/activity-log.service";

export default async function ActivityPage() {
  const result = await getActivityLogs({
    page: 1,
    limit: 50,
  });

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          <AdminIcon
            name="arrow"
            className="h-4 w-4 rotate-180"
          />
          Dashboard
        </Link>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
          Activity Logs
        </h1>

        <p className="mt-2 text-slate-500">
          Review recent activity across the HambakTech platform.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {result.logs.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <AdminIcon
                name="activity"
                className="h-7 w-7"
              />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              No activity logs yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Activity will appear here as actions are performed.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {result.logs.map((activity) => {
              const userName = activity.user
                ? [
                    activity.user.firstName,
                    activity.user.lastName,
                  ]
                    .filter(Boolean)
                    .join(" ")
                : "System";

              return (
                <div
                  key={activity.id}
                  className="px-6 py-5 transition hover:bg-slate-50"
                >
                  <div className="flex gap-4">
                    <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-semibold text-slate-900">
                          {activity.action}
                        </p>

                        <time className="text-xs text-slate-400">
                          {activity.createdAt.toLocaleString()}
                        </time>
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        {activity.description ||
                          `${activity.entity} activity`}
                      </p>

                      <p className="mt-2 text-xs font-medium text-slate-400">
                        By {userName}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}