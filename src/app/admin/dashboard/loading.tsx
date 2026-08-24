function Skeleton({
  className,
}: {
  className: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-slate-200 ${className}`}
    />
  );
}

export default function Loading() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-9 w-72" />
        <Skeleton className="mt-3 h-5 w-56" />
        <Skeleton className="mt-2 h-4 w-24" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-32 w-full"
          />
        ))}
      </div>

      <Skeleton className="h-72 w-full" />
    </div>
  );
}