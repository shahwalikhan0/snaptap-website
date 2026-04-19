"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useCases } from "../constants/data";

export function UseCases() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[#007cae] text-sm font-bold uppercase tracking-widest mb-3">
            Use Cases
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            One Platform. Multiple AR Solutions.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Whether you run a restaurant, a retail store, or an online shop —
            SnapTap has a purpose-built AR workflow for you.
          </p>
        </div>

        <div className="space-y-24">
          {useCases.map((uc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${idx % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} items-start gap-10 lg:gap-16`}
            >
              {/* Image */}
              <div className="w-full lg:w-[45%] shrink-0">
                <div className="rounded-[6px] overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3] relative">
                  <Image
                    src={uc.image}
                    alt={uc.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-4 left-4 bg-[#007cae] text-white text-xs font-bold px-3 py-1 rounded-[6px] uppercase tracking-wider">
                    {uc.tag}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[#007cae]/10 text-[#007cae] text-xs font-bold px-3 py-1.5 rounded-[6px] mb-4 uppercase tracking-wider">
                  <Icon icon={uc.icon} width={14} />
                  Use Case {idx + 1}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                  {uc.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  {uc.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Seller side */}
                  <div className="bg-[#007cae]/5 border border-[#007cae]/20 rounded-[6px] p-4">
                    <p className="text-[#007cae] text-xs font-extrabold uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Icon icon="mdi:store-outline" width={14} />
                      Seller Workflow
                    </p>
                    <ul className="space-y-2">
                      {uc.sellerPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Icon
                            icon="mdi:check-circle"
                            className="text-[#007cae] mt-0.5 shrink-0"
                            width={15}
                          />
                          <span className="text-slate-700 text-sm">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Customer side */}
                  <div className="bg-slate-50 border border-slate-200 rounded-[6px] p-4">
                    <p className="text-slate-500 text-xs font-extrabold uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Icon icon="mdi:account-eye-outline" width={14} />
                      Customer Experience
                    </p>
                    <ul className="space-y-2">
                      {uc.customerPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Icon
                            icon="mdi:check-circle"
                            className="text-slate-400 mt-0.5 shrink-0"
                            width={15}
                          />
                          <span className="text-slate-600 text-sm">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
