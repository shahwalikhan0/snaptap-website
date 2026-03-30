"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/app/hooks/useAdminContext";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

import { HeroSection } from "./HeroSection";
import { CapabilitiesSection } from "./CapabilitiesSection";
import { OverviewSection } from "./OverviewSection";
import { BenefitsSection } from "./BenefitsSection";
import { CoreValueSection } from "./CoreValueSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { SnapSlider } from "./snap-slider";

export const MainScreen = () => {
  const router = useRouter();
  const { isLoggedIn } = useAdmin();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/app/inventory");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <Navbar />

      <HeroSection />

      <CapabilitiesSection />

      <OverviewSection />

      <BenefitsSection />

      <CoreValueSection />

      <HowItWorksSection />

      <SnapSlider />

      <Footer />
    </div>
  );
};
