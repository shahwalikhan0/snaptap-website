"use client";

import { HeroSection } from "./components/HeroSection";
import { SellerWorkflow } from "./components/SellerWorkflow";
import { UseCases } from "./components/UseCases";
import { PlatformCapabilities } from "./components/PlatformCapabilities";
import { PricingOverview } from "./components/PricingOverview";
import { CustomerExperience } from "./components/CustomerExperience";
import { CallToAction } from "./components/CallToAction";

export default function Page() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── HOW IT WORKS (Seller Workflow) ──────────────────────────────────── */}
      <SellerWorkflow />

      {/* ── USE CASES ─────────────────────────────────────────────────────────── */}
      <UseCases />

      {/* ── PLATFORM CAPABILITIES (dark themed) ──────────────────────────────── */}
      <PlatformCapabilities />

      {/* ── SUBSCRIPTION PLANS OVERVIEW ──────────────────────────────────────── */}
      <PricingOverview />

      {/* ── HOW ARE CUSTOMERS VIEW AR ─────────────────────────────────────────── */}
      <CustomerExperience />

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <CallToAction />
    </div>
  );
}
