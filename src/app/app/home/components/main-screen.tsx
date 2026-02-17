"use client";

import Image from "next/image";
import { Button, Row, Col } from "antd";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useRouter } from "next/navigation";
import Clients from "../../components/client";
import dynamic from "next/dynamic";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { useEffect } from "react";
import { Icon } from "@iconify/react";

const ModelViewer = dynamic(
  () => import("../../components/ModelViewerWrapper"),
  {
    ssr: false,
  }
);

export const MainScreen = () => {
  const router = useRouter();
  const { isLoggedIn } = useAdmin();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/app/inventory");
    }
  }, [isLoggedIn, router]);

  const handleNav = (path: string) => {
    router.push(path);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <Navbar />

      {/* SECTION 1 — HERO */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mb-6">
              See Before You Buy with <span className="text-[#007cae]">SNAPTAP</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto md:mx-0">
              SnapTap transforms physical products into realistic, scalable 3D AR experiences that customers can place in their real environment before purchasing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => handleNav("/app/sign-up")}
                className="bg-[#007cae] text-white font-semibold py-3 px-8 rounded-full hover:bg-[#006080] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Request Demo
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="bg-white text-slate-700 border border-slate-200 font-semibold py-3 px-8 rounded-full hover:bg-slate-50 transition-all shadow hover:shadow-md"
              >
                See How It Works
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="relative rounded-2xl p-2 bg-white/50 backdrop-blur-sm border border-slate-100 shadow-2xl h-[400px] md:h-[500px] w-full items-center justify-center flex">
              {/* Using ModelViewer as the Hero Visual */}
              <div className="w-full h-full rounded-xl overflow-hidden relative bg-gray-50">
                <ModelViewer />
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <span className="bg-black/50 text-white text-sm px-3 py-1 rounded-full backdrop-blur-md">
                    Interactive 3D Preview
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof (Optional but good for SaaS) */}
      {/* <div className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Trusted by innovative businesses</p>
            <Clients /> 
        </div>
      </div> */}

      {/* SECTION 4 — CORE VALUE / USP (Moved) */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
              <Image
                src="/assets/furniture_1.png"
                alt="AR Furniture in Living Room"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white overflow-hidden">
                <p className="font-semibold text-lg drop-shadow-md">Visualize scale & style instantly</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Remove Guesswork from Buying
            </h2>
            <div className="space-y-4">
              {[
                "Customers see true size and scale in real space",
                "Reduces product returns and uncertainty",
                "Improves conversion rates and customer trust",
                "Works for both online and physical stores",
                "No special hardware required (smartphone-based)",
                "One platform → multiple business use cases"
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[#007cae]/10 flex items-center justify-center shrink-0">
                    <Icon icon="mdi:check" className="text-[#007cae]" width={16} />
                  </div>
                  <span className="text-lg text-slate-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — PRODUCT OVERVIEW */
      }
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              One Platform. Three AR Solutions.
            </h2>
            <p className="text-lg text-slate-600">
              SnapTap helps businesses digitize physical products into interactive 3D augmented reality experiences — improving customer confidence, reducing returns, and increasing conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Marketplace */}
            <div className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-48 mb-6 rounded-xl overflow-hidden bg-slate-100 relative">
                <Image src="/assets/marketplace_1.png" alt="Marketplace" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Icon icon="mdi:storefront-outline" className="text-[#007cae]" width={24} />
                Marketplace Platform
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-[#007cae] mt-1 shrink-0" width={18} />
                  <span>Businesses scan products → generate AR models</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-[#007cae] mt-1 shrink-0" width={18} />
                  <span>Publish listings inside SnapTap marketplace</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-[#007cae] mt-1 shrink-0" width={18} />
                  <span>Customers visualize products in their own space</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-[#007cae] mt-1 shrink-0" width={18} />
                  <span>Direct customer-to-seller contact</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Restaurant Menu */}
            <div className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-48 mb-6 rounded-xl overflow-hidden bg-slate-100 relative">
                <Image src="/assets/dining_2.png" alt="Restaurant Menu" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Icon icon="mdi:silverware-fork-knife" className="text-[#007cae]" width={24} />
                Restaurant Menu Virtualization
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-[#007cae] mt-1 shrink-0" width={18} />
                  <span>Convert full menu into 3D AR dishes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-[#007cae] mt-1 shrink-0" width={18} />
                  <span>Generate QR codes for printed menus</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-[#007cae] mt-1 shrink-0" width={18} />
                  <span>Customers scan → view realistic dishes before ordering</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-[#007cae] mt-1 shrink-0" width={18} />
                  <span>Improves engagement and ordering confidence</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Business Product */}
            <div className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-48 mb-6 rounded-xl overflow-hidden bg-slate-100 relative">
                <Image src="/assets/scan_view_3.png" alt="Business Product" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Icon icon="mdi:briefcase-outline" className="text-[#007cae]" width={24} />
                Business Product Virtualization
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-[#007cae] mt-1 shrink-0" width={18} />
                  <span>Convert product catalogs to AR models</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-[#007cae] mt-1 shrink-0" width={18} />
                  <span>Embed AR directly inside existing e-commerce websites</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-[#007cae] mt-1 shrink-0" width={18} />
                  <span>Provide QR codes for in-store and marketing usage</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="mdi:check-circle" className="text-[#007cae] mt-1 shrink-0" width={18} />
                  <span>Works for furniture, retail, showrooms, and product brands</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW SNAP TAP WORKS */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Snap Tap Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A simple, streamlined process to bring your products into the augmented world.
            </p>
          </div>

          <div className="relative">
            {/* Connector Line for Desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-[#007cae]/20 w-4/5 mx-auto -z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: "mdi:cube-scan",
                  step: "Step 1",
                  title: "Scan Products",
                  desc: "Businesses capture products using phone depth sensors or photogrammetry."
                },
                {
                  icon: "mdi:cube-send",
                  step: "Step 2",
                  title: "Generate 3D Model",
                  desc: "SnapTap automatically builds optimized, realistic, scaled AR models."
                },
                {
                  icon: "mdi:rocket-launch-outline",
                  step: "Step 3",
                  title: "Publish Anywhere",
                  desc: "Deploy to marketplace, websites, QR menus, or in-store displays."
                },
                {
                  icon: "mdi:augmented-reality",
                  step: "Step 4",
                  title: "Customers Experience",
                  desc: "Customers place products in their real environment before buying."
                }
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-[#007cae]/10 shadow-lg flex items-center justify-center mb-6 text-[#007cae] group transition-all hover:border-[#007cae] hover:scale-110">
                    <Icon icon={item.icon} width={40} />
                  </div>
                  <span className="text-sm font-bold text-[#007cae] tracking-wider uppercase mb-2">{item.step}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — CORE VALUE / USP (Moved up) */}

      {/* SECTION 5 — USE CASES (Hidden) */}
      {/* <section className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Built for Every Business
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Brands",
                desc: "Increase conversion, reduce returns, enhance online experience.",
                icon: "mdi:shopping-outline",
                color: "bg-blue-50 text-blue-600"
              },
              {
                title: "Restaurants & Cafes",
                desc: "Let customers preview dishes visually before ordering.",
                icon: "mdi:food-outline",
                color: "bg-orange-50 text-orange-600"
              },
              {
                title: "Retail & Showrooms",
                desc: "Bring physical products into interactive digital experiences.",
                icon: "mdi:store-outline",
                color: "bg-purple-50 text-purple-600"
              }
            ].map((useCase, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
                <div className={`w-16 h-16 rounded-2xl ${useCase.color} mx-auto flex items-center justify-center mb-6`}>
                   <Icon icon={useCase.icon} width={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{useCase.title}</h3>
                <p className="text-slate-600">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* SECTION 6 — CALL TO ACTION */}
      <section className="py-24 px-6 md:px-12 bg-[#007cae] relative overflow-hidden">
        {/* Abstract shapes for background interest */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3 text-white"></div>

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Bring Your Products Into the Real World — Digitally
          </h2>
          <p className="text-xl text-blue-50 mb-10 max-w-2xl mx-auto">
            Join businesses using SnapTap to deliver immersive product experiences that customers trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleNav("/app/sign-up")}
              className="bg-white text-[#007cae] font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Request Demo
            </button>
            <button
              // Assuming a contact page or just linking to email/same page for now
              onClick={() => window.location.href = "mailto:sales@snaptap.com"}
              className="bg-transparent border-2 border-white/30 text-white font-bold py-4 px-10 rounded-full hover:bg-white/10 transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
