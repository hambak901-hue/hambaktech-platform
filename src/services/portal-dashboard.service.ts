import { prisma } from "@/lib/prisma";

export async function getPortalDashboardData(
  userId: string,
) {
  const [
    user,
    wallet,
    recentTransactions,
    recentOrders,
    activeServiceRequests,
    student,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        otherName: true,
        lastName: true,
        email: true,
      },
    }),

    prisma.wallet.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
        balance: true,
        currency: true,
        status: true,
      },
    }),

    prisma.walletTransaction.findMany({
      where: {
        wallet: {
          userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        reference: true,
        amount: true,
        type: true,
        status: true,
        description: true,
        createdAt: true,
      },
    }),

    prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        reference: true,
        totalAmount: true,
        status: true,
        createdAt: true,
        items: {
          take: 1,
          select: {
            description: true,
            service: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    }),

    prisma.serviceRequest.findMany({
      where: {
        userId,
        status: {
          in: ["PENDING", "PROCESSING"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        status: true,
        createdAt: true,
        service: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),

    prisma.student.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
        studentNumber: true,
        enrollments: {
          where: {
            status: {
              in: ["PENDING", "ACTIVE"],
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
          select: {
            id: true,
            status: true,
            enrolledAt: true,
            course: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        certificates: {
          orderBy: {
            issuedAt: "desc",
          },
          take: 5,
          select: {
            id: true,
            certificateNo: true,
            issuedAt: true,
          },
        },
      },
    }),
  ]);

  return {
    user,
    wallet,
    recentTransactions,
    recentOrders,
    activeServiceRequests,
    student,
  };
}