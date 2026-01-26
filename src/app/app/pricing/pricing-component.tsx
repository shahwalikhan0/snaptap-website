"use client";

import { useState, useEffect } from "react";
import { Col, Row, Typography, Button, Slider, InputNumber } from "antd";
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
  monthly_price: number;
  features: string[] | string;
  description?: string;
}

const featuresMap = {
  1: ["Basic 3D tools", "AR previews", "Limited scans", "Basic support"],
  2: [
    "Full access to 3D tools",
    "AR previews",
    "Unlimited scans",
    "Plugins support",
  ],
  3: [
    "All features unlocked",
    "Priority support",
    "Custom plugins",
    "Team collaboration",
  ],
};

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
  /* Custom Plan State */
  const [customScans, setCustomScans] = useState(25);
  const PRICE_PER_SCAN = 20; // Example price factor
  const customPrice = customScans * PRICE_PER_SCAN;

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlanId, setLoadingPlanId] = useState<number | null>(null);
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
      localStorage.setItem("selectedPlanId", plan.id.toString());
      if (plan.id === 4) {
         localStorage.setItem("selectedPlanScans", customScans.toString());
      }
      router.push("/app/sign-up");
      return;
    }

    setLoadingPlanId(plan.id);
    try {
      const payload: any = { subscribed_package_id: plan.id };
      
      // If Custom Plan (ID 4)
      if (plan.id === 4) {
        payload.total_scans = customScans;
      }

      const response = await axios.put(
        `${BASE_URL}/brand/update-detail`,
        payload,
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
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <div className="text-[#007cae] text-center px-4 pb-20 max-w-screen-xl mx-auto">
      <Title level={2} style={{ color: "#007cae", marginBottom: 40 }}>
        Choose the Plan That’s Right for You
      </Title>

      {/* Pricing Cards */}
      <Row
        gutter={[24, 24]}
        justify="center"
        className="max-w-6xl mx-auto w-full px-4"
      >
        {plans.map((plan, index) => (
          <Col xs={24} sm={12} md={6} key={plan.id}>
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
                ${plan.monthly_price}
              </div>
              <p className="text-sm mb-4">
                per month
              </p>

              <ul className="text-left space-y-2 mb-6">
                {featuresMap[plan.id as keyof typeof featuresMap]?.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <CheckOutlined className="mr-2 mt-1 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                block
                loading={loadingPlanId === plan.id}
                onClick={() => handleSelectPlan(plan)}
                className="bg-[#00A8DE] hover:bg-[#007cae] text-white font-semibold py-2 rounded-full transition duration-300"
              >
                {isLoggedIn && Brand?.subscribed_package_id === plan.id ? "Current Plan" : "Select Plan"}
              </Button>
            </motion.div>
          </Col>
        ))}

        {/* Custom Plan Card */}
        <Col xs={24} sm={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative bg-white/10 backdrop-blur-xl text-[#007cae] rounded-2xl shadow-xl px-6 py-8 border border-white/30 transition-all"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <FaCogs size={28} className="text-[#00A8DE]" />
                <h3 className="text-2xl font-bold">Custom</h3>
              </div>
              <div className="text-xl font-bold mb-1">
                ${customPrice}
              </div>
              <p className="text-sm mb-4">
                per month
              </p>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span>Scans:</span>
                    <InputNumber
                        min={21}
                        max={1000}
                        value={customScans}
                        onChange={(v) => setCustomScans(v || 21)}
                        className="w-20"
                    />
                </div>
                <Slider
                    min={21}
                    max={200}
                    value={customScans}
                    onChange={setCustomScans}
                    trackStyle={{ backgroundColor: "#00A8DE" }}
                    handleStyle={{ borderColor: "#00A8DE", backgroundColor: "#00A8DE" }}
                />
              </div>

               <ul className="text-left space-y-2 mb-6">
                  {featuresMap[3].map((feature: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <CheckOutlined className="mr-2 mt-1 text-green-500" />
                      {feature}
                    </li>
                  ))}
              </ul>

              <Button
                block
                loading={loadingPlanId === 4}
                onClick={() => handleSelectPlan({
                    id: 4,
                    name: "Custom",
                    monthly_price: customPrice,
                    features: [],
                })}
                className="bg-[#00A8DE] hover:bg-[#007cae] text-white font-semibold py-2 rounded-full transition duration-300"
              >
                {isLoggedIn && Brand?.subscribed_package_id === 4 ? "Current Plan" : "Select Plan"}
              </Button>
            </motion.div>
        </Col>
      </Row>
    </div>
  );
}
