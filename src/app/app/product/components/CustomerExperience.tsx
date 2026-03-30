"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export function CustomerExperience() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-[#007cae] text-sm font-bold uppercase tracking-widest mb-3">
            For Customers
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Zero Friction. Full Immersion.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Customers don't need an account, don't need to download anything.
            Scan a QR code and the AR experience launches in their native
            camera app — in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "mdi:qrcode-scan",
              step: "1",
              title: "Scan the QR Code",
              desc: "Point any smartphone camera at the SnapTap QR code on the product, menu, or display.",
            },
            {
              icon: "mdi:cube-outline",
              step: "2",
              title: "3D Model Loads",
              desc: "A high-fidelity 3D model of the product loads instantly in the browser — no app, no login.",
            },
            {
              icon: "mdi:augmented-reality",
              step: "3",
              title: "AR Launches Natively",
              desc: "iOS opens Apple Quick Look; Android opens Google Scene Viewer. The product appears in your real world, at exact scale.",
            },
            {
              icon: "mdi:rotate-3d-variant",
              step: "4",
              title: "Walk Around & Decide",
              desc: "Reposition, resize, and walk around the product. See it exactly as it would look in your space — then buy with confidence.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#007cae]/20 transition-all bg-slate-50"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#007cae]/10 flex items-center justify-center mx-auto mb-4">
                <Icon
                  icon={item.icon}
                  className="text-[#007cae]"
                  width={26}
                />
              </div>
              <span className="text-xs font-extrabold text-[#007cae] uppercase tracking-widest block mb-2">
                Step {item.step}
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
