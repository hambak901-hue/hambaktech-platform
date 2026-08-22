import {
  RoleType,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function getRoles() {
  return prisma.role.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getAssignableRoles() {
  return prisma.role.findMany({
    where: {
      type: {
        not: RoleType.SUPER_ADMIN,
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}
