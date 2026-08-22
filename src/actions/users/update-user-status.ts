"use server";

import {
  PermissionAction,
  RoleType,
  UserStatus,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export async function updateUserStatus(
  userId: string,
  status: UserStatus,
) {
  const session = await requirePermission(
    "Users",
    PermissionAction.UPDATE,
  );

  if (session.user.id === userId) {
    throw new Error(
      "You cannot change your own account status.",
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.role.type === RoleType.SUPER_ADMIN) {
    throw new Error(
      "The SUPER_ADMIN account is protected.",
    );
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
}
