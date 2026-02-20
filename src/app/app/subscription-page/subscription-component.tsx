"use client";

import React from "react";
import { Icon } from "@iconify/react";

interface Props {
  selectedPage: string;
  onSelect: (page: string) => void;
}

export default function SubscriptionComponent({ selectedPage, onSelect }: Props) {
  const menuItems = [
    {
      id: "my-plan",
      label: "Current Subscription",
      icon: "mdi:file-certificate-outline",
    },
    {
      id: "change-plan",
      label: "Upgrade / Change Plan",
      icon: "mdi:rocket-launch-outline",
    },
    {
      id: "edit-billing",
      label: "Billing Settings",
      icon: "mdi:credit-card-settings-outline",
    },
  ];

  return (
    <div className="h-full bg-slate-50/50 p-6 flex flex-col gap-2">
      <div className="mb-8">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4">Billing & Plan</h2>
      </div>

      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`
            flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all
            ${selectedPage === item.id
              ? "bg-white text-[#00A8DE] shadow-sm border border-slate-100 ring-1 ring-[#00A8DE]/10"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }
          `}
        >
          <Icon icon={item.icon} width={22} className={selectedPage === item.id ? "text-[#00A8DE]" : "text-slate-400"} />
          {item.label}
        </button>
      ))}

      <div className="mt-auto p-4 bg-[#00A8DE]/5 rounded-2xl border border-[#00A8DE]/10 border-dashed">
        <div className="flex items-center gap-2 text-[#00A8DE] mb-2 font-bold text-sm">
          <Icon icon="mdi:information-outline" width={18} />
          Need Help?
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Managing custom enterprise plans? Contact our sales team for tailored billing solutions.
        </p>
      </div>
    </div>
  );
}
