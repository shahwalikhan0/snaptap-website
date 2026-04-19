"use client";

import { Icon } from "@iconify/react";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How SnapTap Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A simple, streamlined process to bring your products into the
            augmented world.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-[#007cae]/20 w-4/5 mx-auto -z-0"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: "mdi:cube-scan",
                step: "Step 1",
                title: "Scan Products",
                desc: "Businesses capture products using phone depth sensors or photogrammetry.",
              },
              {
                icon: "mdi:cube-send",
                step: "Step 2",
                title: "Generate 3D Model",
                desc: "SnapTap automatically builds optimized, realistic, true to size AR models.",
              },
              {
                icon: "mdi:rocket-launch-outline",
                step: "Step 3",
                title: "Publish Anywhere",
                desc: "Deploy to marketplace, websites, QR menus, or in-store displays.",
              },
              {
                icon: "mdi:augmented-reality",
                step: "Step 4",
                title: "Customers Experience",
                desc: "Customers place products in their real environment before buying.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-[6px] bg-white border-4 border-[#007cae]/10 shadow-lg flex items-center justify-center mb-4 sm:mb-6 text-[#007cae] group transition-all hover:border-[#007cae] hover:scale-110">
                  <Icon icon={item.icon} width={28} className="sm:hidden" />
                  <Icon
                    icon={item.icon}
                    width={40}
                    className="hidden sm:block"
                  />
                </div>
                <span className="text-sm font-bold text-[#007cae] tracking-wider uppercase mb-2">
                  {item.step}
                </span>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
