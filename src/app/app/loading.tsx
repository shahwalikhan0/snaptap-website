"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-[#007cae] animate-spin" />

        {/* Inner pulsing icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#007cae] to-[#00A8DE] flex items-center justify-center shadow-lg animate-pulse">
            <Icon icon="mdi:cube-outline" className="text-white" width={24} />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
          Syncing Assets
          <span className="flex gap-1">
            <span className="w-1 h-1 bg-[#007cae] rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1 h-1 bg-[#007cae] rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1 h-1 bg-[#007cae] rounded-full animate-bounce" />
          </span>
        </h3>
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">
          Preparing your immersive experience
        </p>
      </div>

      {/* Subtle bottom text */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
          SnapTap Engine • Secure Session
        </p>
      </div>
    </div>
  );
}
