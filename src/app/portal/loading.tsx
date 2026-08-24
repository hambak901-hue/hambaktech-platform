export default function PortalLoading() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl animate-pulse space-y-6">
        <div>
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-72 rounded bg-gray-200" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-36 rounded-2xl bg-white shadow-sm"
            />
          ))}
        </div>

        <div className="h-40 rounded-2xl bg-white shadow-sm" />
      </div>
    </main>
  );
}