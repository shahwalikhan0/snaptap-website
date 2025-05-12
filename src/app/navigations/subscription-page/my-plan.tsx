"use client";

import { Card, Typography } from "antd";
import dayjs from "dayjs";

import { useAdmin } from "@/app/hooks/useAdminContext";

const { Title, Paragraph } = Typography;

export default function MyPlan() {
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
      <Title level={3}>My Current Plan</Title>
      <Card style={{ maxWidth: 600 }}>
        <Paragraph>
          <strong>Plan:</strong> {Brand.package_name || "N/A"}
        </Paragraph>
        <Paragraph>
          <strong>Status:</strong> {Brand.status || "N/A"}
        </Paragraph>
        <Paragraph>
          <strong>Total Billing:</strong> Rs. {Brand.totalBilling || 0}
        </Paragraph>
        <Paragraph>
          <strong>Due Date:</strong>{" "}
          {Brand.due_date
            ? dayjs(Brand.due_date).format("MMMM D, YYYY")
            : "N/A"}
        </Paragraph>
        <Paragraph>
          <strong>Active Products:</strong> {Brand.active_products}
        </Paragraph>
        <Paragraph>
          <strong>Inactive Products:</strong> {Brand.in_active_products}
        </Paragraph>
        <Paragraph>
          <strong>Scans Used:</strong> {Brand.scans_used}
        </Paragraph>
        <Paragraph>
          <strong>Total Scans:</strong> {Brand.total_scans}
        </Paragraph>
      </Card>
    </div>
  );
}
