"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export function PricingOverview() {
  const router = useRouter();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-slate-50">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block text-[#007cae] text-sm font-bold uppercase tracking-widest mb-3">
          Pricing at a Glance
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Plans That Grow with You
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-12">
          Each plan includes a monthly scan quota for adding new AR products.
          Billing is based on your subscription plus AR view volume — the more
          customers experience your products, the more value you get.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            {
              name: "Starter",
              scans: "20 products",
              highlight: false,
              perks: [
                "Perfect for testing",
                "QR codes included",
                "Web-embeddable AR viewer",
                "Basic dashboard",
              ],
            },
            {
              name: "Growth",
              scans: "50 products",
              highlight: true,
              perks: [
                "Most Popular",
                "Analytics & billing insights",
                "Priority support",
                "API access",
              ],
            },
            {
              name: "Enterprise",
              scans: "80 products",
              highlight: false,
              perks: [
                "Unlimited AR products",
                "Dedicated account manager",
                "Custom integrations",
                "SLA-backed support",
              ],
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 border transition-all ${
                plan.highlight
                  ? "bg-white border-[#007cae] shadow-xl shadow-[#007cae]/15"
                  : "bg-white border-slate-200 hover:border-[#007cae]/30 hover:shadow-md"
              }`}
            >
              {plan.highlight && (
                <span className="inline-block bg-[#007cae] text-white text-xs font-bold px-4 py-1 rounded-full mb-4 uppercase tracking-widest">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                {plan.name}
              </h3>
              <p className="text-[#007cae] font-bold text-sm mb-4">
                {plan.scans}
              </p>
              <ul className="space-y-2 text-left mb-6">
                {plan.perks.map((perk, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Icon
                      icon="mdi:check-circle"
                      className="text-[#007cae] mt-0.5 shrink-0"
                      width={15}
                    />
                    <span className="text-slate-600 text-sm">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-slate-500 text-sm mb-6">
          Need more? We also offer a fully <strong>Custom plan</strong> — set
          your own product limit (81+) and pay per product.
        </p>
        <button
          onClick={() => router.push("/app/pricing")}
          className="bg-[#007cae] text-white font-bold px-10 py-3.5 rounded-full hover:bg-[#006080] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          See Full Pricing Details
        </button>
      </div>
    </section>
  );
}
