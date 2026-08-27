"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  createWallet,
  type CreateWalletState,
} from "@/actions/wallet/create-wallet";

interface CreateWalletFormProps {
  userId: string;
  userName: string;
}

const initialState: CreateWalletState = {
  success: false,
  message: "",
};

export default function CreateWalletForm({
  userId,
  userName,
}: CreateWalletFormProps) {
  const router = useRouter();

  const [state, formAction, isPending] =
    useActionState(
      createWallet,
      initialState,
    );

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <input
        type="hidden"
        name="userId"
        value={userId}
      />

      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Create Wallet
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Create an active NGN wallet for this
          customer.
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Customer
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-900">
          {userName}
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm font-medium text-blue-900">
          Wallet configuration
        </p>

        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-blue-700">
              Currency
            </dt>

            <dd className="font-semibold text-blue-900">
              NGN
            </dd>
          </div>

          <div className="flex justify-between gap-4">
            <dt className="text-blue-700">
              Opening balance
            </dt>

            <dd className="font-semibold text-blue-900">
              NGN 0.00
            </dd>
          </div>

          <div className="flex justify-between gap-4">
            <dt className="text-blue-700">
              Initial status
            </dt>

            <dd className="font-semibold text-green-700">
              ACTIVE
            </dd>
          </div>
        </dl>
      </div>

      {state.message && (
        <div
          role="alert"
          className={`mt-4 rounded-xl px-4 py-3 text-sm ${
            state.success
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || state.success}
        className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? "Creating Wallet..."
          : state.success
            ? "Wallet Created"
            : "Create Wallet"}
      </button>
    </form>
  );
}