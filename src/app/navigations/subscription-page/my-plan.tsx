"use client";

import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function MyPlan() {
  return (
    <div style={{ padding: "30px" }}>
      <Title level={3}>My Current Plan</Title>
      <Card style={{ maxWidth: 600 }}>
        <Paragraph>
          <strong>Plan:</strong> Pro
        </Paragraph>
        <Paragraph>
          <strong>Billing Frequency:</strong> Annual
        </Paragraph>
        <Paragraph>
          <strong>Next Billing Date:</strong> July 10, 2025
        </Paragraph>
        <Paragraph>
          <strong>Amount:</strong> $349
        </Paragraph>
      </Card>
    </div>
  );
}
