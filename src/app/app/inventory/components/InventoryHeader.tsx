"use client";

import { Input, Segmented } from "antd";
import { Icon } from "@iconify/react";

const { Search } = Input;

interface InventoryHeaderProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: "all" | "active" | "inactive";
  setStatusFilter: (val: "all" | "active" | "inactive") => void;
}

export function InventoryHeader({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: InventoryHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10">
      <div>
        <div className="flex items-center gap-2 text-[#007cae] mb-2">
          <Icon icon="mdi:package-variant-closed" width={24} />
          <span className="font-bold uppercase tracking-wider text-sm">Dashboard</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900">Your Inventory</h1>
        <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">Manage and monitor your 3D product catalog</p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="relative w-full sm:w-64">
          <Search
            placeholder="Search by name or category..."
            allowClear
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="[&_.ant-input]:!rounded-xl [&_.ant-input-group-addon]:!bg-white [&_.ant-input-search-button]:!border-none [&_.ant-input:focus]:!border-[#007cae] [&_.ant-input:hover]:!border-[#007cae]/50"
            size="large"
          />
        </div>
        <Segmented
          options={[
            { label: "All Items", value: "all" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
          value={statusFilter}
          onChange={(val) => setStatusFilter(val as any)}
          className="p-1 rounded-xl bg-slate-200/50"
          size="large"
        />
      </div>
    </div>
  );
}
