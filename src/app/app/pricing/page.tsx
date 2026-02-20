"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const PricingComponent = dynamic(() => import("./pricing-component"), {
  ssr: false,
});

export default function Page() {
  const pricingRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToPricing = () => {
    if (pricingRef.current) {
      const offset = 70;
      const top =
        pricingRef.current.getBoundingClientRect().top +
        window.scrollY -
        offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full overflow-x-hidden bg-white">

      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="pt-36 pb-20 px-6 md:px-12 text-center bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#007cae]/10 text-[#007cae] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Icon icon="mdi:tag-outline" width={16} />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Plans That Grow <span className="text-[#007cae]">With You</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            From independent sellers to enterprise teams — choose the plan that fits your business and start bringing your products to life in AR.
          </p>
          <button
            onClick={scrollToPricing}
            className="inline-flex items-center gap-2 bg-[#007cae] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#006080] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            See All Plans
            <Icon icon="mdi:arrow-down" width={18} />
          </button>
        </div>
      </motion.section>

      {/* PRICING CARDS SECTION */}
      <motion.section
        ref={pricingRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-6 md:px-12 bg-white"
      >
        <PricingComponent />
      </motion.section>

      {/* BOTTOM CTA SECTION */}
      <section className="py-24 px-6 md:px-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Start Free Trial */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to transform how customers see your products?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Join businesses using SnapTap to create immersive AR experiences that remove guesswork from shopping.
            </p>
            <button
              onClick={() => router.push("/app/sign-up")}
              className="bg-[#007cae] text-white font-semibold px-10 py-4 rounded-full hover:bg-[#006080] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Free Trial
            </button>
          </div>

          {/* Right: Enterprise card */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#007cae]/10 flex items-center justify-center mb-5">
              <Icon icon="mdi:office-building-outline" className="text-[#007cae]" width={26} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Need enterprise or custom solutions?
            </h3>
            <p className="text-slate-600 mb-6">
              For large catalogs, white-label solutions, or custom integrations, our team can build a tailored AR solution for your business.
            </p>
            <button
              onClick={() => router.push("/navigations/contact")}
              className="inline-flex items-center gap-2 border border-[#007cae] text-[#007cae] font-semibold px-8 py-3 rounded-full hover:bg-[#007cae] hover:text-white transition-all"
            >
              Contact Our Team
              <Icon icon="mdi:arrow-right" width={18} />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
