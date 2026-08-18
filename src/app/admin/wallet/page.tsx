export default function AdminWalletPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Wallet Management
            </h1>

            <p className="text-gray-600">
              Manage customer wallets and wallet transactions.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-dashed p-8 text-center">
            <p className="font-medium text-gray-700">
              Wallet module
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Wallet balances, transactions, funding, refunds,
              and wallet administration will be implemented
              in the Wallet milestone.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}