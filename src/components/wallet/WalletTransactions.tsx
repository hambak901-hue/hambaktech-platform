interface WalletTransaction {
  id: string;
  reference: string;
  amount: string;
  type: string;
  status: string;
  description: string | null;
  createdAt: string;
}

interface WalletTransactionsProps {
  transactions: WalletTransaction[];
  currency: string;
}

export default function WalletTransactions({
  transactions,
  currency,
}: WalletTransactionsProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center">
        <h3 className="font-semibold text-gray-900">
          No transactions yet
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Wallet transactions will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="font-semibold text-gray-900">
          Recent Transactions
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Reference
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Type
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Amount
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Status
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {transaction.reference}
                </td>

                <td className="px-6 py-4 text-sm">
                  <span
                    className={
                      transaction.type === "CREDIT"
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-600"
                    }
                  >
                    {transaction.type}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {currency} {transaction.amount}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {transaction.status}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(
                    transaction.createdAt,
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}