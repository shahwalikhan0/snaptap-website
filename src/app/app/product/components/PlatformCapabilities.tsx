"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { platformCaps } from "../constants/data";

const DARK_BG = "#020d14";

export function PlatformCapabilities() {
  return (
    <section
      className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden"
      style={{ background: DARK_BG }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,124,174,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[#007cae] text-sm font-bold uppercase tracking-widest mb-3">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
            Everything Built Into the Platform
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            SnapTap handles the entire AR pipeline — scanning, processing,
            hosting and analytics — so you can focus on your products.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {platformCaps.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-[6px] border border-white/10 hover:border-[#007cae]/40 hover:bg-white/10 transition-all group cursor-default"
            >
              <div className="w-11 h-11 rounded-[6px] bg-[#007cae]/20 flex items-center justify-center mb-4 group-hover:bg-[#007cae]/30 transition-all">
                <Icon icon={cap.icon} className="text-[#007cae]" width={22} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {cap.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
