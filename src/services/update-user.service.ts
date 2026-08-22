import {
  RoleType,
  UserStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function getUserForEdit(
  id: string,
) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      role: true,
    },
  });
}

export async function updateUser(
  id: string,
  data: {
    firstName: string;
    lastName: string;
    otherName?: string;
    email: string;
    phone?: string;
    roleId: string;
    status: UserStatus;
  },
) {
  const existingUser =
    await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        role: true,
      },
    });

  if (!existingUser) {
    throw new Error("User not found.");
  }

  if (
    existingUser.role.type ===
    RoleType.SUPER_ADMIN
  ) {
    throw new Error(
      "The SUPER_ADMIN account is protected and cannot be edited.",
    );
  }

  const selectedRole =
    await prisma.role.findUnique({
      where: {
        id: data.roleId,
      },
    });

  if (!selectedRole) {
    throw new Error(
      "Selected role does not exist.",
    );
  }

  if (
    selectedRole.type ===
    RoleType.SUPER_ADMIN
  ) {
    throw new Error(
      "SUPER_ADMIN cannot be assigned through User Management.",
    );
  }

  const duplicate = await prisma.user.findFirst({
    where: {
      AND: [
        {
          id: {
            not: id,
          },
        },
        {
          OR: [
            {
              email: data.email,
            },
            ...(data.phone
              ? [{ phone: data.phone }]
              : []),
          ],
        },
      ],
    },
  });

  if (duplicate) {
    throw new Error(
      "Email or phone already belongs to another user.",
    );
  }

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      otherName: data.otherName,
      email: data.email,
      phone: data.phone,
      roleId: data.roleId,
      status: data.status,
    },
  });
}
