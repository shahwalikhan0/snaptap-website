"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "../../hooks/useAdminContext";
import { motion } from "framer-motion";
import { AdminData, BrandData } from "./types";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useRouter } from "next/navigation";

import { BrandProfileCard } from "./components/BrandProfileCard";
import { StatsCards } from "./components/StatsCards";
import { ChartsSection } from "./components/ChartsSection";

export default function InsightsPage() {
  const router = useRouter();
  const { isLoggedIn, Admin, Brand } = useAdmin();
  const [localAdmin, setLocalAdmin] = useState<AdminData | null>(null);
  const [localBrand, setLocalBrand] = useState<BrandData | null>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchBrandIfMissing = async () => {
      if (!isLoggedIn) {
        alert("Please log in to access the Insights Dashboard.");
        router.push(`/app/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        return null;
      }
      if (Admin && !Brand) {
        try {
          const res = await fetch(`${BASE_URL}/brand/detail/${Admin?.id}`);
          const brandData = await res.json();
          setLocalAdmin(Admin);
          setLocalBrand(brandData);
        } catch (err) {
          console.error("Failed to fetch brand:", err);
        }
      } else if (Admin && Brand) {
        setLocalAdmin(Admin);
        setLocalBrand(Brand);
      }
    };

    fetchBrandIfMissing();
  }, [Admin, Brand, BASE_URL, isLoggedIn, router]);

  const admin = localAdmin;
  const brand = localBrand;

  const isLoading = !admin || !brand;

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

  const modelData = [
    { month: "Feb", models: 1 },
    { month: "Mar", models: 0 },
    { month: "Apr", models: 2 },
    { month: "May", models: 0 },
    { month: "Jun", models: 1 },
    { month: "Jul", models: brand?.total_models_generated },
  ];

  const productData = [
    { name: "Active", value: brand?.active_products },
    { name: "Inactive", value: brand?.in_active_products },
  ];

  const COLORS = ["#00A8DE", "#888888"];

  const categoryIcons: Record<string, string> = {
    Aerospace: "mdi:rocket-launch-outline",
    Technology: "mdi:laptop",
    Fashion: "mdi:tshirt-crew-outline",
    Food: "mdi:food",
    Healthcare: "mdi:heart-pulse",
    Education: "mdi:school-outline",
    RealEstate: "mdi:home-city-outline",
  };

  const categoryKey = brand?.category
    ? brand.category.replace(/ & /g, "").replace(/\s/g, "")
    : undefined;
  const categoryIcon =
    categoryKey && categoryIcons[categoryKey]
      ? categoryIcons[categoryKey]
      : "mdi:tag-outline";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-white to-[#d8f3ff]">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#00A8DE]" />
          <p className="mt-4 text-[#007cae] font-semibold text-xl">
            Loading Insights...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-[#e8faff] via-white to-[#e2f2f8] pt-28 pb-16 px-6 sm:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00A8DE] via-[#00c2de] to-[#00A8DE] animate-pulse z-10" />
      <ReactTooltip id="status-tip" />
      <ReactTooltip id="paid-tip" />
      
      <motion.h2
        className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#007cae] to-[#00d0ff] mb-14 pb-2"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Brand Insights
      </motion.h2>

      <BrandProfileCard admin={admin} brand={brand} categoryIcon={categoryIcon} />
      
      <StatsCards brand={brand} scanUsage={scanUsage} productUsage={productUsage} />
      
      <ChartsSection modelData={modelData} productData={productData} colors={COLORS} />
      
    </motion.div>
  );
}
