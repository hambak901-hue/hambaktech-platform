import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [
    users,
    services,
    orders,
    payments,
    students,
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

    prisma.payment.aggregate({
      where: {
        status: "PAID",
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
    revenue: revenue._sum.amount ?? 0,
  };
}