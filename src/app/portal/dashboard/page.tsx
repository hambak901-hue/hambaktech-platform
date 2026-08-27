import Link from "next/link";

import { auth } from "@/auth";
import { getPortalDashboardData } from "@/services/portal-dashboard.service";

function formatCurrency(
  amount: number | string,
  currency: string,
) {
  return `${currency} ${Number(amount).toLocaleString(
    "en-NG",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  )}`;
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString(
    "en-NG",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );
}

function getStatusClass(status: string) {
  switch (status) {
    case "SUCCESS":
    case "PAID":
    case "COMPLETED":
    case "ACTIVE":
      return "bg-green-100 text-green-700";

    case "PENDING":
    case "PROCESSING":
      return "bg-yellow-100 text-yellow-700";

    case "FAILED":
    case "CANCELLED":
    case "REVERSED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default async function PortalDashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">
            Authentication required
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please sign in to access your dashboard.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  const data = await getPortalDashboardData(
    session.user.id,
  );

  const userName = [
    data.user?.firstName,
    data.user?.otherName,
    data.user?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const walletBalance = data.wallet
    ? formatCurrency(
        data.wallet.balance.toString(),
        data.wallet.currency,
      )
    : "NGN 0.00";

  return (
    <main className="space-y-8">
      {/* Welcome */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white shadow-sm sm:p-8">
        <p className="text-sm font-medium text-blue-100">
          Customer Portal
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Welcome back
          {userName ? `, ${userName}` : ""}.
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
          Manage your wallet, services, orders, Academy
          activities, and account from one place.
        </p>
      </section>

      {/* Overview */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/portal/wallet"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Wallet Balance
              </p>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {walletBalance}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
              ₦
            </div>
          </div>

          <p className="mt-4 text-sm font-medium text-blue-600">
            Manage wallet →
          </p>
        </Link>

        <Link
          href="/portal/history"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Recent Transactions
              </p>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {data.recentTransactions.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
              ↕
            </div>
          </div>

          <p className="mt-4 text-sm font-medium text-blue-600">
            View history →
          </p>
        </Link>

        <Link
          href="/portal/services"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Services
              </p>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {data.activeServiceRequests.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl">
              ⚙
            </div>
          </div>

          <p className="mt-4 text-sm font-medium text-blue-600">
            View services →
          </p>
        </Link>

        <Link
          href="/portal/academy"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Academy Courses
              </p>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {data.student?.enrollments.length ?? 0}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl">
              🎓
            </div>
          </div>

          <p className="mt-4 text-sm font-medium text-blue-600">
            Open Academy →
          </p>
        </Link>
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quickly access your most-used services.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/portal/wallet"
            className="rounded-xl border bg-white p-5 font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            Fund Wallet
            <p className="mt-1 text-xs font-normal text-slate-500">
              Add money to your wallet.
            </p>
          </Link>

          <Link
            href="/portal/services"
            className="rounded-xl border bg-white p-5 font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            Browse Services
            <p className="mt-1 text-xs font-normal text-slate-500">
              Explore available services.
            </p>
          </Link>

          <Link
            href="/portal/academy"
            className="rounded-xl border bg-white p-5 font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            Academy
            <p className="mt-1 text-xs font-normal text-slate-500">
              Continue your learning.
            </p>
          </Link>

          <Link
            href="/portal/nin"
            className="rounded-xl border bg-white p-5 font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            NIN Centre
            <p className="mt-1 text-xs font-normal text-slate-500">
              Access NIN services.
            </p>
          </Link>
        </div>
      </section>

      {/* Recent transactions + orders */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-6 py-5">
            <div>
              <h2 className="font-bold text-slate-900">
                Recent Transactions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest wallet activity.
              </p>
            </div>

            <Link
              href="/portal/wallet"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all
            </Link>
          </div>

          {data.recentTransactions.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="font-medium text-slate-700">
                No transactions yet
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Your wallet transactions will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {data.recentTransactions.map(
                (transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between gap-4 px-6 py-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {transaction.description ||
                          transaction.reference}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {formatDate(
                          transaction.createdAt,
                        )}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${
                          transaction.type === "CREDIT"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "CREDIT"
                          ? "+"
                          : "-"}
                        {formatCurrency(
                          transaction.amount.toString(),
                          data.wallet?.currency ||
                            "NGN",
                        )}
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${getStatusClass(
                          transaction.status,
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-6 py-5">
            <div>
              <h2 className="font-bold text-slate-900">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest service orders.
              </p>
            </div>

            <Link
              href="/portal/history"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all
            </Link>
          </div>

          {data.recentOrders.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="font-medium text-slate-700">
                No orders yet
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Orders you place will appear here.
              </p>

              <Link
                href="/portal/services"
                className="mt-4 inline-flex text-sm font-semibold text-blue-600"
              >
                Browse services →
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {data.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {order.items[0]?.service.name ||
                        "Service Order"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {order.reference} ·{" "}
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">
                      {formatCurrency(
                        order.totalAmount.toString(),
                        data.wallet?.currency ||
                          "NGN",
                      )}
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${getStatusClass(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Academy + service requests */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Academy
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your current learning activity.
              </p>
            </div>

            <Link
              href="/portal/academy"
              className="text-sm font-semibold text-blue-600"
            >
              Open
            </Link>
          </div>

          {!data.student ? (
            <div className="mt-6 rounded-xl bg-slate-50 p-5 text-center">
              <p className="font-medium text-slate-700">
                No Academy profile yet
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Your Academy information will appear here
                when your student profile is created.
              </p>
            </div>
          ) : data.student.enrollments.length ===
            0 ? (
            <div className="mt-6 rounded-xl bg-slate-50 p-5 text-center">
              <p className="font-medium text-slate-700">
                No active courses
              </p>

              <p className="mt-1 text-sm text-slate-500">
                You are not currently enrolled in a course.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {data.student.enrollments.map(
                (enrollment) => (
                  <div
                    key={enrollment.id}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold text-slate-900">
                        {enrollment.course.title}
                      </p>

                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusClass(
                          enrollment.status,
                        )}`}
                      >
                        {enrollment.status}
                      </span>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Active Service Requests
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Services currently being processed.
              </p>
            </div>

            <Link
              href="/portal/history"
              className="text-sm font-semibold text-blue-600"
            >
              View all
            </Link>
          </div>

          {data.activeServiceRequests.length ===
          0 ? (
            <div className="mt-6 rounded-xl bg-slate-50 p-5 text-center">
              <p className="font-medium text-slate-700">
                No active requests
              </p>

              <p className="mt-1 text-sm text-slate-500">
                New service requests will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {data.activeServiceRequests.map(
                (request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {request.service.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {formatDate(request.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusClass(
                        request.status,
                      )}`}
                    >
                      {request.status}
                    </span>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
