"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MIN_PASSWORD_LENGTH = 8;

export async function changePasswordAction(
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const currentPassword = String(
    formData.get("currentPassword") ?? "",
  );

  const newPassword = String(
    formData.get("newPassword") ?? "",
  );

  const confirmPassword = String(
    formData.get("confirmPassword") ?? "",
  );

  if (
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    throw new Error(
      "All password fields are required.",
    );
  }

  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      "New password must be at least 8 characters.",
    );
  }

  if (newPassword !== confirmPassword) {
    throw new Error(
      "New password and confirmation do not match.",
    );
  }

  if (currentPassword === newPassword) {
    throw new Error(
      "New password must be different from your current password.",
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    throw new Error("User account not found.");
  }

  const currentPasswordValid =
    await bcrypt.compare(
      currentPassword,
      user.password,
    );

  if (!currentPasswordValid) {
    throw new Error(
      "Current password is incorrect.",
    );
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    12,
  );

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  revalidatePath("/admin/profile");

  return {
    success: true,
    message: "Password changed successfully.",
  };
}
