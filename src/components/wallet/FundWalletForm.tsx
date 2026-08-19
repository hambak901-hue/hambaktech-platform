"use client";

import { useRef, useState, useTransition } from "react";
import { fundWallet } from "@/actions/wallet/fund-wallet";

interface FundWalletFormProps {
  walletId: string;
}

export default function FundWalletForm({
  walletId,
}: FundWalletFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] =
    useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const formData = new FormData(
      event.currentTarget,
    );

    startTransition(async () => {
      try {
        const result = await fundWallet(formData);

        setSuccess(
          `Wallet funded successfully. Reference: ${result.reference}`,
        );

        formRef.current?.reset();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to fund wallet.",
        );
      }
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-white p-6 shadow-sm"
    >
      <input
        type="hidden"
        name="walletId"
        value={walletId}
      />

      <h2 className="text-lg font-semibold text-gray-900">
        Fund Wallet
      </h2>

      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Amount
          </label>

          <input
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            required
            disabled={isPending}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            name="description"
            rows={3}
            disabled={isPending}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            placeholder="Reason for funding"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? "Processing..."
            : "Fund Wallet"}
        </button>
      </div>
    </form>
  );
}
