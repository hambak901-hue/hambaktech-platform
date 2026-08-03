import Link from "next/link";

export default function UserNotFound() {
  return (
    <div className="rounded-xl border bg-white p-12 text-center shadow-sm">

      <h1 className="text-3xl font-bold">
        User Not Found
      </h1>

      <p className="mt-4 text-gray-600">
        The requested user does not exist or may have been deleted.
      </p>

      <Link
        href="/admin/users"
        className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white"
      >
        Back to Users
      </Link>

    </div>
  );
}