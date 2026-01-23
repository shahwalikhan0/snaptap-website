"use client";

import { useState, useEffect } from "react";
import { Col, Row, Typography, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { FaRocket, FaCogs, FaBuilding } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { useAdmin } from "../../hooks/useAdminContext";
import { toast } from "react-toastify";

const { Title } = Typography;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Plan {
  id: number;
  name: string;
  price: number; // assuming monthly price
  features: string[] | string;
  description?: string;
}

const getIcon = (id: number) => {
  switch (id) {
    case 1:
      return <FaRocket size={28} className="text-[#00A8DE]" />;
    case 2:
      return <FaCogs size={28} className="text-[#00A8DE]" />;
    case 3:
      return <FaBuilding size={28} className="text-[#00A8DE]" />;
    default:
      return <FaRocket size={28} className="text-[#00A8DE]" />;
  }
};

export default function PricingComponent() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [plans, setPlans] = useState<Plan[]>([]);
  const router = useRouter();
  const { isLoggedIn, token, setBrand, Brand } = useAdmin();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/package`);
        if (res.data) {
          // Filter for IDs 1, 2, 3 just in case, though server handles it
          const filtered = res.data.filter((p: Plan) => [1, 2, 3].includes(p.id));
          setPlans(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch plans", error);
      }
    };
    fetchPlans();
  }, []);

  const handleSelectPlan = async (plan: Plan) => {
    if (!isLoggedIn) {
      router.push("/app/login");
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/brand/update-detail`,
        { subscribed_package_id: plan.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.data) {
        toast.success(`Successfully subscribed to ${plan.name}`);
        if (Brand) {
            setBrand({ ...Brand, subscribed_package_id: plan.id });
        }
      } else {
        toast.error("Failed to update plan");
      }
    } catch (error) {
      console.error("Plan update error:", error);
      if (axios.isAxiosError(error) && error.response) {
         toast.error(error.response.data?.error || "Failed to update plan");
      } else {
         toast.error("Failed to update plan");
      }
    }
  };

  return (
    <div className="text-[#007cae] text-center px-4 pb-20 max-w-screen-xl mx-auto">
      <Title level={2} style={{ color: "#007cae", marginBottom: 40 }}>
        Choose the Plan That’s Right for You
      </Title>

      {/* Custom Toggle Switch */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div
          style={{
            width: "220px",
            margin: "0 auto",
            backgroundColor: "#e0e0e0",
            borderRadius: "30px",
            display: "flex",
            cursor: "pointer",
            position: "relative",
            padding: "5px",
          }}
          onClick={() => setIsAnnual(!isAnnual)}
        >
          <div
            style={{
              position: "absolute",
              top: "5px",
              left: isAnnual ? "110px" : "5px",
              width: "105px",
              height: "40px",
              backgroundColor: "#00A8DE",
              borderRadius: "25px",
              transition: "left 0.3s ease-in-out",
            }}
          />
          <div
            style={{
              width: "110px",
              textAlign: "center",
              zIndex: 1,
              color: isAnnual ? "#000" : "#fff",
              fontWeight: !isAnnual ? "bold" : "normal",
              lineHeight: "40px",
            }}
          >
            Monthly
          </div>
          <div
            style={{
              width: "110px",
              textAlign: "center",
              zIndex: 1,
              color: isAnnual ? "#fff" : "#000",
              fontWeight: isAnnual ? "bold" : "normal",
              lineHeight: "40px",
            }}
          >
            Annual
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <Row
        gutter={[24, 24]}
        justify="center"
        className="max-w-6xl mx-auto w-full px-4"
      >
        {plans.map((plan, index) => (
          <Col xs={24} sm={12} md={8} key={plan.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white/10 backdrop-blur-xl text-[#007cae] rounded-2xl shadow-xl px-6 py-8 border border-white/30 transition-all ${
                plan.id === 2 ? "ring-2 ring-[#00A8DE]" : ""
              }`}
            >
              {/* Recommended Ribbon */}
              {plan.id === 2 && (
                <div className="absolute top-4 right-4 bg-[#00A8DE] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Recommended
                </div>
              )}

              <div className="flex items-center justify-center gap-2 mb-4">
                {getIcon(plan.id)}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
              </div>
              <div className="text-xl font-bold mb-1">
                {isAnnual ? `$${(plan.price * 10).toFixed(2)}` : `$${plan.price}`}
              </div>
              <p className="text-sm mb-4">
                {isAnnual ? "per year" : "per month"}
              </p>

              <ul className="text-left space-y-2 mb-6">
                {(Array.isArray(plan.features)
                  ? plan.features
                  : (plan.features || "").split(",")
                ).map((feature: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <CheckOutlined className="mr-2 mt-1 text-green-500" />
                    {feature.trim()}
                  </li>
                ))}
              </ul>

              <Button
                block
                onClick={() => handleSelectPlan(plan)}
                className="bg-[#00A8DE] hover:bg-[#007cae] text-white font-semibold py-2 rounded-full transition duration-300"
              >
                {isLoggedIn && Brand?.subscribed_package_id === plan.id ? "Current Plan" : "Select Plan"}
              </Button>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
