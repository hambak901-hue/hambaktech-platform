"use server";

import {
  PermissionAction,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

import { requirePermission } from "@/lib/permissions";
import { createActivityLog } from "@/services/activity-log.service";
import {
  refundWallet as refundWalletService,
} from "@/services/wallet.service";

export async function refundWallet(
  formData: FormData,
) {
  const session = await requirePermission(
    "Wallet",
    PermissionAction.MANAGE,
  );

  const walletId = String(
    formData.get("walletId") ?? "",
  ).trim();

  const amount = String(
    formData.get("amount") ?? "",
  ).trim();

  const description = String(
    formData.get("description") ?? "",
  ).trim();

  if (!walletId) {
    throw new Error("Wallet ID is required.");
  }

  if (!amount) {
    throw new Error("Amount is required.");
  }

  const result = await refundWalletService({
    walletId,
    amount,
    description: description || undefined,
  });

  await createActivityLog({
    userId: session.user.id,
    action: "WALLET_REFUND",
    entity: "Wallet",
    entityId: walletId,
    description: `Wallet refund processed for ${amount}.`,
    metadata: {
      transactionId: result.transaction.id,
      reference: result.transaction.reference,
      amount,
    },
  });

  revalidatePath("/admin/wallet");
  revalidatePath(`/admin/wallet/${walletId}`);
  revalidatePath("/admin/users");

  return {
    success: true,
    reference: result.transaction.reference,
  };
}
