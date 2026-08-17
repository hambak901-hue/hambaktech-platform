"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function GlobalError() {
  return (
    <ErrorState
      title="Application Error"
      message="An unexpected error occurred."
    />
  );
}