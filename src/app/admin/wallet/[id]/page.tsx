import Link from "next/link";

import FundWalletForm from "@/components/wallet/FundWalletForm";
import RefundWalletForm from "@/components/wallet/RefundWalletForm";
import WalletBalanceCard from "@/components/wallet/WalletBalanceCard";
import WalletHistory from "@/components/wallet/WalletHistory";
import { getWalletDetails } from "@/services/wallet.service";
import { notFound } from "next/navigation";

interface WalletDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WalletDetailsPage({
  params,
}: WalletDetailsPageProps) {
  const { id } = await params;

  const wallet = await getWalletDetails(id);

  if (!wallet) {
    notFound();
  }

  const userName = [
    wallet.user.firstName,
    wallet.user.otherName,
    wallet.user.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const transactions =
    wallet.transactions.map((transaction) => ({
      id: transaction.id,
      reference: transaction.reference,
      amount: transaction.amount.toFixed(2),
      type: transaction.type,
      status: transaction.status,
      description: transaction.description,
      createdAt:
        transaction.createdAt.toISOString(),
    }));

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <Link
            href="/admin/wallet"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Wallets
          </Link>

          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Wallet Details
            </h1>

            <p className="mt-2 text-gray-600">
              {userName} · {wallet.user.email}
            </p>
          </div>
        </div>

        <WalletBalanceCard
          balance={wallet.balance.toFixed(2)}
          currency={wallet.currency}
          status={wallet.status}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <FundWalletForm walletId={wallet.id} />

          <RefundWalletForm
            walletId={wallet.id}
          />
        </div>

        <WalletHistory
          transactions={transactions}
          currency={wallet.currency}
        />
      </div>
    </main>
  );
}