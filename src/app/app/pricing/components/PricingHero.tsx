"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

interface PricingHeroProps {
  onScrollToPricing: () => void;
}

export function PricingHero({ onScrollToPricing }: PricingHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="pt-28 sm:pt-36 pb-14 sm:pb-20 px-4 sm:px-6 md:px-12 text-center bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#007cae]/10 text-[#007cae] text-sm font-semibold px-4 py-2 rounded-full mb-6">
          <Icon icon="mdi:tag-outline" width={16} />
          Simple, Transparent Pricing
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
          Plans That Grow <span className="text-[#007cae]">With You</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 max-w-2xl mx-auto">
          From independent sellers to enterprise teams — choose the plan that
          fits your business and start bringing your products to life in AR.
        </p>
        <button
          onClick={onScrollToPricing}
          className="inline-flex items-center gap-2 bg-[#007cae] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#006080] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          See All Plans
          <Icon icon="mdi:arrow-down" width={18} />
        </button>
      </div>
    </motion.section>
  );
}
