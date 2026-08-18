export default function WalletLoading() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 rounded bg-gray-200" />
            <div className="h-4 w-96 max-w-full rounded bg-gray-200" />

            <div className="rounded-xl border p-8">
              <div className="h-5 w-40 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-full rounded bg-gray-200" />
              <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}