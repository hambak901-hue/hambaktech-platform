import AdminIcon from "@/components/admin/AdminIcon";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import StatCard from "@/components/dashboard/StatCard";

import { getRoleLabel } from "@/lib/roles";
import { getCurrentUser } from "@/services/current-user.service";
import { getDashboardStats } from "@/services/dashboard.service";
import { getActivityLogs } from "@/services/activity-log.service";

export default async function DashboardPage() {
  const [stats, user, activityResult] =
    await Promise.all([
      getDashboardStats(),
      getCurrentUser(),
      getActivityLogs({
        page: 1,
        limit: 6,
      }),
    ]);

  const fullName = user
    ? [user.firstName, user.otherName, user.lastName]
        .filter(Boolean)
        .join(" ")
    : "User";

  const roleLabel = user
    ? getRoleLabel(user.role.type)
    : "User";

  const activities = activityResult.logs.map(
    (activity) => ({
      id: activity.id,
      action: activity.action,
      description: activity.description,
      createdAt: activity.createdAt.toISOString(),
      userName: activity.user
        ? [
            activity.user.firstName,
            activity.user.lastName,
          ]
            .filter(Boolean)
            .join(" ")
        : undefined,
    }),
  );

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          HambakTech Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back, {fullName}.
        </p>

        <p className="mt-1 text-sm font-medium text-slate-400">
          {roleLabel}
        </p>
      </section>

      <section
        aria-label="Dashboard statistics"
        className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          title="Users"
          value={stats.users}
          icon={
            <AdminIcon
              name="users"
              className="h-7 w-7"
            />
          }
          iconBackground="bg-blue-600"
        />

        <StatCard
          title="Services"
          value={stats.services}
          icon={
            <AdminIcon
              name="services"
              className="h-7 w-7"
            />
          }
          iconBackground="bg-emerald-500"
        />

        <StatCard
          title="Orders"
          value={stats.orders}
          icon={
            <AdminIcon
              name="orders"
              className="h-7 w-7"
            />
          }
          iconBackground="bg-orange-500"
        />

        <StatCard
          title="Payments"
          value={stats.payments}
          icon={
            <AdminIcon
              name="payments"
              className="h-7 w-7"
            />
          }
          iconBackground="bg-violet-600"
        />

        <StatCard
          title="Wallet"
          value={stats.wallets ?? 0}
          icon={
            <AdminIcon
              name="wallet"
              className="h-7 w-7"
            />
          }
          iconBackground="bg-blue-500"
        />

        <StatCard
          title="Students"
          value={stats.students}
          icon={
            <AdminIcon
              name="academy"
              className="h-7 w-7"
            />
          }
          iconBackground="bg-cyan-600"
        />

        <StatCard
          title="NIN Applications"
          value="—"
          icon={
            <AdminIcon
              name="nin"
              className="h-7 w-7"
            />
          }
          iconBackground="bg-cyan-500"
        />

        <StatCard
          title="Revenue (Today)"
          value={`₦${Number(
            stats.revenue,
          ).toLocaleString()}`}
          icon={
            <span className="text-2xl font-bold">
              ₦
            </span>
          }
          iconBackground="bg-emerald-600"
        />
      </section>

      <ActivityTimeline activities={activities} />
    </div>
  );
}