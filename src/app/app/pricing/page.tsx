"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

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

  const goToContact = () => {
    router.push("/contact");
  };

  return (
    <div className="w-full overflow-x-hidden scroll-smooth">
      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full h-screen flex items-center justify-center flex-col px-6 md:px-12 text-center text-white"
        style={{
          background:
            "radial-gradient(circle at 50% 70%, rgb(244, 243, 243), rgb(171, 174, 180))",
        }}
      >
        <Image
          src="/assets/dining_2.png"
          alt="Hero Illustration"
          width={500}
          height={300}
          className="mb-6 rounded-xl shadow-xl"
        />
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-3 text-[#007cae]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Visualise Your Products in AR
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl max-w-2xl mb-6 text-[#1a4f66]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Choose the perfect plan to digitize your inventory. From restaurants to
          retail and e-commerce, we have a solution for you.
        </motion.p>

        {/* Down Scroll Arrow Button */}
        <motion.button
          onClick={scrollToPricing}
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#4b4b4b]/30 border border-[#4b4b4b]/50 text-[#222] p-5 rounded-full hover:bg-[#00A8DE] hover:text-white hover:shadow-lg backdrop-blur-md transition-all duration-300"
        >
          <ArrowDownOutlined className="text-xl" />
        </motion.button>
      </motion.section>

      {/* PRICING SECTION */}
      <motion.section
        ref={pricingRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="pt-[80px] bg-gradient-to-br from-[#b1e4f7] via-[#a0d7f0] to-[#e2f4fb]"
      >
        <PricingComponent />
      </motion.section>

      <motion.section
        className="w-full py-24 px-6 md:px-24 bg-[radial-gradient(circle_at_50%_70%,_rgb(244,243,243),_rgb(171,174,180))] md:min-h-[80vh]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
          {/* Ready to Try Section */}
          <div className="text-[#007cae]">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to transform how customers see your products?
            </h2>
            <p className="text-lg md:text-xl max-w-xl mb-6">
              Join businesses using SnapTap to create immersive AR experiences that remove guesswork from shopping.
            </p>
            <motion.button
              whileHover={{
                scale: 1.08,
                backgroundColor: "#006a9c",
              }}
              whileTap={{ scale: 0.96 }}
              className="transition-all duration-300 px-10 py-4 rounded-full font-semibold text-white bg-[#007cae] border border-[#007cae]"
            >
              Start Free Trial
            </motion.button>
          </div>

          {/* Contact for Custom Plans Section */}
          <motion.div
            className="rounded-2xl p-8 backdrop-blur-xl bg-gradient-to-br from-[#4EC3E0]/70 via-[#29B1DB]/70 to-[#B3E4F5]/70 border border-white/20 hover:shadow-2xl transition-shadow duration-300 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Need enterprise or custom solutions?
            </h3>
            <p className="text-md mb-6">
              For large catalogs, white-label solutions, or custom integrations, our team can create a tailored AR solution for your business.
            </p>
            <motion.button
              onClick={goToContact}
              whileHover={{
                scale: 1.07,
                backgroundColor: "white",
                color: "#007cae",
              }}
              whileTap={{ scale: 0.95 }}
              className="transition-all duration-300 px-8 py-3 rounded-full font-semibold text-[#007cae] border border-[#007cae] bg-white"
            >
              Contact Our Team
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
