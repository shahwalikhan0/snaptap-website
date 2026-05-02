"use client";

import { motion } from "framer-motion";
import {
  MailOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { FaApple } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0f18] text-slate-300 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#007cae]/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#007cae]/5 rounded-full blur-3xl translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 mb-10">
          {/* Brand Identity */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2 group w-fit">
              <div className="relative w-8 h-8">
                <Image
                  src="/assets/icon.png"
                  alt="SnapTap"
                  fill
                  className="object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 group-hover:to-[#00A8DE] transition-all duration-500 tracking-tight">
                SnapTap
              </span>
            </a>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Transforming physical retail through immersive AR experiences.
              <span className="text-slate-200 block mt-1 font-medium">
                You scan, we process — your customers experience.
              </span>
            </p>
            <div className="flex items-center gap-3 text-lg mt-2">
              <a
                href="https://www.instagram.com/snaptappk/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[6px] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#007cae] hover:border-[#007cae] hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <InstagramOutlined />
              </a>
              <a
                href="mailto:admin@snaptap.pk"
                className="w-8 h-8 rounded-[6px] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#007cae] hover:border-[#007cae] hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <MailOutlined />
              </a>
              <a
                href="https://www.linkedin.com/company/snaptappk"
                target="_blank"
                className="w-8 h-8 rounded-[6px] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#007cae] hover:border-[#007cae] hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <LinkedinOutlined />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">
              Product
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs font-medium">
              <li>
                <a
                  href="/app/product"
                  className="hover:text-snaptap-blue transition-colors"
                >
                  Platform
                </a>
              </li>
              <li>
                <a
                  href="/app/inventory"
                  className="hover:text-snaptap-blue transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/app/pricing"
                  className="hover:text-snaptap-blue transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/app/docs"
                  className="hover:text-snaptap-blue transition-colors"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs font-medium">
              <li>
                <a
                  href="/app/solara"
                  className="hover:text-snaptap-blue transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/navigations/contact"
                  className="hover:text-snaptap-blue transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/navigations/privacy"
                  className="hover:text-snaptap-blue transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/navigations/terms"
                  className="hover:text-snaptap-blue transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">
              Get Started
            </h3>
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-5 rounded-[6px] backdrop-blur-md shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00A8DE]/0 via-[#00A8DE]/10 to-[#00A8DE]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <p className="text-xs text-slate-300 mb-4 font-medium italic relative z-10">
                &quot;Bring your products to life in minutes.&quot;
              </p>
              <div className="flex flex-col gap-2 relative z-10">
                <a
                  href="https://apps.apple.com/pk/app/snaptap-admin/id6759855355"
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-white text-[#0a0f18] py-2.5 rounded-[6px] text-sm font-bold hover:bg-slate-200 transition-colors shadow-lg"
                >
                  <FaApple className="text-lg" />
                  Download on App Store
                </a>
                <a
                  href="/app/sign-up"
                  className="flex items-center justify-center gap-2 text-[#00A8DE] text-sm font-bold px-3 py-1.5 hover:text-white transition-colors group/link"
                >
                  Seller Registration{" "}
                  <ArrowRightOutlined className="text-xs group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007cae] flex-shrink-0" />
              <p className="text-[11px] text-slate-400 flex-1">
                162, Ali Town, Lahore, 54000
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-slate-500 tracking-wide">
            © {currentYear} SNAPTAP TECHNOLOGIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Systems Active
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
