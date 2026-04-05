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
        className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-md transition-shadow relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transition-transform group-hover:scale-110">
          <Icon icon="mdi:barcode-scan" width={100} />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <Icon icon="mdi:barcode-scan" width={22} />
            </div>
            <h5 className="font-bold text-slate-700">Scan Usage</h5>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <h3 className="text-4xl font-black text-slate-800 tracking-tight">
              {brand.scans_remaining}
            </h3>
            <p className="text-sm font-semibold text-slate-400 mb-1">
              / {brand.total_scans} left
            </p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
            <span className={scanUsage > 85 ? "text-red-500" : "text-blue-500"}>
              {scanUsage.toFixed(1)}% Used
            </span>
            <span className="text-slate-400">Total Scans</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${scanUsage > 85 ? "bg-red-500" : "bg-gradient-to-r from-blue-400 to-blue-500"}`}
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
        className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-md transition-shadow relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transition-transform group-hover:scale-110">
          <Icon icon="mdi:package-variant-closed" width={100} />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <Icon icon="mdi:package-variant-closed" width={22} />
            </div>
            <h5 className="font-bold text-slate-700">Product Portfolio</h5>
          </div>
          <div className="flex items-baseline gap-4 mb-1">
            <div>
              <h3 className="text-4xl font-black text-emerald-500 tracking-tight">
                {brand.active_products}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Active
              </p>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div>
              <h3 className="text-4xl font-black text-slate-300 tracking-tight">
                {brand.in_active_products}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Inactive
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
            <span className="text-emerald-500">
              {productUsage.toFixed(1)}% Active Ratio
            </span>
            <span className="text-slate-400">Products</span>
          </div>
          <div className="h-2 w-full flex rounded-full overflow-hidden gap-0.5">
            <motion.div
              className="h-full bg-emerald-400"
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
        className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl p-6 shadow-md border border-white/10 flex flex-col justify-between group hover:shadow-lg transition-shadow relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none transition-transform group-hover:scale-110">
          <Icon icon="mdi:cube-outline" width={100} className="text-white" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Icon icon="mdi:cube-outline" width={22} />
            </div>
            <h5 className="font-bold text-white">Models Generated</h5>
          </div>

          <div className="mt-8 relative">
            <h3 className="text-6xl font-black text-white tracking-tight">
              {brand.total_models_generated}
            </h3>
            <p className="text-sm font-medium text-violet-200 mt-2">
              Lifetime 3D models created
            </p>
          </div>
        </div>

        <div className="mt-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex items-center gap-3">
            <Icon
              icon="solar:info-circle-line-duotone"
              className="text-violet-200 text-lg flex-shrink-0"
            />
            <p className="text-xs font-medium text-violet-100">
              This may also includes models that were deleted.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
