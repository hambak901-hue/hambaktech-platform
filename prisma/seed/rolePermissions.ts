import {
  PrismaClient,
  PermissionAction,
  RoleType,
} from "@prisma/client";

export async function seedRolePermissions(
  prisma: PrismaClient,
) {
  const permissions = await prisma.permission.findMany();

  /**
   * Permissions are stored using names such as:
   *
   * Users:READ
   * Services:MANAGE
   * Orders:APPROVE
   *
   * Therefore the permission map must use permission.name
   * directly rather than appending the action again.
   */
  const permissionMap = new Map(
    permissions.map((permission) => [
      permission.name,
      permission.id,
    ]),
  );

  const getPermissionId = (
    name: string,
    action: PermissionAction,
  ) => {
    const permissionName = `${name}:${action}`;

    const id = permissionMap.get(permissionName);

    if (!id) {
      throw new Error(
        `Permission not found: ${permissionName}`,
      );
    }

    return id;
  };

  const rolePermissions: Record<
    RoleType,
    Array<[string, PermissionAction]>
  > = {
    [RoleType.SUPER_ADMIN]: [
      ["Users", PermissionAction.MANAGE],
      ["Services", PermissionAction.MANAGE],
      ["Orders", PermissionAction.MANAGE],
      ["Payments", PermissionAction.MANAGE],
      ["Wallet", PermissionAction.MANAGE],
      ["Academy", PermissionAction.MANAGE],
      ["NIN", PermissionAction.MANAGE],
      ["Reports", PermissionAction.READ],
      ["Settings", PermissionAction.MANAGE],
    ],

    [RoleType.ADMIN]: [
      ["Users", PermissionAction.MANAGE],
      ["Services", PermissionAction.MANAGE],
      ["Orders", PermissionAction.MANAGE],
      ["Payments", PermissionAction.MANAGE],
      ["Wallet", PermissionAction.MANAGE],
      ["Academy", PermissionAction.MANAGE],
      ["NIN", PermissionAction.MANAGE],
      ["Reports", PermissionAction.READ],
    ],

    [RoleType.STAFF]: [
      ["Services", PermissionAction.READ],
      ["Orders", PermissionAction.READ],
      ["Payments", PermissionAction.READ],
      ["Academy", PermissionAction.READ],
      ["NIN", PermissionAction.READ],
      ["Reports", PermissionAction.READ],
    ],

    [RoleType.STUDENT]: [],

    [RoleType.CUSTOMER]: [],
  };

  for (const [roleType, assignments] of Object.entries(
    rolePermissions,
  ) as Array<
    [RoleType, Array<[string, PermissionAction]>]
  >) {
    const role = await prisma.role.findFirst({
      where: {
        type: roleType,
      },
    });

    if (!role) {
      throw new Error(
        `Role not found: ${roleType}`,
      );
    }

    for (const [permissionName, action] of assignments) {
      const permissionId = getPermissionId(
        permissionName,
        action,
      );

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId,
        },
      });
    }
  }

  console.log("✅ Role Permissions Seeded");
}
