"use client";

import { useState, useEffect } from "react";
import { allIds, sections } from "./constants/data";
import { DocsSidebar } from "./components/DocsSidebar";
import { Introduction } from "./components/sections/Introduction";
import { GettingStarted } from "./components/sections/GettingStarted";
import { ScanningProducts } from "./components/sections/ScanningProducts";
import { ModelProcessing } from "./components/sections/ModelProcessing";
import { InventoryDashboard } from "./components/sections/InventoryDashboard";
import { AnalyticsBilling } from "./components/sections/AnalyticsBilling";
import { CustomerExperience } from "./components/sections/CustomerExperience";
import { FAQSection } from "./components/sections/FAQSection";
import { Divider } from "./components/shared";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.filter((s) => s.children).map((s) => s.id)),
  );

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
          <DocsSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            activeSection={activeSection}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            scrollTo={scrollTo}
            isActive={isActive}
          />

          {/* ── Main Content ──────────────────────────────────────────────── */}
          <main className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 lg:p-14">
            <Introduction />
            <Divider />
            <GettingStarted />
            <Divider />
            <ScanningProducts />
            <Divider />
            <ModelProcessing />
            <Divider />
            <InventoryDashboard />
            <Divider />
            <AnalyticsBilling />
            <Divider />
            <CustomerExperience />
            <Divider />
            <FAQSection />
          </main>
        </div>
      </div>
    </div>
  );
}
