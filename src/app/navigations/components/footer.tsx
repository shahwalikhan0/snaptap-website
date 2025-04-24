// File: src/components/Footer.tsx

"use client";

import { useRouter } from "next/navigation";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiAppstore, SiGoogleplay } from "react-icons/si";

const Footer = () => {
  const router = useRouter();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Product",
      links: [
        { name: "Features", path: "/features" },
        { name: "Pricing", path: "/pricing" },
        { name: "Integrations", path: "/integrations" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", path: "/blog" },
        { name: "Help Center", path: "/help" },
        { name: "Developers", path: "/developers" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Security", path: "/security" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
            <div className="flex flex-col space-y-2">
              {section.links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => router.push(link.path)}
                  className="text-sm text-gray-300 hover:text-white text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <button
            onClick={() => router.push("/facebook")}
            className="text-gray-400 hover:text-white"
            aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </button>
          <button
            onClick={() => router.push("/instagram")}
            className="text-gray-400 hover:text-white"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </button>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => router.push("/app-store")}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
            aria-label="Download on the App Store"
          >
            <SiAppstore size={20} />
            <span>App Store</span>
          </button>
          <button
            onClick={() => router.push("/google-play")}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
            aria-label="Get it on Google Play"
          >
            <SiGoogleplay size={20} />
            <span>Google Play</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SnapTap. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
