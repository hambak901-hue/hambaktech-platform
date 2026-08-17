interface ErrorStateProps {
  title?: string;
  message?: string;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "Please try again later.",
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
      <h2 className="mb-2 text-2xl font-bold text-red-600">
        {title}
      </h2>

      <p className="text-gray-600">
        {message}
      </p>
    </div>
  );
}