"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function updateUserStatus(
  userId: string,
  currentStatus: "ACTIVE" | "SUSPENDED"
) {
  try {
    const newStatus =
      currentStatus === "ACTIVE"
        ? "SUSPENDED"
        : "ACTIVE";

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: newStatus,
      },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to update user status.",
    };
  }
}