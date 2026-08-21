import {
  PermissionAction,
} from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export interface PermissionCheck {
  resource: string;
  action: PermissionAction;
}

/**
 * Checks whether the currently authenticated user
 * has the requested permission.
 *
 * A MANAGE permission grants access to all actions
 * for the same resource.
 */
export async function hasPermission(
  resource: string,
  action: PermissionAction,
): Promise<boolean> {
  const session = await auth();

  if (!session?.user?.id) {
    return false;
  }

  const user = await prisma.user.findUnique({
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

  if (!user) {
    return false;
  }

  const exactPermission =
    `${resource}:${action}`;

  const managePermission =
    `${resource}:${PermissionAction.MANAGE}`;

  return user.role.permissions.some(
    ({ permission }) =>
      permission.name === exactPermission ||
      permission.name === managePermission,
  );
}

/**
 * Requires the currently authenticated user
 * to have the requested permission.
 */
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

/**
 * Checks multiple permissions and returns true
 * when at least one permission is granted.
 */
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