"use client";

import { useState } from "react";
import { Col, Row, Typography, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { FaRocket, FaCogs, FaBuilding } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const { Title } = Typography;

const plans = [
  {
    title: "Go",
    icon: <FaRocket size={28} className="text-[#00A8DE]" />,
    monthly: "$17.99",
    annual: "$119",
    features: [
      "iPad and web-based 3D modelers",
      "Access to 4M+ pre-built 3D models",
      "Unlimited cloud storage",
      "XR viewer for Meta Quest devices",
      "AR mobile viewers for iOS and Android",
    ],
  },
  {
    title: "Pro",
    icon: <FaCogs size={28} className="text-[#00A8DE]" />,
    monthly: "$49.99",
    annual: "$349",
    recommended: true,
    features: [
      "Everything in Go",
      "Desktop 3D modeler",
      "2D design documentation",
      "Quick insights for design research",
      "Access to plugins for extending functionality",
    ],
  },
  {
    title: "Studio",
    icon: <FaBuilding size={28} className="text-[#00A8DE]" />,
    monthly: "N/A",
    annual: "$749",
    features: [
      "Everything in Pro",
      "Import Revit files",
      "Model on point clouds",
      "Real-time visualizations",
      "Photorealistic images and animations",
    ],
  },
];

export default function PricingComponent() {
  const [isAnnual, setIsAnnual] = useState(true);
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push("/navigations/sign-up");
  };

  return (
    <div className="text-[#007cae] text-center px-4 pb-20 max-w-screen-xl mx-auto">
      <Title level={2} style={{ color: "#007cae", marginBottom: 40 }}>
        Choose the Plan That’s Right for You
      </Title>

      {/* Toggle Switch (Reversed to original: Annual on left, Monthly on right) */}
      <div className="flex justify-center my-6">
        <div
          onClick={() => setIsAnnual(!isAnnual)}
          className="flex bg-gray-200 rounded-full px-2 py-1 cursor-pointer relative w-[220px]"
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`absolute top-[4px] w-[105px] h-[36px] rounded-full bg-[#00A8DE] transition-all duration-300 ${
              isAnnual ? "left-[4px]" : "left-[110px]"
            }`}
          />
          <div className="w-1/2 text-center z-10 font-semibold">Annual</div>
          <div className="w-1/2 text-center z-10 font-semibold">Monthly</div>
        </div>
      </div>

      {/* Pricing Cards */}
      <Row
        gutter={[24, 24]}
        justify="center"
        className="max-w-6xl mx-auto w-full px-4"
      >
        {plans.map((plan, index) => (
          <Col xs={24} sm={12} md={8} key={plan.title}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white/10 backdrop-blur-xl text-[#007cae] rounded-2xl shadow-xl px-6 py-8 border border-white/30 transition-all ${
                plan.recommended ? "ring-2 ring-[#00A8DE]" : ""
              }`}
            >
              {/* Recommended Ribbon */}
              {plan.recommended && (
                <div className="absolute top-4 right-4 bg-[#00A8DE] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Recommended
                </div>
              )}

              <div className="flex items-center justify-center gap-2 mb-4">
                {plan.icon}
                <h3 className="text-2xl font-bold">{plan.title}</h3>
              </div>
              <div className="text-xl font-bold mb-1">
                {isAnnual ? plan.annual : plan.monthly}
              </div>
              <p className="text-sm mb-4">
                {isAnnual ? "per year" : "per month"}
              </p>

              <ul className="text-left space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckOutlined className="mr-2 mt-1 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                block
                onClick={handleGetStartedClick}
                className="bg-[#00A8DE] hover:bg-[#007cae] text-white font-semibold py-2 rounded-full transition duration-300"
              >
                Get Started
              </Button>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
