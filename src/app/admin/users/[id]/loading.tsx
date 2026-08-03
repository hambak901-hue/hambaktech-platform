export default function Loading() {
  return (
    <div className="space-y-6">

      <div className="h-10 w-72 animate-pulse rounded bg-gray-200" />

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <div className="h-[450px] animate-pulse rounded-xl bg-gray-200" />
        </div>

        <div>
          <div className="h-[450px] animate-pulse rounded-xl bg-gray-200" />
        </div>

      </div>

    </div>
  );
}