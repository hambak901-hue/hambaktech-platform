import {
  Prisma,
  UserStatus,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

export interface GetUsersOptions {
  search?: string;
  roleId?: string;
  status?: UserStatus;
  page?: number;
  limit?: number;
}

export async function getUsers({
  search,
  roleId,
  status,
  page = 1,
  limit = 10,
}: GetUsersOptions = {}) {
  const where: Prisma.UserWhereInput = {};

  if (search) {
    where.OR = [
      {
        firstName: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        lastName: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        phone: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (roleId) {
    where.roleId = roleId;
  }

  if (status) {
    where.status = status;
  }

  const total = await prisma.user.count({
    where,
  });

  const users = await prisma.user.findMany({
    where,

    include: {
      role: true,
      wallet: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    skip: (page - 1) * limit,

    take: limit,
  });

  return {
    users,
    total,
    totalPages: Math.ceil(
      total / limit,
    ),
    currentPage: page,
  };
}

export async function getUser(
  id: string,
) {
  return prisma.user.findUnique({
    where: {
      id,
    },

    include: {
      role: true,
      wallet: true,
      student: true,
      orders: true,
      payments: true,
    },
  });
}

export async function getUserStatistics() {
  const [
    totalUsers,
    activeUsers,
    suspendedUsers,
    pendingUsers,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.user.count({
      where: {
        status: UserStatus.ACTIVE,
      },
    }),

    prisma.user.count({
      where: {
        status: UserStatus.SUSPENDED,
      },
    }),

    prisma.user.count({
      where: {
        status: UserStatus.PENDING,
      },
    }),
  ]);

  return {
    totalUsers,
    activeUsers,
    suspendedUsers,
    pendingUsers,
  };
}
