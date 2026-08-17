"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function UserSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.push(`/admin/users?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-md gap-2"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search name, email or phone..."
        className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}