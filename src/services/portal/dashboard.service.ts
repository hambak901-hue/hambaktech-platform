import { prisma } from "@/lib/prisma";

export async function getCustomerDashboard(
  customerId: string,
) {
  const [
    customer,
    wallet,
    orders,
    serviceRequests,
    student,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: customerId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        otherName: true,
        email: true,
        profilePhoto: true,
      },
    }),

    prisma.wallet.findUnique({
      where: {
        userId: customerId,
      },
      select: {
        id: true,
        balance: true,
        currency: true,
        status: true,
      },
    }),

    prisma.order.findMany({
      where: {
        userId: customerId,
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
      },
    }),

    prisma.serviceRequest.findMany({
      where: {
        userId: customerId,
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
        userId: customerId,
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
          select: {
            id: true,
            status: true,
            course: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        certificates: {
          select: {
            id: true,
            certificateNo: true,
          },
        },
      },
    }),
  ]);

  if (!customer) {
    throw new Error("Customer account not found.");
  }

  const walletTransactions = wallet
    ? await prisma.walletTransaction.findMany({
        where: {
          walletId: wallet.id,
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
          createdAt: true,
        },
      })
    : [];

  return {
    customer,
    wallet,
    walletTransactions,
    orders,
    serviceRequests,
    student,
  };
}