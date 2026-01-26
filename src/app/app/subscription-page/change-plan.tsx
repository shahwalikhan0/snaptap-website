"use client";

import React, { useState } from "react";
import { Card, Row, Col, Typography, Button, Slider, InputNumber } from "antd";
import { FaCogs, FaRocket, FaBuilding, FaCheck } from "react-icons/fa";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { PlanType } from "../types/plan";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const { Title, Paragraph } = Typography;

const features = {
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

const renderFeatures = (planId: number) => {
  return (
    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-200">
      {features[planId as keyof typeof features].map(
        (feature: string, index: number) => (
          <li className="text-black dark:text-black" key={index}>
            {feature}
          </li>
        )
      )}
    </ul>
  );
};

export default function ChangePlan({ plan }: { plan: PlanType[] | null }) {
  const { Brand, token, setBrand } = useAdmin();
  const [loadingPlanId, setLoadingPlanId] = useState<number | null>(null);

  /* Custom Plan State */
  const [customScans, setCustomScans] = useState(25);
  const PRICE_PER_SCAN = 20; 
  const customPrice = customScans * PRICE_PER_SCAN;

  const handleUpdatePlan = async (planId: number, planName: string, customLimit?: number) => {
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
        }
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
      if (axios.isAxiosError(error) && error.response) {
         toast.error(error.response.data?.error || "Failed to update plan");
      } else {
         toast.error("Failed to update plan");
      }
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
        { subscribed_package_id: null},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.data) {
        toast.success("Successfully unsubscribed from plan");
        if (Brand) {
          setBrand({ ...Brand, subscribed_package_id: null, total_scans: 0, scans_remaining: 0, scans_remaining: 0 });
        }
      } else {
        toast.error("Failed to unsubscribe from plan");
      }
    } catch (error) {
      console.error("Plan update error:", error);
      if (axios.isAxiosError(error) && error.response) {
         toast.error(error.response.data?.error || "Failed to unsubscribe from plan");
      } else {
         toast.error("Failed to unsubscribe from plan");
      }
    } finally {
      setLoadingPlanId(null);
    }
  }

  if (!plan) {
    return (
      <div style={{ padding: "30px" }}>
        <Title level={4} type="danger">
          No plan data found. Please try again.
        </Title>
      </div>
    );
  }

  if (!Brand) {
    return (
      <div style={{ padding: "30px" }}>
        <Title level={4} type="danger">
          No brand data found. Please try again.
        </Title>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        pauseOnHover
      />
      <Title level={3}>Change Your Plan</Title>
      <Row gutter={[16, 16]}>
        {plan?.map((p: PlanType) => (
          <Col xs={24} sm={12} md={6} key={p.id}>
            {/* Same Card Logic ... */}
            <Card
              title={p.name}
              hoverable
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              }}
              bodyStyle={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ flex: 1 }}>
                <Paragraph style={{ fontSize: "24px", marginBottom: "4px" }}>
                  <strong>{p.monthly_price}</strong>
                  <span style={{ fontSize: "14px", color: "#8c8c8c" }}>
                    {" "}
                    / month
                  </span>
                </Paragraph>
                <Paragraph style={{ color: "#595959", minHeight: "3em" }}>
                  {p.description}
                </Paragraph>
                <Paragraph strong style={{ marginBottom: "8px" }}>
                  Features:
                </Paragraph>
                <div style={{ marginBottom: "20px" }}>
                  {renderFeatures(p.id)}
                </div>
              </div>

              <div style={{ marginTop: "auto", paddingTop: "16px" }}>
                {Brand.subscribed_package_id !== p.id ? (
                    <Button
                      type="primary"
                      block
                      size="large"
                      loading={loadingPlanId === p.id}
                      style={{ borderRadius: "6px" }}
                      onClick={() => handleUpdatePlan(p.id, p.name)}
                    >
                      Select Plan
                    </Button>
                ) : (
                  <Button
                    type="default"
                    danger
                    block
                    size="large"
                    style={{ borderRadius: "6px" }}
                    onClick={handleCancelPlan}
                  >
                    Cancel Plan
                  </Button>
                )}
              </div>
            </Card>
          </Col>
        ))}

        {/* Custom Plan Card */}
        <Col xs={24} sm={12} md={6}>
            <Card
              title="Custom"
              hoverable
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              }}
              bodyStyle={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
               <div style={{ flex: 1 }}>
                <Paragraph style={{ fontSize: "24px", marginBottom: "4px" }}>
                  <strong>{customPrice}</strong>
                  <span style={{ fontSize: "14px", color: "#8c8c8c" }}>
                    {" "}
                    / month
                  </span>
                </Paragraph>
                 <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span>Scans:</span>
                        <InputNumber
                            min={21}
                            disabled={Brand.subscribed_package_id === 4}
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
                 
                  <Paragraph strong style={{ marginBottom: "8px" }}>
                    Features:
                  </Paragraph>
                   <div style={{ marginBottom: "20px" }}>
                    {renderFeatures(3)}
                  </div>
               </div>

               <div style={{ marginTop: "auto", paddingTop: "16px" }}>
                  {Brand.subscribed_package_id !== 4 ? (
                      <Button
                        type="primary"
                        block
                        size="large"
                        loading={loadingPlanId === 4}
                        style={{ borderRadius: "6px" }}
                        onClick={() => handleUpdatePlan(4, "Custom", customScans)}
                      >
                       Select Plan
                      </Button>
                  ) : (
                    <Button
                      type="default"
                      danger
                      block
                      disabled={Brand.subscribed_package_id === 4}
                      size="large"
                      style={{ borderRadius: "6px" }}
                      onClick={handleCancelPlan}
                    >
                      Cancel Plan
                    </Button>
                  )}
                </div>
            </Card>
        </Col>
      </Row>
    </div>
  );
}
