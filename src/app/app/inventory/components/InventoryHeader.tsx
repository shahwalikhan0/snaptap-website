"use client";

import { Icon } from "@iconify/react";
import clsx from "clsx";

import type { AdminDataType } from "@/app/app/types/admin-data";

interface InventoryHeaderProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: "all" | "active" | "inactive";
  setStatusFilter: (val: "all" | "active" | "inactive") => void;
  stats: { total: number; active: number; inactive: number };
  Admin: AdminDataType | null;
}

const STATUS_TABS: {
  value: "all" | "active" | "inactive";
  label: string;
}[] = [
  { value: "all", label: "All Items" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export function InventoryHeader({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  stats,
  Admin,
}: InventoryHeaderProps) {
  const countFor = (value: "all" | "active" | "inactive") =>
    value === "all" ? stats.total : stats[value];

  return (
    <div className="flex flex-col gap-6 mb-10">
      {/* Title Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-snaptap-blue-dark mb-1">
            <Icon icon="solar:BoxMinimalistic-bold-duotone" width={22} />
            <span className="font-bold uppercase tracking-[0.2em] text-[10px]">
              Management Dashboard
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Inventory <span className="text-snaptap-blue-dark">Portfolio</span>
          </h1>
        </div>

        {/* Primary action: the public catalog customers actually see —
            visible on every breakpoint */}
        <div className="flex items-center gap-3">
          <a
            href={`/app/showcase/${Admin?.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-snaptap-blue-dark hover:bg-snaptap-blue-deep text-white px-5 py-2.5 rounded-brand font-bold text-sm transition-all shadow-lg shadow-snaptap-blue-dark/20 w-full sm:w-auto justify-center"
          >
            <Icon icon="solar:eye-bold-duotone" width={18} />
            View Public Showcase
            <Icon icon="mdi:open-in-new" width={14} className="opacity-70" />
          </a>
        </div>
      </div>

      {/* Control Bar: status tabs (left) + search (right) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Filter products by status"
          className="flex items-center gap-1 bg-slate-100 p-1 rounded-brand w-full md:w-auto"
        >
          {STATUS_TABS.map((tab) => {
            const isActive = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setStatusFilter(tab.value)}
                className={clsx(
                  "flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-brand text-sm font-bold transition-all",
                  isActive
                    ? "bg-white text-snaptap-blue-dark shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                {tab.label}
                <span
                  className={clsx(
                    "min-w-[22px] px-1.5 py-0.5 rounded-brand text-[11px] font-black leading-none",
                    isActive
                      ? "bg-snaptap-blue-dark/10 text-snaptap-blue-dark"
                      : "bg-slate-200 text-slate-500",
                  )}
                >
                  {countFor(tab.value)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-80">
          <Icon
            icon="solar:magnifer-line-duotone"
            width={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or category..."
            className="w-full pl-10 pr-9 py-2.5 rounded-brand border border-slate-200 bg-white text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-snaptap-blue-dark focus:ring-2 focus:ring-snaptap-blue-dark/10 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-brand text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Icon icon="lucide:x" width={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
