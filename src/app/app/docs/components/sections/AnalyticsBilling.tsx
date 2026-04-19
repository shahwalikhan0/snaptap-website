"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import {
  SectionHeading,
  SubHeading,
  InfoBox,
  StepList,
  CheckList,
} from "../shared";

export function AnalyticsBilling() {
  const router = useRouter();

  return (
    <section id="analytics" className="mb-16 scroll-mt-28">
      <SectionHeading>Analytics & Billing</SectionHeading>

      <SubHeading id="ana-views">AR View Tracking</SubHeading>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">
        Every time a customer opens your product's AR viewer page (via QR scan
        or direct link), it is recorded as a <strong>model view</strong>. Views
        are tracked per product and per month.
      </p>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">
        The Insights section of your dashboard shows:
      </p>
      <CheckList
        items={[
          "Total AR views per product",
          "Monthly view trends",
          "Active vs. inactive product count",
          "Total models generated over your account lifetime",
          "Scans remaining in your plan",
        ]}
      />

      <SubHeading id="ana-billing">How Billing Works</SubHeading>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">
        SnapTap uses a <strong>two-part billing model</strong>:
      </p>
      <div className="space-y-3 mb-4">
        {[
          {
            title: "1. Monthly Subscription",
            desc: "Your base plan fee. Covers your monthly scan quota and platform access.",
          },
          {
            title: "2. Per-View Usage",
            desc: "AR views contribute a small per-view charge based on your plan rate. This is tracked monthly per product.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex gap-3 p-4 bg-[#007cae]/5 rounded-[6px] border border-[#007cae]/15"
          >
            <Icon
              icon="mdi:receipt-text-outline"
              className="text-[#007cae] shrink-0 mt-0.5"
              width={18}
            />
            <div>
              <p className="font-bold text-[#007cae] text-sm mb-1">
                {item.title}
              </p>
              <p className="text-slate-600 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <InfoBox type="info">
        Billing is calculated monthly. You can view your current billing
        details, total views, and estimated charges from the Insights section of
        the dashboard.
      </InfoBox>

      <SubHeading id="ana-plans">Changing Your Subscription Plan</SubHeading>
      <StepList
        steps={[
          {
            title: "Go to Payment & Subscription",
            desc: "Navigate to the Payment & Subscription page from the main navigation.",
          },
          {
            title: "Go to Upgrade/Change Plan",
            desc: "Click on the Upgrade/Change Plan button.",
          },
          {
            title: "Upgrade or Downgrade",
            desc: "You can upgrade or downgrade your plan by selecting the desired plan and clicking on the Upgrade/Change Plan button.",
          },
        ]}
      />
      <InfoBox type="warning">
        <strong>Downgrading</strong> to a plan with fewer allowed scans is
        blocked if you have more products than the new plan allows. Delete
        products first to enable the downgrade.
      </InfoBox>
    </section>
  );
}
