import StatCard from "@/components/dashboard/StatCard";

interface Props {
  stats: {
    totalUsers: number;
    activeUsers: number;
    suspendedUsers: number;
    pendingUsers: number;
  };
}

export default function UserStatistics({ stats }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        icon="👥"
        color="bg-blue-600"
      />

      <StatCard
        title="Active Users"
        value={stats.activeUsers}
        icon="✅"
        color="bg-green-600"
      />

      <StatCard
        title="Pending"
        value={stats.pendingUsers}
        icon="🟡"
        color="bg-yellow-500"
      />

      <StatCard
        title="Suspended"
        value={stats.suspendedUsers}
        icon="⛔"
        color="bg-red-600"
      />

    </div>
  );
}