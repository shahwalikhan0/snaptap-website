"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "../../hooks/useAdminContext";
import { Button, Typography, Result } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const { Title, Paragraph } = Typography;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ReactivatePage() {
  const { Admin, setAdmin, token } = useAdmin();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Admin?.account_status === "active") {
      router.replace("/app/inventory");
    }
  }, [Admin, router]);

  const isPendingDeletion = Admin?.account_status === "pending_deletion";

  const handleAction = async () => {
    setLoading(true);
    try {
      const endpoint = isPendingDeletion ? "/brand/cancel-deletion" : "/brand/reactivate";
      const res = await axios.put(
        `${BASE_URL}${endpoint}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.data.success) {
        toast.success(res.data.message || "Account restored successfully!");
        if (Admin) {
          setAdmin({ ...Admin, account_status: "active" });
        }
        setTimeout(() => {
          router.replace("/app/inventory");
        }, 1500);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to process request.");
    } finally {
      setLoading(false);
    }
  };

  if (!Admin) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 items-center justify-center p-6 w-full">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      
      <div className="max-w-lg w-full bg-white p-8 md:p-12 rounded-[6px] shadow-xl text-center">
        <Result
          status={isPendingDeletion ? "warning" : "error"}
          title={
            <span className="text-2xl font-black text-slate-800">
              {isPendingDeletion ? "Account Pending Deletion" : "Account Deactivated"}
            </span>
          }
          subTitle={
            <div className="text-slate-600 text-base mt-2">
              {isPendingDeletion
                ? "Your account is currently queued for permanent deletion. You will lose your data if you proceed. Do you want to cancel the deletion and restore your account?"
                : "Your account is currently deactivated and your subscription has been frozen. You cannot use the application until it is reactivated."}
            </div>
          }
          extra={[
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={handleAction}
              className="w-full mt-6 h-14 rounded-[6px] !bg-[#007cae] hover:!bg-[#006080] border-none font-bold text-lg shadow-lg shadow-[#007cae]/20 transition-all"
              key="restore"
            >
              {isPendingDeletion ? "Cancel Deletion & Restore" : "Reactivate Account"}
            </Button>,
            <div key="logout-link" className="mt-6">
               <button onClick={() => { localStorage.clear(); window.location.href = '/app/login'; }} className="text-slate-500 hover:text-red-500 font-semibold transition-colors">Log out instead</button>
            </div>
          ]}
        />
      </div>
    </div>
  );
}
