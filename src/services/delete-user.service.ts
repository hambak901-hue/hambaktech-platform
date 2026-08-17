import { prisma } from "@/lib/prisma";

export async function deleteUser(userId: string) {
  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
}