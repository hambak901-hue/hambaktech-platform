"use server";

import { createHash, randomBytes } from "crypto";

import { prisma } from "@/lib/prisma";

const RESET_TOKEN_EXPIRY_MINUTES = 30;

export async function forgotPasswordAction(
  formData: FormData,
) {
  const email = String(
    formData.get("email") ?? "",
  )
    .trim()
    .toLowerCase();

  if (!email) {
    throw new Error("Email address is required.");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return {
      success: true,
      message:
        "If an account exists for that email, password reset instructions have been generated.",
    };
  }

  const rawToken = randomBytes(32).toString("hex");

  const tokenHash = createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const expiresAt = new Date(
    Date.now() +
      RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000,
  );

  await prisma.passwordResetToken.updateMany({
    where: {
      userId: user.id,
      usedAt: null,
    },
    data: {
      usedAt: new Date(),
    },
  });

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
    },
  });

  return {
    success: true,
    message:
      "If an account exists for that email, password reset instructions have been generated.",
    resetToken: rawToken,
  };
}
