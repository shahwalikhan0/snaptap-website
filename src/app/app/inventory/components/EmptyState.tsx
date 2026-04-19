"use client";

import { Icon } from "@iconify/react";

export function EmptyState() {
  return (
    <div className="bg-white rounded-[6px] p-12 sm:p-20 text-center border border-slate-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-snaptap-blue/20 to-transparent" />
      
      <div className="w-24 h-24 rounded-[6px] bg-slate-50 flex items-center justify-center mx-auto mb-8 text-slate-200 relative group">
        <Icon icon="solar:box-minimalistic-line-duotone" width={56} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-snaptap-blue/5 rounded-[6px] scale-0 group-hover:scale-100 transition-transform duration-500" />
      </div>
      
      <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Your Inventory is Empty</h2>
      <p className="text-slate-500 max-w-sm mx-auto font-medium leading-relaxed mb-8">
        It looks like you haven&apos;t added any products yet. Start by scanning your physical items using the <span className="text-snaptap-blue font-bold">SnapTap Admin</span> mobile app.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
        <div className="flex items-center gap-2">
            <Icon icon="solar:smartphone-bold-duotone" className="text-snaptap-blue-dark" width={18} />
            Scan via App
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block" />
        <div className="flex items-center gap-2">
            <Icon icon="solar:cloud-upload-bold-duotone" className="text-snaptap-blue-dark" width={18} />
            Auto-Syncs Here
        </div>
      </div>
    </div>
  );
}
