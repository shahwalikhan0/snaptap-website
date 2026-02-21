"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import SubscriptionComponent from "./subscription-component";
import MyPlan from "./my-plan";
import ChangePlan from "./change-plan";
import EditBilling from "./edit-billing";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { PlanType } from "../types/plan";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";

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
        toast.error("Please log in to manage your subscription.");
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
        toast.error("Failed to load subscription plans.");
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

  if (!isInitialized || loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white gap-4">
        <Spin size="large" />
        <p className="text-slate-400 font-medium animate-pulse">Loading Subscription Data...</p>
      </div>
    );
  }

  if (!Admin) return null;

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-28">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-96px)]">

        {/* Left Nav — Sidebar style */}
        <aside className="w-full lg:w-[320px] lg:border-r border-slate-100 bg-slate-50/30 flex flex-col">
          <SubscriptionComponent
            selectedPage={selectedPage}
            onSelect={setSelectedPage}
          />
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 bg-white p-4 sm:p-6 md:p-12 overflow-y-auto">
          <div className="max-w-4xl">
            <MotionContainer key={selectedPage}>
              {renderRightPanel()}
            </MotionContainer>
          </div>
        </main>

      </div>
    </div>
  );
}

// Wrapper for simple fade transition
const MotionContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      {children}
    </div>
  );
};
