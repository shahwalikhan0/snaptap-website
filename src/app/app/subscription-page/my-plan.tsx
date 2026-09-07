"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "antd";
import dayjs from "dayjs";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { Icon } from "@iconify/react";
import api from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";
import { formatCurrency } from "@/app/utils/currency";
import { BRAND, SURFACE } from "@/app/utils/tokens";
import { Badge, Button, Card } from "@/app/app/components/ui";

interface BillingEstimate {
  is_estimate?: boolean;
  total_amount: number;
  month: string;
}

interface BillingGate {
  requires_action: boolean;
  reason: string | null;
  message: string | null;
}

const GATE_BANNERS: Record<string, { title: string; body: string }> = {
  no_payment_method: {
    title: "Add a payment method",
    body: "Your plan is active but no card is on file, so your monthly invoice cannot be charged automatically.",
  },
  past_due: {
    title: "Payment failed — we'll retry automatically",
    body: "Your last charge didn't go through. We'll retry in a couple of days, or you can update your card now.",
  },
  delinquent: {
    title: "Subscription suspended",
    body: "We couldn't collect payment after several attempts, so your products are temporarily unavailable. Update your card to restore service.",
  },
};

interface MyPlanProps {
  onNavigate?: (page: string) => void;
}

export default function MyPlan({ onNavigate }: MyPlanProps) {
  const { Brand, setBrand } = useAdmin();
  const [currentEst, setCurrentEst] = useState<BillingEstimate | null>(null);
  const [gate, setGate] = useState<BillingGate | null>(null);

  useEffect(() => {
    if (Brand?.brand_id) {
       api
         .get(ENDPOINTS.BILLING_CURRENT(Brand.brand_id))
         .then((res) => {
             setCurrentEst(res.data);
         })
         .catch((err: unknown) => console.log("Failed to load current billing estimate", err));
       api
         .get(ENDPOINTS.BILLING_STATUS(Brand.brand_id))
         .then((res) => setGate(res.data?.data ?? null))
         .catch((err: unknown) => console.log("Failed to load billing status", err));
    }
  }, [Brand?.brand_id]);

  if (!Brand) {
    return (
      <div className="bg-red-50 p-6 rounded-brand border border-red-100 flex items-center gap-4 text-red-600">
        <Icon icon="mdi:alert-circle-outline" width={24} />
        <p className="font-semibold">Subscription data not found. Please refresh the page.</p>
      </div>
    );
  }

  const scanProgress = Brand.total_scans > 0
    ? Math.round(((Brand.total_scans - Brand.scans_remaining) / Brand.total_scans) * 100)
    : 0;

  const banner =
    gate?.requires_action && gate.reason ? GATE_BANNERS[gate.reason] : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Current Subscription</h1>
        <p className="text-slate-500">Overview of your active plan and usage metrics.</p>
      </div>

      {/* Amber is kept here on purpose — it's a semantic billing warning, not
          decoration. */}
      {banner && (
        <div className="bg-amber-50 border border-amber-200 rounded-brand p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <Icon
            icon="mdi:alert-circle-outline"
            width={22}
            className="text-amber-600 shrink-0"
          />
          <div className="flex-1">
            <p className="font-semibold text-amber-900">{banner.title}</p>
            <p className="text-sm text-amber-800 mt-0.5">{banner.body}</p>
          </div>
          <Button
            size="sm"
            onClick={() => onNavigate?.("billing-history")}
            className="shrink-0 bg-amber-600 hover:bg-amber-700 shadow-none"
          >
            Manage Payment
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current plan */}
        <Card variant="elevated" padding="none" className="md:col-span-2 overflow-hidden">
          <div className="bg-snaptap-blue-dark p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <span className="inline-flex items-center rounded-brand bg-white/15 px-2.5 py-0.5 text-xs font-semibold mb-3">
                  Active plan
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {Brand.package_name || "Enterprise"}
                </h2>
              </div>
              <div className="sm:text-right">
                <p className="text-sm text-white/70">
                  {currentEst?.is_estimate
                    ? "This month (estimate)"
                    : "Current monthly billing"}
                </p>
                <p className="text-2xl sm:text-3xl font-bold mt-0.5">
                  {formatCurrency(
                    currentEst?.total_amount ?? Brand.totalBilling ?? 0,
                  )}
                </p>
              </div>
            </div>
          </div>

          <dl className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <dt className="text-sm text-slate-500 mb-1.5">Status</dt>
              <dd>
                <Badge
                  tone={
                    (Brand.status || "active").toLowerCase() === "active"
                      ? "success"
                      : "neutral"
                  }
                >
                  {Brand.status || "Active"}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500 mb-1.5">
                {currentEst?.is_estimate ? "Ongoing cycle" : "Next billing date"}
              </dt>
              <dd className="font-semibold text-slate-900">
                {currentEst?.is_estimate
                  ? dayjs().format("MMMM YYYY")
                  : Brand.due_date
                    ? dayjs(Brand.due_date).format("MMM D, YYYY")
                    : "Auto-renew disabled"}
              </dd>
            </div>
          </dl>
        </Card>

        {/* Usage */}
        <div className="space-y-6">
          <Card variant="elevated">
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-semibold text-slate-900">Scan usage</span>
              <span className="text-sm font-semibold text-slate-900 tabular-nums">
                {Brand.total_scans - Brand.scans_remaining}
                <span className="text-slate-400"> / {Brand.total_scans}</span>
              </span>
            </div>
            <Progress
              percent={scanProgress}
              showInfo={false}
              strokeColor={BRAND.blueDark}
              trailColor={SURFACE.line}
              strokeWidth={8}
              className="mb-1"
            />
            {Brand.due_date && (
              <p className="text-sm text-slate-400">
                Resets in {dayjs(Brand.due_date).diff(dayjs(), "day")} days
              </p>
            )}
          </Card>

          <Card variant="elevated">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 shrink-0 rounded-brand bg-snaptap-blue-dark/10 flex items-center justify-center text-snaptap-blue-dark">
                <Icon icon="mdi:package-variant-closed" width={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Active inventory</p>
                <p className="text-xl font-bold text-slate-900">
                  {Brand.active_products}{" "}
                  <span className="text-base font-medium text-slate-400">
                    {Brand.active_products === 1 ? "item" : "items"}
                  </span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
