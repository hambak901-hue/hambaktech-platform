interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No data available",
  description = "Nothing to display.",
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
      <h2 className="mb-2 text-xl font-semibold">
        {title}
      </h2>

      <p className="text-gray-500">
        {description}
      </p>
    </div>
  );
}