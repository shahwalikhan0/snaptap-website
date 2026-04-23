"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 sm:pt-40 pb-20 px-6 sm:px-12 md:px-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-snaptap-blue/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-snaptap-blue/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-snaptap-blue-dark mb-4">
            <div className="w-10 h-[2px] bg-snaptap-blue-dark" />
            <span className="font-bold uppercase tracking-[0.3em] text-xs">
              Who we are
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
            Solara: <br />
            <span className="text-snaptap-blue-dark">
              Making digital feel real.
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pb-16 border-b border-slate-100">
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-800">
                Hi, We&apos;re Solara.
              </h2>
              <p className="text-slate-600 leading-relaxed font-medium text-lg">
                We aren&apos;t just another IT firm. At our core, we are a group
                of builders and problem-solvers who believe that technology
                should actually solve something, not just look fancy.
              </p>
              <p className="text-slate-500 leading-relaxed font-medium">
                Shopping online has always had one big flaw: you can&apos;t
                touch, feel, or see the scale of what you&apos;re buying. We
                started Solara to fix that gap using the best of 3D engineering
                and modern code.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative p-1 bg-gradient-to-br from-slate-100 to-slate-200 rounded-[12px] shadow-inner">
                <div className="bg-white p-8 rounded-[11px] shadow-sm max-w-sm">
                  <Icon
                    icon="solar:star-fall-bold-duotone"
                    className="text-snaptap-blue mb-4"
                    width={48}
                  />
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    The Mission
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Our goal is simple: Help brands move past flat photos and
                    give their customers the confidence to buy by seeing
                    products in their own space.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="py-16">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="lg:w-1/3">
                <h2 className="text-2xl font-black text-slate-800 mb-4">
                  Meet SnapTap
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-4">
                  Our Flagship Project
                </p>
              </div>
              <div className="flex-1">
                <p className="text-slate-600 leading-relaxed font-medium text-lg italic">
                  &quot;SnapTap is how we bring this vision to life. It&apos;s a
                  platform that takes the complexity out of 3D modeling. You
                  scan it, we handle the heavy lifting, and your customers get
                  to see it in AR within minutes.&quot;
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 sm:p-12 bg-white rounded-[6px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Official Identity
              </h3>
              <p className="text-slate-500 text-sm font-medium">
                For our partners and enterprise clients, we maintain full
                transparency.
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Company Registration
              </span>
              <div className="bg-slate-900 text-white px-5 py-2.5 rounded-[4px] font-black tracking-tight text-lg shadow-xl shadow-slate-900/10">
                DUNS: 77-533-1020
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
              Serving Globally
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
