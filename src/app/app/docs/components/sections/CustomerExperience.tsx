"use client";

import { Icon } from "@iconify/react";
import { SectionHeading } from "../shared";

export function CustomerExperience() {
  return (
    <section id="customer" className="mb-16 scroll-mt-28">
      <SectionHeading>Customer Experience</SectionHeading>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
        From a customer's perspective, SnapTap is completely invisible — they
        just point their camera at a code and the product appears in their
        world.
      </p>

      <div className="space-y-4">
        {[
          {
            icon: "mdi:qrcode-scan",
            title: "Scan a QR Code",
            desc: "Customers use their native camera app (no QR reader needed on modern phones) to scan the SnapTap QR code printed on a menu, label, or display. They're taken directly to the product's AR viewer page.",
          },
          {
            icon: "mdi:augmented-reality",
            title: "AR Launches Automatically",
            desc: "On iOS, Apple Quick Look launches immediately after the 3D model loads. On Android, Google Scene Viewer opens via an intent. There is no manual 'enter AR' button to press — it just works.",
          },
          {
            icon: "mdi:ruler-square",
            title: "True 1:1 Scale Placement",
            desc: "The product is placed in the camera view at exact real-world size. A chair looks exactly as big as a real chair. A dish appears the exact size as it would on the table. No estimation needed.",
          },
          {
            icon: "mdi:star-outline",
            title: "Rate and Review (coming soon)",
            desc: "Logged-in customers can leave a 1–5 star rating and a written review on any product they've experienced. Ratings are visible on the product listing and sent as a notification to the seller.",
          },
          {
            icon: "mdi:heart-outline",
            title: "Save Favorites (coming soon)",
            desc: "Logged-in customers can save products to their favorites list to revisit or compare later.",
          },
          {
            icon: "mdi:chat-outline",
            title: "Contact the Seller (coming soon)",
            desc: "From any product listing on the SnapTap marketplace, customers can contact the seller directly. No middleman, no e-commerce checkout required — just direct communication.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 sm:p-5 rounded-[6px] border border-slate-100 bg-slate-50 hover:border-[#007cae]/20 hover:bg-white transition-all"
          >
            <div className="w-10 h-10 rounded-[6px] bg-[#007cae]/10 flex items-center justify-center shrink-0">
              <Icon icon={item.icon} className="text-[#007cae]" width={20} />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm mb-1">
                {item.title}
              </p>
              <p className="text-slate-500 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
