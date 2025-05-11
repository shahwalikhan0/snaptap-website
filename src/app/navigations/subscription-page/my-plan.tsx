"use client";
require("dotenv").config();

import { Card, Typography, Spin, Alert, message } from "antd";
import { useBrand } from "../../hooks/useBrandContext";
import { useRouter } from "next/navigation";
import { useAdmin } from "../../hooks/useAdminContext";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const { Title, Paragraph } = Typography;

export default function MyPlan() {
  const { Admin } = useAdmin();
  const { Brand, setBrand } = useBrand();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const response = axios.get(
  //   Brand ? `${BASE_URL}/api/brands/brand-detail/${Brand.brand_id}` : ""
  // );

  useEffect(() => {
    const fetchBrand = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          Brand ? `${BASE_URL}/api/brands/brand-detail/${Brand.brand_id}` : ""
        );

        if (response.data.id) {
          setBrand(response.data);
          message.success("Brand Set successful!");
          router.replace("/");
        } else {
          message.error("No Brand.");
        }
      } catch (error) {
        console.error(error);
        message.error("An error occurred during Brand.");
      } finally {
        setLoading(false);
      }
    };

    if (Admin?.id && Brand?.brand_id) {
      fetchBrand();
    }
  }, [Admin?.id, Brand?.brand_id]);

  // Immediately fetch if Admin is available but Brand is not
  // if (Admin?.id && !Brand && loading) {

  // try{
  //   axios
  //     .get(`${BASE_URL}/api/brands/brand-detail/${Brand.brand_id}`)
  //     .then((response) => {
  //       setBrand(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching brand:", error);
  //       setError("Failed to fetch brand details.");
  //       setBrand(null);
  //       setLoading(false);
  //     });
  // }
  //remove later
  // console.log("Brand", Brand);
  // console.log("Brand ID", Brand?.id);
  // console.log("Brand Package Name", Brand?.package_name);
  // console.log("Brand Total Billing", Brand?.totalBilling);
  // console.log("Brand Status", Brand?.status);

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <Spin size="large" />
        <Alert
          message="Loading brand details..."
          description="Please wait while we fetch your current plan information."
          type="info"
          showIcon
          style={{ marginTop: "20px" }}
        />
      </div>
    );
  }

  if (error || !Brand) {
    return (
      <div style={{ padding: "30px" }}>
        <Alert
          message="Error"
          description={error || "No brand data available."}
          type="error"
          showIcon
        />
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
