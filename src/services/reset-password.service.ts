import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function resetUserPassword(userId: string) {
  // Temporary password
  const temporaryPassword = Math.random()
    .toString(36)
    .slice(-8);

  const hashedPassword = await bcrypt.hash(
    temporaryPassword,
    12
  );

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return temporaryPassword;
}