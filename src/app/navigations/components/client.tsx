"use client";

import React, { useRef } from "react";
import { Card, Typography } from "antd";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

const { Title, Paragraph } = Typography;

const clients = [
  {
    name: "Google",
    logo: "/assets/clients/google.png",
    comment:
      "Using their 3D tools helped streamline our workflow dramatically.",
  },
  {
    name: "Zara",
    logo: "/assets/clients/zara.png",
    comment:
      "A visually stunning experience that aligns with our brand's vision.",
  },
  {
    name: "Louis Vuitton",
    logo: "/assets/clients/lv.png",
    comment: "Elegant and powerful – just like our products.",
  },
  {
    name: "Tesla",
    logo: "/assets/clients/tesla.png",
    comment: "Collaborative tools boosted our remote design capabilities.",
  },
  {
    name: "Netflix",
    logo: "/assets/clients/netflix.png",
    comment: "Intuitive and future-focused platform. Our teams love it.",
  },
  {
    name: "Nike",
    logo: "/assets/clients/nike.png",
    comment: "Helped us visualize concepts better and faster than ever before.",
  },
];

const CARD_WIDTH = 300;

const Clients = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full py-20 bg-gradient-to-br from-[#b1e4f7] via-[#a0d7f0] to-[#e2f4fb] px-6 relative">
      {/* Inline style tag for hiding scrollbars */}
      <style>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="text-center mb-12">
        <Title level={2} className="!text-4xl font-bold text-[#007cae]">
          Our Clients
        </Title>
        <Paragraph className="text-text-[#007cae] text-lg">
          Trusted by industry leaders around the globe.
        </Paragraph>
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        {/* Scroll container with hidden scrollbars */}
        <div className="overflow-x-auto overflow-y-hidden hide-scrollbar pb-6">
          <motion.div
            ref={containerRef}
            className="flex gap-6"
            animate={controls}
            initial={{ x: 0 }}
            style={{ width: `${clients.length * CARD_WIDTH}px` }}
          >
            {clients.map((client, index) => (
              <div
                key={index}
                style={{
                  width: `${CARD_WIDTH}px`,
                  minWidth: `${CARD_WIDTH}px`,
                }}
                className="py-4"
              >
                <Card
                  hoverable
                  className="h-full bg-[#c3c4c4] text-[#007cae] shadow-md rounded-xl transition-transform duration-300 hover:scale-106"
                  cover={
                    <div className="bg-[radial-gradient(circle_at_50%_70%,_rgb(244,243,243),_rgb(171,174,180))] rounded-t-xl flex justify-center items-center p-0">
                      <div className="flex justify-center items-center w-full aspect-square">
                        <div className="relative w-[200px] h-[200px]">
                          <Image
                            src={client.logo}
                            alt={client.name}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      </div>
                    </div>
                  }
                >
                  <Title level={4} className="text-center text-[#007cae]">
                    {client.name}
                  </Title>
                  <Paragraph className="text-[#007cae] text-sm italic text-center">
                    {client.comment}
                  </Paragraph>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Custom horizontal scroll bar line */}
        <div className="h-1 mt-2 rounded-full bg-[#00A8DE] w-full opacity-80" />
      </div>
    </section>
  );
};

export default Clients;
