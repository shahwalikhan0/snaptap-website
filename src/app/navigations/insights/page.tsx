"use client";

import { Card, Col, Row, Typography, Progress } from "antd";
import dayjs from "dayjs";
import { useAdmin } from "@/app/hooks/useAdminContext";

const { Title, Paragraph } = Typography;

export default function InsightsPage() {
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

  const scanUsage = ((Brand.scans_used / Brand.total_scans) * 100).toFixed(2);
  const productUsage = (
    (Brand.active_products /
      (Brand.active_products + Brand.in_active_products)) *
    100
  ).toFixed(2);

  return (
    <div
      style={{
        backgroundColor: "#00A8DE",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <Title level={2} style={{ color: "#fff", marginBottom: "30px" }}>
        Business Insights
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Subscription Plan"
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <Paragraph>
              <strong>Package:</strong> {Brand.package_name}
            </Paragraph>
            <Paragraph>
              <strong>Status:</strong> {Brand.status}
            </Paragraph>
            <Paragraph>
              <strong>Billing:</strong> Rs. {Brand.totalBilling}
            </Paragraph>
            <Paragraph>
              <strong>Due:</strong>{" "}
              {Brand.due_date
                ? dayjs(Brand.due_date).format("MMMM D, YYYY")
                : "N/A"}
            </Paragraph>
            <Paragraph>
              <strong>Paid:</strong>{" "}
              {Brand.date_paid
                ? dayjs(Brand.date_paid).format("MMMM D, YYYY")
                : "Not yet paid"}
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            title="Scan Insights"
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <Paragraph>
              <strong>Total Scans:</strong> {Brand.total_scans}
            </Paragraph>
            <Paragraph>
              <strong>Used Scans:</strong> {Brand.scans_used}
            </Paragraph>
            <Paragraph>
              <strong>Usage:</strong> {scanUsage}%
            </Paragraph>
            <Progress percent={parseFloat(scanUsage)} strokeColor="#00A8DE" />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            title="Product Stats"
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <Paragraph>
              <strong>Active:</strong> {Brand.active_products}
            </Paragraph>
            <Paragraph>
              <strong>Inactive:</strong> {Brand.in_active_products}
            </Paragraph>
            <Paragraph>
              <strong>Active Ratio:</strong> {productUsage}%
            </Paragraph>
            <Progress
              percent={parseFloat(productUsage)}
              strokeColor="#00A8DE"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
