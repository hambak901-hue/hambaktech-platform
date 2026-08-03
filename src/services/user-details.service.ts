import { prisma } from "@/lib/prisma";

export async function getUserDetails(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      role: true,
      wallet: true,
      orders: {
        orderBy: {
          createdAt: "desc",
        },
      },
      payments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      serviceRequests: {
        include: {
          service: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      student: {
        include: {
          enrollments: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });
}