import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const startOfToday = new Date();

  startOfToday.setHours(0, 0, 0, 0);

  const [
    users,
    services,
    orders,
    payments,
    students,
    wallets,
    revenue,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.service.count(),

    prisma.order.count(),

    prisma.payment.count({
      where: {
        status: "PAID",
      },
    }),

    prisma.student.count(),

    prisma.wallet.count(),

    prisma.payment.aggregate({
      where: {
        status: "PAID",
        paidAt: {
          gte: startOfToday,
        },
      },

      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    users,
    services,
    orders,
    payments,
    students,
    wallets,
    revenue: revenue._sum.amount ?? 0,
  };
}