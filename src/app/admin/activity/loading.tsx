export default function Loading() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

        <div className="mt-4 h-9 w-64 animate-pulse rounded bg-slate-200" />

        <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-slate-200" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex gap-4 border-b border-slate-100 p-6 last:border-b-0"
          >
            <div className="h-3 w-3 animate-pulse rounded-full bg-slate-200" />

            <div className="flex-1 space-y-3">
              <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}