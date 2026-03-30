import { motion } from "framer-motion";
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
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="bg-gradient-to-br from-[#d0f4ff] to-white rounded-3xl p-6 text-center shadow-xl">
        <h5 className="text-lg font-semibold text-[#007cae]">Total Scans</h5>
        <p className="text-2xl font-bold">{brand.total_scans}</p>
        <p className="text-sm text-gray-600">
          Remaining: {brand.scans_remaining}
        </p>
        <div className="h-2 w-full bg-gray-300 rounded-full mt-3">
          <div
            className={`h-2 rounded-full ${
              scanUsage >= 80 ? "bg-red-500" : "bg-[#00A8DE]"
            }`}
            style={{ width: `${scanUsage}%` }}
          />
        </div>
        <p className="text-sm mt-1">Usage: {scanUsage.toFixed(1)}%</p>
      </div>

      <div className="bg-gradient-to-br from-[#d4fbd8] to-white rounded-3xl p-6 text-center shadow-xl">
        <h5 className="text-lg font-semibold text-[#007cae]">Products</h5>
        <p className="text-xl">Active: {brand.active_products}</p>
        <p className="text-xl">Inactive: {brand.in_active_products}</p>
        <div className="h-2 w-full bg-gray-300 rounded-full mt-3">
          <div
            className="h-2 bg-green-500 rounded-full"
            style={{ width: `${productUsage}%` }}
          />
        </div>
        <p className="text-sm mt-1">
          Active Ratio: {productUsage.toFixed(1)}%
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#ffe3e3] to-white rounded-3xl p-6 text-center shadow-xl">
        <h5 className="text-lg font-semibold text-[#007cae]">Total Models</h5>
        <h3 className="text-3xl font-extrabold">
          {brand.total_models_generated}
        </h3>
        <p className="text-sm text-gray-600">Generated to date</p>
      </div>
    </motion.div>
  );
}
