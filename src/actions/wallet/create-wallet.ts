"use server";

import {
  PermissionAction,
  WalletStatus,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { createActivityLog } from "@/services/activity-log.service";

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

  if (user.role.type === "SUPER_ADMIN") {
    return {
      success: false,
      message:
        "SUPER_ADMIN users cannot have customer wallets.",
    };
  }

  if (user.wallet) {
    return {
      success: false,
      message: "This user already has a wallet.",
      walletId: user.wallet.id,
    };
  }

  const wallet = await prisma.wallet.create({
    data: {
      userId: user.id,
      balance: 0,
      currency: "NGN",
      status: WalletStatus.ACTIVE,
    },
  });

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
}