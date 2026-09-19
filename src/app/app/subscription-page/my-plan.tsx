"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Progress } from "antd";
import dayjs from "dayjs";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { Icon } from "@iconify/react";
import { formatCurrency } from "@/app/utils/currency";
import { BRAND, SURFACE } from "@/app/utils/tokens";
import { Badge, Card } from "@/app/app/components/ui";
import { PlanType } from "../types/plan";
import { fetchAllPlans } from "../pricing/services/pricingApi";
import { fetchSubscription, type SubscriptionState } from "./services/subscriptionApi";
import { fetchPaymentMethod } from "./services/paymentApi";
import SubscriptionStatusBanner from "./components/SubscriptionStatusBanner";
import SubscribeCheckout from "./components/SubscribeCheckout";

interface MyPlanProps {
  onNavigate?: (page: string) => void;
}

/** Statuses where the brand has no paid period and needs to start one. */
const NEEDS_SUBSCRIPTION = ["trialing", "trial_expired", "pending_activation", "trial"];

export default function MyPlan({ onNavigate }: MyPlanProps) {
  const { Brand } = useAdmin();
  const [sub, setSub] = useState<SubscriptionState | null>(null);
  const [plans, setPlans] = useState<PlanType[]>([]);
  const [hasCard, setHasCard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  const load = useCallback(async () => {
    try {
      const [s, p, card] = await Promise.all([
        fetchSubscription(),
        fetchAllPlans().catch(() => [] as PlanType[]),
        fetchPaymentMethod().catch(() => null),
      ]);
      setSub(s);
      setPlans(p);
      setHasCard(Boolean(card && card.status === "active"));
    } catch (err: unknown) {
      console.log("Failed to load subscription", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return <div className="text-slate-400 p-6">Loading your subscription…</div>;
  }

  if (!Brand || !sub) {
    return (
      <div className="bg-red-50 p-6 rounded-brand border border-red-100 flex items-center gap-4 text-red-600">
        <Icon icon="mdi:alert-circle-outline" width={24} />
        <p className="font-semibold">
          Subscription data not found. Please refresh the page.
        </p>
      </div>
    );
  }

  const needsSubscription = NEEDS_SUBSCRIPTION.includes(sub.status);
  const inventoryUsed = sub.products_used;
  const inventoryPct =
    sub.total_scans > 0 ? Math.round((inventoryUsed / sub.total_scans) * 100) : 0;

  // Views are a monthly budget; inventory is a standing capacity. They behave
  // oppositely and are shown separately so nobody reads one as the other.
  const viewPct =
    sub.views_included > 0
      ? Math.min(100, Math.round((sub.views_this_month / sub.views_included) * 100))
      : 0;
  const overAllowance = sub.views_billable > 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Current Subscription
        </h1>
        <p className="text-slate-500">
          Overview of your plan, usage, and what you&apos;ll be charged next.
        </p>
      </div>

      <SubscriptionStatusBanner
        subscription={sub}
        onAction={() =>
          needsSubscription ? setShowCheckout(true) : onNavigate?.("billing-history")
        }
      />

      {(showCheckout || (needsSubscription && sub.status !== "trialing")) &&
        plans.length > 0 && (
          <SubscribeCheckout
            plans={plans}
            subscription={sub}
            hasCard={hasCard}
            onSubscribed={() => {
              setShowCheckout(false);
              void load();
            }}
          />
        )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Plan + next charge */}
        <Card variant="elevated" padding="none" className="md:col-span-2 overflow-hidden">
          <div className="bg-snaptap-blue-dark p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <span className="inline-flex items-center rounded-brand bg-white/15 px-2.5 py-0.5 text-xs font-semibold mb-3">
                  {sub.status === "trialing"
                    ? "Free trial"
                    : needsSubscription
                      ? "No active plan"
                      : sub.interval === "annual"
                        ? "Annual plan"
                        : "Monthly plan"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {sub.plan || Brand.package_name || "—"}
                </h2>
              </div>
              <div className="sm:text-right">
                {/* Under prepaid the plan fee for THIS period is already paid.
                    Presenting it as an amount due is how the old estimate
                    double-counted it — once when charged, again every time
                    this screen was opened. */}
                <p className="text-sm text-white/70">
                  {needsSubscription ? "Nothing due" : "Next charge"}
                </p>
                <p className="text-2xl sm:text-3xl font-bold mt-0.5">
                  {needsSubscription
                    ? "—"
                    : formatCurrency(sub.base_amount_paid + sub.usage_accrued)}
                </p>
                {!needsSubscription && sub.next_charge_on && (
                  <p className="text-xs text-white/60 mt-1">
                    on {dayjs(sub.next_charge_on).format("MMM D, YYYY")}
                  </p>
                )}
              </div>
            </div>
          </div>

          <dl className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <dt className="text-sm text-slate-500 mb-1.5">Status</dt>
              <dd>
                <Badge
                  tone={
                    sub.status === "active" || sub.status === "trialing"
                      ? "success"
                      : "neutral"
                  }
                >
                  {sub.status === "trialing"
                    ? "Trialing"
                    : sub.status === "trial_expired"
                      ? "Trial ended"
                      : sub.status === "pending_activation"
                        ? "Card declined"
                        : sub.status.replace(/_/g, " ")}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500 mb-1.5">
                {sub.status === "trialing" ? "Trial ends" : "Current period"}
              </dt>
              <dd className="font-semibold text-slate-900">
                {sub.status === "trialing"
                  ? sub.trial_ends_at
                    ? dayjs(sub.trial_ends_at).format("MMM D, YYYY")
                    : "—"
                  : sub.period_start && sub.period_end
                    ? `${dayjs(sub.period_start).format("MMM D")} – ${dayjs(sub.period_end).format("MMM D, YYYY")}`
                    : "—"}
              </dd>
            </div>
            {!needsSubscription && (
              <div className="sm:col-span-2 text-sm text-slate-500 border-t border-slate-100 pt-4">
                Your plan fee of{" "}
                <span className="font-semibold text-slate-700">
                  {formatCurrency(sub.base_amount_paid)}
                </span>{" "}
                for this period is already paid.{" "}
                {overAllowance ? (
                  <>
                    You&apos;ve used{" "}
                    {sub.views_billable.toLocaleString()} views beyond your
                    allowance, adding{" "}
                    <span className="font-semibold text-slate-700">
                      {formatCurrency(sub.usage_accrued)}
                    </span>{" "}
                    to your next charge.
                  </>
                ) : (
                  "You're within your included views, so nothing extra has accrued."
                )}
              </div>
            )}
          </dl>
        </Card>

        {/* Usage */}
        <div className="space-y-6">
          <Card variant="elevated">
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-semibold text-slate-900">Views this month</span>
              <span className="text-sm font-semibold text-slate-900 tabular-nums">
                {sub.views_this_month.toLocaleString()}
                <span className="text-slate-400">
                  {" "}
                  / {sub.views_included.toLocaleString()}
                </span>
              </span>
            </div>
            <Progress
              percent={viewPct}
              showInfo={false}
              strokeColor={overAllowance ? "#d97706" : BRAND.blueDark}
              trailColor={SURFACE.line}
              strokeWidth={8}
              className="mb-1"
            />
            <p className="text-sm text-slate-400">
              {overAllowance
                ? `${sub.views_billable.toLocaleString()} over — billed on your next charge`
                : "Resets on the 1st of each month"}
            </p>
          </Card>

          <Card variant="elevated">
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-semibold text-slate-900">Product slots</span>
              <span className="text-sm font-semibold text-slate-900 tabular-nums">
                {inventoryUsed}
                <span className="text-slate-400"> / {sub.total_scans}</span>
              </span>
            </div>
            <Progress
              percent={inventoryPct}
              showInfo={false}
              strokeColor={BRAND.blueDark}
              trailColor={SURFACE.line}
              strokeWidth={8}
              className="mb-1"
            />
            {/* Deliberately not "resets" — deleting a product returns its slot
                immediately, and slots never refresh with the month. */}
            <p className="text-sm text-slate-400">
              Delete a product to free a slot
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
