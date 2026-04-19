import { motion } from "framer-motion";

export const SkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8faff] via-white to-[#e2f2f8] pt-28 pb-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="h-12 bg-slate-200/50 rounded-[6px] w-64 mx-auto mb-14" />

        {/* Profile Card Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 bg-slate-200/60 rounded-[6px] md:col-span-1" />
          <div className="h-40 bg-white/60 rounded-[6px] md:col-span-2" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="h-32 bg-white/60 rounded-[6px]" />
          <div className="h-32 bg-white/60 rounded-[6px]" />
          <div className="h-32 bg-white/60 rounded-[6px]" />
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
          <div className="h-80 bg-white/60 rounded-[6px]" />
          <div className="h-80 bg-white/60 rounded-[6px]" />
        </div>
      </div>
    </div>
  );
};
