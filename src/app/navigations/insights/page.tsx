"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "../../hooks/useAdminContext";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import dayjs from "dayjs";

import { AdminData, BrandData } from "./types"; // ✅ Corrected import

export default function InsightsPage() {
  const { Admin, Brand } = useAdmin();
  console.log("Admin from context:", Admin);
  console.log("Brand from context:", Brand);

  const [localAdmin, setLocalAdmin] = useState<AdminData | null>(null); // ✅ using typed state
  const [localBrand, setLocalBrand] = useState<BrandData | null>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchBrandIfMissing = async () => {
      if (Admin && !Brand) {
        try {
          const res = await fetch(`${BASE_URL}/brand/detail/${Admin.id}`);
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
  }, [Admin, Brand, BASE_URL]);

  const admin = localAdmin;
  const brand = localBrand;

  const isLoading = !admin || !brand;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#007cae]" />
          <p className="mt-4 text-[#007cae] font-medium text-lg">
            Loading insights...
          </p>
        </motion.div>
      </div>
    );
  }

  const scanUsage =
    brand.total_scans > 0
      ? ((brand.total_scans - brand.scans_remaining) / brand.total_scans) * 100
      : 0;

  const productUsage =
    brand.active_products + brand.in_active_products > 0
      ? (brand.active_products /
          (brand.active_products + brand.in_active_products)) *
        100
      : 0;

  const modelData = [
    { month: "Feb", models: 1 },
    { month: "Mar", models: 0 },
    { month: "Apr", models: 2 },
    { month: "May", models: 0 },
    { month: "Jun", models: 1 },
    { month: "Jul", models: brand.total_models_generated },
  ];

  const productData = [
    { name: "Active", value: brand.active_products },
    { name: "Inactive", value: brand.in_active_products },
  ];

  const COLORS = ["#00A8DE", "#888888"];

  return (
    <motion.div
      className="min-h-screen bg-gray-100 py-10 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-[#007cae] mb-8">
        Business Insights
      </h2>

      {/* Admin & Brand Info */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white rounded-xl p-6 shadow hover:scale-[1.02] transition">
          <h4 className="text-xl font-semibold text-[#2e2e2e]">{admin.name}</h4>
          <p className="text-[#555]">@{admin.username}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <p>
            <strong>Package:</strong> {brand.package_name}
          </p>
          <p>
            <strong>Category:</strong> {brand.category || "N/A"}
          </p>
          <p>
            <strong>Billing Month:</strong> {brand.month}/{brand.year}
          </p>
          <p>
            <strong>Status:</strong> {brand.status}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {brand.due_date
              ? dayjs(brand.due_date).format("MMMM D, YYYY")
              : "N/A"}
          </p>
          <p>
            <strong>Date Paid:</strong>{" "}
            {brand.date_paid
              ? dayjs(brand.date_paid).format("MMMM D, YYYY")
              : "Not yet paid"}
          </p>
          <p>
            <strong>Total Billing:</strong> ₹{brand.totalBilling}
          </p>
        </div>
      </motion.div>

      {/* Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-white rounded-xl p-6 shadow">
          <p>
            <strong>Total Scans:</strong> {brand.total_scans}
          </p>
          <p>
            <strong>Remaining:</strong> {brand.scans_remaining}
          </p>
          <div className="mt-4">
            <div className="flex justify-between mb-1 text-sm text-gray-600">
              <span>Usage</span>
              <span>{scanUsage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  scanUsage >= 80 ? "bg-red-500" : "bg-[#00A8DE]"
                }`}
                style={{ width: `${scanUsage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <p>
            <strong>Active:</strong> {brand.active_products}
          </p>
          <p>
            <strong>Inactive:</strong> {brand.in_active_products}
          </p>
          <div className="mt-4">
            <div className="flex justify-between mb-1 text-sm text-gray-600">
              <span>Active Ratio</span>
              <span>{productUsage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-green-500"
                style={{ width: `${productUsage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow text-center">
          <h3 className="text-2xl font-bold text-[#007cae]">
            {brand.total_models_generated}
          </h3>
          <p className="text-sm text-gray-600">Total Models Generated</p>
        </div>
      </motion.div>

      {/* Charts */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="bg-white rounded-xl p-6 shadow">
          <h4 className="font-semibold text-[#2e2e2e] mb-4">
            Model Generation (Last 6 Months)
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={modelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="models"
                stroke="#00A8DE"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h4 className="font-semibold text-[#2e2e2e] mb-4">
            Product Distribution
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={productData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {productData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
}
