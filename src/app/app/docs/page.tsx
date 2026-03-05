"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

// ─── Sidebar navigation ──────────────────────────────────────────────────────
const sections = [
  {
    id: "introduction",
    title: "Introduction",
    icon: "mdi:information-outline",
  },
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "mdi:rocket-launch-outline",
    children: [
      { id: "gs-signup", title: "Create an Account" },
      { id: "gs-verify", title: "Email Verification" },
      { id: "gs-plan", title: "Choose a Plan" },
      { id: "gs-ios", title: "iOS App Setup" },
    ],
  },
  {
    id: "scanning",
    title: "Scanning Products",
    icon: "mdi:cube-scan",
    children: [
      { id: "scan-requirements", title: "Device Requirements" },
      { id: "scan-tips", title: "Scanning Tips" },
      { id: "scan-upload", title: "Uploading to SnapTap" },
    ],
  },
  {
    id: "processing",
    title: "Model Processing",
    icon: "mdi:swap-horizontal",
    children: [
      { id: "proc-pipeline", title: "The Processing Pipeline" },
      { id: "proc-notifications", title: "Notifications" },
      { id: "proc-qr", title: "QR Code Generation" },
    ],
  },
  {
    id: "inventory",
    title: "Inventory & Dashboard",
    icon: "mdi:buffer",
    children: [
      { id: "inv-manage", title: "Managing Products" },
      { id: "inv-embed", title: "Embedding AR Viewer" },
      { id: "inv-qr", title: "Using QR Codes" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Billing",
    icon: "mdi:chart-areaspline",
    children: [
      { id: "ana-views", title: "AR View Tracking" },
      { id: "ana-billing", title: "How Billing Works" },
      { id: "ana-plans", title: "Subscription Plans" },
    ],
  },
  {
    id: "ar-viewer",
    title: "AR Viewer",
    icon: "mdi:augmented-reality",
    children: [
      { id: "ar-ios", title: "iOS (Quick Look)" },
      { id: "ar-android", title: "Android (Scene Viewer)" },
      { id: "ar-desktop", title: "Desktop / Web 3D" },
    ],
  },
  {
    id: "customer",
    title: "Customer Experience",
    icon: "mdi:account-eye-outline",
  },
  {
    id: "faq",
    title: "FAQ",
    icon: "mdi:help-circle-outline",
  },
];

const allIds = sections.flatMap((s) => [
  s.id,
  ...(s.children?.map((c) => c.id) ?? []),
]);

// ─── Reusable components ─────────────────────────────────────────────────────
function SectionHeading({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 scroll-mt-28"
    >
      {children}
    </h2>
  );
}

function SubHeading({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h3
      id={id}
      className="text-lg sm:text-xl font-bold text-[#007cae] mb-3 mt-10 scroll-mt-28 flex items-center gap-2"
    >
      <span className="w-1 h-5 bg-[#007cae] rounded-full inline-block" />
      {children}
    </h3>
  );
}

function InfoBox({
  type,
  children,
}: {
  type: "tip" | "warning" | "info";
  children: React.ReactNode;
}) {
  const styles = {
    tip: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-800",
      icon: "mdi:lightbulb-on-outline",
      iconColor: "text-green-600",
      label: "Tip",
    },
    warning: {
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-900",
      icon: "mdi:alert-circle-outline",
      iconColor: "text-amber-500",
      label: "Note",
    },
    info: {
      bg: "bg-[#007cae]/5 border-[#007cae]/20",
      text: "text-slate-700",
      icon: "mdi:information-outline",
      iconColor: "text-[#007cae]",
      label: "Info",
    },
  }[type];

  return (
    <div
      className={`${styles.bg} border rounded-xl p-4 flex gap-3 my-4 text-sm`}
    >
      <Icon
        icon={styles.icon}
        className={`${styles.iconColor} shrink-0 mt-0.5`}
        width={18}
      />
      <div className={styles.text}>
        <strong className="font-bold mr-1">{styles.label}:</strong>
        {children}
      </div>
    </div>
  );
}

