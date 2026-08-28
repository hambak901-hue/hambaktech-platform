"use server";

import {
  PermissionAction,
  RoleType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { createActivityLog } from "@/services/activity-log.service";
import { createWalletForUser } from "@/services/wallet.service";

export interface CreateWalletState {
  success: boolean;
  message: string;
  walletId?: string;
}

export async function createWallet(
  _previousState: CreateWalletState,
  formData: FormData,
): Promise<CreateWalletState> {
  const session = await requirePermission(
    "Wallet",
    PermissionAction.MANAGE,
  );

  const userId = String(
    formData.get("userId") ?? "",
  ).trim();

  if (!userId) {
    return {
      success: false,
      message: "User is required.",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      role: true,
      wallet: true,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  if (user.role.type === RoleType.SUPER_ADMIN) {
    return {
      success: false,
      message:
        "SUPER_ADMIN users cannot have customer wallets.",
    };
  }

  if (user.status !== "ACTIVE") {
    return {
      success: false,
      message:
        "Only active users are eligible for wallets.",
    };
  }

  if (user.wallet) {
    return {
      success: false,
      message: "This user already has a wallet.",
      walletId: user.wallet.id,
    };
  }

  try {
    const wallet = await createWalletForUser(
      user.id,
    );

    await createActivityLog({
      userId: session.user.id,
      action: "WALLET_CREATE",
      entity: "Wallet",
      entityId: wallet.id,
      description: `Wallet created for ${user.firstName} ${user.lastName}.`,
      metadata: {
        walletId: wallet.id,
        customerId: user.id,
        currency: wallet.currency,
        openingBalance: "0.00",
        status: wallet.status,
      },
    });

    revalidatePath("/admin/wallet");
    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${user.id}`);

    return {
      success: true,
      message: "Wallet created successfully.",
      walletId: wallet.id,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to create wallet.",
    };
  }
}
