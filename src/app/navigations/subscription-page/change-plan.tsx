"use client";

import React, { useState } from "react";
import { Card, Row, Col, Typography, Button, Switch, message } from "antd";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { Plan } from "@/app/navigations/types/plan";
import axios from "axios";

const { Title, Paragraph } = Typography;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const featuresMap: Record<number, string[]> = {
  1: ["Basic 3D tools", "AR previews", "Limited scans", "Basic support"],
  2: [
    "Full access to 3D tools",
    "AR previews",
    "Unlimited scans",
    "Plugin support",
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
    <ul style={{ paddingLeft: 20, margin: "8px 0" }}>
      {featuresMap[planId]?.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  );
};

type Props = {
  plan: Plan[] | null;
};

export default function ChangePlan({ plan }: Props) {
  const { Brand, setBrand } = useAdmin();
  const [loadingPlanId, setLoadingPlanId] = useState<number | null>(null);
  const [yearlyPricing, setYearlyPricing] = useState(false);

  if (!plan) {
    return (
      <div style={{ padding: 30 }}>
        <Title level={4} type="danger">
          No plan data found. Please try again.
        </Title>
      </div>
    );
  }

  if (!Brand) {
    return (
      <div style={{ padding: 30 }}>
        <Title level={4} type="danger">
          No brand data found. Please try again.
        </Title>
      </div>
    );
  }

  const handleSelectPlan = async (planId: number, planName: string) => {
    if (!Brand) return;

    setLoadingPlanId(planId);

    try {
      const response = await axios.patch(`${BASE_URL}/brand/change-plan`, {
        brand_id: Brand.id,
        new_plan_id: planId,
      });

      if (response.data) {
        setBrand(response.data);
        message.success(`Your plan has been changed to "${planName}"`);
      } else {
        message.error("Failed to change plan. Please try again.");
      }
    } catch (err) {
      console.error("Error changing plan:", err);
      message.error("An error occurred while changing plan.");
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <Title level={3}>Change Your Plan</Title>

      <div style={{ marginBottom: 20 }}>
        <span style={{ marginRight: 8 }}>Show Yearly Prices</span>
        <Switch checked={yearlyPricing} onChange={setYearlyPricing} />
      </div>

      <Row gutter={[16, 16]}>
        {plan.map((p) => {
          const isCurrent = Brand.subscribed_package_id === p.id;
          const price = yearlyPricing ? p.yearly_price : p.monthly_price;

          return (
            <Col xs={24} sm={12} md={8} key={p.id}>
              <Card title={p.name} bordered>
                <Paragraph>
                  <strong>
                    {yearlyPricing ? "Yearly Price:" : "Monthly Price:"}
                  </strong>{" "}
                  Rs. {price}
                </Paragraph>

                <Paragraph>
                  <strong>Features:</strong>
                </Paragraph>
                {renderFeatures(p.id)}

                <Button
                  type="primary"
                  disabled={isCurrent || loadingPlanId === p.id}
                  loading={loadingPlanId === p.id}
                  onClick={() => handleSelectPlan(p.id, p.name)}
                  style={{ marginTop: 12 }}
                >
                  {isCurrent ? "Current Plan" : "Select Plan"}
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
