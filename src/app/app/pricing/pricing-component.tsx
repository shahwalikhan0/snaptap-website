"use client";

import { useState, useEffect } from "react";
import { Row, Typography } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAdmin } from "../../hooks/useAdminContext";
import { toast } from "react-toastify";
import { PlanType } from "../types/plan";
import { PlanCard } from "./components/PlanCard";
import { CustomPlanCard } from "./components/CustomPlanCard";
import { changePlan } from "../subscription-page/services/subscriptionApi";
import {
  fetchPlans,
  updatePlanDetail,
  fetchCustomPlanQuote,
} from "./services/pricingApi";

const { Title } = Typography;

export default function PricingComponent() {
  /* Custom Plan State — the price is quoted by the server so the formula and
     the brand's regional rate live in exactly one place. */
  const [customScans, setCustomScans] = useState(81);
  const [customPrice, setCustomPrice] = useState(0);

  const [plans, setPlans] = useState<PlanType[]>([]);
  const [loadingPlanId, setLoadingPlanId] = useState<number | null>(null);
  const router = useRouter();
  const { isLoggedIn, setBrand, Brand } = useAdmin();

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const filtered = await fetchPlans();
        setPlans(filtered);
      } catch (err: unknown) {
        console.error("Failed to fetch plans", err);

        // Check for network/server errors
        if (axios.isAxiosError(err)) {
          if (
            err.code === "ERR_NETWORK" ||
            err.message?.includes("Network Error")
          ) {
            toast.error(
              "Server is not accessible. Please check your connection and try again.",
            );
          } else if (!err.response) {
            toast.error("Cannot reach the server. Please try again later.");
          } else {
            toast.error("Failed to fetch pricing plans. Please try again.");
          }
        } else {
          toast.error("Failed to fetch pricing plans. Please try again.");
        }
      }
    };
    loadPlans();
  }, []);

  // Re-quote the custom plan whenever the scan slider moves (debounced so
  // dragging doesn't fire a request per pixel).
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomPlanQuote(customScans)
        .then((quote) => setCustomPrice(quote.amount))
        .catch((err: unknown) =>
          console.error("Failed to fetch custom plan quote", err),
        );
    }, 250);
    return () => clearTimeout(timer);
  }, [customScans]);

  const handleSelectPlan = async (plan: PlanType) => {
    if (!isLoggedIn) {
      localStorage.setItem("selectedPlanId", plan.id.toString());
      if (plan.id === 4) {
        localStorage.setItem("selectedPlanScans", customScans.toString());
      }
      router.push("/app/sign-up");
      return;
    }

    setLoadingPlanId(plan.id);

    // Plan changes go through /subscription/change-plan. The old path wrote
    // subscribed_package_id straight onto brand_detail, which the server no
    // longer accepts — a plan and the inventory it buys have to move together,
    // and money has to change hands for an upgrade.
    const { data, error } = await changePlan({
      packageId: plan.id,
      totalScans: plan.id === 4 ? customScans : undefined,
    });
    setLoadingPlanId(null);

    if (error) {
      if (error.needsSubscribe) {
        toast.info("Start your subscription from the subscription page first.");
        router.push("/app/subscription-page");
        return;
      }
      toast.error(error.message, { autoClose: error.overCap ? 8000 : 5000 });
      return;
    }

    if (data?.scheduled) {
      toast.success(data.message || `Switching to ${plan.name} at your next renewal.`);
      if (Brand) setBrand({ ...Brand, pending_package_id: plan.id });
      return;
    }

    toast.success(`You're on ${plan.name}.`);
    if (Brand) {
      setBrand({ ...Brand, subscribed_package_id: plan.id, pending_package_id: null });
    }
  };

  return (
    <div className="text-snaptap-blue-dark text-center px-2 sm:px-4 pb-20 max-w-screen-xl mx-auto">
      <Title level={2} className="!text-snaptap-blue-dark !mb-10 font-bold">
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
