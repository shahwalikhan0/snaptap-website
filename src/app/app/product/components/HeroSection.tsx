"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const DARK_BG = "#020d14";

export function HeroSection() {
  const router = useRouter();

  return (
    <section
      className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 relative overflow-hidden text-center"
      style={{ background: DARK_BG }}
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,124,174,0.14) 0%, transparent 70%)",
        }}
      />
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px)",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 bg-[#007cae]/20 text-[#007cae] text-sm font-bold px-4 py-2 rounded-[6px] mb-6 border border-[#007cae]/30">
            <Icon icon="mdi:augmented-reality" width={16} />
            Product Overview
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            From Physical Product to{" "}
            <span className="text-[#007cae]">Immersive AR</span>
            <br className="hidden sm:block" /> in Minutes
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-10 max-w-3xl mx-auto">
            SnapTap turns any physical product into a web-based augmented
            reality experience. Sellers scan with iPhone LiDAR, customers view
            it life-size in their real environment — no app download, no
            guesswork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/app/sign-up")}
              className="bg-[#007cae] text-white font-bold px-8 py-3.5 rounded-[6px] hover:bg-[#006080] transition-all shadow-lg shadow-[#007cae]/25 hover:shadow-[#007cae]/40 transform hover:-translate-y-0.5"
            >
              Start as a Seller
            </button>
            <button
              onClick={() => router.push("/app/pricing")}
              className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-[6px] hover:bg-white/10 transition-all"
            >
              View Pricing Plans
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stat bar */}
      <div className="relative max-w-4xl mx-auto mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { value: "< 5 min", label: "Scan to AR model" },
          { value: "1:1 Scale", label: "True-to-size placement" },
          { value: "Zero", label: "App downloads needed" },
          { value: "iOS + Android", label: "Native AR on both" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-[6px] px-4 py-5 text-center"
          >
            <p className="text-[#007cae] text-xl sm:text-2xl font-extrabold mb-1">
              {stat.value}
            </p>
            <p className="text-slate-400 text-xs sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
