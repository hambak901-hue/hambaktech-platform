import type { UserActivity } from "@/types/user";

interface UserActivityCardProps {
  user: UserActivity;
}

export default function UserActivityCard({
  user,
}: UserActivityCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        User Activity
      </h2>

      <div className="space-y-4">
        <ActivityItem
          title="Orders"
          value={user.orders?.length ?? 0}
        />

        <ActivityItem
          title="Payments"
          value={user.payments?.length ?? 0}
        />

        <ActivityItem
          title="Service Requests"
          value={user.serviceRequests?.length ?? 0}
        />

        <ActivityItem
          title="Wallet"
          value={
            user.wallet
              ? `₦${Number(user.wallet.balance).toLocaleString()}`
              : "No Wallet"
          }
        />

        <ActivityItem
          title="Student"
          value={user.student ? "Yes" : "No"}
        />

        <ActivityItem
          title="Enrollments"
          value={
            user.student?.enrollments?.length ?? 0
          }
        />
      </div>
    </div>
  );
}

function ActivityItem({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <span className="text-gray-600">
        {title}
      </span>

      <span className="font-semibold">
        {value}
      </span>
    </div>
  );
}