"use client";

import { easeOut, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { BrandData } from "../types";

interface StatsCardsProps {
  brand: BrandData;
  scanUsage: number;
  productUsage: number;
}

export function StatsCards({
  brand,
  scanUsage,
  productUsage,
}: StatsCardsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Scans Card */}
      <motion.div
        variants={itemVariants}
        className="bg-surface-card rounded-brand p-6 border border-slate-200 shadow-card flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-brand bg-snaptap-blue-dark/10 text-snaptap-blue-dark flex items-center justify-center">
              <Icon icon="mdi:barcode-scan" width={22} />
            </div>
            <h5 className="font-semibold text-slate-900">Scan Usage</h5>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">
              {brand.scans_remaining}
            </h3>
            <p className="text-sm font-semibold text-slate-400 mb-1">
              / {brand.total_scans} left
            </p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className={scanUsage > 85 ? "font-semibold text-red-600" : "font-semibold text-snaptap-blue-dark"}>
              {scanUsage.toFixed(1)}% used
            </span>
            <span className="text-slate-400">of {brand.total_scans} scans</span>
          </div>
          <div className="h-2 w-full bg-surface-line rounded-brand overflow-hidden">
            <motion.div
              className={`h-full rounded-brand ${scanUsage > 85 ? "bg-red-500" : "bg-snaptap-blue-dark"}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(scanUsage, 100)}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Products Card */}
      <motion.div
        variants={itemVariants}
        className="bg-surface-card rounded-brand p-6 border border-slate-200 shadow-card flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-brand bg-snaptap-blue-dark/10 text-snaptap-blue-dark flex items-center justify-center">
              <Icon icon="mdi:package-variant-closed" width={22} />
            </div>
            <h5 className="font-semibold text-slate-900">Product Portfolio</h5>
          </div>
          <div className="flex items-baseline gap-4 mb-1">
            <div>
              <h3 className="text-4xl font-bold text-slate-900 tracking-tight">
                {brand.active_products}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">Active</p>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div>
              <h3 className="text-4xl font-bold text-slate-300 tracking-tight">
                {brand.in_active_products}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">Inactive</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-snaptap-blue-dark">
              {productUsage.toFixed(1)}% active
            </span>
            <span className="text-slate-400">of {brand.active_products + brand.in_active_products} products</span>
          </div>
          <div className="h-2 w-full flex rounded-brand overflow-hidden gap-0.5">
            <motion.div
              className="h-full bg-snaptap-blue-dark"
              initial={{ flex: 0 }}
              animate={{ flex: brand.active_products }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.div
              className="h-full bg-slate-200"
              initial={{ flex: 0 }}
              animate={{ flex: brand.in_active_products }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Models Card */}
      <motion.div
        variants={itemVariants}
        className="bg-snaptap-blue-dark rounded-brand p-6 shadow-card flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-brand bg-white/15 text-white flex items-center justify-center">
              <Icon icon="mdi:cube-outline" width={22} />
            </div>
            <h5 className="font-semibold text-white">Models Generated</h5>
          </div>

          <div className="mt-8">
            <h3 className="text-5xl font-bold text-white tracking-tight">
              {brand.total_models_generated}
            </h3>
            <p className="text-sm font-medium text-white/70 mt-2">
              Lifetime 3D models created
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-white/10 border border-white/10 rounded-brand p-3 flex items-center gap-3">
            <Icon
              icon="solar:info-circle-line-duotone"
              className="text-white/70 text-lg flex-shrink-0"
            />
            <p className="text-xs font-medium text-white/80">
              This may also includes models that were deleted.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
