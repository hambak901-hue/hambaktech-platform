"use server";

import { UserStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function updateUserStatus(
  userId: string,
  status: UserStatus
) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
}