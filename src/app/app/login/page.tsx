"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAdmin } from "../../hooks/useAdminContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";

const ModelViewer = dynamic(() => import("../components/ModelViewerWrapper"), {
  ssr: false,
});
import { AuthVisual } from "../components/auth/AuthVisual";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const { Title, Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { isLoggedIn, setToken, setBrand, setAdmin } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      const searchParams = new URLSearchParams(window.location.search);
      const redirectUrl = searchParams.get("redirect");
      router.replace(redirectUrl || "/");
    }
  }, [isLoggedIn, router]);

  const fetchBrand = async (id: number, token: string | null) => {
    try {
      if (!id) return;
      if (!token) return;

      const response = await axios.get(`${BASE_URL}/brand/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      if (data?.id) {
        setBrand(data);
      }
    } catch (error: any) {
      console.error("Error fetching brand:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      const { username, password } = values;
      setLoading(true);

      const response = await axios.post(
        `${BASE_URL}/brand/login`,
        { username, password },
        { withCredentials: true },
      );

      const { brand, accessToken, error } = response.data;

      if (error) {
        toast.error(error?.response?.data?.error || "Login failed");
        return;
      }

      if (brand?.id && accessToken) {
        setAdmin(brand);
        setToken(accessToken);
        toast.success(`Welcome back, ${brand.name || brand.username}!`);
        fetchBrand(brand.id, accessToken);

        if (brand.account_status === "deactivated" || brand.account_status === "pending_deletion") {
          router.replace("/app/reactivate");
        } else {
          const searchParams = new URLSearchParams(window.location.search);
          const redirectUrl = searchParams.get("redirect");
          router.replace(redirectUrl || "/app/inventory");
        }
      } else {
        toast.error("Invalid username or password.");
      }
    } catch (err: any) {
      if (err.code === "ERR_NETWORK") {
        toast.error("Server unreachable. Check your connection.");
      } else if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else if (err.name !== "ValidationError") {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      {/* LEFT SIDE - Branding & 3D Visual */}
      <AuthVisual
        title="Welcome Back"
        subtitle="Access your premium 3D inventory and manage your brand's digital presence."
        isLogin={true}
      >
        <ModelViewer />
      </AuthVisual>

      {/* RIGHT SIDE - Form */}
      <div className="flex-1 flex items-start justify-center p-6 md:p-12 pt-16 md:pt-24 relative overflow-hidden">
        {/* Subtle background decorative element for mobile/tablet */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#007cae]/5 rounded-full blur-3xl -mr-32 -mt-32 md:hidden" />
        
        <div className="w-full max-w-[440px] z-10">
          <div className="bg-white p-8 md:p-10 rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            {/* Mobile Logo / Branding */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-[12px] bg-gradient-to-br from-[#007cae] to-[#00A8DE] flex items-center justify-center mb-6 shadow-lg shadow-[#007cae]/20 group transition-transform duration-500 hover:rotate-6">
                <Icon
                  icon="mdi:shield-key-outline"
                  className="text-white group-hover:scale-110 transition-transform"
                  width={34}
                />
              </div>
              <Title level={2} className="!mb-2 !text-[#2e2e2e] !font-black !text-3xl tracking-tight">
                Business Login
              </Title>
              <Text className="text-[#888888] font-medium">
                Manage your SnapTap ecosystem
              </Text>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleLogin}
              requiredMark={false}
              className="space-y-6"
            >
              <Form.Item
                name="username"
                label={
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-[#2e2e2e] text-sm uppercase tracking-wider">Username</span>
                    <span className="text-[10px] text-[#888888] font-bold uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                      Identity
                    </span>
                  </div>
                }
                rules={[
                  { required: true, message: "Username is required" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-[#888888] mr-2" />}
                  placeholder="e.g. snaptap_official"
                  className="h-13 rounded-[6px] border-slate-200 focus:border-[#007cae] focus:ring-4 focus:ring-[#007cae]/10 hover:border-[#007cae]/50 transition-all font-medium text-[#2e2e2e] placeholder:text-slate-300"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={
                  <span className="font-bold text-[#2e2e2e] text-sm uppercase tracking-wider">Password</span>
                }
                rules={[
                  { required: true, message: "Password is required" },
                ]}
                className="!mb-6"
              >
                <Input.Password
                  prefix={<LockOutlined className="text-[#888888] mr-2" />}
                  placeholder="••••••••••••"
                  className="h-13 rounded-[6px] border-slate-200 focus:border-[#007cae] focus:ring-4 focus:ring-[#007cae]/10 hover:border-[#007cae]/50 transition-all font-medium text-[#2e2e2e] placeholder:text-slate-300"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => router.push("/app/forgot-password")}
                    className="text-[11px] font-bold text-[#007cae] hover:text-[#006080] transition-colors uppercase tracking-wider underline-offset-4 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </Form.Item>

              <Form.Item className="!mb-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="h-13 rounded-[6px] !bg-[#007cae] hover:!bg-[#006080] border-none font-black text-base shadow-xl shadow-[#007cae]/25 transition-all active:scale-[0.98] !text-white flex items-center justify-center gap-2 group"
                >
                  Sign In to Dashboard
                  <Icon icon="mdi:arrow-right" className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center pt-8 border-t border-slate-100">
              <p className="text-[#555555] font-medium text-sm">
                New to the platform?{" "}
                <button
                  onClick={() => router.push("/app/sign-up")}
                  className="font-black text-[#007cae] hover:text-[#006080] transition-colors ml-1 decoration-skip-ink hover:underline underline-offset-4"
                >
                  Create Business Account
                </button>
              </p>
            </div>
          </div>
          
          {/* Bottom Footer Info */}
          <div className="mt-8 text-center flex items-center justify-center gap-4 text-xs font-bold text-[#888888] uppercase tracking-widest">
            <span>Privacy</span>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Terms</span>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
