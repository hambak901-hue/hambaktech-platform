import { getDashboardStats } from "@/services/dashboard.service";
import { getCurrentUser } from "@/services/current-user.service";
import { getRoleLabel } from "@/lib/roles";
import StatCard from "@/components/dashboard/StatCard";

export default async function DashboardPage() {
  const [stats, user] = await Promise.all([
    getDashboardStats(),
    getCurrentUser(),
  ]);

  const fullName = user
    ? [user.firstName, user.otherName, user.lastName]
        .filter(Boolean)
        .join(" ")
    : "User";

  const roleLabel = user
    ? getRoleLabel(user.role.type)
    : "User";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          HambakTech Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back, {fullName}.
        </p>

        <p className="mt-1 text-sm text-gray-400">
          {roleLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Users"
          value={stats.users}
          icon="👥"
          color="bg-blue-600"
        />

        <StatCard
          title="Services"
          value={stats.services}
          icon="🛠"
          color="bg-green-600"
        />

        <StatCard
          title="Orders"
          value={stats.orders}
          icon="📦"
          color="bg-orange-500"
        />

        <StatCard
          title="Payments"
          value={stats.payments}
          icon="💳"
          color="bg-purple-600"
        />

        <StatCard
          title="Students"
          value={stats.students}
          icon="🎓"
          color="bg-indigo-600"
        />

        <StatCard
          title="Revenue"
          value={`₦${Number(stats.revenue).toLocaleString()}`}
          icon="💰"
          color="bg-emerald-600"
        />
      </div>
    </div>
  );
}
