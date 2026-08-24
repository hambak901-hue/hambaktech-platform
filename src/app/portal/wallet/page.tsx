import Link from "next/link";

export default function PortalWalletPage() {
  return (
    <main className="mx-auto max-w-7xl">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Wallet
            </h1>

            <p className="mt-2 text-gray-600">
              View your wallet balance and transactions.
            </p>
          </div>

          <Link
            href="/portal/dashboard"
            className="inline-flex w-fit rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="mt-8 rounded-xl bg-gray-50 p-6">
          <p className="text-sm font-medium text-gray-500">
            Current Balance
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            NGN 0.00
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Your wallet balance and transaction history will
            appear here.
          </p>
        </div>

        <div className="mt-6 rounded-xl border p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Transactions
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            No wallet transactions yet.
          </p>
        </div>
      </div>
    </main>
  );
}