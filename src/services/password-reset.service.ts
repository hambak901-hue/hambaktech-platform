import { createHash, randomBytes } from "crypto";

import { prisma } from "@/lib/prisma";

const RESET_TOKEN_EXPIRY_MINUTES = 30;

function hashToken(token: string) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

export async function createPasswordResetToken(
  userId: string,
) {
  await prisma.passwordResetToken.deleteMany({
    where: {
      userId,
      OR: [
        {
          usedAt: {
            not: null,
          },
        },
        {
          expiresAt: {
            lt: new Date(),
          },
        },
      ],
    },
  });

  const rawToken = randomBytes(32).toString("hex");

  const tokenHash = hashToken(rawToken);

  const expiresAt = new Date(
    Date.now() +
      RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000,
  );

  await prisma.passwordResetToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  return {
    token: rawToken,
    expiresAt,
  };
}

export async function getPasswordResetToken(
  token: string,
) {
  if (!token) {
    return null;
  }

  const tokenHash = hashToken(token);

  const resetToken =
    await prisma.passwordResetToken.findUnique({
      where: {
        tokenHash,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            status: true,
          },
        },
      },
    });

  if (!resetToken) {
    return null;
  }

  if (resetToken.usedAt) {
    return null;
  }

  if (resetToken.expiresAt <= new Date()) {
    return null;
  }

  return resetToken;
}

export async function consumePasswordResetToken(
  token: string,
) {
  const resetToken =
    await getPasswordResetToken(token);

  if (!resetToken) {
    throw new Error(
      "This password reset link is invalid or has expired.",
    );
  }

  return resetToken;
}
