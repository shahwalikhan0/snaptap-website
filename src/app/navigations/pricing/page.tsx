"use client";

import { Card, Col, Row } from "antd";
import { useRouter } from "next/navigation";

const plans = [
  {
    title: "Starter",
    price: "$0/month",
    description:
      "Perfect for individuals trying out SnapTap. Includes 10 free scans.",
  },
  {
    title: "Pro",
    price: "$29/month",
    description:
      "Designed for small businesses. Includes unlimited scans and analytics.",
  },
  {
    title: "Enterprise",
    price: "Contact Us",
    description: "Tailored solutions for large teams and organizations.",
  },
];

export const Pricing = () => {
  const router = useRouter();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10">Choose Your Plan</h1>
      <Row gutter={16}>
        {plans.map((plan) => (
          <Col xs={24} sm={12} md={8} key={plan.title}>
            <Card
              title={plan.title}
              // bordered={true}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-xl font-semibold">{plan.price}</p>
              <p>{plan.description}</p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => router.push("/register")}
              >
                Get Started
              </button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
