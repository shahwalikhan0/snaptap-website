"use client";

import React, { useState } from "react";
import { Card, Row, Col, Typography, Button, Slider, InputNumber, Tag } from "antd";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { PlanType } from "../types/plan";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const features = {
  1: ["Basic 3D tools", "AR previews", "Limited scans", "Basic support"],
  2: ["Full access to 3D tools", "AR previews", "Unlimited scans", "Plugins support"],
  3: ["All features unlocked", "Priority support", "Custom plugins", "Team collaboration"],
};

export default function ChangePlan({ plan }: { plan: PlanType[] | null }) {
  const { Brand, token, setBrand } = useAdmin();
  const [loadingPlanId, setLoadingPlanId] = useState<number | null>(null);

  /* Custom Plan State */
  const [customScans, setCustomScans] = useState(25);
  const PRICE_PER_SCAN = 20;
  const customPrice = customScans * PRICE_PER_SCAN;

  const handleUpdatePlan = async (
    planId: number,
    planName: string,
    customLimit?: number,
  ) => {
    setLoadingPlanId(planId);
    try {
      const payload: any = { subscribed_package_id: planId };
      if (planId === 4 && customLimit) {
        payload.total_scans = customLimit;
      }

      const response = await axios.put(
        `${BASE_URL}/brand/update-detail`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data?.data) {
        toast.success(`Successfully subscribed to ${planName}`);
        if (Brand) {
          setBrand({ ...Brand, subscribed_package_id: planId });
        }
      } else {
        toast.error("Failed to update plan");
      }
    } catch (error) {
      console.error("Plan update error:", error);
      toast.error("Failed to update plan.");
    } finally {
      setLoadingPlanId(null);
    }
  };

  const handleCancelPlan = async () => {
    const totalProducts = (Brand?.active_products || 0) + (Brand?.in_active_products || 0);
    if (totalProducts > 0) {
      toast.error(`You have ${totalProducts} products. Please delete them first.`);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/brand/cancel-plan`,
        { subscribed_package_id: null },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data?.data) {
        toast.success("Successfully unsubscribed from plan");
        if (Brand) {
          setBrand({
            ...Brand,
            subscribed_package_id: null,
            total_scans: 0,
            scans_remaining: 0,
          });
        }
      }
    } catch (error) {
      toast.error("Failed to unsubscribe from plan");
    } finally {
      setLoadingPlanId(null);
    }
  };

  if (!plan || !Brand) return null;

  return (
    <div className="space-y-8">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Change Your Plan</h1>
        <p className="text-slate-500">Pick the best plan for your growing business needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plan?.map((p: PlanType) => (
          <Card
            key={p.id}
            className={`
              rounded-3xl shadow-sm hover:shadow-md transition-all border-slate-100 overflow-hidden
              ${Brand.subscribed_package_id === p.id ? "ring-2 ring-[#00A8DE] border-transparent" : ""}
            `}
          >
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">{p.name}</h3>
                {Brand.subscribed_package_id === p.id && (
                  <Tag color="cyan" className="rounded-full px-3 py-0.5 font-bold uppercase text-[10px] tracking-widest border-none bg-cyan-50 text-cyan-600">Current</Tag>
                )}
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-black text-slate-900">Rs. {p.monthly_price}</span>
                <span className="text-slate-400 font-medium whitespace-nowrap">/ month</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed min-h-[40px]">
                {p.description || "The perfect starting point for your AR journey."}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {(features[p.id as keyof typeof features] || []).map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <Icon icon="mdi:check-circle" className="text-green-500" width={18} />
                  {feature}
                </div>
              ))}
            </div>

            {Brand.subscribed_package_id !== p.id ? (
              <Button
                type="primary"
                block
                size="large"
                loading={loadingPlanId === p.id}
                className="h-12 rounded-xl bg-[#00A8DE] hover:bg-[#007cae] border-none font-bold"
                onClick={() => handleUpdatePlan(p.id, p.name)}
              >
                Upgrade to {p.name}
              </Button>
            ) : (
              <Button
                danger
                block
                size="large"
                className="h-12 rounded-xl font-bold hover:bg-red-50"
                onClick={handleCancelPlan}
              >
                Cancel Subscription
              </Button>
            )}
          </Card>
        ))}

        {/* Custom Plan Selection Card */}
        <Card
          className={`
            rounded-3xl shadow-sm hover:shadow-md transition-all border-slate-100 
            ${Brand.subscribed_package_id === 4 ? "ring-2 ring-[#00A8DE] border-transparent" : "bg-slate-50/50"}
          `}
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Custom Enterprise</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-black text-[#00A8DE]">Rs. {customPrice}</span>
              <span className="text-slate-400 font-medium">/ month</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Number of Scans</span>
                <InputNumber
                  min={21}
                  disabled={Brand.subscribed_package_id === 4}
                  max={1000}
                  value={customScans}
                  onChange={(v) => setCustomScans(v || 21)}
                  className="rounded-lg border-slate-200 w-20"
                />
              </div>
              <Slider
                min={21}
                max={500}
                value={customScans}
                onChange={setCustomScans}
                disabled={Brand.subscribed_package_id === 4}
                className="mb-0"
                trackStyle={{ backgroundColor: "#00A8DE" }}
                handleStyle={{ borderColor: "#00A8DE", backgroundColor: "#00A8DE" }}
              />
            </div>
          </div>

          <Button
            type="primary"
            block
            size="large"
            disabled={Brand.subscribed_package_id === 4}
            loading={loadingPlanId === 4}
            className={`h-12 rounded-xl font-bold ${Brand.subscribed_package_id !== 4 ? "bg-[#00A8DE] hover:bg-[#007cae] border-none" : ""}`}
            onClick={() => handleUpdatePlan(4, "Custom", customScans)}
          >
            {Brand.subscribed_package_id === 4 ? "Currently Active" : "Submit Custom Selection"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
