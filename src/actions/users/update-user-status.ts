"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserStatus(
  userId: string,
  status: "ACTIVE" | "SUSPENDED"
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