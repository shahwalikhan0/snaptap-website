"use client";

import { motion } from "framer-motion";
import {
  MailOutlined,
  InstagramOutlined,
  // FacebookOutlined,
} from "@ant-design/icons";
import { FaApple } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-100">
      {/* Top gradient accent line */}
      <div className="w-full h-[3px] bg-gradient-to-r from-[#007cae] via-[#4dcbe7] to-[#007cae]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">SnapTap</h2>
          <p className="text-sm text-slate-500 mb-3 max-w-xs leading-relaxed">
            Helping businesses bring physical products to life through immersive augmented reality experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm text-slate-500">
            <li>
              <a href="/navigations/privacy" className="hover:text-[#007cae] transition duration-200">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/navigations/terms" className="hover:text-[#007cae] transition duration-200">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/navigations/contact" className="hover:text-[#007cae] transition duration-200">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Store */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest mb-4">
            Connect
          </h3>
          <div className="flex items-center gap-4 text-xl text-slate-400 mb-5">
            <a
              href="mailto:admin@snaptap.pk"
              className="hover:text-[#007cae] transition"
              aria-label="Email"
            >
              <MailOutlined />
            </a>
            <a
              href="https://www.instagram.com/snaptappk/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#007cae] transition"
              aria-label="Instagram"
            >
              <InstagramOutlined />
            </a>
            {/* <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#007cae] transition"
              aria-label="Facebook"
            >
              <FacebookOutlined />
            </a> */}
          </div>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-700 transition"
          >
            <FaApple className="text-base" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] opacity-70">Download on the</span>
              <span className="text-sm font-bold">App Store</span>
            </div>
          </a>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-400">
            © {currentYear} SnapTap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
