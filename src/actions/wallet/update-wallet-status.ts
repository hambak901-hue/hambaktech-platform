"use server";

import {
  PermissionAction,
  WalletStatus,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { createActivityLog } from "@/services/activity-log.service";

export interface UpdateWalletStatusState {
  success: boolean;
  message: string;
}

export async function updateWalletStatus(
  _previousState: UpdateWalletStatusState,
  formData: FormData,
): Promise<UpdateWalletStatusState> {
  const session = await requirePermission(
    "Wallet",
    PermissionAction.MANAGE,
  );

  const walletId = String(
    formData.get("walletId") ?? "",
  ).trim();

  const requestedStatus = String(
    formData.get("status") ?? "",
  ).trim() as WalletStatus;

  const reason = String(
    formData.get("reason") ?? "",
  ).trim();

  if (!walletId) {
    return {
      success: false,
      message: "Wallet ID is required.",
    };
  }

  if (
    !Object.values(WalletStatus).includes(
      requestedStatus,
    )
  ) {
    return {
      success: false,
      message: "Invalid wallet status.",
    };
  }

  if (!reason) {
    return {
      success: false,
      message:
        "A reason is required for wallet status changes.",
    };
  }

  if (reason.length < 5) {
    return {
      success: false,
      message:
        "The reason must contain at least 5 characters.",
    };
  }

  const wallet = await prisma.wallet.findUnique({
    where: {
      id: walletId,
    },
    include: {
      user: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!wallet) {
    return {
      success: false,
      message: "Wallet not found.",
    };
  }

  if (
    wallet.user.role.type ===
    "SUPER_ADMIN"
  ) {
    return {
      success: false,
      message:
        "SUPER_ADMIN wallets are not supported.",
    };
  }

  if (
    wallet.status === requestedStatus
  ) {
    return {
      success: false,
      message: `Wallet is already ${requestedStatus.toLowerCase()}.`,
    };
  }

  if (
    wallet.status === WalletStatus.CLOSED
  ) {
    return {
      success: false,
      message:
        "Closed wallets cannot be changed through this operation.",
    };
  }

  if (
    requestedStatus === WalletStatus.CLOSED &&
    wallet.balance.gt(0)
  ) {
    return {
      success: false,
      message:
        "A wallet must have a zero balance before it can be closed.",
    };
  }

 await prisma.wallet.update({
    where: {
        id: wallet.id,
    },
    data: {
        status: requestedStatus,
    },
  });

  await createActivityLog({
    userId: session.user.id,
    action: "WALLET_STATUS_CHANGE",
    entity: "Wallet",
    entityId: wallet.id,
    description: `Wallet status changed from ${wallet.status} to ${requestedStatus}.`,
    metadata: {
      walletId: wallet.id,
      userId: wallet.userId,
      previousStatus: wallet.status,
      newStatus: requestedStatus,
      reason,
    },
  });

  revalidatePath("/admin/wallet");
  revalidatePath(`/admin/wallet/${wallet.id}`);
  revalidatePath("/admin/users");

  return {
    success: true,
    message: `Wallet ${requestedStatus.toLowerCase()} successfully.`,
  };
}