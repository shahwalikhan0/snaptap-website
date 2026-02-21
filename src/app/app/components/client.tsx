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
    <section className="w-full py-16 bg-white border-y border-slate-100 relative">
      <style>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="text-center mb-10">
        <Title level={2} className="!text-3xl font-bold text-slate-800">
          Trusted by Leaders
        </Title>
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        <div className="overflow-x-auto overflow-y-hidden hide-scrollbar pb-6 px-4">
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
                className="py-2"
              >
                <Card
                  hoverable
                  className="h-full bg-white border border-slate-100 shadow-sm rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  styles={{ body: { padding: '24px' } }}
                  cover={
                    <div className="bg-slate-50 border-b border-slate-100 rounded-t-xl flex justify-center items-center h-[160px] p-4 relative">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={120}
                        height={60}
                        style={{ objectFit: "contain", maxHeight: "80px", width: "auto" }}
                      />
                    </div>
                  }
                >
                  <div className="text-center">
                    <h4 className="font-bold text-slate-800 text-lg mb-2">{client.name}</h4>
                    <Paragraph className="text-slate-500 text-sm italic mb-0">
                      "{client.comment}"
                    </Paragraph>
                  </div>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
