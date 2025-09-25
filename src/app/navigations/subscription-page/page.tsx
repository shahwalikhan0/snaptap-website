"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import SubscriptionComponent from "./subscription-component";
import MyPlan from "./my-plan";
import ChangePlan from "./change-plan";
import EditBilling from "./edit-billing";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { Plan } from "@/app/navigations/types/plan";
import { Typography } from "antd";

const { Title } = Typography;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function SubscriptionPage() {
  const { Admin } = useAdmin();
  const [selectedPage, setSelectedPage] = useState("my-plan");
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/package`);

      if (Array.isArray(response.data)) {
        setPlans(response.data);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const renderRightPanel = () => {
    switch (selectedPage) {
      case "change-plan":
        return <ChangePlan plan={plans} />;
      case "edit-billing":
        return <EditBilling />;
      default:
        return <MyPlan />;
    }
  };

  if (!Admin) {
    return null;
  }

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <Title level={4} type="danger">
          Loading plans...
        </Title>
      </div>
    );
  }

  if (!plans) {
    return (
      <div style={{ padding: "30px" }}>
        <Title level={4} type="danger">
          No plans available. Please try again.
        </Title>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // important for sticky footer
        minHeight: "100vh",
      }}
    >
      {/* Main Content */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Left Menu - 1/3 Width */}
        <div style={{ width: "33.33%", borderRight: "1px solid #e0e0e0" }}>
          <SubscriptionComponent
            selectedPage={selectedPage}
            onSelect={setSelectedPage}
          />
        </div>

        {/* Right Content - 2/3 Width */}
        <div style={{ width: "66.66%", backgroundColor: "#fff" }}>
          {renderRightPanel()}
        </div>
      </div>
    </div>
  );
}
