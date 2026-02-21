"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAdmin } from "../../hooks/useAdminContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";

const ModelViewer = dynamic(() => import("../components/ModelViewerWrapper"), {
  ssr: false,
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const { Title, Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { isLoggedIn, setToken, setBrand, setAdmin } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
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
        message.success("Login successful!");
        fetchBrand(brand.id, accessToken);
        router.replace("/app/inventory");
      } else {
        message.error("Invalid username or password.");
      }
    } catch (err: any) {
      if (err.code === 'ERR_NETWORK') {
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
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      {/* LEFT SIDE - Branding & 3D Visual (hidden on mobile) */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#007cae]/10 via-[#007cae]/5 to-white flex-col items-center justify-center p-8 md:p-12 pt-28 md:pt-28 relative overflow-hidden">
        {/* Decorative background shape */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#007cae]/5 rounded-full blur-3xl" />

        <div className="w-full max-w-lg aspect-square relative z-10 mb-8">
          <ModelViewer />
        </div>

        <div className="text-center z-10 max-w-sm">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Welcome Back!
          </h1>
          <p className="text-slate-600 text-lg">
            Your 3D inventory is just a click away. Let&apos;s get back to work.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="flex-1 flex items-start justify-center p-4 sm:p-6 md:p-12 bg-white pt-24 sm:pt-28 md:pt-28">
        <div className="w-full max-w-[400px]">
          {/* Mobile Logo / Branding */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[#007cae]/10 flex items-center justify-center mb-6">
              <Icon icon="mdi:shield-key-outline" className="text-[#007cae]" width={32} />
            </div>
            <Title level={2} className="!mb-2 !text-slate-900 font-bold">Admin Login</Title>
            <Text className="text-slate-400">Manage your SnapTap business account</Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleLogin}
            requiredMark={false}
            className="space-y-4"
          >
            <Form.Item
              name="username"
              label={<span className="font-semibold text-slate-700">Username</span>}
              rules={[{ required: true, message: "Please enter your username" }]}
            >
              <Input
                prefix={<UserOutlined className="text-slate-400 mr-2" />}
                placeholder="Enter your username"
                className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="font-semibold text-slate-700">Password</span>}
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-slate-400 mr-2" />}
                placeholder="••••••••"
                className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
              />
            </Form.Item>

            <div className="flex justify-end mb-6">
              <button
                type="button"
                className="text-sm font-semibold text-[#007cae] hover:text-[#006080] transition"
              >
                Forgot Password?
              </button>
            </div>

            <Form.Item className="!mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="h-12 rounded-xl !bg-[#007cae] hover:!bg-[#006080] border-none font-bold text-base shadow-lg shadow-[#007cae]/20 transition-all active:scale-95 !text-white"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-8 text-center pt-8 border-t border-slate-100">
            <p className="text-slate-500">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => router.push("/app/sign-up")}
                className="font-bold text-[#007cae] hover:text-[#006080] transition ml-1"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
