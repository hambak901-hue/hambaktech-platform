"use server";

import { auth } from "@/auth";
import { createActivityLog } from "@/services/activity-log.service";
import { fundWallet as fundWalletService } from "@/services/wallet.service";
import { revalidatePath } from "next/cache";

export async function fundWallet(formData: FormData) {
  const session = await auth();

  console.log("========== WALLET FUND SESSION ==========");
  console.log(
    JSON.stringify(
      {
        authenticated: Boolean(session?.user),
        userId: session?.user?.id ?? null,
        email: session?.user?.email ?? null,
        role: session?.user?.role ?? null,
        user: session?.user ?? null,
      },
      null,
      2
    )
  );
  console.log("=========================================");

  if (
    !session?.user ||
    !["SUPER_ADMIN", "ADMIN"].includes(
      session.user.role,
    )
  ) {
    throw new Error("Unauthorized.");
  }

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

  const result = await fundWalletService({
    walletId,
    amount,
    description: description || undefined,
  });

  await createActivityLog({
    userId: session.user.id,
    action: "WALLET_FUND",
    entity: "Wallet",
    entityId: walletId,
    description: `Wallet funded with ${amount}.`,
    metadata: {
      transactionId: result.transaction.id,
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