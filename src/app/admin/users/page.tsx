import { UserStatus } from "@prisma/client";

import Pagination from "@/components/users/Pagination";
import UserFilters from "@/components/users/UserFilters";
import UserSearch from "@/components/users/UserSearch";
import UserStatistics from "@/components/users/UserStatistics";
import UsersTable from "@/components/users/UsersTable";
import { getRoles } from "@/services/roles.service";
import {
  getUsers,
  getUserStatistics,
} from "@/services/users.service";

interface Props {
  searchParams: Promise<{
    search?: string;
    roleId?: string;
    status?: UserStatus;
    page?: string;
  }>;
}

export default async function UsersPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");

  const [{ users, totalPages, currentPage }, stats, roles] =
    await Promise.all([
      getUsers({
        search: params.search,
        roleId: params.roleId,
        status: params.status,
        page,
        limit: 10,
      }),

      getUserStatistics(),

      getRoles(),
    ]);

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          User Management
        </h1>

        <p className="text-gray-500">
          Manage platform users.
        </p>
      </div>

      <UserStatistics stats={stats} />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <UserSearch />

        <UserFilters roles={roles} />

      </div>

      <UsersTable users={users} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
      />

    </div>
  );
}