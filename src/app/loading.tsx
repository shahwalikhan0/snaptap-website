"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-[16px] bg-gradient-to-br from-[#007cae] to-[#00A8DE] flex items-center justify-center shadow-2xl shadow-[#007cae]/20 animate-bounce mb-8">
          <Icon
            icon="mdi:cube-scan"
            className="text-white"
            width={32}
          />
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-1.5 w-48 bg-slate-100 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#007cae] to-[#00A8DE] w-1/3 animate-[loading_1.5s_infinite_ease-in-out]" />
          </div>
          <p className="mt-4 text-[11px] font-black text-[#007cae] uppercase tracking-[0.4em] animate-pulse">
            SnapTap
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
