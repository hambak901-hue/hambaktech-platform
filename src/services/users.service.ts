import {
  Prisma,
  RoleType,
  UserStatus,
} from "@prisma/client";

import { getPagination, getTotalPages } from "@/lib/pagination";
import { prisma } from "@/lib/prisma";

export interface GetUsersOptions {
  search?: string;
  roleId?: string;
  status?: UserStatus;
  page?: number;
  limit?: number;
}

const normalUsersWhere: Prisma.UserWhereInput = {
  role: {
    type: {
      not: RoleType.SUPER_ADMIN,
    },
  },
};

export async function getUsers({
  search,
  roleId,
  status,
  page = 1,
  limit = 10,
}: GetUsersOptions = {}) {
  const pagination = getPagination({
    page,
    limit,
  });

  const where: Prisma.UserWhereInput = {
    ...normalUsersWhere,
  };

  if (search?.trim()) {
    const query = search.trim();

    where.OR = [
      {
        firstName: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        lastName: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        phone: {
          contains: query,
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
    skip: pagination.skip,
    take: pagination.limit,
  });

  return {
    users,
    total,
    totalPages: getTotalPages(
      total,
      pagination.limit,
    ),
    currentPage: pagination.page,
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
    prisma.user.count({
      where: normalUsersWhere,
    }),

    prisma.user.count({
      where: {
        AND: [
          normalUsersWhere,
          {
            status: UserStatus.ACTIVE,
          },
        ],
      },
    }),

    prisma.user.count({
      where: {
        AND: [
          normalUsersWhere,
          {
            status: UserStatus.SUSPENDED,
          },
        ],
      },
    }),

    prisma.user.count({
      where: {
        AND: [
          normalUsersWhere,
          {
            status: UserStatus.PENDING,
          },
        ],
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
