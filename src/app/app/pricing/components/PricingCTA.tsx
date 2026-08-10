"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export function PricingCTA() {
  const router = useRouter();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* Left: Start Free Trial */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready to transform how customers see your products?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Join businesses using SnapTap to create immersive AR experiences
            that remove guesswork from shopping.
          </p>
          <button
            onClick={() => router.push("/app/sign-up")}
            className="bg-snaptap-blue-dark text-white font-semibold px-10 py-4 rounded-brand hover:bg-snaptap-blue-deep transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Started as Seller
          </button>
        </div>

        {/* Right: Enterprise card */}
        <div className="bg-white rounded-brand p-6 sm:p-8 border border-slate-200 shadow-md">
          <div className="w-12 h-12 rounded-brand bg-snaptap-blue-dark/10 flex items-center justify-center mb-5">
            <Icon
              icon="mdi:office-building-outline"
              className="text-snaptap-blue-dark"
              width={26}
            />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Need enterprise or custom solutions?
          </h3>
          <p className="text-slate-600 mb-6">
            For large catalogs, white-label solutions, or custom integrations,
            our team can build a tailored AR solution for your business.
          </p>
          <button
            onClick={() => router.push("/navigations/contact")}
            className="inline-flex items-center gap-2 border border-snaptap-blue-dark text-snaptap-blue-dark font-semibold px-8 py-3 rounded-brand hover:bg-snaptap-blue-dark hover:text-white transition-all"
          >
            Contact Our Team
            <Icon icon="mdi:arrow-right" width={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
