import { prisma } from "@/lib/prisma";

export async function getUsers() {
  return prisma.user.findMany({
    include: {
      role: true,
      wallet: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getUser(id: string) {
  return prisma.user.findUnique({
    where: { id },
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
        status: "ACTIVE",
      },
    }),

    prisma.user.count({
      where: {
        status: "SUSPENDED",
      },
    }),

    prisma.user.count({
      where: {
        status: "PENDING",
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