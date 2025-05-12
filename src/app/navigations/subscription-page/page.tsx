"use client";
require("dotenv").config();

import React, { useEffect, useState } from "react";
import axios from "axios";
import SubscriptionComponent from "./subscription-component";
import MyPlan from "./my-plan";
import ChangePlan from "./change-plan";
import EditBilling from "./edit-billing";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { PlanType } from "../types/plan";
import { Typography } from "antd";

const { Title } = Typography;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function SubscriptionPage() {
  const { Brand } = useAdmin();
  const [selectedPage, setSelectedPage] = useState("my-plan");
  const [plan, setPlan] = useState<PlanType[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPackage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/packages`);

      if (Array.isArray(response.data)) {
        setPlan(response.data);
      }
    } catch (error) {
      console.error("Error fetching Package:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderRightPanel = () => {
    switch (selectedPage) {
      case "change-plan":
        return <ChangePlan plan={plan} />;
      case "edit-billing":
        return <EditBilling />;
      default:
        return <MyPlan />;
    }
  };

  if (!Brand) {
    window.location.href = "/";
    return null;
  }

  useEffect(() => {
    fetchPackage();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <Title level={4} type="danger">
          Loading plans...
        </Title>
      </div>
    );
  }
  if (!plan) {
    return (
      <div style={{ padding: "30px" }}>
        <Title level={4} type="danger">
          No plans available. Please try again.
        </Title>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
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
  );
}
