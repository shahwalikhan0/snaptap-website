"use client";

import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { AdminData, BrandData } from "../types";
import { formatCurrency } from "@/app/utils/currency";
import { Badge } from "@/app/app/components/ui";

interface BrandProfileCardProps {
  admin: AdminData;
  brand: BrandData;
  categoryIcon: string;
}

export function BrandProfileCard({
  admin,
  brand,
  categoryIcon,
}: BrandProfileCardProps) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-snaptap-blue-dark rounded-brand p-8 flex flex-col justify-center items-center text-center lg:col-span-1">
        <div className="w-20 h-20 rounded-brand border border-white/20 bg-white/10 mb-4 flex items-center justify-center overflow-hidden">
          {admin.image_url ? (
            <img
              src={admin.image_url}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon
              icon="solar:user-circle-bold-duotone"
              className="text-white text-5xl"
            />
          )}
        </div>
        <h4 className="text-xl font-bold text-white mb-1 tracking-tight">
          {admin.name}
        </h4>
        <p className="text-white/70 text-sm mb-4">@{admin.username}</p>
        <p className="text-white/70 text-sm truncate max-w-[220px]">
          {admin.email}
        </p>
      </div>

      <div className="bg-surface-card border border-slate-200 rounded-brand shadow-sm p-8 lg:col-span-2 flex flex-col justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Plan Info */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">
                  Current Plan
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">
                    {brand.package_name}
                  </p>
                  <Badge tone={brand.status.toLowerCase() === "active" ? "success" : "danger"}>
                    {brand.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-brand bg-snaptap-blue-dark/10 flex items-center justify-center text-snaptap-blue-dark">
                <Icon icon={categoryIcon} width={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">
                  Industry
                </p>
                <p className="font-semibold text-slate-900">
                  {brand.category || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="space-y-6 sm:border-l sm:border-slate-200/60 sm:pl-8">
            <div>
              <p className="text-sm text-slate-500 mb-1">
                Billing Cycle
              </p>
              <p className="font-semibold text-slate-900">
                {dayjs()
                  .month(brand.month - 1)
                  .format("MMMM")}{" "}
                {brand.year}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">
                  Due Date
                </p>
                <p className="font-semibold text-slate-900">
                  {brand.due_date
                    ? dayjs(brand.due_date).format("MMM D, YYYY")
                    : "N/A"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 mb-1">
                  Status
                </p>
                <Badge
                  tone={
                    brand.is_estimate
                      ? "warning"
                      : brand.date_paid
                        ? "success"
                        : "danger"
                  }
                >
                  {brand.is_estimate ? "Active (Estimate)" : brand.date_paid ? "Paid" : "Unpaid"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Total Billing Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-500 mb-1">
              Current Balance
            </p>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">
              <span className="text-base font-semibold text-slate-400 mr-1">USD</span>
              {formatCurrency(brand.totalBilling).replace("$", "")}
            </p>
          </div>

          <button
            onClick={() => router.push("/app/subscription-page")}
            className="group flex items-center gap-1.5 text-sm font-semibold text-snaptap-blue-dark hover:text-snaptap-blue-deep transition-colors rounded-brand px-3 py-2"
          >
            Manage Billing
            <Icon
              icon="solar:alt-arrow-right-linear"
              width={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
