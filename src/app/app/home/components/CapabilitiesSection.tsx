"use client";

import { Icon } from "@iconify/react";

export function CapabilitiesSection() {
  return (
    <section
      className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden"
      style={{ background: "#020d14" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,124,174,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[#007cae] text-sm font-bold uppercase tracking-widest mb-3">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
            Everything Your Business Needs for AR
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            One platform. All the tools to create, manage, and deliver
            world-class augmented reality experiences — at any scale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {[
            {
              icon: "mdi:cube-scan",
              title: "Simple 3D Scanning",
              desc: "No specialized equipment needed. Use any iPhone Pro or Pro Max with iOS 18+ to capture high-quality 3D product models in minutes using the built-in LiDAR sensor.",
            },
            {
              icon: "mdi:augmented-reality",
              title: "True-to-Scale AR Placement",
              desc: "Products are rendered at an exact 1:1 scale in the real world, giving customers a precise sense of size, fit, and proportion before buying.",
            },
            {
              icon: "mdi:qrcode",
              title: "Instant QR Deployment",
              desc: "QR codes are generated automatically for every AR model. Print them on menus, price tags, packaging, or in-store displays — no app download required.",
            },
            {
              icon: "mdi:web",
              title: "Embed 3D Models",
              desc: "Simply embed the generated 3D model directly into your existing website or e-commerce store with the provided model link.",
            },
            {
              icon: "mdi:buffer",
              title: "Inventory Management",
              desc: "Manage your entire 3D product catalog from one dashboard. Organize, update, and publish AR assets across multiple channels with ease.",
            },
            {
              icon: "mdi:chart-timeline-variant",
              title: "Analytics & Insights",
              desc: "Track AR views, QR scans, product interaction rates, and conversion attribution for every asset in your catalog — in real time.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-[#007cae]/40 hover:bg-white/10 transition-all group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-[#007cae]/20 flex items-center justify-center mb-5 group-hover:bg-[#007cae]/30 transition-all">
                <Icon
                  icon={feature.icon}
                  className="text-[#007cae]"
                  width={26}
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
