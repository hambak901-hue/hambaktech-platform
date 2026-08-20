import {
  PermissionAction,
  PrismaClient,
} from "@prisma/client";

export async function seedPermissions(prisma: PrismaClient) {
  const permissions: Array<{
    name: string;
    action: PermissionAction;
    description: string;
  }> = [
    // Users
    {
      name: "Users:CREATE",
      action: PermissionAction.CREATE,
      description: "Create users",
    },
    {
      name: "Users:READ",
      action: PermissionAction.READ,
      description: "View users",
    },
    {
      name: "Users:UPDATE",
      action: PermissionAction.UPDATE,
      description: "Update users",
    },
    {
      name: "Users:DELETE",
      action: PermissionAction.DELETE,
      description: "Delete users",
    },
    {
      name: "Users:MANAGE",
      action: PermissionAction.MANAGE,
      description: "Manage users",
    },

    // Services
    {
      name: "Services:CREATE",
      action: PermissionAction.CREATE,
      description: "Create services",
    },
    {
      name: "Services:READ",
      action: PermissionAction.READ,
      description: "View services",
    },
    {
      name: "Services:UPDATE",
      action: PermissionAction.UPDATE,
      description: "Update services",
    },
    {
      name: "Services:DELETE",
      action: PermissionAction.DELETE,
      description: "Delete services",
    },
    {
      name: "Services:MANAGE",
      action: PermissionAction.MANAGE,
      description: "Manage services",
    },

    // Orders
    {
      name: "Orders:CREATE",
      action: PermissionAction.CREATE,
      description: "Create orders",
    },
    {
      name: "Orders:READ",
      action: PermissionAction.READ,
      description: "View orders",
    },
    {
      name: "Orders:UPDATE",
      action: PermissionAction.UPDATE,
      description: "Update orders",
    },
    {
      name: "Orders:DELETE",
      action: PermissionAction.DELETE,
      description: "Delete orders",
    },
    {
      name: "Orders:APPROVE",
      action: PermissionAction.APPROVE,
      description: "Approve orders",
    },
    {
      name: "Orders:MANAGE",
      action: PermissionAction.MANAGE,
      description: "Manage orders",
    },

    // Payments
    {
      name: "Payments:CREATE",
      action: PermissionAction.CREATE,
      description: "Create payments",
    },
    {
      name: "Payments:READ",
      action: PermissionAction.READ,
      description: "View payments",
    },
    {
      name: "Payments:UPDATE",
      action: PermissionAction.UPDATE,
      description: "Update payments",
    },
    {
      name: "Payments:APPROVE",
      action: PermissionAction.APPROVE,
      description: "Approve payments",
    },
    {
      name: "Payments:MANAGE",
      action: PermissionAction.MANAGE,
      description: "Manage payments",
    },

    // Wallet
    {
      name: "Wallet:CREATE",
      action: PermissionAction.CREATE,
      description: "Create wallet transactions",
    },
    {
      name: "Wallet:READ",
      action: PermissionAction.READ,
      description: "View wallets and transactions",
    },
    {
      name: "Wallet:UPDATE",
      action: PermissionAction.UPDATE,
      description: "Update wallet information",
    },
    {
      name: "Wallet:MANAGE",
      action: PermissionAction.MANAGE,
      description: "Manage wallets and transactions",
    },

    // Academy
    {
      name: "Academy:CREATE",
      action: PermissionAction.CREATE,
      description: "Create academy content",
    },
    {
      name: "Academy:READ",
      action: PermissionAction.READ,
      description: "View academy content",
    },
    {
      name: "Academy:UPDATE",
      action: PermissionAction.UPDATE,
      description: "Update academy content",
    },
    {
      name: "Academy:DELETE",
      action: PermissionAction.DELETE,
      description: "Delete academy content",
    },
    {
      name: "Academy:MANAGE",
      action: PermissionAction.MANAGE,
      description: "Manage academy",
    },

    // NIN
    {
      name: "NIN:CREATE",
      action: PermissionAction.CREATE,
      description: "Create NIN service requests",
    },
    {
      name: "NIN:READ",
      action: PermissionAction.READ,
      description: "View NIN service requests",
    },
    {
      name: "NIN:UPDATE",
      action: PermissionAction.UPDATE,
      description: "Update NIN service requests",
    },
    {
      name: "NIN:APPROVE",
      action: PermissionAction.APPROVE,
      description: "Approve NIN service requests",
    },
    {
      name: "NIN:MANAGE",
      action: PermissionAction.MANAGE,
      description: "Manage NIN services",
    },

    // Reports
    {
      name: "Reports:READ",
      action: PermissionAction.READ,
      description: "View reports",
    },

    // Settings
    {
      name: "Settings:READ",
      action: PermissionAction.READ,
      description: "View platform settings",
    },
    {
      name: "Settings:UPDATE",
      action: PermissionAction.UPDATE,
      description: "Update platform settings",
    },
    {
      name: "Settings:MANAGE",
      action: PermissionAction.MANAGE,
      description: "Manage platform settings",
    },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: {
        name_action: {
          name: permission.name,
          action: permission.action,
        },
      },
      update: {
        description: permission.description,
      },
      create: {
        name: permission.name,
        action: permission.action,
        description: permission.description,
      },
    });
  }

  console.log(
    `✅ ${permissions.length} permissions seeded.`,
  );
}