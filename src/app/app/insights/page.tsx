"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "../../hooks/useAdminContext";
import { easeOut, motion } from "framer-motion";
import { AdminData, BrandData, BillingRecord } from "./types";
import { useRouter } from "next/navigation";
import api from "@/app/utils/api";
import { Icon } from "@iconify/react";

import { BrandProfileCard } from "./components/BrandProfileCard";
import { StatsCards } from "./components/StatsCards";
import { ChartsSection } from "./components/ChartsSection";
import { SkeletonLoader } from "./components/Skeletons";

export default function InsightsPage() {
  const router = useRouter();
  const { isLoggedIn, Admin } = useAdmin();
  const [localAdmin, setLocalAdmin] = useState<AdminData | null>(null);
  const [localBrand, setLocalBrand] = useState<BrandData | null>(null);
  const [billingInfo, setBillingInfo] = useState<BillingRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelData, setModelData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) {
        setIsLoading(false);
        router.push(
          `/app/login?redirect=${encodeURIComponent(window.location.pathname)}`,
        );
        return;
      }

      try {
        if (Admin) {
          setLocalAdmin(Admin as any);
        }

        // Fetch brand details
        const brandRes = await api.get("/brand/detail");
        const brandData = brandRes.data;
        setLocalBrand(brandData);

        // Try to fetch current billing info if Admin ID exists
        if (Admin?.id) {
          try {
            const billingRes = await api.get(
              `/billing/brand/${Admin.id}/current`,
            );
            if (billingRes.data) {
              setBillingInfo(billingRes.data);
              // Override the brand's totalBilling with actual current month amount if they differ
              if (brandData) {
                brandData.is_estimate = billingRes.data.is_estimate;
                brandData.totalBilling = billingRes.data.total_amount;
                // Force sync month/year to reflect the live data returned
                if (billingRes.data.month) {
                  const m = new Date(billingRes.data.month);
                  brandData.month = m.getMonth() + 1; // 1-indexed for display
                  brandData.year = m.getFullYear();
                }
              }
            }
          } catch (err) {
            console.error("Failed to fetch billing info", err);
          }
        }

        // Fetch product analytics
        try {
          const [topRes, trendRes] = await Promise.all([
            api.get(`/product/brand-analytics/top-viewed`),
            api.get(`/product/brand-analytics/view-trend`),
          ]);

          if (topRes.data) {
            setTopProducts(topRes.data);
          }

          if (trendRes.data && trendRes.data.length > 0) {
            const formattedTrend = trendRes.data.map((item: any) => ({
              month: item.month,
              views: item.views,
              sortKey: `${item.year_num}-${String(item.month_num).padStart(2, "0")}`,
            }));
            // Make sure they are sorted ascending by date
            formattedTrend.sort((a: any, b: any) =>
              a.sortKey.localeCompare(b.sortKey),
            );
            setModelData(formattedTrend);
          } else {
            // Fallback if no real views yet
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
            setModelData(months.map((m) => ({ month: m, views: 0 })));
          }
        } catch (err) {
          console.error("Failed to fetch product analytics", err);
        }
      } catch (err) {
        console.error("Failed to fetch insights data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [Admin, isLoggedIn, router]);

  const admin = localAdmin;
  const brand = localBrand;

  if (isLoading || !admin || !brand) {
    return <SkeletonLoader />;
  }

  const scanUsage =
    (brand?.total_scans ?? 0) > 0
      ? (((brand?.total_scans ?? 0) - (brand?.scans_remaining ?? 0)) /
          (brand?.total_scans ?? 1)) *
        100
      : 0;

  const productUsage =
    (brand?.active_products ?? 0) + (brand?.in_active_products ?? 0) > 0
      ? ((brand?.active_products ?? 0) /
          ((brand?.active_products ?? 0) + (brand?.in_active_products ?? 0))) *
        100
      : 0;

  const productData = [
    { name: "Active", value: brand?.active_products || 0 },
    { name: "Inactive", value: brand?.in_active_products || 0 },
  ];

  const COLORS = ["#10b981", "#cbd5e1"]; // Emerald & Slate

  const categoryIcons: Record<string, string> = {
    Aerospace: "mdi:rocket-launch-outline",
    Technology: "mdi:laptop",
    Fashion: "mdi:tshirt-crew-outline",
    Food: "mdi:food",
    Healthcare: "mdi:heart-pulse",
    Education: "mdi:school-outline",
    RealEstate: "mdi:home-city-outline",
    Furniture: "mdi:sofa-outline",
  };

  const categoryKey = brand?.category
    ? brand.category.replace(/ & /g, "").replace(/\s/g, "")
    : undefined;
  const categoryIcon =
    categoryKey && categoryIcons[categoryKey]
      ? categoryIcons[categoryKey]
      : "mdi:tag-outline";

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-[6px] bg-gradient-to-br from-[#00A8DE] to-[#005a8c] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Icon icon="solar:pie-chart-3-bold-duotone" width={26} />
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight">
                Insights
              </h2>
            </div>
            <p className="text-slate-500 font-medium ml-1">
              Comprehensive overview of your brand's performance metrics.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-[6px] shadow-sm border border-slate-100">
            <Icon
              icon="solar:shield-check-bold-duotone"
              width={20}
              className="text-emerald-500"
            />
            <span className="text-sm font-bold text-slate-600">
              Data up to date
            </span>
          </div>
        </motion.div>

        <BrandProfileCard
          admin={admin}
          brand={brand}
          categoryIcon={categoryIcon}
        />

        <StatsCards
          brand={brand}
          scanUsage={scanUsage}
          productUsage={productUsage}
        />

        <ChartsSection
          modelData={modelData}
          productData={productData}
          colors={COLORS}
          topProducts={topProducts}
        />
      </div>
    </div>
  );
}
