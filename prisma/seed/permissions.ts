import {
  PrismaClient,
  PermissionAction,
} from "@prisma/client";

export async function seedPermissions(prisma: PrismaClient) {
  const permissions: Array<
    [string, PermissionAction]
  > = [
    ["Users", PermissionAction.MANAGE],
    ["Services", PermissionAction.MANAGE],
    ["Orders", PermissionAction.MANAGE],
    ["Payments", PermissionAction.MANAGE],
    ["Wallet", PermissionAction.MANAGE],
    ["Academy", PermissionAction.MANAGE],
    ["NIN", PermissionAction.MANAGE],
    ["Reports", PermissionAction.READ],
    ["Settings", PermissionAction.MANAGE],
  ];

  for (const [name, action] of permissions) {
    await prisma.permission.upsert({
      where: {
        name,
      },

      update: {
        action,
        description: `${name} Permission`,
      },

      create: {
        name,
        action,
        description: `${name} Permission`,
      },
    });
  }

  console.log("Permissions Seeded");
}