import Link from "next/link";

import AdminIcon from "@/components/admin/AdminIcon";

interface ActivityTimelineProps {
  activities?: Array<{
    id: string;
    action: string;
    description: string | null;
    createdAt: string;
    userName?: string;
  }>;
}

export default function ActivityTimeline({
  activities = [],
}: ActivityTimelineProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Recent Activities
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest activity across the platform.
          </p>
        </div>

        <Link
          href="/admin/activity"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View All
          <AdminIcon name="arrow" className="h-4 w-4" />
        </Link>
      </div>

      {activities.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <AdminIcon name="activity" className="h-7 w-7" />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-800">
            No recent activities found.
          </p>

          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
            Platform activity will appear here as administrators and users
            perform actions.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex gap-4 px-6 py-5 transition hover:bg-slate-50"
            >
              <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600 ring-4 ring-blue-50" />

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-semibold text-slate-900">
                    {activity.action}
                  </p>

                  <time className="text-xs text-slate-400">
                    {new Date(activity.createdAt).toLocaleString()}
                  </time>
                </div>

                {activity.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {activity.description}
                  </p>
                )}

                {activity.userName && (
                  <p className="mt-2 text-xs font-medium text-slate-400">
                    By {activity.userName}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}