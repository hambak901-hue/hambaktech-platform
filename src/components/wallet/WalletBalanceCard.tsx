interface WalletBalanceCardProps {
  balance: string;
  currency: string;
  status: string;
}

export default function WalletBalanceCard({
  balance,
  currency,
  status,
}: WalletBalanceCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Wallet Balance
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {currency} {balance}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : status === "SUSPENDED"
                ? "bg-orange-100 text-orange-700"
                : "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
