"use client";

import { Icon } from "@iconify/react";

export function EmptyState() {
  return (
    <div className="bg-white rounded-[6px] p-8 sm:p-12 text-center border border-slate-100 shadow-sm">
      <div className="w-20 h-20 rounded-[6px] bg-slate-50 flex items-center justify-center mx-auto mb-6 text-slate-300">
        <Icon icon="mdi:package-variant-remove" width={40} />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">No Products Found</h2>
      <p className="text-slate-500 max-w-sm mx-auto">
        Use the SnapTap Admin mobile app to scan and add new products to your inventory.
      </p>
    </div>
  );
}
