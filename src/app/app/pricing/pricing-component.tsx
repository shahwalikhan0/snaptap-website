"use client";

import { useState, useEffect } from "react";
import { Col, Row, Typography, Button, Slider, InputNumber } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { FaRocket, FaCogs, FaBuilding } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import api from "@/app/utils/api";
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
  1: [
    "Up to 10 AR product scans/month",
    "Standard 3D model generation",
    "QR code for each product",
    "Web-embeddable AR viewer",
    "Basic inventory dashboard",
    "Email support",
  ],
  2: [
    "Up to 50 AR product scans/month",
    "High-fidelity 3D model generation",
    "QR codes + direct share links",
    "Web embed + API access",
    "Advanced inventory management",
    "Analytics & conversion tracking",
    "Priority email & chat support",
  ],
  3: [
    "Unlimited AR product scans",
    "Premium 3D model quality",
    "White-label AR viewer",
    "Full API & webhook access",
    "Multi-user team accounts",
    "Custom integrations on request",
    "Dedicated account manager",
    "SLA-backed priority support",
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
      } catch (error: any) {
        console.error("Failed to fetch plans", error);

        // Check for network/server errors
        if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
          toast.error("Server is not accessible. Please check your connection and try again.");
        } else if (!error.response) {
          toast.error("Cannot reach the server. Please try again later.");
        } else {
          toast.error("Failed to fetch pricing plans. Please try again.");
        }
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

      const response = await api.put(
        "/brand/update-detail",
        payload
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
    <div className="text-[#007cae] text-center px-2 sm:px-4 pb-20 max-w-screen-xl mx-auto">
      <Title level={2} className="!text-[#007cae] !mb-10 font-bold">
        Choose the Plan That’s Right for You
      </Title>

      {/* Pricing Cards */}
      <Row
        gutter={[24, 24]}
        justify="center"
        className="max-w-6xl mx-auto w-full px-0 sm:px-4"
      >
        {plans.map((plan, index) => (
          <Col xs={24} sm={12} lg={6} key={plan.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col bg-white text-slate-800 rounded-2xl shadow-md px-5 sm:px-7 py-6 sm:py-8 border transition-all h-full ${plan.id === 2
                ? "border-[#007cae] shadow-[0_8px_30px_rgba(0,124,174,0.18)]"
                : "border-slate-200 hover:border-[#007cae]/40 hover:shadow-lg"
                }`}
            >
              {/* Most Popular badge */}
              {plan.id === 2 && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#007cae] text-white text-xs font-bold px-5 py-1 rounded-full shadow uppercase tracking-widest whitespace-nowrap">
                  Most Popular
                </div>
              )}

              {/* Icon + Name */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${plan.id === 2 ? "bg-[#007cae]/15" : "bg-slate-100"
                  }`}>
                  {getIcon(plan.id)}
                </div>
                <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">${plan.monthly_price}</span>
                  <span className="text-slate-400 font-medium pb-1">/mo</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 mb-6" />

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow text-left">
                {featuresMap[plan.id as keyof typeof featuresMap]?.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckOutlined className="text-green-600 text-[10px]" />
                    </div>
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                block
                size="large"
                loading={loadingPlanId === plan.id}
                onClick={() => handleSelectPlan(plan)}
                className="h-12 font-bold rounded-xl !bg-[#007cae] hover:!bg-[#006080] !text-white !border-none shadow-md transition duration-300"
              >
                {isLoggedIn && Brand?.subscribed_package_id === plan.id ? "✓ Current Plan" : "Get Started"}
              </Button>
            </motion.div>
          </Col>
        ))}

        {/* Custom Plan Card */}
        <Col xs={24} sm={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative flex flex-col bg-white text-slate-800 rounded-2xl shadow-md px-5 sm:px-7 py-6 sm:py-8 border border-slate-200 hover:border-[#007cae]/40 hover:shadow-lg transition-all h-full"
          >
            {/* Icon + Name */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                <FaCogs size={22} className="text-[#007cae]" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Custom</h3>
            </div>

            {/* Price */}
            <div className="mb-2">
              <div className="flex items-end gap-1">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">${customPrice}</span>
                <span className="text-slate-400 font-medium pb-1">/mo</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Based on {customScans} scans</p>
            </div>

            {/* Slider */}
            <div className="my-5 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-600">Monthly Scans</span>
                <InputNumber
                  min={21}
                  max={1000}
                  value={customScans}
                  onChange={(v) => setCustomScans(v || 21)}
                  className="w-20 font-bold"
                />
              </div>
              <Slider
                min={21}
                max={200}
                value={customScans}
                onChange={setCustomScans}
                trackStyle={{ backgroundColor: "#007cae" }}
                handleStyle={{ borderColor: "#007cae", backgroundColor: "#007cae" }}
              />
              <p className="text-[11px] text-slate-400 text-center mt-1">Drag to adjust scan capacity</p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 mb-5" />

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-grow text-left">
              {featuresMap[3].map((feature: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckOutlined className="text-green-600 text-[10px]" />
                  </div>
                  <span className="text-slate-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              block
              size="large"
              loading={loadingPlanId === 4}
              onClick={() => handleSelectPlan({
                id: 4,
                name: "Custom",
                monthly_price: customPrice,
                features: [],
              })}
              className="h-12 font-bold rounded-xl !bg-[#007cae] hover:!bg-[#006080] !text-white !border-none shadow-md transition duration-300"
            >
              {isLoggedIn && Brand?.subscribed_package_id === 4 ? "✓ Current Plan" : "Get Started"}
            </Button>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
}
