"use client";

import React from "react";
import { Card, Row, Col, Typography, Button } from "antd";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { PlanType } from "../types/plan";

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

const renderFeatures = (planId: Number) => {
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
  if (!plan) {
    return (
      <div style={{ padding: "30px" }}>
        <Title level={4} type="danger">
          No plan data found. Please try again.
        </Title>
      </div>
    );
  }

  const { Brand } = useAdmin();

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
      <Title level={3}>Change Your Plan</Title>
      <Row gutter={[16, 16]}>
        {plan?.map((p: PlanType) => (
          <Col xs={24} sm={12} md={8} key={p.id}>
            <Card title={p.name} bordered>
              <Paragraph>
                <strong>{p.monthly_price}</strong>
              </Paragraph>
              <Paragraph>{p.description}</Paragraph>
              <Paragraph>Features:</Paragraph>
              {renderFeatures(p.id)}
              {Brand.package_id !== p.id ? (
                <Button type="primary">Select Plan</Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => alert(`Selected ${p.name} plan`)}
                >
                  Cancel
                </Button>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
