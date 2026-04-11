"use client";

import { useState, useEffect } from "react";
import { Row, Typography } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/app/utils/api";
import { useAdmin } from "../../hooks/useAdminContext";
import { toast } from "react-toastify";
import { Plan } from "./constants/data";
import { PlanCard } from "./components/PlanCard";
import { CustomPlanCard } from "./components/CustomPlanCard";

const { Title } = Typography;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function PricingComponent() {
  /* Custom Plan State */
  const [customScans, setCustomScans] = useState(81);
  const BASE_CUSTOM_PRICE = 6000;
  const customPrice = BASE_CUSTOM_PRICE + (customScans > 109 ? (customScans - 109) * 55 : 0);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlanId, setLoadingPlanId] = useState<number | null>(null);
  const router = useRouter();
  const { isLoggedIn, setBrand, Brand } = useAdmin();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/package`);
        if (res.data) {
          // Filter for IDs 1, 2, 3 just in case, though server handles it
          const filtered = res.data.filter((p: Plan) =>
            [1, 2, 3].includes(p.id),
          );
          setPlans(filtered);
        }
      } catch (error: any) {
        console.error("Failed to fetch plans", error);

        // Check for network/server errors
        if (
          error.code === "ERR_NETWORK" ||
          error.message?.includes("Network Error")
        ) {
          toast.error(
            "Server is not accessible. Please check your connection and try again.",
          );
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

      const response = await api.put("/brand/update-detail", payload);

      if (response.data?.data) {
        toast.success(`Successfully subscribed to ${plan.name}`);
        if (Brand) {
          setBrand({ ...Brand, subscribed_package_id: plan.id });
        }
      } else {
        toast.error("Failed to update plan");
      }
    } catch (error: any) {
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
          <PlanCard
            key={plan.id}
            plan={plan}
            index={index}
            loadingPlanId={loadingPlanId}
            isLoggedIn={isLoggedIn}
            Brand={Brand}
            onSelectPlan={handleSelectPlan}
          />
        ))}

        <CustomPlanCard
          customScans={customScans}
          customPrice={customPrice}
          loadingPlanId={loadingPlanId}
          isLoggedIn={isLoggedIn}
          Brand={Brand}
          onScansChange={(val) => setCustomScans(val || 81)}
          onSelectPlan={handleSelectPlan}
        />
      </Row>
    </div>
  );
}
