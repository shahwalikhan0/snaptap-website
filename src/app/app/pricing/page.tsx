"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import { PricingHero } from "./components/PricingHero";
import { PricingCTA } from "./components/PricingCTA";

const PricingComponent = dynamic(() => import("./pricing-component"), {
  ssr: false,
});

export default function Page() {
  const pricingRef = useRef<HTMLDivElement>(null);

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
      <PricingHero onScrollToPricing={scrollToPricing} />

      <motion.section
        ref={pricingRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 sm:py-16 px-2 sm:px-6 md:px-12 bg-white"
      >
        <PricingComponent />
      </motion.section>

      <PricingCTA />
    </div>
  );
}
