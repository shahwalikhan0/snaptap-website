"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "antd";

export default function Page() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <div className="relative w-full h-[100vh] overflow-hidden">
        <Image
          src="/assets/marketplace_1.png"
          alt="SnapTap Marketplace"
          fill
          className="object-cover w-full h-full"
          priority
        />

        {/* Glass effect overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center text-center text-white px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white to-[#00A8DE] bg-clip-text text-transparent drop-shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            Experience the Future of 3D Commerce
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl max-w-2xl text-white/90 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            SnapTap brings sellers, shoppers, and businesses into one immersive
            platform — where 3D, AR, and interactivity meet.
          </motion.p>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              type="primary"
              size="large"
              className="rounded-full px-8 py-2 text-base font-semibold shadow-xl animate-bounce"
              style={{
                backgroundColor: "#00A8DE",
                borderColor: "#00A8DE",
              }}
            >
              Explore SnapTap
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* FEATURES SECTION */}
      <section id="features-section" className="w-full flex flex-col">
        {[
          {
            title: "Sell Smarter with SnapTap",
            desc: "As a seller, upload your 3D products to the SnapTap marketplace. Reach a wide audience, add AR capabilities, and maximize visibility.",
            bullets: [
              "Upload 3D products effortlessly",
              "Enable AR previews for customers",
              "Tag by category and reach your niche",
              "Real-time engagement and analytics",
            ],
            reverse: false,
          },
          {
            title: "Explore & Shop in Augmented Reality",
            desc: "Buyers can browse through hundreds of 3D products from different brands and visualize them in their environment before purchasing.",
            bullets: [
              "See products in your real space",
              "Scroll, rotate, zoom in full 3D",
              "Avoid guesswork with accurate sizing",
              "Easy and immersive shopping experience",
            ],
            reverse: true,
          },
          {
            title: "Augmented Menus for Restaurants",
            desc: "Restaurants can partner with SnapTap to digitize their menus. Diners can view realistic 3D dishes and portion sizes before ordering.",
            bullets: [
              "Preview meals in real-time",
              "No more confusion with dish names",
              "Boost customer confidence in orders",
              "Enhanced dining experience",
            ],
            reverse: false,
          },
          {
            title: "Scan, Preview & Share with QR Codes",
            desc: "Shop owners can scan products and generate QR codes. Customers can preview them, even if they’re not physically available.",
            bullets: [
              "Instant QR generation",
              "Great for unavailable stock",
              "Ideal for showrooms & popups",
              "Connects physical to digital",
            ],
            reverse: true,
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            className={`w-full py-20 px-6 sm:px-10 md:px-20 ${
              idx % 2 === 0
                ? "bg-gradient-to-br from-[#FEE2F8] via-white to-[#E0F2FE]"
                : "bg-gradient-to-br from-[#FEF9C3] via-white to-[#CFFAFE]"
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className={`flex flex-col ${
                feature.reverse ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-10 max-w-6xl mx-auto`}
            >
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#00A8DE] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                  {feature.desc}
                </p>
                <ul className="list-disc pl-5 text-left text-gray-600 space-y-1 text-sm sm:text-base">
                  {feature.bullets.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <Image
                  src="/assets/dining_2.png"
                  alt={feature.title}
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
