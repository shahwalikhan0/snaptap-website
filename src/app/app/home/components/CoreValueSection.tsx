"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";

export function CoreValueSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-12">
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <div className="relative rounded-[6px] overflow-hidden shadow-2xl border border-slate-100">
            <Image
              src="/assets/furniture_1.jpg"
              alt="AR Furniture in Living Room"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white overflow-hidden">
              <p className="font-semibold text-lg drop-shadow-md">
                Visualize scale & style instantly
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
            Remove Guesswork from Buying
          </h2>
          <div className="space-y-4">
            {[
              "Customers see true size and scale in real space",
              "Reduces product returns and uncertainty",
              "Improves conversion rates and customer trust",
              "Works for both online and physical stores",
              "No special hardware required (smartphone-based)",
              "One platform → multiple business use cases",
            ].map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-[6px] bg-[#007cae]/10 flex items-center justify-center shrink-0">
                  <Icon
                    icon="mdi:check"
                    className="text-[#007cae]"
                    width={16}
                  />
                </div>
                <span className="text-base sm:text-lg text-slate-700">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
