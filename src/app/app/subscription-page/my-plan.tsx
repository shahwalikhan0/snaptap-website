"use client";

import { Card, Progress, Tag } from "antd";
import dayjs from "dayjs";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { Icon } from "@iconify/react";

export default function MyPlan() {
  const { Brand } = useAdmin();

  if (!Brand) {
    return (
      <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-center gap-4 text-red-600">
        <Icon icon="mdi:alert-circle-outline" width={24} />
        <p className="font-semibold">Subscription data not found. Please refresh the page.</p>
      </div>
    );
  }

  const scanProgress = Brand.total_scans > 0
    ? Math.round(((Brand.total_scans - Brand.scans_remaining) / Brand.total_scans) * 100)
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Current Subscription</h1>
        <p className="text-slate-500">Overview of your active plan and usage metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Plan Card */}
        <Card className="md:col-span-2 rounded-3xl border-slate-100 shadow-sm overflow-hidden p-0 [&_.ant-card-body]:p-0">
          <div className="bg-[#00A8DE] p-8 text-white relative overflow-hidden">
            <Icon icon="mdi:rocket-launch" className="absolute -right-8 -bottom-8 opacity-10" width={200} />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <Tag className="bg-white/20 border-none text-white font-bold rounded-full px-4 mb-4">Active Plan</Tag>
                <h2 className="text-4xl font-black">{Brand.package_name || "Enterprise"}</h2>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-sm font-semibold uppercase tracking-wider">Current Monthly Billing</p>
                <p className="text-3xl font-bold">Rs. {Brand.totalBilling || 0}</p>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-2 gap-8 bg-white">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-bold text-slate-700 capitalize">{Brand.status || "Active"}</span>
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Next Billing Date</p>
              <span className="font-bold text-slate-700">
                {Brand.due_date ? dayjs(Brand.due_date).format("MMM D, YYYY") : "Auto-renew disabled"}
              </span>
            </div>
          </div>
        </Card>

        {/* Usage Stats Card */}
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-slate-800">Scan Usage</span>
              <span className="text-xs font-black text-[#00A8DE]">{Brand.total_scans - Brand.scans_remaining} / {Brand.total_scans}</span>
            </div>
            <Progress
              percent={scanProgress}
              showInfo={false}
              strokeColor="#00A8DE"
              trailColor="#e2e8f0"
              strokeWidth={10}
              className="mb-2"
            />
            <p className="text-[11px] text-slate-500 text-right font-medium">Resetting in {dayjs(Brand.due_date).diff(dayjs(), 'day')} days</p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600">
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
