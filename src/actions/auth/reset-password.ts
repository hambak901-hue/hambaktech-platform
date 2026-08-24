"use server";

import { createHash } from "crypto";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

const MIN_PASSWORD_LENGTH = 8;

export async function resetPasswordAction(
  formData: FormData,
) {
  const token = String(
    formData.get("token") ?? "",
  ).trim();

  const newPassword = String(
    formData.get("newPassword") ?? "",
  );

  const confirmPassword = String(
    formData.get("confirmPassword") ?? "",
  );

  if (!token) {
    throw new Error(
      "Invalid password reset link.",
    );
  }

  if (!newPassword || !confirmPassword) {
    throw new Error(
      "All password fields are required.",
    );
  }

  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      "Password must be at least 8 characters.",
    );
  }

  if (newPassword !== confirmPassword) {
    throw new Error(
      "Passwords do not match.",
    );
  }

  const tokenHash = createHash("sha256")
    .update(token)
    .digest("hex");

  const resetToken =
    await prisma.passwordResetToken.findUnique({
      where: {
        tokenHash,
      },
      select: {
        id: true,
        userId: true,
        expiresAt: true,
        usedAt: true,
      },
    });

  if (!resetToken) {
    throw new Error(
      "This password reset link is invalid.",
    );
  }

  if (resetToken.usedAt) {
    throw new Error(
      "This password reset link has already been used.",
    );
  }

  if (resetToken.expiresAt <= new Date()) {
    throw new Error(
      "This password reset link has expired.",
    );
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    12,
  );

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        password: hashedPassword,
      },
    }),

    prisma.passwordResetToken.update({
      where: {
        id: resetToken.id,
      },
      data: {
        usedAt: new Date(),
      },
    }),

    prisma.passwordResetToken.updateMany({
      where: {
        userId: resetToken.userId,
        id: {
          not: resetToken.id,
        },
        usedAt: null,
      },
      data: {
        usedAt: new Date(),
      },
    }),
  ]);

  return {
    success: true,
    message:
      "Your password has been reset successfully.",
  };
}
