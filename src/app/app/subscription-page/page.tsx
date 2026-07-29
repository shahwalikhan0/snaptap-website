"use client";

import React, { useState, useEffect, useRef } from "react";
import SubscriptionComponent from "./subscription-component";
import MyPlan from "./my-plan";
import ChangePlan from "./change-plan";
import BillingHistory from "./billing-history";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { PlanType } from "../types/plan";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllPlans } from "../pricing/services/pricingApi";
import { completeSetupSession } from "./services/paymentApi";

export default function SubscriptionPage() {
  const router = useRouter();
  const { isLoggedIn, Admin, isInitialized } = useAdmin();
  const [selectedPage, setSelectedPage] = useState("my-plan");
  const [plan, setPlan] = useState<PlanType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const alertMsg = params.get("alert");
      if (alertMsg) {
        setTimeout(() => toast.error(alertMsg), 300);
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }, []);

  // Safepay card-setup return: /app/subscription-page?setup=success
  // (the server confirms the card against Safepay's wallet — no params needed)
  useEffect(() => {
    if (typeof window === "undefined" || !isInitialized || !isLoggedIn) return;
    const params = new URLSearchParams(window.location.search);
    const setup = params.get("setup");
    if (!setup) return;

    window.history.replaceState({}, "", window.location.pathname);
    // The payment method card lives on the Billing & Payments tab
    setSelectedPage("billing-history");

    if (setup === "cancelled") {
      toast.info("Card setup was cancelled.");
      return;
    }

    if (setup === "success") {
      completeSetupSession()
        .then(() => {
          toast.success("Payment method saved! Your invoices will now be charged automatically.");
        })
        .catch((err: unknown) => {
          console.error("Card setup completion failed:", err);
          toast.error("We could not confirm your card with Safepay. Please try again.");
        });
    }
  }, [isInitialized, isLoggedIn]);

  useEffect(() => {
    const fetchPackage = async () => {
      if (!isInitialized) return;

      if (!isLoggedIn) {
        if (!hasMounted.current) {
          toast.error("Please log in to manage your subscription.");
        }
        router.push(
          `/app/login?redirect=${encodeURIComponent(window.location.pathname)}`,
        );
        return;
      }
      hasMounted.current = true;
      try {
        setLoading(true);
        const plans = await fetchAllPlans();
        setPlan(plans);
      } catch (err: unknown) {
        console.error("Error fetching Package:", err);
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
      case "billing-history":
        return <BillingHistory />;
      default:
        return <MyPlan onNavigate={setSelectedPage} />;
    }
  };

  if (!isInitialized || loading) {
    return (
      <div className="min-h-screen bg-white pt-20 sm:pt-28">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-96px)] animate-pulse">
          <aside className="w-full lg:w-[320px] lg:border-r border-slate-100 bg-slate-50/30 p-6 space-y-3">
            <div className="h-8 bg-slate-100 rounded-[6px] w-3/4" />
            <div className="h-12 bg-slate-100 rounded-[6px]" />
            <div className="h-12 bg-slate-100 rounded-[6px]" />
            <div className="h-12 bg-slate-100 rounded-[6px]" />
          </aside>
          <main className="flex-1 p-4 sm:p-6 md:p-12">
            <div className="max-w-4xl space-y-6">
              <div className="h-9 bg-slate-100 rounded-[6px] w-1/2" />
              <div className="h-4 bg-slate-100 rounded-[6px] w-2/3" />
              <div className="h-48 bg-slate-100 rounded-[6px]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-32 bg-slate-100 rounded-[6px]" />
                <div className="h-32 bg-slate-100 rounded-[6px]" />
              </div>
            </div>
          </main>
        </div>
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
