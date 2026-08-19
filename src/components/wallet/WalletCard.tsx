import Link from "next/link";

interface WalletCardProps {
  id: string;
  balance: string;
  currency: string;
  status: string;
  userName: string;
  email: string;
}

export default function WalletCard({
  id,
  balance,
  currency,
  status,
  userName,
  email,
}: WalletCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {userName}
          </h2>

          <p className="text-sm text-gray-500">
            {email}
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
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

      <div className="mt-6">
        <p className="text-sm text-gray-500">
          Balance
        </p>

        <p className="mt-1 text-2xl font-bold text-gray-900">
          {currency} {balance}
        </p>
      </div>

      <div className="mt-6">
        <Link
          href={`/admin/wallet/${id}`}
          className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View Wallet
        </Link>
      </div>
    </div>
  );
}
