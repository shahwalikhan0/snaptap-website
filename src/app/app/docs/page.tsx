"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sections = [
    { id: "introduction", title: "Introduction", icon: "material-symbols:info-outline" },
    { id: "quick-start", title: "Quick Start", icon: "material-symbols:rocket-launch-outline" },
    { id: "asset-management", title: "Asset Management", icon: "material-symbols:inventory-2-outline" },
    { id: "capture-specs", title: "Capture Specifications", icon: "material-symbols:3d-rotation" },
    { id: "quality-factors", title: "Quality Benchmarks", icon: "material-symbols:high-quality-outline" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#f0f9ff] pt-20 sm:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 sm:gap-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#007cae] text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-[#006080] transition"
          >
            <Icon icon={isSidebarOpen ? "material-symbols:close" : "material-symbols:menu"} width={24} />
          </button>

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className={`
              fixed lg:sticky top-20 sm:top-24 left-0 h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] w-64 bg-white/95 lg:bg-white/80 backdrop-blur-lg
              border border-white/30 rounded-r-2xl lg:rounded-2xl shadow-xl p-4 sm:p-6 overflow-y-auto z-40
              transition-transform duration-300 lg:translate-x-0
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            <h2 className="text-2xl font-bold text-[#007cae] mb-6">Documentation</h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3
                    ${activeSection === section.id
                      ? "bg-[#007cae] text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon icon={section.icon} width={20} />
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </nav>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-8 lg:p-12">
            {/* Introduction */}
            <section id="introduction" className="mb-20 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl sm:text-5xl font-bold text-[#007cae] mb-8">
                  Technical Documentation
                </h1>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    SnapTap is a premium AR-ecosystem designed for enterprise e-commerce. By merging advanced photogrammetry with real-time spatial computing, we provide brands with the tools to transition from static imagery to interactive 3D assets.
                  </p>
                  <h3 className="text-2xl font-bold text-[#007cae] mt-10 mb-4">Vision & Impact</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our platform aims to bridge the tactile gap in digital commerce. By enabling high-fidelity 3D visualization, brands can reduce return rates, increase customer engagement, and provide a comprehensive understanding of product scale and texture in a real-world context.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="p-6 bg-white/50 rounded-xl border border-slate-100 italic text-slate-600">
                      "Transforming products into digital twins through seamless spatial integration."
                    </div>
                    <div className="p-6 bg-[#007cae]/5 rounded-xl border border-[#007cae]/10 italic text-[#007cae]">
                      "Empowering buyers with the confidence of physical inspection, digitally."
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-20 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-[#007cae] mb-6">Onboarding Lifecycle</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Deploying SnapTap within your brand involves a streamlined four-step authentication and setup sequence:
                  </p>
                  <div className="space-y-4">
                    {[
                      { step: "01", title: "Brand Registration", desc: "Create your secure enterprise account and establish brand credentials." },
                      { step: "02", title: "Security Verification", desc: "Validate account ownership via mandatory email authentication protocols." },
                      { step: "03", title: "Tier Selection", desc: "Provision your account with a subscription tier that matches your catalog scale." },
                      { step: "04", title: "Activation", desc: "Access the Command Center to begin asset synchronization and management." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-white/40 transition">
                        <span className="text-xl font-black text-[#007cae]/30">{item.step}</span>
                        <div>
                          <h4 className="font-bold text-slate-800">{item.title}</h4>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Asset Management */}
            <section id="asset-management" className="mb-20 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-[#007cae] mb-6">Asset Lifecycle Management</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The SnapTap Command Center provides central oversight for your digital inventory, from initial upload to live AR deployment.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white/80 p-6 rounded-2xl shadow-sm border border-slate-50">
                      <div className="w-10 h-10 bg-[#007cae]/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon icon="material-symbols:sync" className="text-[#007cae]" width={24} />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Automated Conversion</h4>
                      <p className="text-sm text-slate-500">Submited USDZ assets are automatically optimized and converted to GLB formats for universal web compatibility.</p>
                    </div>
                    <div className="bg-white/80 p-6 rounded-2xl shadow-sm border border-slate-50">
                      <div className="w-10 h-10 bg-[#007cae]/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon icon="material-symbols:qr-code" className="text-[#007cae]" width={24} />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Omnichannel Ready</h4>
                      <p className="text-sm text-slate-500">Every catalog item generates unique QR triggers and embed codes for immediate integration into your storefront.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Capture Specs */}
            <section id="capture-specs" className="mb-20 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-[#007cae] mb-6">Capture Specifications</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-8">
                    To maintain asset fidelity, the photogrammetry process must adhere to the following technical parameters:
                  </p>

                  <div className="space-y-8">
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                        <div className="w-1.5 h-6 bg-[#007cae] rounded-full" />
                        Luminance Control
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Assets require uniform, diffused lighting. High-contrast shadows or specular hotspots interfere with texture accuracy. Neutral white balance environments are optimal.
                      </p>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                        <div className="w-1.5 h-6 bg-[#007cae] rounded-full" />
                        Sampling Density (Frames)
                      </h4>
                      <div className="flex gap-4 mt-3">
                        <div className="flex-1 p-4 bg-slate-50 rounded-xl">
                          <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Standard</span>
                          <span className="text-lg font-bold text-slate-700">10-30 Frames</span>
                        </div>
                        <div className="flex-1 p-4 bg-[#007cae]/5 rounded-xl border border-[#007cae]/10">
                          <span className="block text-xs font-bold text-[#007cae] uppercase tracking-wider mb-1">Enterprise</span>
                          <span className="text-lg font-bold text-[#007cae]">50+ Frames</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                        <div className="w-1.5 h-6 bg-[#007cae] rounded-full" />
                        Surface Constraints
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Matte and semi-gloss surfaces provide optimal results. Highly reflective, transparent, or featureless black materials may require visual anchors or specialized treatment.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Quality Benchmarks */}
            <section id="quality-factors" className="mb-16 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-[#007cae] mb-6">Quality Benchmarks</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our model output is benchmarked against physical scale and color accuracy. With optimal capture parameters, SnapTap assets achieve over 90% geometric fidelity.
                  </p>

                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon icon="material-symbols:verified-outline" className="text-[#00A8DE]" width={28} />
                        <h4 className="text-xl font-bold">Standard of Excellence</h4>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-0">
                        Every asset processed via SnapTap undergoes internal validation for texture mapping consistency and geometric stability, ensuring a premium experience on both high-end mobile devices and standard web browsers.
                      </p>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A8DE]/10 blur-3xl -mr-16 -mt-16" />
                  </div>
                </div>
              </motion.div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
