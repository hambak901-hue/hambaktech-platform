import {
  PermissionAction,
  RoleType,
} from "@prisma/client";
import { notFound } from "next/navigation";

import EditUserForm from "@/components/users/EditUserForm";
import { requirePermission } from "@/lib/permissions";
import {
  getUserForEdit,
} from "@/services/update-user.service";
import {
  getAssignableRoles,
} from "@/services/roles.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({
  params,
}: Props) {
  await requirePermission(
    "Users",
    PermissionAction.UPDATE,
  );

  const { id } = await params;

  const [user, roles] = await Promise.all([
    getUserForEdit(id),
    getAssignableRoles(),
  ]);

  if (!user) {
    notFound();
  }

  if (user.role.type === RoleType.SUPER_ADMIN) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Edit User
        </h1>

        <p className="text-gray-500">
          Update user information.
        </p>
      </div>

      <EditUserForm
        user={user}
        roles={roles}
      />
    </div>
  );
}
