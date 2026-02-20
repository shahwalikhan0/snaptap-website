"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

export default function Page() {
  const router = useRouter();

  const features = [
    {
      title: "Marketplace Platform",
      desc: "For e-commerce brands and individual sellers seeking enhanced product visualization. The Admin App allows brands and merchants to scan products to create AR models and publish listings directly on the SnapTap marketplace.",
      bullets: [
        "Scan products to generate AR models",
        "Publish listings on the marketplace",
        "Customers visualize products in their real space",
        "Direct customer-to-seller contact",
      ],
      image: "/assets/marketplace_1.png",
      imageAlt: "SnapTap Marketplace Platform",
      reverse: false,
    },
    {
      title: "Restaurant Menu Virtualization",
      desc: "SnapTap digitizes complete restaurant menus into 3D AR models. Generates QR codes for printing on physical menus, allowing customers to view realistic 3D representations of dishes before ordering.",
      bullets: [
        "Digitize complete menus into 3D AR",
        "Auto-generate QR codes for physical menus",
        "Customers scan to preview dishes before ordering",
        "Boosts ordering confidence and engagement",
      ],
      image: "/assets/dining_2.png",
      imageAlt: "Restaurant Menu in AR",
      reverse: true,
    },
    {
      title: "Business Product Virtualization",
      desc: "Businesses — furniture stores, retail shops, showrooms — get their product catalogs converted to interactive AR models that integrate into existing e-commerce websites. QR codes are provided for in-store displays and marketing materials.",
      bullets: [
        "Convert product catalogs to AR models",
        "Embed AR directly into existing websites",
        "QR codes for in-store and marketing use",
        "Works for furniture, retail, showrooms & more",
      ],
      image: "/assets/scan_view_3.png",
      imageAlt: "Business Product Virtualization",
      reverse: false,
    },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-white">

      {/* HERO SECTION */}
      <section className="pt-36 pb-24 px-6 md:px-12 bg-gradient-to-b from-slate-50 to-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#007cae]/10 text-[#007cae] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Icon icon="mdi:augmented-reality" width={16} />
            Product Overview
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Experience the Future of{" "}
            <span className="text-[#007cae]">3D Commerce</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            SnapTap removes the guesswork from online and in-person shopping by letting customers place accurate, scaled AR representations of products in their real environment before purchasing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/app/sign-up")}
              className="bg-[#007cae] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#006080] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => router.push("/app/pricing")}
              className="border border-slate-200 text-slate-700 font-semibold px-8 py-3.5 rounded-full hover:bg-slate-50 transition-all"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-24">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className={`flex flex-col ${feature.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Text */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[#007cae]/10 text-[#007cae] text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                  Use Case {idx + 1}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  {feature.title}
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  {feature.desc}
                </p>
                <ul className="space-y-3">
                  {feature.bullets.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Icon icon="mdi:check" className="text-green-600" width={13} />
                      </div>
                      <span className="text-slate-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className="flex-1 w-full">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    width={700}
                    height={470}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 px-6 md:px-12 bg-[#007cae] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3" />
        <div className="relative max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Bring Your Products Into the Real World?
          </h2>
          <p className="text-xl text-blue-50 mb-10 max-w-2xl mx-auto">
            Join businesses using SnapTap to deliver immersive product experiences customers can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/app/sign-up")}
              className="bg-white text-[#007cae] font-bold py-4 px-10 rounded-full hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Get Started Free
            </button>
            <button
              onClick={() => router.push("/navigations/contact")}
              className="bg-transparent border-2 border-white/40 text-white font-bold py-4 px-10 rounded-full hover:bg-white/10 transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
