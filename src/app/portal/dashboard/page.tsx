import Link from "next/link";

export default function PortalDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome to your HambakTech portal.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/portal/wallet"
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Wallet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              View your wallet balance and transactions.
            </p>
          </Link>

          <Link
            href="/portal/services"
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Services
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Browse and access available services.
            </p>
          </Link>

          <Link
            href="/portal/academy"
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Academy
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Access your Academy activities.
            </p>
          </Link>

          <Link
            href="/portal/history"
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              History
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              View your account activity and history.
            </p>
          </Link>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Your HambakTech Portal
          </h2>

          <p className="mt-2 text-gray-600">
            Your personal services, wallet, Academy,
            NIN Centre, history, and account settings
            will be available here.
          </p>
        </div>
      </div>
    </main>
  );
}