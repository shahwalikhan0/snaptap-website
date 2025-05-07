"use client";

import React, { useEffect, useRef, useState } from "react";
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

// Constants
const CARD_WIDTH = 300;
const VISIBLE_CARDS = 3;
const SLIDE_INTERVAL = 3000;

const Clients = () => {
  const controls = useAnimation();
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clone first 3 cards for seamless looping
  const extendedClients = [...clients, ...clients.slice(0, VISIBLE_CARDS)];

  useEffect(() => {
    const totalSlides = clients.length;

    const slide = async () => {
      let currentIndex = 0;

      while (true) {
        await new Promise((res) => setTimeout(res, SLIDE_INTERVAL));

        currentIndex++;
        setIndex(currentIndex);

        await controls.start({
          x: -currentIndex * CARD_WIDTH,
          transition: { duration: 1 },
        });

        // Reset when reaching the cloned slides
        if (currentIndex === totalSlides) {
          await new Promise((res) => setTimeout(res, 100)); // small wait before reset
          controls.set({ x: 0 });
          currentIndex = 0;
          setIndex(0);
        }
      }
    };

    slide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full py-20 bg-white px-6">
      <div className="text-center mb-12">
        <Title level={2} className="!text-4xl font-bold">
          Our Clients
        </Title>
        <Paragraph className="text-gray-600 text-lg">
          Trusted by industry leaders around the globe.
        </Paragraph>
      </div>

      <div className="relative overflow-hidden w-full max-w-[1200px] mx-auto">
        <motion.div
          ref={containerRef}
          className="flex gap-6"
          animate={controls}
          initial={{ x: 0 }}
          style={{
            width: `${extendedClients.length * CARD_WIDTH}px`,
          }}
        >
          {extendedClients.map((client, index) => (
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
                className="h-full shadow-md rounded-xl transition-transform duration-300 hover:scale-105"
                cover={
                  <div className="bg-gray-50 rounded-t-xl flex justify-center items-center p-0">
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
                <Title level={4} className="text-center">
                  {client.name}
                </Title>
                <Paragraph className="text-gray-600 text-sm italic text-center">
                  "{client.comment}"
                </Paragraph>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
