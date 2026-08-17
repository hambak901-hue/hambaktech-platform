"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface UserFiltersProps {
  roles: {
    id: string;
    name: string;
  }[];
}

export default function UserFilters({
  roles,
}: UserFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(
    key: string,
    value: string,
  ) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    router.push(
      `/admin/users?${params.toString()}`,
    );
  }

  return (
    <div className="flex flex-wrap gap-4">

      <select
        defaultValue={
          searchParams.get("roleId") ?? ""
        }
        onChange={(event) =>
          updateFilter(
            "roleId",
            event.target.value,
          )
        }
        className="rounded-lg border px-4 py-2"
      >
        <option value="">
          All Roles
        </option>

        {roles.map((role) => (
          <option
            key={role.id}
            value={role.id}
          >
            {role.name}
          </option>
        ))}
      </select>

      <select
        defaultValue={
          searchParams.get("status") ?? ""
        }
        onChange={(event) =>
          updateFilter(
            "status",
            event.target.value,
          )
        }
        className="rounded-lg border px-4 py-2"
      >
        <option value="">
          All Status
        </option>

        <option value="ACTIVE">
          Active
        </option>

        <option value="SUSPENDED">
          Suspended
        </option>

        <option value="PENDING">
          Pending
        </option>

        <option value="INACTIVE">
          Inactive
        </option>
      </select>

    </div>
  );
}
