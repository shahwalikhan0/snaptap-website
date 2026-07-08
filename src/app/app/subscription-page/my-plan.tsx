"use client";

import React, { useState, useEffect } from "react";
import { Card, Progress, Tag } from "antd";
import dayjs from "dayjs";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { Icon } from "@iconify/react";
import api from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";
import { PaymentMethodCard } from "./components/PaymentMethodCard";

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
    body: "Your plan is active but no card is on file. Add one below so your monthly invoice can be charged automatically.",
  },
  past_due: {
    title: "Payment failed — we'll retry automatically",
    body: "Your last charge didn't go through. We'll retry in a couple of days, or you can update your card below now.",
  },
  delinquent: {
    title: "Subscription suspended",
    body: "We couldn't collect payment after several attempts, so your products are temporarily unavailable. Update your card below to restore service.",
  },
};

export default function MyPlan() {
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
      <div className="bg-red-50 p-6 rounded-[6px] border border-red-100 flex items-center gap-4 text-red-600">
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

      {banner && (
        <div className="bg-amber-50 border border-amber-200 rounded-[6px] p-5 flex items-start gap-4">
          <Icon icon="mdi:alert-circle-outline" width={24} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-800">{banner.title}</p>
            <p className="text-sm text-amber-700">{banner.body}</p>
          </div>
        </div>
      )}

      <PaymentMethodCard />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Plan Card */}
        <Card className="md:col-span-2 rounded-[6px] border-slate-100 shadow-sm overflow-hidden p-0 [&_.ant-card-body]:p-0">
          <div className="bg-[#007cae] p-5 sm:p-8 text-white relative overflow-hidden">
            <Icon icon="mdi:rocket-launch" className="absolute -right-8 -bottom-8 opacity-10" width={200} />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start relative z-10 gap-4">
              <div>
                <Tag className="bg-white/20 border-none text-white font-bold rounded-[6px] px-4 mb-4">Active Plan</Tag>
                <h2 className="text-2xl sm:text-4xl font-black">{Brand.package_name || "Enterprise"}</h2>
              </div>
              <div className="sm:text-right">
                <p className="text-white/70 text-sm font-semibold uppercase tracking-wider">
                  {currentEst?.is_estimate ? "Current Month Estimate" : "Current Monthly Billing"}
                </p>
                <p className="text-2xl sm:text-3xl font-bold">Rs. {currentEst?.total_amount ?? Brand.totalBilling ?? 0}</p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 bg-white">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-[6px] bg-green-500 animate-pulse" />
                <span className="font-bold text-slate-700 capitalize">{Brand.status || "Active"}</span>
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                {currentEst?.is_estimate ? "Ongoing Cycle" : "Next Billing Date"}
              </p>
              <span className="font-bold text-slate-700">
                {currentEst?.is_estimate
                  ? dayjs().format("MMMM YYYY")
                  : Brand.due_date
                  ? dayjs(Brand.due_date).format("MMM D, YYYY")
                  : "Auto-renew disabled"}
              </span>
            </div>
          </div>
        </Card>

        {/* Usage Stats Card */}
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-[6px] p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-slate-800">Scan Usage</span>
              <span className="text-xs font-black text-[#007cae]">{Brand.total_scans - Brand.scans_remaining} / {Brand.total_scans}</span>
            </div>
            <Progress
              percent={scanProgress}
              showInfo={false}
              strokeColor="#007cae"
              trailColor="#e2e8f0"
              strokeWidth={10}
              className="mb-2"
            />
            <p className="text-[11px] text-slate-500 text-right font-medium">Resetting in {dayjs(Brand.due_date).diff(dayjs(), 'day')} days</p>
          </div>

          <div className="bg-slate-50 rounded-[6px] p-6 border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[6px] bg-cyan-100 flex items-center justify-center text-cyan-600">
                <Icon icon="mdi:package-variant-closed" width={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Active Inventory</p>
                <p className="text-xl font-black text-slate-800">{Brand.active_products} Items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
