"use client";

import { Icon } from "@iconify/react";
import { SectionHeading, SubHeading, InfoBox, StepList, CheckList } from "../shared";

export function ScanningProducts() {
  return (
    <section id="scanning" className="mb-16 scroll-mt-28">
      <SectionHeading>Scanning Products</SectionHeading>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
        The quality of your final AR product is determined by how you
        scan it. Follow these guidelines to get accurate, photorealistic
        3D models.
      </p>

      <SubHeading id="scan-requirements">
        Device Requirements for Scanning
      </SubHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {[
          {
            icon: "mdi:check-circle",
            title: "Compatible Devices",
            color: "bg-green-50 border-green-200",
            iconColor: "text-green-600",
            items: [
              "Any iPhone Pro / Pro Max with iOS 18 or later",
              "iPhone 15 Pro / Pro Max",
              "iPhone 14 Pro / Pro Max",
              "iPhone 13 Pro / Pro Max",
              "iPhone 12 Pro / Pro Max",
            ],
          },
          {
            icon: "mdi:close-circle",
            title: "NOT Compatible",
            color: "bg-red-50 border-red-100",
            iconColor: "text-red-400",
            items: [
              "Standard iPhone models (no LiDAR)",
              "Any Android device",
              "iPad (scanning not supported in app)",
              "iOS 16 or older",
            ],
          },
        ].map((box, i) => (
          <div key={i} className={`${box.color} border rounded-xl p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <Icon
                icon={box.icon}
                className={box.iconColor}
                width={18}
              />
              <p className="font-bold text-slate-800 text-sm">
                {box.title}
              </p>
            </div>
            <ul className="space-y-1">
              {box.items.map((item, j) => (
                <li key={j} className="text-xs text-slate-600">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SubHeading id="scan-tips">
        Scanning Tips for Best Results
      </SubHeading>
      <div className="space-y-4 mb-4">
        {[
          {
            icon: "mdi:weather-sunny",
            title: "Use Even, Diffused Lighting",
            desc: "Avoid harsh direct sunlight or a single bright spotlight. Soft, even lighting from multiple directions (like overcast daylight or softboxes) gives the LiDAR sensor the most accurate depth data and produces clean textures.",
          },
          {
            icon: "mdi:rotate-3d-variant",
            title: "Walk Completely Around the Object",
            desc: "Move slowly and capture the product from all angles — front, sides, back, top, and any recessed areas. Missing angles will result in holes or flat patches in the final 3D model.",
          },
          {
            icon: "mdi:table-furniture",
            title: "Use a Neutral Background",
            desc: "Place the product on a plain matte surface. Avoid cluttered backgrounds or identical-looking surroundings — the LiDAR sensor needs to distinguish the product from its environment.",
          },
          {
            icon: "mdi:eye-off-outline",
            title: "Avoid Highly Reflective or Transparent Objects",
            desc: "Mirrors, glass, and chrome surfaces confuse LiDAR depth sensors. For such products, consider using a matte spray coating temporarily, or contact support for specialized scanning advice.",
          },
          {
            icon: "mdi:ruler",
            title: "Capture Full Scale",
            desc: "SnapTap renders your product at the exact scale it's scanned. Make sure you capture the entire product (including legs, handles, etc.) consistently, as customers will see it at 1:1 real-world size.",
          },
        ].map((tip, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100"
          >
            <div className="w-9 h-9 rounded-lg bg-[#007cae]/10 flex items-center justify-center shrink-0">
              <Icon
                icon={tip.icon}
                className="text-[#007cae]"
                width={18}
              />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm mb-1">
                {tip.title}
              </p>
              <p className="text-slate-500 text-xs leading-relaxed">
                {tip.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <SubHeading id="scan-upload">Uploading to SnapTap</SubHeading>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">
        Once you finish scanning in the iOS app, you'll upload the model
        along with a product image and details.
      </p>
      <StepList
        steps={[
          {
            title: "Finish Scan in the iOS App",
            desc: "The SnapTap app captures the LiDAR data and generates a model file on your device.",
          },
          {
            title: "Enter Product Details",
            desc: "Add the product name, description, price, and category. Upload a product thumbnail image (used in listings and your dashboard).",
          },
          {
            title: "Choose Visibility",
            desc: "Set the product as Active (visible to customers) or Inactive (draft, not yet visible). You can toggle this anytime from the dashboard.",
          },
          {
            title: "Submit",
            desc: "The app sends the model file and image to the SnapTap server. You'll immediately receive a confirmation — background processing starts right away.",
          },
        ]}
      />
      <InfoBox type="info">
        Uploading uses one scan from your monthly quota. If your quota
        reaches zero, uploads are blocked until your plan renews or you
        upgrade.
      </InfoBox>

      <SubHeading id="scan-area-mode">
        Area Mode Functionality (New)
      </SubHeading>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">
        SnapTap now supports <strong>Area Mode</strong>, designed
        specifically for scanning rooms, portions of rooms, and large
        objects (like furniture or outdoor setups) that don't fit into a
        standard object scan.
      </p>
      <CheckList
        items={[
          "Optimized for large extents: Area Mode maps out wide geometry without restricting you to a single, small bounding box.",
          "Pause and resume: You can pause scanning at any time to move to a better vantage point, then resume without losing progress.",
          "Efficient memory usage: Scans large spaces effectively while ensuring stable performance on your device.",
          "Best for large-scale items: Ideal for big furniture pieces, room layouts, and vehicles.",
        ]}
      />
      <InfoBox type="tip">
        When using Area Mode, ensure smooth movements and capture
        overlapping areas when resuming after a pause. The same lighting
        recommendations apply!
      </InfoBox>
    </section>
  );
}
