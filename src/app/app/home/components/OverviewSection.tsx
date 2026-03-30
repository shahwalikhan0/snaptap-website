"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";

export function OverviewSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            One Platform. Multiple AR Solutions.
          </h2>
          <p className="text-lg text-slate-600">
            SnapTap helps businesses digitize physical products into interactive
            3D augmented reality experiences — improving customer confidence,
            reducing returns, and increasing conversions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Marketplace */}
          <div className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="h-48 mb-6 rounded-xl overflow-hidden bg-slate-100 relative">
              <Image
                src="/assets/marketplace.jpg"
                alt="Marketplace"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Icon
                icon="mdi:storefront-outline"
                className="text-[#007cae]"
                width={24}
              />
              Marketplace Platform
            </h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  className="text-[#007cae] mt-1 shrink-0"
                  width={18}
                />
                <span>Businesses scan products → generate AR models</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  className="text-[#007cae] mt-1 shrink-0"
                  width={18}
                />
                <span>Publish listings inside SnapTap marketplace</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  className="text-[#007cae] mt-1 shrink-0"
                  width={18}
                />
                <span>Customers visualize products in their own space</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  className="text-[#007cae] mt-1 shrink-0"
                  width={18}
                />
                <span>Direct customer-to-seller contact</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Restaurant Menu */}
          <div className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="h-48 mb-6 rounded-xl overflow-hidden bg-slate-100 relative">
              <Image
                src="/assets/dining_2.webp"
                alt="Restaurant Menu"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Icon
                icon="mdi:silverware-fork-knife"
                className="text-[#007cae]"
                width={24}
              />
              Restaurant Menu Virtualization
            </h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  className="text-[#007cae] mt-1 shrink-0"
                  width={18}
                />
                <span>Convert full menu into 3D AR dishes</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  className="text-[#007cae] mt-1 shrink-0"
                  width={18}
                />
                <span>Generate QR codes for printed menus</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  className="text-[#007cae] mt-1 shrink-0"
                  width={18}
                />
                <span>
                  Customers scan → view realistic dishes before ordering
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  className="text-[#007cae] mt-1 shrink-0"
                  width={18}
                />
                <span>Improves engagement and ordering confidence</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Business Product */}
          <div className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="h-48 mb-6 rounded-xl overflow-hidden bg-slate-100 relative">
              <Image
                src="/assets/scan_view_3.jpg"
                alt="Business Product"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Icon
                icon="mdi:briefcase-outline"
                className="text-[#007cae]"
                width={24}
              />
              Business Product Virtualization
            </h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  className="text-[#007cae] mt-1 shrink-0"
                  width={18}
                />
                <span>Convert product catalogs to AR models</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  className="text-[#007cae] mt-1 shrink-0"
                  width={18}
                />
                <span>
                  Embed AR directly inside existing e-commerce websites
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  className="text-[#007cae] mt-1 shrink-0"
                  width={18}
                />
                <span>Provide QR codes for in-store and marketing usage</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  className="text-[#007cae] mt-1 shrink-0"
                  width={18}
                />
                <span>
                  Works for furniture, retail, showrooms, and product brands
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
