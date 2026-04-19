"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { workflowSteps } from "../constants/data";

export function SellerWorkflow() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#007cae] text-sm font-bold uppercase tracking-widest mb-3">
            For Sellers
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            From Scan to Live AR in 5 Steps
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Everything is automated. You scan, we process — your customers
            experience.
          </p>
        </div>

        <div className="relative">
          {/* Connector on desktop */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-[#007cae]/15 w-[85%] mx-auto" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {workflowSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative z-10 bg-white rounded-[6px] p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-[#007cae]/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-[6px] bg-[#007cae]/10 flex items-center justify-center shrink-0">
                    <Icon
                      icon={step.icon}
                      className="text-[#007cae]"
                      width={20}
                    />
                  </div>
                  <span className="text-xs font-extrabold text-[#007cae] uppercase tracking-widest">
                    Step {step.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
