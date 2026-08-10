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
      label: "My Plan",
      icon: "mdi:file-certificate-outline",
    },
    {
      id: "change-plan",
      label: "Change Plan",
      icon: "mdi:rocket-launch-outline",
    },
    {
      id: "billing-history",
      label: "Billing & Payments",
      icon: "mdi:receipt-text-outline",
    },
  ];

  return (
    <div className="h-full bg-slate-50/50 p-3 sm:p-6 flex lg:flex-col gap-2 overflow-x-auto">
      <div className="mb-0 lg:mb-8 hidden lg:block">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4">Billing & Plan</h2>
      </div>

      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`
            flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-brand font-semibold transition-all whitespace-nowrap text-sm sm:text-base
            ${selectedPage === item.id
              ? "bg-white text-snaptap-blue-dark shadow-sm border border-slate-100 ring-1 ring-snaptap-blue-dark/10"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }
          `}
        >
          <Icon icon={item.icon} width={22} className={selectedPage === item.id ? "text-snaptap-blue-dark" : "text-slate-400"} />
          {item.label}
        </button>
      ))}

      <div className="mt-auto p-4 bg-snaptap-blue-dark/5 rounded-brand border border-snaptap-blue-dark/10 border-dashed hidden lg:block">
        <div className="flex items-center gap-2 text-snaptap-blue-dark mb-2 font-bold text-sm">
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
