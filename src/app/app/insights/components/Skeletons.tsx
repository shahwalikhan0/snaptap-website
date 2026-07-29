"use client";

import { motion } from "framer-motion";

export const SkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-slate-100 pt-28 pb-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="h-12 bg-slate-200/50 rounded-[6px] w-64 mx-auto mb-14" />

        {/* Profile Card Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 bg-slate-200/60 rounded-[6px] md:col-span-1" />
          <div className="h-40 bg-white rounded-[6px] border border-slate-200 md:col-span-2" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="h-32 bg-white rounded-[6px] border border-slate-200" />
          <div className="h-32 bg-white rounded-[6px] border border-slate-200" />
          <div className="h-32 bg-white rounded-[6px] border border-slate-200" />
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
          <div className="h-80 bg-white rounded-[6px] border border-slate-200" />
          <div className="h-80 bg-white rounded-[6px] border border-slate-200" />
        </div>
      </div>
    </div>
  );
};
