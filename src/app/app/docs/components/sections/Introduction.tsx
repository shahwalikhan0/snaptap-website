"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export function Introduction() {
  return (
    <section id="introduction" className="mb-16 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block text-[#007cae] text-xs font-extrabold uppercase tracking-widest mb-3">
          Documentation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-5 leading-tight">
          SnapTap Documentation
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
          SnapTap is an augmented reality commerce platform that lets
          businesses transform physical products into web-based 3D AR
          experiences — and lets customers view those products life-size
          in their real environment before purchasing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            {
              icon: "mdi:store-outline",
              title: "For Sellers (Brands)",
              desc: "Sign up, scan products with iPhone LiDAR, and publish AR-ready listings with QR codes. Manage your catalog, track performance, and grow with a subscription plan that fits your scale.",
            },
            {
              icon: "mdi:account-eye-outline",
              title: "For Customers",
              desc: "Scan any SnapTap QR code with your phone. No app download needed. The product appears in your real environment at exact 1:1 scale through native iOS and Android AR.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-100 p-5 bg-slate-50 flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#007cae]/10 flex items-center justify-center shrink-0">
                <Icon
                  icon={card.icon}
                  className="text-[#007cae]"
                  width={20}
                />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm mb-1">
                  {card.title}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "iPhone Pro", label: "Required to scan" },
            { value: "Global Format", label: "Format conversion" },
            { value: "QR Code", label: "Per-product, auto-generated" },
            { value: "Zero", label: "Customer app downloads" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl bg-[#007cae]/5 border border-[#007cae]/15 p-4 text-center"
            >
              <p className="text-[#007cae] font-extrabold text-base">
                {stat.value}
              </p>
              <p className="text-slate-500 text-xs mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
