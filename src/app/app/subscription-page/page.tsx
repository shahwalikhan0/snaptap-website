"use client";
// require("dotenv").config();

import React, { useState, useEffect } from "react";
import axios from "axios";
import SubscriptionComponent from "./subscription-component";
import MyPlan from "./my-plan";
import ChangePlan from "./change-plan";
import EditBilling from "./edit-billing";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { PlanType } from "../types/plan";
import { Typography } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const { Title } = Typography;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function SubscriptionPage() {
  const router = useRouter();
  const { isLoggedIn, Admin, isInitialized } = useAdmin();
  const [selectedPage, setSelectedPage] = useState("my-plan");
  const [plan, setPlan] = useState<PlanType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      if (!isInitialized) return;

      if (!isLoggedIn) {
        toast.error("Please log in to access the Insights Dashboard.");
        router.push("/app/login");
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/package`);

        if (Array.isArray(response.data)) {
          setPlan(response.data);
        }
      } catch (error: any) {
        console.error("Error fetching Package:", error);
        
        // Check for network/server errors
        if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
          toast.error("Server is not accessible. Please check your connection and try again.");
        } else if (!error.response) {
          toast.error("Cannot reach the server. Please try again later.");
        } else {
          toast.error("Failed to fetch subscription plans. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (isInitialized) {
      fetchPackage();
    }
  }, [isInitialized, isLoggedIn, router]);

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

  if (!isInitialized) {
    return (
      <div style={{ paddingTop: "120px" }}>
        <Title level={4}>Loading session...</Title>
      </div>
    );
  }

  if (!Admin) {
    // window.location.href = "/";
    return null;
  }

  if (loading) {
    return (
      <div style={{ paddingTop: "120px" }}>
        <Title level={4} type="danger">
          Loading plans...
        </Title>
      </div>
    );
  }
  if (!plan) {
    return (
      <div style={{ paddingTop: "120px" }}>
        <Title level={4} type="danger">
          No plans available. Please try again.
        </Title>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: "120px" }}>
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
