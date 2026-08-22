import { RoleType } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function deleteUser(
  userId: string,
) {
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
      "The SUPER_ADMIN account is protected and cannot be deleted.",
    );
  }

  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
}