function StepList({ steps }: { steps: { title: string; desc: string }[] }) {
  return (
    <ol className="space-y-4 my-4">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-4">
          <span className="w-7 h-7 rounded-full bg-[#007cae] text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
            {i + 1}
          </span>
          <div>
            <p className="font-bold text-slate-800 text-sm">{s.title}</p>
            <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 my-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
          <Icon
            icon="mdi:check-circle"
            className="text-[#007cae] mt-0.5 shrink-0"
            width={16}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Divider() {
  return <hr className="my-10 border-slate-100" />;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.filter((s) => s.children).map((s) => s.id)),
  );
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 160;
      for (const id of [...allIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 110, behavior: "smooth" });
    }
    setIsSidebarOpen(false);
  };

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const isActive = (id: string) =>
    activeSection === id ||
    sections
      .find((s) => s.id === id)
      ?.children?.some((c) => c.id === activeSection);

  return (
    <div className="min-h-screen bg-slate-50 pt-20 sm:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 relative">
          {/* ── Sidebar ──────────────────────────────────────────────────── */}
          {/* Mobile toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#007cae] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#006080] transition"
            aria-label="Open docs navigation"
          >
            <Icon icon={isSidebarOpen ? "mdi:close" : "mdi:menu"} width={22} />
          </button>

          {/* Sidebar overlay on mobile */}
          {isSidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/30 z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <aside
            className={`
              fixed lg:sticky top-20 sm:top-24 left-0 h-[calc(100vh-5rem)] overflow-y-auto
              w-64 bg-white border border-slate-200 rounded-r-2xl lg:rounded-2xl shadow-lg p-5 z-40
              transition-transform duration-300 lg:translate-x-0 shrink-0
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            <div className="flex items-center gap-2 mb-6">
              <Icon
                icon="mdi:book-open-outline"
                className="text-[#007cae]"
                width={22}
              />
              <h2 className="text-lg font-extrabold text-slate-900">Docs</h2>
            </div>
            <nav className="space-y-1">
              {sections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => {
                      if (section.children) toggleSection(section.id);
                      scrollTo(section.id);
                    }}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2.5 text-sm
                      ${
                        isActive(section.id) && activeSection === section.id
                          ? "bg-[#007cae] text-white font-semibold"
                          : isActive(section.id)
                            ? "bg-[#007cae]/10 text-[#007cae] font-semibold"
                            : "text-slate-600 hover:bg-slate-100"
                      }
                    `}
                  >
                    <Icon icon={section.icon} width={16} className="shrink-0" />
                    <span className="flex-1">{section.title}</span>
                    {section.children && (
                      <Icon
                        icon={
                          expandedSections.has(section.id)
                            ? "mdi:chevron-up"
                            : "mdi:chevron-down"
                        }
                        width={14}
                        className="shrink-0 opacity-60"
                      />
                    )}
                  </button>

                  {section.children && expandedSections.has(section.id) && (
                    <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-100 pl-3">
                      {section.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => scrollTo(child.id)}
                          className={`
                            w-full text-left px-2 py-1.5 rounded-md text-xs transition-all
                            ${
                              activeSection === child.id
                                ? "text-[#007cae] font-bold"
                                : "text-slate-500 hover:text-slate-800"
                            }
                          `}
                        >
                          {child.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          {/* ── Main Content ──────────────────────────────────────────────── */}
          <main className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 lg:p-14">
            {/* ── INTRODUCTION ─────────────────────────────────────────── */}
            <section id="introduction" className="mb-16 scroll-mt-28">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block text-[#007cae] text-xs font-extrabold uppercase tracking-widest mb-3">
                  Documentation
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-5 leading-tight">
                  SnapTap Documentation
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                  SnapTap is an augmented reality commerce platform that lets
                  businesses transform physical products into web-based 3D AR
                  experiences — and lets customers view those products life-size
                  in their real environment before purchasing.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    {
                      icon: "mdi:store-outline",
                      title: "For Sellers (Brands)",
                      desc: "Sign up, scan products with iPhone LiDAR, and publish AR-ready listings with QR codes. Manage your catalog, track performance, and grow with a subscription plan that fits your scale.",
                    },
                    {
                      icon: "mdi:account-eye-outline",
                      title: "For Customers",
                      desc: "Scan any SnapTap QR code with your phone. No app download needed. The product appears in your real environment at exact 1:1 scale through native iOS and Android AR.",
                    },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-100 p-5 bg-slate-50 flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#007cae]/10 flex items-center justify-center shrink-0">
                        <Icon
                          icon={card.icon}
                          className="text-[#007cae]"
                          width={20}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm mb-1">
                          {card.title}
                        </p>
                        <p className="text-slate-500 text-xs leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: "iPhone Pro", label: "Required to scan" },
                    { value: "Global Format", label: "Format conversion" },
                    { value: "QR Code", label: "Per-product, auto-generated" },
                    { value: "Zero", label: "Customer app downloads" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-[#007cae]/5 border border-[#007cae]/15 p-4 text-center"
                    >
                      <p className="text-[#007cae] font-extrabold text-base">
                        {stat.value}
                      </p>
                      <p className="text-slate-500 text-xs mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            <Divider />

            {/* ── GETTING STARTED ───────────────────────────────────────── */}
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
                      ["Starter", "10", "Testing & small catalogs"],
                      ["Growth", "50", "Growing brands"],
                      ["Enterprise", "Unlimited", "Large product libraries"],
                      [
                        "Custom",
                        "21+ (you choose)",
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
                <strong>iOS 17 or later</strong>. Standard iPhone models do not
                have the LiDAR sensor required for 3D scanning.
              </InfoBox>
            </section>

            <Divider />

            {/* ── SCANNING ─────────────────────────────────────────────── */}
            <section id="scanning" className="mb-16 scroll-mt-28">
              <SectionHeading>Scanning Products</SectionHeading>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                The quality of your final AR product is determined by how you
                scan it. Follow these guidelines to get accurate, photorealistic
                3D models.
              </p>

              <SubHeading id="scan-requirements">
                Device Requirements for Scanning
              </SubHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                  {
                    icon: "mdi:check-circle",
                    title: "Compatible Devices",
                    color: "bg-green-50 border-green-200",
                    iconColor: "text-green-600",
                    items: [
                      "Any iPhone Pro / Pro Max with iOS 17 or later",
                      "iPhone 15 Pro / Pro Max",
                      "iPhone 14 Pro / Pro Max",
                      "iPhone 13 Pro / Pro Max",
                      "iPhone 12 Pro / Pro Max",
                    ],
                  },
                  {
                    icon: "mdi:close-circle",
                    title: "NOT Compatible",
                    color: "bg-red-50 border-red-100",
                    iconColor: "text-red-400",
                    items: [
                      "Standard iPhone models (no LiDAR)",
                      "Any Android device",
                      "iPad (scanning not supported in app)",
                      "iOS 16 or older",
                    ],
                  },
                ].map((box, i) => (
                  <div key={i} className={`${box.color} border rounded-xl p-4`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon
                        icon={box.icon}
                        className={box.iconColor}
                        width={18}
                      />
                      <p className="font-bold text-slate-800 text-sm">
                        {box.title}
                      </p>
                    </div>
                    <ul className="space-y-1">
                      {box.items.map((item, j) => (
                        <li key={j} className="text-xs text-slate-600">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <SubHeading id="scan-tips">
                Scanning Tips for Best Results
              </SubHeading>
              <div className="space-y-4 mb-4">
                {[
                  {
                    icon: "mdi:weather-sunny",
                    title: "Use Even, Diffused Lighting",
                    desc: "Avoid harsh direct sunlight or a single bright spotlight. Soft, even lighting from multiple directions (like overcast daylight or softboxes) gives the LiDAR sensor the most accurate depth data and produces clean textures.",
                  },
                  {
                    icon: "mdi:rotate-3d-variant",
                    title: "Walk Completely Around the Object",
                    desc: "Move slowly and capture the product from all angles — front, sides, back, top, and any recessed areas. Missing angles will result in holes or flat patches in the final 3D model.",
                  },
                  {
                    icon: "mdi:table-furniture",
                    title: "Use a Neutral Background",
                    desc: "Place the product on a plain matte surface. Avoid cluttered backgrounds or identical-looking surroundings — the LiDAR sensor needs to distinguish the product from its environment.",
                  },
                  {
                    icon: "mdi:eye-off-outline",
                    title: "Avoid Highly Reflective or Transparent Objects",
                    desc: "Mirrors, glass, and chrome surfaces confuse LiDAR depth sensors. For such products, consider using a matte spray coating temporarily, or contact support for specialized scanning advice.",
                  },
                  {
                    icon: "mdi:ruler",
                    title: "Capture Full Scale",
                    desc: "SnapTap renders your product at the exact scale it's scanned. Make sure you capture the entire product (including legs, handles, etc.) consistently, as customers will see it at 1:1 real-world size.",
                  },
                ].map((tip, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#007cae]/10 flex items-center justify-center shrink-0">
                      <Icon
                        icon={tip.icon}
                        className="text-[#007cae]"
                        width={18}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm mb-1">
                        {tip.title}
                      </p>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {tip.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <SubHeading id="scan-upload">Uploading to SnapTap</SubHeading>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Once you finish scanning in the iOS app, you'll upload the model
                along with a product image and details.
              </p>
              <StepList
                steps={[
                  {
                    title: "Finish Scan in the iOS App",
                    desc: "The SnapTap app captures the LiDAR data and generates a model file on your device.",
                  },
                  {
                    title: "Enter Product Details",
                    desc: "Add the product name, description, price, and category. Upload a product thumbnail image (used in listings and your dashboard).",
                  },
                  {
                    title: "Choose Visibility",
                    desc: "Set the product as Active (visible to customers) or Inactive (draft, not yet visible). You can toggle this anytime from the dashboard.",
                  },
                  {
                    title: "Submit",
                    desc: "The app sends the model file and image to the SnapTap server. You'll immediately receive a confirmation — background processing starts right away.",
                  },
                ]}
              />
              <InfoBox type="info">
                Uploading uses one scan from your monthly quota. If your quota
                reaches zero, uploads are blocked until your plan renews or you
                upgrade.
              </InfoBox>
            </section>

            <Divider />

            {/* ── MODEL PROCESSING ─────────────────────────────────────── */}
            <section id="processing" className="mb-16 scroll-mt-28">
              <SectionHeading>Model Processing</SectionHeading>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                After you submit a product, SnapTap's backend handles everything
                automatically. Here's exactly what happens behind the scenes.
              </p>

              <SubHeading id="proc-pipeline">
                The Processing Pipeline
              </SubHeading>
              <div className="space-y-0 mb-6">
                {[
                  {
                    icon: "mdi:upload",
                    label: "Upload Received",
                    desc: 'The server receives your model file and product image. A product record is created in the database immediately — the model URL is set to "processing" while work continues in the background.',
                  },
                  {
                    icon: "mdi:image-plus",
                    label: "Product Image Stored",
                    desc: "Your product thumbnail is uploaded to SnapTap's cloud storage (DigitalOcean Spaces) and linked to the product.",
                  },
                  {
                    icon: "mdi:swap-horizontal",
                    label: "Model Conversion",
                    desc: "The model file is converted to web-standard format by SnapTap's conversion service. GLB works on all devices and web browsers; the original model file is retained for iOS Quick Look AR. This is the longest step and typically takes 1–5 minutes.",
                  },
                  {
                    icon: "mdi:qrcode-plus",
                    label: "QR Code Generated",
                    desc: "A unique QR code is generated and uploaded. It links directly to the SnapTap AR viewer page for this product (e.g. api.snaptap.pk/model/name/{productId}).",
                  },
                  {
                    icon: "mdi:database-check",
                    label: "Product Finalized",
                    desc: "The product record is updated with the final model URL and QR code URL. Your scan quota is decremented by 1 and your active product count is updated.",
                  },
                  {
                    icon: "mdi:bell-check",
                    label: "You're Notified",
                    desc: 'A notification appears in your dashboard: "Your product has been successfully processed and is now live!"',
                  },
                ].map((step, i, arr) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-[#007cae] text-white flex items-center justify-center shrink-0 z-10">
                        <Icon icon={step.icon} width={17} />
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-px flex-1 bg-[#007cae]/20 my-1" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="font-bold text-slate-800 text-sm mb-1">
                        {step.label}
                      </p>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <InfoBox type="warning">
                If conversion fails for any reason (rare network issue,
                unsupported model), the product is automatically{" "}
                <strong>rolled back and deleted</strong> from your catalog. You
                will receive a failure notification with guidance to retry.
              </InfoBox>

              <SubHeading id="proc-notifications">Notifications</SubHeading>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                SnapTap sends in-app notifications to your dashboard for key
                events. You'll see them in the notification bell in the top bar.
              </p>
              <CheckList
                items={[
                  "🎉 Product Ready — when your product finishes processing successfully",
                  "❌ Model Processing Failed — with the reason and a prompt to retry",
                  "⭐ New Customer Rating — when a customer rates one of your products",
                  "💬 New Customer Feedback — when a customer leaves a written review",
                ]}
              />

              <SubHeading id="proc-qr">QR Code Generation</SubHeading>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Each product gets a unique QR code that links to its AR viewer
                page. The QR code is created automatically as part of the
                processing pipeline — you don't need to do anything.
              </p>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 my-4 font-mono text-xs text-slate-600 break-all">
                QR Code URL format:{" "}
                <span className="text-[#007cae] font-bold">
                  https://api.snaptap.pk/model/name/&#123;productId&#125;
                </span>
              </div>
              <CheckList
                items={[
                  "Download the QR code PNG from your product dashboard",
                  "Print it on menus, price tags, in-store display cards, packaging inserts, or flyers",
                  "Share it digitally via WhatsApp, Instagram, email, or embed it in your website",
                  "The QR code never changes — it always points to the current version of the model",
                ]}
              />
            </section>

            <Divider />

            {/* ── INVENTORY & DASHBOARD ────────────────────────────────── */}
            <section id="inventory" className="mb-16 scroll-mt-28">
              <SectionHeading>Inventory & Dashboard</SectionHeading>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                The SnapTap web dashboard is your control center for managing
                your AR product catalog.
              </p>

              <SubHeading id="inv-manage">Managing Products</SubHeading>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Your inventory page lists all your products with their status,
                thumbnail, QR code, and model link.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                  {
                    icon: "mdi:eye",
                    title: "Active Products",
                    desc: "Visible to customers on the SnapTap marketplace. AR views are tracked and counted toward billing.",
                  },
                  {
                    icon: "mdi:eye-off",
                    title: "Inactive Products",
                    desc: "Hidden from the marketplace. AR views are not tracked. Use this for drafts or seasonal items.",
                  },
                  {
                    icon: "mdi:pencil",
                    title: "Edit Product",
                    desc: "Update the product name, description, price, category, or thumbnail image at any time. The 3D model itself cannot be replaced — re-upload as a new product.",
                  },
                  {
                    icon: "mdi:delete",
                    title: "Delete Product",
                    desc: "Permanently removes the product, its 3D model, image, and QR code from SnapTap. This action cannot be undone.",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50"
                  >
                    <Icon
                      icon={card.icon}
                      className="text-[#007cae] shrink-0 mt-0.5"
                      width={18}
                    />
                    <div>
                      <p className="font-bold text-slate-800 text-sm mb-1">
                        {card.title}
                      </p>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <InfoBox type="warning">
                Your plan has a <strong>maximum product limit</strong> equal to
                your scan quota. If you hit the limit, you cannot add new
                products until you delete existing ones or upgrade your plan.
              </InfoBox>

              <SubHeading id="inv-embed">
                Embedding the AR Viewer on Your Website
              </SubHeading>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Every product has a shareable model viewer URL. You can embed it
                directly on your e-commerce website using an{" "}
                <code className="bg-slate-100 px-1 rounded text-xs">
                  &lt;iframe&gt;
                </code>{" "}
                tag.
              </p>
              <div className="bg-slate-900 rounded-xl p-5 font-mono text-xs text-slate-300 overflow-x-auto mb-4">
                <span className="text-slate-500">{`<!-- Copy this into your product page -->`}</span>
                {"\n"}
                <span className="text-[#007cae]">&lt;iframe</span>
                {"\n  "}
                <span className="text-green-400">src</span>
                <span className="text-slate-300">=</span>
                <span className="text-amber-300">
                  "https://api.snaptap.pk/model/name/YOUR_PRODUCT_ID"
                </span>
                {"\n  "}
                <span className="text-green-400">width</span>
                <span className="text-slate-300">=</span>
                <span className="text-amber-300">"100%"</span>
                {"\n  "}
                <span className="text-green-400">height</span>
                <span className="text-slate-300">=</span>
                <span className="text-amber-300">"500"</span>
                {"\n  "}
                <span className="text-green-400">allow</span>
                <span className="text-slate-300">=</span>
                <span className="text-amber-300">"xr-spatial-tracking"</span>
                {"\n  "}
                <span className="text-green-400">frameborder</span>
                <span className="text-slate-300">=</span>
                <span className="text-amber-300">"0"</span>
                {"\n"}
                <span className="text-[#007cae]">&gt;&lt;/iframe&gt;</span>
              </div>
              <InfoBox type="tip">
                Replace <strong>YOUR_PRODUCT_ID</strong> with the numeric ID
                shown on your product detail page in the dashboard.
              </InfoBox>

              <SubHeading id="inv-qr">
                Using QR Codes In The Real World
              </SubHeading>
              <CheckList
                items={[
                  "Download the QR code PNG from the product detail page in your dashboard",
                  "Print at 300 DPI minimum — at least 3×3 cm on physical materials for reliable scanning",
                  'Add a short label like "Scan to View in 3D" or "See it in Your Space" next to the code',
                  "Test by scanning with both an iPhone and Android before mass printing",
                  "Use in-store shelf labels, printed menus, product tags, packaging boxes, or marketing flyers",
                ]}
              />
            </section>

            <Divider />

            {/* ── ANALYTICS & BILLING ──────────────────────────────────── */}
            <section id="analytics" className="mb-16 scroll-mt-28">
              <SectionHeading>Analytics & Billing</SectionHeading>

              <SubHeading id="ana-views">AR View Tracking</SubHeading>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Every time a customer opens your product's AR viewer page (via
                QR scan or direct link), it is recorded as a{" "}
                <strong>model view</strong>. Views are tracked per product and
                per month.
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
                  "Scans remaining in your current billing period",
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
                    desc: "AR views beyond a threshold contribute a small per-view charge. This is tracked monthly per product.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-4 bg-[#007cae]/5 rounded-xl border border-[#007cae]/15"
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
                details, total views, and estimated charges from the Insights
                section of the dashboard.
              </InfoBox>

              <SubHeading id="ana-plans">
                Changing Your Subscription Plan
              </SubHeading>
              <StepList
                steps={[
                  {
                    title: "Go to Pricing",
                    desc: "Navigate to the Pricing page from the main navigation.",
                  },
                  {
                    title: "Select a New Plan",
                    desc: 'Click "Get Started" on the plan you want. If logged in, the change applies immediately.',
                  },
                  {
                    title: "Confirm",
                    desc: "For Custom plans, set your required monthly scan count (minimum 21). The plan activates immediately.",
                  },
                ]}
              />
              <InfoBox type="warning">
                <strong>Downgrading</strong> to a plan with fewer allowed scans
                is blocked if you have more products than the new plan allows.
                Delete products first to enable the downgrade.
              </InfoBox>
            </section>

            <Divider />

            {/* ── CUSTOMER EXPERIENCE ──────────────────────────────────── */}
            <section id="customer" className="mb-16 scroll-mt-28">
              <SectionHeading>Customer Experience</SectionHeading>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                From a customer's perspective, SnapTap is completely invisible —
                they just point their camera at a code and the product appears
                in their world.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: "mdi:qrcode-scan",
                    title: "Scan a QR Code",
                    desc: "Customers use their native camera app (no QR reader needed on modern phones) to scan the SnapTap QR code printed on a menu, label, or display. They're taken directly to the product's AR viewer page.",
                  },
                  {
                    icon: "mdi:augmented-reality",
                    title: "AR Launches Automatically",
                    desc: "On iOS, Apple Quick Look launches immediately after the 3D model loads. On Android, Google Scene Viewer opens via an intent. There is no manual 'enter AR' button to press — it just works.",
                  },
                  {
                    icon: "mdi:ruler-square",
                    title: "True 1:1 Scale Placement",
                    desc: "The product is placed in the camera view at exact real-world size. A chair looks exactly as big as a real chair. A dish appears the exact size as it would on the table. No estimation needed.",
                  },
                  {
                    icon: "mdi:star-outline",
                    title: "Rate and Review",
                    desc: "Logged-in customers can leave a 1–5 star rating and a written review on any product they've experienced. Ratings are visible on the product listing and sent as a notification to the seller.",
                  },
                  {
                    icon: "mdi:heart-outline",
                    title: "Save Favorites",
                    desc: "Logged-in customers can save products to their favorites list to revisit or compare later.",
                  },
                  {
                    icon: "mdi:chat-outline",
                    title: "Contact the Seller",
                    desc: "From any product listing on the SnapTap marketplace, customers can contact the seller directly. No middleman, no e-commerce checkout required — just direct communication.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 sm:p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#007cae]/20 hover:bg-white transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#007cae]/10 flex items-center justify-center shrink-0">
                      <Icon
                        icon={item.icon}
                        className="text-[#007cae]"
                        width={20}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm mb-1">
                        {item.title}
                      </p>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ── FAQ ──────────────────────────────────────────────────── */}
            <section id="faq" className="mb-4 scroll-mt-28">
              <SectionHeading>Frequently Asked Questions</SectionHeading>
              <div className="space-y-4">
                {[
                  {
                    q: "Can I use any iPhone to scan products?",
                    a: "No. Scanning requires an iPhone Pro or iPhone Pro Max (12 Pro or later) running iOS 17+. These are the only models with the LiDAR depth sensor required for accurate 3D scanning. Standard iPhone models (without Pro) cannot scan. However, any iPhone 12 or newer can view AR products.",
                  },
                  {
                    q: "How long does processing take after I upload a product?",
                    a: "Most products are fully processed within 2–10 minutes. The main variable is the model conversion step. Once complete, you receive an in-app notification confirming the product is live.",
                  },
                  {
                    q: "What happens if the processing pipeline fails?",
                    a: "If any step fails (conversion, QR generation, etc.), the product is automatically deleted from your catalog and your scan quota is NOT decremented. You'll receive a notification explaining what went wrong. Simply retry the upload.",
                  },
                  {
                    q: "Can I replace the 3D model for an existing product?",
                    a: "Not directly. The 3D model is permanent once uploaded. To update a model, delete the existing product and re-upload a new scan. Product details (name, description, price) can be edited without affecting the model.",
                  },
                  {
                    q: "Do customers need to download an app?",
                    a: "No. Customers scan the QR code with their native camera app and the AR experience opens in the browser — no app download, no account creation required.",
                  },
                  {
                    q: "What devices support AR viewing?",
                    a: "iOS: iPhone 12+ in Safari using Apple Quick Look. Android: ARCore-supported devices in Chrome using Google Scene Viewer. Desktop: Interactive 3D viewer (no AR). Most modern smartphones released after 2020 are supported.",
                  },
                  {
                    q: "Can I downgrade my plan?",
                    a: "Yes, but only if your current product count is less than or equal to the new plan's scan quota. If you have more products than the new plan allows, you must delete products first.",
                  },
                  {
                    q: "Is the QR code permanent?",
                    a: "Yes. Each QR code is permanently tied to its product. The link never changes. However, if you delete the product, the QR code link will no longer work.",
                  },
                  {
                    q: "Can I use SnapTap for a restaurant menu?",
                    a: "Absolutely. Scan each dish, upload it, and print the generated QR codes on your physical menus or table cards. Customers scan the code and see the dish life-size before ordering.",
                  },
                  {
                    q: "How are AR views counted for billing?",
                    a: "Each time a customer opens the AR viewer page for your product (via QR scan or direct link), it counts as one view. Views are tracked per product, per month, and contribute to the usage portion of your monthly bill.",
                  },
                ].map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>

              <div className="mt-10 p-6 bg-[#007cae]/5 border border-[#007cae]/20 rounded-2xl text-center">
                <p className="text-slate-600 text-sm mb-4">
                  Still have questions? We're happy to help.
                </p>
                <button
                  onClick={() => router.push("/navigations/contact")}
                  className="bg-[#007cae] text-white font-bold px-8 py-3 rounded-full hover:bg-[#006080] transition-all text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Contact Support
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ accordion item ───────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 text-sm">{q}</span>
        <Icon
          icon={open ? "mdi:chevron-up" : "mdi:chevron-down"}
          className={`shrink-0 transition-transform ${open ? "text-[#007cae]" : "text-slate-400"}`}
          width={18}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}
