import { getUsers, getUserStatistics } from "@/services/users.service";
import UserStatistics from "@/components/users/UserStatistics";
import UserSearch from "@/components/users/UserSearch";
import UserFilters from "@/components/users/UserFilters";
import UsersTable from "@/components/users/UsersTable";

export default async function UsersPage() {
  const users = await getUsers();
  const stats = await getUserStatistics();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">
          User Management
        </h1>

        <p className="text-gray-500">
          Manage all HambakTech users.
        </p>
      </div>

      {/* Statistics */}
      <UserStatistics stats={stats} />

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <UserSearch />
        <UserFilters />
      </div>

      {/* Users Table */}
      <UsersTable users={users} />
    </div>
  );
}