"use client";

import { SectionHeading, SubHeading, StepList, InfoBox, CheckList } from "../shared";

export function GettingStarted() {
  return (
    <section id="getting-started" className="mb-16 scroll-mt-28">
      <SectionHeading>Getting Started</SectionHeading>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
        Follow these steps to go from a new account to your first live
        AR product.
      </p>

      <SubHeading id="gs-signup">1. Create a Seller Account</SubHeading>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">
        Sellers register on the SnapTap website. You'll provide your
        brand name, username, email, and password.
      </p>
      <StepList
        steps={[
          {
            title: "Go to Sign Up",
            desc: 'Click "Start Free Trial" or "Sign Up" from the navigation bar.',
          },
          {
            title: "Fill in Brand Details",
            desc: "Enter your brand name (public-facing), a unique username (used for login), your email address, and a password.",
          },
          {
            title: "Upload Brand Logo (Optional)",
            desc: "Add a logo image for your brand. This appears on your public profile in the marketplace.",
          },
          {
            title: "Submit and Wait for Verification",
            desc: "SnapTap sends a verification link to your email. Your account is inactive until you click that link.",
          },
        ]}
      />
      <InfoBox type="warning">
        The email verification link expires in{" "}
        <strong>15 minutes</strong>. If it expires, you'll need to
        re-register.
      </InfoBox>

      <SubHeading id="gs-verify">2. Verify Your Email</SubHeading>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">
        Check your inbox for an email from SnapTap with a verification
        link. Click it to activate your account. After verification, you
        can log in immediately.
      </p>
      <InfoBox type="tip">
        Check your spam/junk folder if the email doesn't arrive within a
        minute.
      </InfoBox>

      <SubHeading id="gs-plan">
        3. Choose a Subscription Plan
      </SubHeading>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">
        Each plan includes a monthly quota of{" "}
        <strong>AR product scans</strong> — the number of new products
        you can add each month. After choosing a plan, your quota is
        immediately applied.
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200 mb-4">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {["Plan", "Scans / Month", "Best For"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 font-bold text-slate-600 text-xs uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ["Starter", "20", "Testing & small catalogs"],
              ["Growth", "50", "Growing brands"],
              ["Enterprise", "80", "Large product libraries"],
              [
                "Custom",
                "> 80 (you choose)",
                "Agencies & unique requirements",
              ],
            ].map(([plan, scans, best]) => (
              <tr
                key={plan}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-3 font-semibold text-slate-800">
                  {plan}
                </td>
                <td className="px-4 py-3 text-[#007cae] font-bold">
                  {scans}
                </td>
                <td className="px-4 py-3 text-slate-500">{best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InfoBox type="info">
        You can upgrade or downgrade at any time from your dashboard.
        Downgrading to a smaller plan is blocked if you already have
        more active products than the new plan allows.
      </InfoBox>

      <SubHeading id="gs-ios">4. Set Up the iOS App</SubHeading>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">
        All product scanning is done through the SnapTap iOS app. The
        web dashboard is used for management, analytics, and settings
        only.
      </p>
      <CheckList
        items={[
          "Download the SnapTap iOS app from the App Store",
          "Log in with the same username and password as your web account",
          "The iOS app uses your iPhone's built-in LiDAR sensor to scan products",
          "After scanning, you upload the generated model directly from the app",
        ]}
      />
      <InfoBox type="warning">
        Scanning requires an{" "}
        <strong>iPhone Pro or iPhone Pro Max</strong> running{" "}
        <strong>iOS 18 or later</strong>. Standard iPhone models do not
        have the LiDAR sensor required for 3D scanning.
      </InfoBox>
    </section>
  );
}
