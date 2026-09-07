"use client";

import { Icon } from "@iconify/react";
import { cn } from "@/app/utils/cn";

import type { AdminDataType } from "@/app/app/types/admin-data";
import { Input } from "@/app/app/components/ui";

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
  { value: "all", label: "All" },
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
    <div className="flex flex-col gap-6 mb-8">
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading font-bold text-slate-900">
            Inventory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {stats.total} product{stats.total === 1 ? "" : "s"} in your catalog
          </p>
        </div>

        <a
          href={`/app/showcase/${Admin?.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-surface-card border border-slate-200 hover:border-snaptap-blue-dark/40 text-slate-700 hover:text-snaptap-blue-dark px-4 py-2.5 rounded-brand font-semibold text-sm transition-colors w-full sm:w-auto justify-center"
        >
          <Icon icon="solar:eye-linear" width={18} />
          View Public Showcase
          <Icon icon="mdi:open-in-new" width={14} className="opacity-50" />
        </a>
      </div>

      {/* Control Bar: status tabs (left) + search (right) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Filter products by status"
          className="inline-flex items-center gap-1 border-b border-slate-200 w-full md:w-auto overflow-x-auto"
        >
          {STATUS_TABS.map((tab) => {
            const isActive = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setStatusFilter(tab.value)}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
                  isActive
                    ? "text-snaptap-blue-dark"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "text-xs font-bold",
                    isActive ? "text-snaptap-blue-dark" : "text-slate-400",
                  )}
                >
                  {countFor(tab.value)}
                </span>
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-snaptap-blue-dark rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="w-full md:w-72">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or category…"
            leading={<Icon icon="solar:magnifer-linear" width={17} />}
            trailing={
              search ? (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="pointer-events-auto hover:text-slate-600 transition-colors"
                >
                  <Icon icon="lucide:x" width={14} />
                </button>
              ) : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
