"use client";

import { motion } from "framer-motion";
import {
  MailOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import { FaApple } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Gradient Pulse Line */}
      <motion.div
        className="w-full h-1 bg-gradient-to-r from-[#00A8DE] via-[#4dcbe7] to-[#00A8DE] animate-pulse"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      />

      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full px-6 py-12 bg-white/30 backdrop-blur-md border-t border-gray-200 shadow-inner text-[#007cae]"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Branding */}
          <div>
            <h2 className="text-xl font-bold">SnapTap</h2>
            <p className="mt-2 text-sm text-[#007cae]/80">
              Empowering 3D product experiences.
            </p>
            <p className="mt-2 text-sm text-[#007cae]/60">
              © {currentYear} SnapTap. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:admin@snaptap.com"
                  className="hover:text-black transition duration-300"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-black transition duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-black transition duration-300"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="mailto:admin@snaptap.com"
                  className="hover:text-black transition duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Store Buttons */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-5 text-2xl justify-center">
              <a
                href="mailto:admin@snaptap.com"
                className="hover:text-black transition"
              >
                <MailOutlined />
              </a>
              <a
                href="https://www.instagram.com/snaptap.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition"
              >
                <InstagramOutlined />
              </a>
              <a
                href="https://www.instagram.com/snaptap.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition"
              >
                <FacebookOutlined />
              </a>
            </div>

            <div className="flex gap-3 mt-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition"
              >
                <FaApple className="text-lg" />
                App Store
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </>
  );
}
