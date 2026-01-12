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
import { AdminData, BrandData } from "./types";
import { Icon } from "@iconify/react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useRouter } from "next/navigation";

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
        router.push("/app/login");
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
  }, [Admin, Brand, BASE_URL]);

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
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-gradient-to-br from-[#00c6ff] to-[#0072ff] text-white rounded-3xl shadow-xl p-6 text-center md:col-span-1">
          <h4 className="text-2xl font-bold">{admin.name}</h4>
          <p className="text-lg">@{admin.username}</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 space-y-4 text-[#2e2e2e] relative">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-gray-600">Package</p>
              <p className="text-lg font-bold text-[#007cae]">
                {brand.package_name}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                brand.status === "Active"
                  ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                  : "bg-gradient-to-r from-red-400 to-red-600 text-white"
              }`}
            >
              {brand.status}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icon icon={categoryIcon} className="text-[#00A8DE]" width={22} />
              <span className="font-medium">{brand.category || "N/A"}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-600">Billing</p>
              <p className="text-md font-medium">
                {brand.month}/{brand.year}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-600">Due Date</p>
              <p className="text-md">
                {brand.due_date
                  ? dayjs(brand.due_date).format("MMM D, YYYY")
                  : "N/A"}
              </p>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-600">Paid</span>
              <span
                className={`px-2 py-1 rounded-full w-fit text-sm font-medium ${
                  brand.date_paid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {brand.date_paid ? "Paid" : "Unpaid"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4 mt-2">
            <p className="text-sm font-semibold text-gray-600">Total Billing</p>
            <p className="text-xl font-bold text-[#007cae]">
              PKR {brand.totalBilling.toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-gradient-to-br from-[#d0f4ff] to-white rounded-3xl p-6 text-center shadow-xl">
          <h5 className="text-lg font-semibold text-[#007cae]">Total Scans</h5>
          <p className="text-2xl font-bold">{brand.total_scans}</p>
          <p className="text-sm text-gray-600">
            Remaining: {brand.scans_remaining}
          </p>
          <div className="h-2 w-full bg-gray-300 rounded-full mt-3">
            <div
              className={`h-2 rounded-full ${
                scanUsage >= 80 ? "bg-red-500" : "bg-[#00A8DE]"
              }`}
              style={{ width: `${scanUsage}%` }}
            />
          </div>
          <p className="text-sm mt-1">Usage: {scanUsage.toFixed(1)}%</p>
        </div>

        <div className="bg-gradient-to-br from-[#d4fbd8] to-white rounded-3xl p-6 text-center shadow-xl">
          <h5 className="text-lg font-semibold text-[#007cae]">Products</h5>
          <p className="text-xl">Active: {brand.active_products}</p>
          <p className="text-xl">Inactive: {brand.in_active_products}</p>
          <div className="h-2 w-full bg-gray-300 rounded-full mt-3">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{ width: `${productUsage}%` }}
            />
          </div>
          <p className="text-sm mt-1">
            Active Ratio: {productUsage.toFixed(1)}%
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#ffe3e3] to-white rounded-3xl p-6 text-center shadow-xl">
          <h5 className="text-lg font-semibold text-[#007cae]">Total Models</h5>
          <h3 className="text-3xl font-extrabold">
            {brand.total_models_generated}
          </h3>
          <p className="text-sm text-gray-600">Generated to date</p>
        </div>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl">
          <h4 className="text-xl font-semibold mb-4 text-[#007cae]">
            Model Generation (Last 6 Months)
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={modelData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }}
              />
              <Line
                type="monotone"
                dataKey="models"
                stroke="#00A8DE"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl">
          <h4 className="text-xl font-semibold mb-4 text-[#007cae]">
            Product Distribution
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {productData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }}
              />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>{" "}
    </motion.div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useAdmin } from "../../hooks/useAdminContext";
// import { motion } from "framer-motion";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import dayjs from "dayjs";

// import { AdminData, BrandData } from "./types";
// import { Icon } from "@iconify/react/dist/iconify.js";

// export default function InsightsPage() {
//   const { Admin, Brand } = useAdmin();
//   const [localAdmin, setLocalAdmin] = useState<AdminData | null>(null);
//   const [localBrand, setLocalBrand] = useState<BrandData | null>(null);
//   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//   useEffect(() => {
//     const fetchBrandIfMissing = async () => {
//       if (Admin && !Brand) {
//         try {
//           const res = await fetch(`${BASE_URL}/brand/detail/${Admin.id}`);
//           const brandData = await res.json();
//           setLocalAdmin(Admin);
//           setLocalBrand(brandData);
//         } catch (err) {
//           console.error("Failed to fetch brand:", err);
//         }
//       } else if (Admin && Brand) {
//         setLocalAdmin(Admin);
//         setLocalBrand(Brand);
//       }
//     };

//     fetchBrandIfMissing();
//   }, [Admin, Brand, BASE_URL]);

//   const admin = localAdmin;
//   const brand = localBrand;

//   const isLoading = !admin || !brand;

//   const scanUsage =
//     (brand?.total_scans ?? 0) > 0
//       ? (((brand?.total_scans ?? 0) - (brand?.scans_remaining ?? 0)) /
//           (brand?.total_scans ?? 1)) *
//         100
//       : 0;

//   const productUsage =
//     (brand?.active_products ?? 0) + (brand?.in_active_products ?? 0) > 0
//       ? ((brand?.active_products ?? 0) /
//           ((brand?.active_products ?? 0) + (brand?.in_active_products ?? 0))) *
//         100
//       : 0;

//   const modelData = [
//     { month: "Feb", models: 1 },
//     { month: "Mar", models: 0 },
//     { month: "Apr", models: 2 },
//     { month: "May", models: 0 },
//     { month: "Jun", models: 1 },
//     { month: "Jul", models: brand?.total_models_generated },
//   ];

//   const productData = [
//     { name: "Active", value: brand?.active_products },
//     { name: "Inactive", value: brand?.in_active_products },
//   ];

//   const COLORS = ["#00A8DE", "#888888"];

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gradient-to-b from-white to-[#d8f3ff]">
//         <motion.div
//           className="flex flex-col items-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#00A8DE]" />
//           <p className="mt-4 text-[#007cae] font-semibold text-xl">
//             Loading Insights...
//           </p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       className="min-h-screen bg-gradient-to-b from-[#e8faff] via-white to-[#e2f2f8] pt-28 pb-16 px-6 sm:px-10"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00A8DE] via-[#00c2de] to-[#00A8DE] animate-pulse z-10" />

//       <motion.h2
//         className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#007cae] to-[#00d0ff] mb-14"
//         initial={{ y: -30, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//       >
//         Brand Insights Dashboard
//       </motion.h2>

//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-3 gap-6"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div className="bg-gradient-to-br from-[#00c6ff] to-[#0072ff] text-white rounded-3xl shadow-xl p-6 text-center md:col-span-1">
//           <h4 className="text-2xl font-bold">{admin.name}</h4>
//           <p className="text-lg">@{admin.username}</p>
//         </div>

//         <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 space-y-4 text-[#2e2e2e]">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm font-semibold text-gray-600">Package</p>
//               <p className="text-lg font-bold text-[#007cae]">
//                 {brand.package_name}
//               </p>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-sm font-semibold text-gray-600">
//                 Status
//               </span>
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   brand.status === "Active"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-600"
//                 }`}
//               >
//                 {brand.status}
//               </span>
//             </div>
//           </div>

//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               <Icon
//                 icon="mdi:rocket-launch-outline"
//                 className="text-[#007cae]"
//                 width={20}
//               />
//               <span className="font-medium">{brand.category || "N/A"}</span>
//             </div>
//             <div className="text-right">
//               <p className="text-sm font-semibold text-gray-600">Billing</p>
//               <p className="text-md font-medium">
//                 {brand.month}/{brand.year}
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm font-semibold text-gray-600">Due Date</p>
//               <p className="text-md">
//                 {brand.due_date
//                   ? dayjs(brand.due_date).format("MMM D, YYYY")
//                   : "N/A"}
//               </p>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm font-semibold text-gray-600">Paid</span>
//               <span
//                 className={`px-2 py-1 rounded-full w-fit text-sm font-medium ${
//                   brand.date_paid
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-600"
//                 }`}
//               >
//                 {brand.date_paid
//                   ? dayjs(brand.date_paid).format("MMM D, YYYY")
//                   : "Not yet paid"}
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center justify-between border-t pt-4 mt-2">
//             <p className="text-sm font-semibold text-gray-600">Total Billing</p>
//             <p className="text-xl font-bold text-[#007cae]">
//               PKR {brand.totalBilling.toLocaleString()}
//             </p>
//           </div>
//         </div>
//       </motion.div>

//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//       >
//         <div className="bg-gradient-to-br from-[#d0f4ff] to-white rounded-3xl p-6 text-center shadow-xl">
//           <h5 className="text-lg font-semibold text-[#007cae]">Total Scans</h5>
//           <p className="text-2xl font-bold">{brand.total_scans}</p>
//           <p className="text-sm text-gray-600">
//             Remaining: {brand.scans_remaining}
//           </p>
//           <div className="h-2 w-full bg-gray-300 rounded-full mt-3">
//             <div
//               className={`h-2 rounded-full ${
//                 scanUsage >= 80 ? "bg-red-500" : "bg-[#00A8DE]"
//               }`}
//               style={{ width: `${scanUsage}%` }}
//             />
//           </div>
//           <p className="text-sm mt-1">Usage: {scanUsage.toFixed(1)}%</p>
//         </div>

//         <div className="bg-gradient-to-br from-[#d4fbd8] to-white rounded-3xl p-6 text-center shadow-xl">
//           <h5 className="text-lg font-semibold text-[#007cae]">Products</h5>
//           <p className="text-xl">Active: {brand.active_products}</p>
//           <p className="text-xl">Inactive: {brand.in_active_products}</p>
//           <div className="h-2 w-full bg-gray-300 rounded-full mt-3">
//             <div
//               className="h-2 bg-green-500 rounded-full"
//               style={{ width: `${productUsage}%` }}
//             />
//           </div>
//           <p className="text-sm mt-1">
//             Active Ratio: {productUsage.toFixed(1)}%
//           </p>
//         </div>

//         <div className="bg-gradient-to-br from-[#ffe3e3] to-white rounded-3xl p-6 text-center shadow-xl">
//           <h5 className="text-lg font-semibold text-[#007cae]">Total Models</h5>
//           <h3 className="text-3xl font-extrabold">
//             {brand.total_models_generated}
//           </h3>
//           <p className="text-sm text-gray-600">Generated to date</p>
//         </div>
//       </motion.div>

//       <motion.div
//         className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5 }}
//       >
//         <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl">
//           <h4 className="text-xl font-semibold mb-4 text-[#007cae]">
//             Model Generation (Last 6 Months)
//           </h4>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart
//               data={modelData}
//               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//               <XAxis dataKey="month" />
//               <YAxis allowDecimals={false} />
//               <Tooltip
//                 contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="models"
//                 stroke="#00A8DE"
//                 strokeWidth={3}
//                 dot={{ r: 5 }}
//                 activeDot={{ r: 7 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl">
//           <h4 className="text-xl font-semibold mb-4 text-[#007cae]">
//             Product Distribution
//           </h4>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={productData}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={100}
//                 label
//               >
//                 {productData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip
//                 contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }}
//               />
//               <Legend iconType="circle" />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }
