"use client";

/**
 * Mirrors the real Insights layout so there's no jump when data lands:
 * left-aligned header, profile row (1fr + 2fr), three stat cards, then the
 * charts row (2fr + 1fr) and the full-width "Most Viewed" card.
 */
export const SkeletonLoader = () => {
  const card = "bg-surface-card rounded-brand border border-slate-200";

  return (
    <div className="min-h-screen bg-surface-page pt-28 pb-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto animate-pulse">
        {/* Header */}
        <div className="mb-10">
          <div className="h-9 w-48 bg-slate-200 rounded-brand" />
          <div className="h-4 w-72 bg-slate-200/70 rounded-brand mt-3" />
        </div>

        {/* Profile row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-56 bg-slate-200/70 rounded-brand lg:col-span-1" />
          <div className={`h-56 ${card} lg:col-span-2`} />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className={`h-44 ${card}`} />
          <div className={`h-44 ${card}`} />
          <div className={`h-44 ${card}`} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className={`h-[400px] ${card} lg:col-span-2`} />
          <div className={`h-[400px] ${card}`} />
          <div className={`h-64 ${card} lg:col-span-3`} />
        </div>
      </div>
    </div>
  );
};
