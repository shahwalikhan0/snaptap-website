"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const DARK_BG = "#020d14";

export default function Page() {
  const router = useRouter();

  // ─── Complete Seller Workflow ────────────────────────────────────────────────
  const workflowSteps = [
    {
      step: "01",
      icon: "mdi:account-plus-outline",
      title: "Create Your Brand Account",
      desc: "Sign up as a seller, verify your email, and choose a subscription plan that matches how many products you plan to list. Plans scale from 10 to unlimited AR scans per month.",
    },
    {
      step: "02",
      icon: "mdi:cube-scan",
      title: "Scan with iPhone LiDAR",
      desc: "Use any iPhone Pro or Pro Max (iOS 18+) with the SnapTap iOS app to capture your physical product. The built-in LiDAR depth sensor records precise geometry, scale, and texture — no photography studio needed.",
    },
    {
      step: "03",
      icon: "mdi:cloud-upload-outline",
      title: "Upload & Auto-Process",
      desc: "The iOS app uploads your scanned model to SnapTap. Our backend automatically converts it to a web-compatible .GLB file, generates a branded QR code, and notifies you the moment your product is live.",
    },
    {
      step: "04",
      icon: "mdi:qrcode",
      title: "Deploy Your QR Code",
      desc: "Each product gets a unique QR code that links directly to an immersive AR viewer page. Print it on menus, price tags, packaging, shelf labels, or marketing materials — no app download needed by the customer.",
    },
    {
      step: "05",
      icon: "mdi:chart-timeline-variant",
      title: "Track Performance",
      desc: "Your dashboard shows real-time AR views per product, monthly billing based on view volume, scan quota remaining, and active vs. inactive product counts — all in one place.",
    },
  ];

  // ─── Platform Capabilities ───────────────────────────────────────────────────
  const platformCaps = [
    {
      icon: "mdi:cube-scan",
      title: "LiDAR-Powered 3D Scanning",
      desc: "Captures true depth, texture, and scale using iPhone Pro's built-in LiDAR sensor. Models are photorealistic and exact — not approximated.",
    },
    {
      icon: "mdi:swap-horizontal",
      title: "Automatic Model Conversion",
      desc: "The scanned model is automatically converted to web-standard format in the background.",
    },
    {
      icon: "mdi:qrcode-plus",
      title: "Auto-Generated QR Codes",
      desc: "Every product instantly gets a unique QR code hosted on SnapTap's CDN. No QR tools required — print it, embed it, or share it directly from your dashboard.",
    },
    {
      icon: "mdi:augmented-reality",
      title: "Cross-Platform AR Viewer",
      desc: "The AR experience works natively: iOS uses Quick Look for seamless AR, Android uses Google Scene Viewer, and desktop shows an interactive 3D viewer — all from the same link.",
    },
    {
      icon: "mdi:buffer",
      title: "Inventory Dashboard",
      desc: "Manage your entire AR product catalog from the SnapTap web dashboard. Toggle products active/inactive, update details, and monitor scan quotas — all from one screen.",
    },
    {
      icon: "mdi:bell-ring-outline",
      title: "Real-Time Notifications",
      desc: "Get notified when a product finishes processing, when conversion fails (with guidance to retry), and when customers leave feedback or ratings on your products.",
    },
    {
      icon: "mdi:web",
      title: "Embeddable AR Viewer",
      desc: "Each 3D model has a shareable URL you can iframe into any existing website or e-commerce store. Customers see and interact with the AR product without leaving your site.",
    },
    {
      icon: "mdi:chart-areaspline",
      title: "View-Based Analytics & Billing",
      desc: "Every QR scan and model view is tracked. Monthly billing reflects your subscription base plus per-view charges beyond your plan — transparent and predictable.",
    },
    {
      icon: "mdi:star-outline",
      title: "Customer Ratings & Feedback",
      desc: "Customers can rate and leave written feedback on products they've experienced in AR. Ratings appear on product listings and notify the brand, building trust and social proof.",
    },
  ];

  // ─── Use Cases ───────────────────────────────────────────────────────────────
  const useCases = [
    {
      icon: "mdi:storefront-outline",
      image: "/assets/marketplace.png",
      tag: "Marketplace",
      title: "Marketplace Platform",
      desc: "Brands scan and publish their products to the SnapTap marketplace. Customers browse AR-enabled listings, visualize items in their real space, and contact sellers directly — no intermediary, no guesswork.",
      sellerPoints: [
        "Publish listings to the SnapTap marketplace",
        "Reach customers actively exploring AR products",
        "Manage your catalog and toggle visibility anytime",
        "Receive direct customer inquiries from your listing",
      ],
      customerPoints: [
        "Browse AR-enabled products from multiple sellers",
        "See items true-to-scale in your own space",
        "Save favorites and compare before buying",
        "Message sellers directly without leaving the app",
      ],
    },
    {
      icon: "mdi:silverware-fork-knife",
      image: "/assets/dining_2.png",
      tag: "Restaurants",
      title: "Restaurant Menu Virtualization",
      desc: "Convert your entire food menu into photorealistic 3D AR models. Guests scan a QR code on the physical menu and see every dish rendered life-size on their table — improving ordering confidence, reducing returns, and boosting upsells.",
      sellerPoints: [
        "Scan each dish and add it to your AR menu",
        "QR codes auto-generated for every dish",
        "Print QR codes directly on physical menus or table cards",
        "Update menu items anytime from your dashboard",
      ],
      customerPoints: [
        "Scan the QR code on a printed menu",
        "See the dish rendered life-size before you order",
        "No app download needed — works in any mobile browser",
        "Make confident choices without wondering about portion size",
      ],
    },
    {
      icon: "mdi:briefcase-outline",
      image: "/assets/scan_view_3.png",
      tag: "Retail & E-Commerce",
      title: "Business Product Virtualization",
      desc: "Furniture stores, showrooms, retail brands, and e-commerce businesses convert their product catalogs into AR. Embed the AR viewer on your own website, or hand out QR codes in-store — no app download required by customers.",
      sellerPoints: [
        "Convert full product catalogs to AR models",
        "Embed the AR viewer directly into your e-commerce site",
        "Print QR codes for in-store shelf tags and marketing materials",
        "Works for furniture, decor, electronics, fashion, and more",
      ],
      customerPoints: [
        "Place furniture and décor to scale in your actual room",
        "See how a product fits your space before purchasing",
        "No special device — any modern iPhone or Android is enough",
        "Dramatically reduces purchase uncertainty and returns",
      ],
    },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section
        className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 relative overflow-hidden text-center"
        style={{ background: DARK_BG }}
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,124,174,0.14) 0%, transparent 70%)",
          }}
        />
        {/* Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px)",
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#007cae]/20 text-[#007cae] text-sm font-bold px-4 py-2 rounded-full mb-6 border border-[#007cae]/30">
              <Icon icon="mdi:augmented-reality" width={16} />
              Product Overview
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
              From Physical Product to{" "}
              <span className="text-[#007cae]">Immersive AR</span>
              <br className="hidden sm:block" /> in Minutes
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-10 max-w-3xl mx-auto">
              SnapTap turns any physical product into a web-based augmented
              reality experience. Sellers scan with iPhone LiDAR, customers view
              it life-size in their real environment — no app download, no
              guesswork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/app/sign-up")}
                className="bg-[#007cae] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#006080] transition-all shadow-lg shadow-[#007cae]/25 hover:shadow-[#007cae]/40 transform hover:-translate-y-0.5"
              >
                Start as a Seller
              </button>
              <button
                onClick={() => router.push("/app/pricing")}
                className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all"
              >
                View Pricing Plans
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stat bar */}
        <div className="relative max-w-4xl mx-auto mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "< 5 min", label: "Scan to AR model" },
            { value: "1:1 Scale", label: "True-to-size placement" },
            { value: "Zero", label: "App downloads needed" },
            { value: "iOS + Android", label: "Native AR on both" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-5 text-center"
            >
              <p className="text-[#007cae] text-xl sm:text-2xl font-extrabold mb-1">
                {stat.value}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS (Seller Workflow) ──────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[#007cae] text-sm font-bold uppercase tracking-widest mb-3">
              For Sellers
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              From Scan to Live AR in 5 Steps
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Everything is automated. You scan, we process — your customers
              experience.
            </p>
          </div>

          <div className="relative">
            {/* Connector on desktop */}
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-[#007cae]/15 w-[85%] mx-auto" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {workflowSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative z-10 bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-[#007cae]/20 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#007cae]/10 flex items-center justify-center shrink-0">
                      <Icon
                        icon={step.icon}
                        className="text-[#007cae]"
                        width={20}
                      />
                    </div>
                    <span className="text-xs font-extrabold text-[#007cae] uppercase tracking-widest">
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ─────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[#007cae] text-sm font-bold uppercase tracking-widest mb-3">
              Use Cases
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              One Platform. Multiple AR Solutions.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Whether you run a restaurant, a retail store, or an online shop —
              SnapTap has a purpose-built AR workflow for you.
            </p>
          </div>

          <div className="space-y-24">
            {useCases.map((uc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col ${idx % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} items-start gap-10 lg:gap-16`}
              >
                {/* Image */}
                <div className="w-full lg:w-[45%] shrink-0">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3] relative">
                    <Image
                      src={uc.image}
                      alt={uc.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute top-4 left-4 bg-[#007cae] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {uc.tag}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-[#007cae]/10 text-[#007cae] text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                    <Icon icon={uc.icon} width={14} />
                    Use Case {idx + 1}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                    {uc.title}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed mb-6">
                    {uc.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Seller side */}
                    <div className="bg-[#007cae]/5 border border-[#007cae]/20 rounded-xl p-4">
                      <p className="text-[#007cae] text-xs font-extrabold uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <Icon icon="mdi:store-outline" width={14} />
                        Seller Workflow
                      </p>
                      <ul className="space-y-2">
                        {uc.sellerPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Icon
                              icon="mdi:check-circle"
                              className="text-[#007cae] mt-0.5 shrink-0"
                              width={15}
                            />
                            <span className="text-slate-700 text-sm">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Customer side */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <p className="text-slate-500 text-xs font-extrabold uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <Icon icon="mdi:account-eye-outline" width={14} />
                        Customer Experience
                      </p>
                      <ul className="space-y-2">
                        {uc.customerPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Icon
                              icon="mdi:check-circle"
                              className="text-slate-400 mt-0.5 shrink-0"
                              width={15}
                            />
                            <span className="text-slate-600 text-sm">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM CAPABILITIES (dark themed) ──────────────────────────────── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden"
        style={{ background: DARK_BG }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,124,174,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px)",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[#007cae] text-sm font-bold uppercase tracking-widest mb-3">
              Platform Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
              Everything Built Into the Platform
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
              SnapTap handles the entire AR pipeline — scanning, processing,
              hosting, delivery, analytics, and billing — so you can focus on
              your products.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {platformCaps.map((cap, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-[#007cae]/40 hover:bg-white/10 transition-all group cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-[#007cae]/20 flex items-center justify-center mb-4 group-hover:bg-[#007cae]/30 transition-all">
                  <Icon icon={cap.icon} className="text-[#007cae]" width={22} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {cap.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {cap.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTION PLANS OVERVIEW ──────────────────────────────────────── */}
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
                scans: "10 scans/mo",
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
                scans: "50 scans/mo",
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
                scans: "Unlimited scans",
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
            your own scan limit (21+) and pay per scan.
          </p>
          <button
            onClick={() => router.push("/app/pricing")}
            className="bg-[#007cae] text-white font-bold px-10 py-3.5 rounded-full hover:bg-[#006080] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            See Full Pricing Details
          </button>
        </div>
      </section>

      {/* ── HOW ARE CUSTOMERS VIEW AR ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[#007cae] text-sm font-bold uppercase tracking-widest mb-3">
              For Customers
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Zero Friction. Full Immersion.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Customers don't need an account, don't need to download anything.
              Scan a QR code and the AR experience launches in their native
              camera app — in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "mdi:qrcode-scan",
                step: "1",
                title: "Scan the QR Code",
                desc: "Point any smartphone camera at the SnapTap QR code on the product, menu, or display.",
              },
              {
                icon: "mdi:cube-outline",
                step: "2",
                title: "3D Model Loads",
                desc: "A high-fidelity 3D model of the product loads instantly in the browser — no app, no login.",
              },
              {
                icon: "mdi:augmented-reality",
                step: "3",
                title: "AR Launches Natively",
                desc: "iOS opens Apple Quick Look; Android opens Google Scene Viewer. The product appears in your real world, at exact scale.",
              },
              {
                icon: "mdi:rotate-3d-variant",
                step: "4",
                title: "Walk Around & Decide",
                desc: "Reposition, resize, and walk around the product. See it exactly as it would look in your space — then buy with confidence.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#007cae]/20 transition-all bg-slate-50"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#007cae]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon
                    icon={item.icon}
                    className="text-[#007cae]"
                    width={26}
                  />
                </div>
                <span className="text-xs font-extrabold text-[#007cae] uppercase tracking-widest block mb-2">
                  Step {item.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden"
        style={{ background: DARK_BG }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,124,174,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#007cae]/40 to-transparent" />

        <div className="relative max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
            Ready to Bring Your Products Into the Real World?
          </h2>
          <p className="text-base sm:text-xl text-slate-400 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join businesses using SnapTap to deliver immersive AR product
            experiences that customers trust — and keep coming back for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/app/sign-up")}
              className="bg-[#007cae] text-white font-bold py-4 px-10 rounded-full hover:bg-[#006080] transition-all shadow-xl shadow-[#007cae]/20 hover:shadow-[#007cae]/40 transform hover:-translate-y-1"
            >
              Become a Seller
            </button>
            <button
              onClick={() => router.push("/navigations/contact")}
              className="bg-white/10 border border-white/20 text-white font-bold py-4 px-10 rounded-full hover:bg-white/15 transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
