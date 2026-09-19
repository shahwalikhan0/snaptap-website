"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { Button, Card } from "@/app/app/components/ui";
import { formatCurrency } from "@/app/utils/currency";
import { PlanType } from "../../types/plan";
import { subscribe } from "../services/subscriptionApi";
import { createSetupSession } from "../services/paymentApi";
import type { SubscriptionState } from "../services/subscriptionApi";

interface Props {
  plans: PlanType[];
  subscription: SubscriptionState;
  hasCard: boolean;
  onSubscribed: () => void;
}

/**
 * Turning a trial into a paid subscription.
 *
 * This is the only route out of a trial, so it has to be legible about two
 * things the brand cannot otherwise know: that they are charged *now* rather
 * than at the end of the month, and what the money buys.
 */
export default function SubscribeCheckout({
  plans,
  subscription,
  hasCard,
  onSubscribed,
}: Props) {
  const [planId, setPlanId] = useState<number>(subscription.plan_id ?? plans[0]?.id ?? 1);
  const [interval, setInterval] = useState<"monthly" | "annual">("monthly");
  const [busy, setBusy] = useState(false);

  const selected = plans.find((p) => p.id === planId);
  const price = selected
    ? interval === "annual"
      ? Number(selected.yearly_price)
      : Number(selected.monthly_price)
    : 0;

  // Only worth showing when it is actually a saving. yearly_price is a list
  // price in its own right, not 12x monthly, so this can legitimately be zero
  // — and claiming a discount that is not there would be worse than silence.
  const annualSaving = selected
    ? Number(selected.monthly_price) * 12 - Number(selected.yearly_price)
    : 0;

  const addCard = async () => {
    setBusy(true);
    try {
      const url = await createSetupSession();
      if (!url) throw new Error("no checkout url");
      window.location.href = url;
    } catch {
      toast.error("Could not start card setup. Please try again.");
      setBusy(false);
    }
  };

  const confirm = async () => {
    if (!selected) return;
    setBusy(true);
    const { data, error } = await subscribe({
      packageId: selected.id,
      totalScans: selected.is_custom ? selected.scans : undefined,
      interval,
    });
    setBusy(false);

    if (error) {
      // A missing card and a refused card need different next actions —
      // sending someone back to re-enter the card that just declined is the
      // one thing guaranteed not to work.
      if (error.needsCard) {
        toast.info("Add a payment method first.");
        return;
      }
      toast.error(error.message);
      return;
    }

    toast.success(
      `You're on ${data?.plan}. Charged ${formatCurrency(data?.amount ?? 0)} through ${data?.period_end}.`,
    );
    onSubscribed();
  };

  return (
    <Card variant="elevated" padding="lg" className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Choose your plan</h2>
        <p className="text-sm text-slate-500 mt-1">
          You&apos;re charged today for the month ahead. Views beyond your
          plan&apos;s included allowance are added to your next charge.
        </p>
      </div>

      {/* Billing interval */}
      <div className="inline-flex rounded-brand border border-slate-200 p-1 bg-slate-50">
        {(["monthly", "annual"] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setInterval(opt)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-brand transition ${
              interval === opt
                ? "bg-white text-snaptap-blue-dark shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {opt === "monthly" ? "Monthly" : "Annual"}
            {opt === "annual" && annualSaving > 0 && (
              <span className="ml-2 text-xs text-emerald-600">
                save {formatCurrency(annualSaving)}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plans.map((p) => {
          const active = p.id === planId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlanId(p.id)}
              className={`text-left rounded-brand border p-4 transition ${
                active
                  ? "border-transparent ring-2 ring-snaptap-blue-dark bg-white"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{p.name}</span>
                {active && (
                  <Icon icon="mdi:check-circle" className="text-snaptap-blue-dark" width={18} />
                )}
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-900">
                {formatCurrency(
                  interval === "annual" ? Number(p.yearly_price) : Number(p.monthly_price),
                )}
                <span className="text-sm font-normal text-slate-500">
                  /{interval === "annual" ? "yr" : "mo"}
                </span>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                <li>{p.scans} products</li>
                {typeof p.included_views === "number" && (
                  <li>{p.included_views.toLocaleString()} views included / month</li>
                )}
                {p.per_view_rate != null && (
                  <li className="text-slate-400">
                    then {formatCurrency(Number(p.per_view_rate))} per view
                  </li>
                )}
              </ul>
            </button>
          );
        })}
      </div>

      {/* Confirm */}
      <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Due today</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(price)}</p>
          <p className="text-xs text-slate-400 mt-0.5">
            {interval === "annual"
              ? "Covers 12 months. Usage is still billed monthly."
              : "Covers one month, renewing on the same day each month."}
          </p>
        </div>

        {hasCard ? (
          <Button onClick={confirm} loading={busy} disabled={!selected}>
            Subscribe &amp; pay {formatCurrency(price)}
          </Button>
        ) : (
          <div className="text-right">
            <Button onClick={addCard} loading={busy}>
              Add a payment method
            </Button>
            <p className="text-xs text-slate-400 mt-2">
              No card is on file yet — we&apos;ll bring you back here after.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
