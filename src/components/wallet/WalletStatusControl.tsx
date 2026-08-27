"use client";

import { useState, useTransition } from "react";

import {
  updateWalletStatus,
  type UpdateWalletStatusState,
} from "@/actions/wallet/update-wallet-status";

interface WalletStatusControlProps {
  walletId: string;
  status: "ACTIVE" | "SUSPENDED" | "CLOSED";
  balance: string;
}

const initialState: UpdateWalletStatusState = {
  success: false,
  message: "",
};

export default function WalletStatusControl({
  walletId,
  status,
  balance,
}: WalletStatusControlProps) {
  const [isPending, startTransition] =
    useTransition();

  const [state, setState] =
    useState<UpdateWalletStatusState>(
      initialState,
    );

  const [reason, setReason] = useState("");

  const canSuspend =
    status === "ACTIVE";

  const canReactivate =
    status === "SUSPENDED";

  const canClose =
    status !== "CLOSED" &&
    Number(balance) === 0;

  function submitStatusChange(
    nextStatus:
      | "ACTIVE"
      | "SUSPENDED"
      | "CLOSED",
  ) {
    const trimmedReason =
      reason.trim();

    if (!trimmedReason) {
      setState({
        success: false,
        message:
          "Please provide a reason for this wallet status change.",
      });

      return;
    }

    if (trimmedReason.length < 5) {
      setState({
        success: false,
        message:
          "The reason must contain at least 5 characters.",
      });

      return;
    }

    const actionLabel =
      nextStatus === "SUSPENDED"
        ? "suspend"
        : nextStatus === "ACTIVE"
          ? "reactivate"
          : "close";

    const confirmed =
      window.confirm(
        `Are you sure you want to ${actionLabel} this wallet?\n\nReason: ${trimmedReason}`,
      );

    if (!confirmed) {
      return;
    }

    const formData = new FormData();

    formData.append(
      "walletId",
      walletId,
    );

    formData.append(
      "status",
      nextStatus,
    );

    formData.append(
      "reason",
      trimmedReason,
    );

    setState(initialState);

    startTransition(async () => {
      try {
        const result =
          await updateWalletStatus(
            initialState,
            formData,
          );

        setState(result);

        if (result.success) {
          setReason("");
        }
      } catch (error) {
        setState({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Unable to update wallet status.",
        });
      }
    });
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Wallet Administration
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage the operational status of this
          wallet. Status changes are recorded in
          the administrative activity log.
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Current status
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              {status}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Current balance
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              NGN {balance}
            </p>
          </div>
        </div>
      </div>

      {status !== "CLOSED" && (
        <div className="mt-5">
          <label
            htmlFor="wallet-status-reason"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Reason for administrative action
          </label>

          <textarea
            id="wallet-status-reason"
            value={reason}
            onChange={(event) =>
              setReason(event.target.value)
            }
            disabled={isPending}
            rows={4}
            maxLength={500}
            placeholder="Enter the reason for this wallet status change..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          <p className="mt-1 text-right text-xs text-slate-400">
            {reason.length}/500
          </p>
        </div>
      )}

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

      {status !== "CLOSED" && (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {canSuspend && (
            <button
              type="button"
              onClick={() =>
                submitStatusChange(
                  "SUSPENDED",
                )
              }
              disabled={isPending}
              className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? "Processing..."
                : "Suspend Wallet"}
            </button>
          )}

          {canReactivate && (
            <button
              type="button"
              onClick={() =>
                submitStatusChange(
                  "ACTIVE",
                )
              }
              disabled={isPending}
              className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? "Processing..."
                : "Reactivate Wallet"}
            </button>
          )}

          {canClose && (
            <button
              type="button"
              onClick={() =>
                submitStatusChange(
                  "CLOSED",
                )
              }
              disabled={isPending}
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? "Processing..."
                : "Close Wallet"}
            </button>
          )}
        </div>
      )}

      {status !== "CLOSED" &&
        !canClose &&
        Number(balance) > 0 && (
          <p className="mt-4 text-sm text-slate-500">
            This wallet cannot be closed while it
            has a positive balance. Resolve the
            remaining balance first.
          </p>
        )}

      {status === "CLOSED" && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">
            This wallet is closed.
          </p>

          <p className="mt-1 text-sm text-red-700">
            Normal wallet operations are no longer
            available for this wallet.
          </p>
        </div>
      )}
    </section>
  );
}