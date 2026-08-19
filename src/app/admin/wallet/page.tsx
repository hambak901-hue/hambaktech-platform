import WalletCard from "@/components/wallet/WalletCard";
import {
  getWalletStatistics,
  getWallets,
} from "@/services/wallet.service";

export default async function AdminWalletPage() {
  const [result, statistics] =
    await Promise.all([
      getWallets({
        page: 1,
        limit: 20,
      }),
      getWalletStatistics(),
    ]);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Wallet Management
          </h1>

          <p className="mt-2 text-gray-600">
            Manage customer wallets and wallet
            transactions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Wallets
            </p>
            <p className="mt-2 text-2xl font-bold">
              {statistics.totalWallets}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Active Wallets
            </p>
            <p className="mt-2 text-2xl font-bold text-green-600">
              {statistics.activeWallets}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Suspended Wallets
            </p>
            <p className="mt-2 text-2xl font-bold text-orange-600">
              {statistics.suspendedWallets}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Active Balance
            </p>
            <p className="mt-2 text-2xl font-bold text-blue-600">
              NGN{" "}
              {statistics.totalBalance.toFixed(2)}
            </p>
          </div>
        </div>

        {result.wallets.length === 0 ? (
          <div className="rounded-2xl border bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              No wallets found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Wallets will appear here once they are
              created for users.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {result.wallets.map((wallet) => (
              <WalletCard
                key={wallet.id}
                id={wallet.id}
                balance={wallet.balance.toFixed(2)}
                currency={wallet.currency}
                status={wallet.status}
                userName={[
                  wallet.user.firstName,
                  wallet.user.otherName,
                  wallet.user.lastName,
                ]
                  .filter(Boolean)
                  .join(" ")}
                email={wallet.user.email}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
