"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export function BenefitsSection() {
  const router = useRouter();

  return (
    <section
      className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden"
      style={{ background: "#020d14" }}
    >
      {/* Ambient glow — shifted right for variety */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 70% 50%, rgba(0,124,174,0.10) 0%, transparent 70%)",
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
      {/* Top separator glow line */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#007cae]/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[#007cae] text-sm font-bold uppercase tracking-widest mb-3">
            Who Benefits
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
            Built for Every Side of the Market
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Whether you&apos;re a business listing products or a customer
            discovering them — SnapTap delivers a premium experience tailored to
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Seller Column */}
          <div className="rounded-[6px] border border-[#007cae]/30 bg-[#007cae]/5 p-6 sm:p-8 hover:border-[#007cae]/60 transition-all">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-[6px] bg-[#007cae]/20 flex items-center justify-center shrink-0">
                <Icon
                  icon="mdi:store-outline"
                  className="text-[#007cae]"
                  width={26}
                />
              </div>
              <div>
                <p className="text-[#007cae] text-xs font-bold uppercase tracking-widest mb-0.5">
                  For Sellers
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  Business &amp; Merchant Features
                </h3>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                {
                  icon: "mdi:cube-scan",
                  text: "Scan physical products into photorealistic 3D models using your iPhone's LiDAR sensor — no studio required.",
                },
                {
                  icon: "mdi:qrcode-edit",
                  text: "Auto-generate QR codes for every product to print on packaging, menus, tags, and in-store displays.",
                },
                {
                  icon: "mdi:web",
                  text: "Embed AR model viewers directly into your existing website or e-commerce store with a single link.",
                },
                {
                  icon: "mdi:buffer",
                  text: "Manage your entire AR product catalog from one centralized dashboard — organize, update, and publish with ease.",
                },
                {
                  icon: "mdi:chart-timeline-variant",
                  text: "Track real-time analytics: AR views, QR scans, session durations, and conversion attribution per product.",
                },
                {
                  icon: "mdi:rocket-launch-outline",
                  text: "Publish products to the SnapTap marketplace and reach customers who are actively exploring AR experiences. (coming soon)",
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-[#007cae]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#007cae]/30 transition-all">
                    <Icon
                      icon={item.icon}
                      className="text-[#007cae]"
                      width={16}
                    />
                  </div>
                  <span className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => router.push("/app/sign-up")}
                className="w-full sm:w-auto bg-[#007cae] hover:bg-[#006080] text-white font-bold py-3 px-8 rounded-[6px] transition-all shadow-lg shadow-[#007cae]/20 hover:shadow-[#007cae]/40 hover:-translate-y-0.5 transform text-sm"
              >
                Start as a Seller
              </button>
            </div>
          </div>

          {/* Customer / Viewer Column */}
          <div className="rounded-[6px] border border-white/10 bg-white/5 p-6 sm:p-8 hover:border-white/20 transition-all">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-[6px] bg-white/10 flex items-center justify-center shrink-0">
                <Icon
                  icon="mdi:account-eye-outline"
                  className="text-slate-300"
                  width={26}
                />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-0.5">
                  For Customers
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  Buyer &amp; Viewer Experience
                </h3>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                {
                  icon: "mdi:qrcode-scan",
                  text: "Scan any SnapTap QR code with your smartphone camera — no app download, no account needed.",
                },
                {
                  icon: "mdi:augmented-reality",
                  text: "Place true-to-scale 3D products directly in your real environment through your phone's camera.",
                },
                {
                  icon: "mdi:move-resize",
                  text: "Resize, reposition, and walk around placed AR objects to explore every angle and perspective.",
                },
                {
                  icon: "mdi:eye-check-outline",
                  text: "See exact product dimensions in your actual space before committing to a purchase — zero guesswork.",
                },
                {
                  icon: "mdi:store-search-outline",
                  text: "Browse the SnapTap marketplace to discover AR-enabled products from multiple sellers in one place. (coming soon)",
                },
                {
                  icon: "mdi:chat-outline",
                  text: "Contact sellers directly from a product listing — no middlemen, no friction, just direct communication. (coming soon)",
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white/15 transition-all">
                    <Icon
                      icon={item.icon}
                      className="text-slate-300"
                      width={16}
                    />
                  </div>
                  <span className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => router.push("/app/docs")}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-[6px] transition-all border border-white/20 hover:border-white/40 hover:-translate-y-0.5 transform text-sm"
              >
                Explore as a Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
