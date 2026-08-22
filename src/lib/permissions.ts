import {
  PermissionAction,
  RoleType,
} from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export interface PermissionCheck {
  resource: string;
  action: PermissionAction;
}

async function getAuthenticatedUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });
}

export async function hasPermission(
  resource: string,
  action: PermissionAction,
): Promise<boolean> {
  const user = await getAuthenticatedUser();

  if (!user) {
    return false;
  }

  if (user.role.type === RoleType.SUPER_ADMIN) {
    return true;
  }

  const exactPermission = `${resource}:${action}`;
  const managePermission =
    `${resource}:${PermissionAction.MANAGE}`;

  return user.role.permissions.some(
    ({ permission }) =>
      permission.name === exactPermission ||
      permission.name === managePermission,
  );
}

export async function requirePermission(
  resource: string,
  action: PermissionAction,
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const allowed = await hasPermission(
    resource,
    action,
  );

  if (!allowed) {
    throw new Error(
      `Permission denied: ${resource}:${action}`,
    );
  }

  return session;
}

export async function hasAnyPermission(
  permissions: PermissionCheck[],
): Promise<boolean> {
  for (const permission of permissions) {
    if (
      await hasPermission(
        permission.resource,
        permission.action,
      )
    ) {
      return true;
    }
  }

  return false;
}
