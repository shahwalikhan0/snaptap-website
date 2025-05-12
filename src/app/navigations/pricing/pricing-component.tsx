"use client";

import { useState } from "react";
import { Card, Col, Row, Switch, Typography, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

const plans = [
  {
    title: "Go",
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
    monthly: "$49.99",
    annual: "$349",
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

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const router = useRouter();

  const handleGetStartedClick = () => {
    // Redirect to the sign-up page when "Get Started" is clicked
    router.push("/navigations/sign-up");
  };

  return (
    <div
      style={{
        padding: "50px",
        backgroundColor: "#f9f9f9",
        paddingTop: "50px", // Adjust this value as per your navbar height
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
        Choose the Plan That's Right for You
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
      <Row gutter={[24, 24]} justify="center">
        {plans.map((plan) => (
          <Col xs={24} sm={12} md={8} key={plan.title}>
            <Card
              title={plan.title}
              bordered={false}
              style={{ borderRadius: "10px" }}
              headStyle={{ textAlign: "center", fontSize: "24px" }}
              bodyStyle={{ padding: "20px" }}
            >
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Title level={3} style={{ margin: 0 }}>
                  {isAnnual ? plan.annual : plan.monthly}
                </Title>
                <Paragraph>{isAnnual ? "per year" : "per month"}</Paragraph>
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <CheckOutlined
                      style={{ color: "#52c41a", marginRight: "8px" }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                block
                style={{
                  marginTop: "20px",
                  backgroundColor: "#00A8DE",
                  borderColor: "#00A8DE",
                  color: "#fff",
                }}
                onClick={handleGetStartedClick}
              >
                Get Started
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
