import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { AdminData, BrandData } from "../types";

interface BrandProfileCardProps {
  admin: AdminData;
  brand: BrandData;
  categoryIcon: string;
}

export function BrandProfileCard({
  admin,
  brand,
  categoryIcon,
}: BrandProfileCardProps) {
  return (
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

      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 space-y-4 text-[#2e2e2e] relative md:col-span-2">
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
  );
}
