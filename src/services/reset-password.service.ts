import {
  RoleType,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

import { prisma } from "@/lib/prisma";

export async function resetUserPassword(
  userId: string,
) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.role.type === RoleType.SUPER_ADMIN) {
    throw new Error(
      "The SUPER_ADMIN password cannot be reset from User Management.",
    );
  }

  const temporaryPassword = randomBytes(9)
    .toString("base64url")
    .slice(0, 12);

  const hashedPassword = await bcrypt.hash(
    temporaryPassword,
    12,
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
