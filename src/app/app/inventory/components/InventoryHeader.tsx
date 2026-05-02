"use client";

import { Input, Segmented } from "antd";
import { Icon } from "@iconify/react";

const { Search } = Input;

interface InventoryHeaderProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: "all" | "active" | "inactive";
  setStatusFilter: (val: "all" | "active" | "inactive") => void;
  stats: { total: number; active: number; inactive: number };
}

export function InventoryHeader({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  Admin,
}: InventoryHeaderProps & { Admin: any }) {
  return (
    <div className="flex flex-col gap-4 mb-10">
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

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`/app/showcase/${Admin?.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-snaptap-blue-dark border border-slate-200 hover:border-snaptap-blue hover:text-snaptap-blue px-4 py-2 rounded-[6px] font-bold text-sm transition-all shadow-sm"
          >
            <Icon icon="mdi:qrcode" width={18} />
            Product Showcase
            <Icon icon="mdi:open-in-new" width={14} className="opacity-50" />
          </a>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-[6px] border border-slate-100 mb-1">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             Cloud Synced
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-4 md:gap-10">
        <div className="relative w-full flex-1">
          <Search
            placeholder="Search products by name or category..."
            allowClear
            variant="borderless"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="!p-0 border-b-2 border-slate-200 focus-within:border-snaptap-blue-dark transition-all duration-300 [&_.ant-input]:!text-lg [&_.ant-input]:!font-bold [&_.ant-input]:!py-3 [&_.ant-input]:text-slate-900 [&_.ant-input::placeholder]:text-slate-300 [&_.ant-input-suffix_svg]:text-slate-300"
            size="large"
          />
        </div>
        
        <div className="flex items-center gap-4 shrink-0 w-full md:w-auto">
            <div className="flex flex-col gap-1.5 w-full md:w-auto">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">Status Filter</span>
                <Segmented
                  options={[
                    { label: "All Items", value: "all" },
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                  ]}
                  value={statusFilter}
                  onChange={(val) => setStatusFilter(val as any)}
                  className="p-1 rounded-[6px] bg-slate-100 font-bold text-xs"
                  size="large"
                />
            </div>
        </div>
      </div>
    </div>
  );
}
