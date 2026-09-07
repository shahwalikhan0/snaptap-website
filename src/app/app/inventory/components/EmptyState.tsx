"use client";

import { Icon } from "@iconify/react";

export function EmptyState() {
  return (
    <div className="bg-surface-card rounded-brand border border-slate-200 p-12 sm:p-16 text-center">
      <div className="w-14 h-14 rounded-brand bg-surface-inset border border-slate-100 flex items-center justify-center mx-auto mb-5 text-slate-300">
        <Icon icon="solar:box-minimalistic-linear" width={30} />
      </div>

      <h2 className="text-lg font-bold text-slate-900 mb-2">
        No products yet
      </h2>
      <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
        Scan a physical item with the SnapTap mobile app and it will appear
        here automatically, ready to share as an AR experience.
      </p>
    </div>
  );
}
