"use client";

import { Card, Row, Col, Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

const plans = [
  {
    name: "Go",
    price: "$17.99 / month",
    description: "Basic access to 3D tools and AR previews",
  },
  {
    name: "Pro",
    price: "$49.99 / month",
    description: "Full access including desktop modeling and plugins",
  },
  {
    name: "Studio",
    price: "$749 / year",
    description: "All features unlocked for professional users",
  },
];

export default function ChangePlan() {
  return (
    <div style={{ padding: "30px" }}>
      <Title level={3}>Change Your Plan</Title>
      <Row gutter={[16, 16]}>
        {plans.map((plan) => (
          <Col xs={24} sm={12} md={8} key={plan.name}>
            <Card title={plan.name} bordered>
              <Paragraph>
                <strong>{plan.price}</strong>
              </Paragraph>
              <Paragraph>{plan.description}</Paragraph>
              <Button type="primary" disabled>
                Select Plan
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
