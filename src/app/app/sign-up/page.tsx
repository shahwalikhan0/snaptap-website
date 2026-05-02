"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Form, Input, Button, Typography, Upload, Select } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  InboxOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { RcFile } from "antd/es/upload/interface";
import { SignUpFormValues } from "./types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { CATEGORIES } from "@/app/constants/categories";
import { Icon } from "@iconify/react";

const ModelViewer = dynamic(() => import("../components/ModelViewerWrapper"), {
  ssr: false,
});
import { AuthVisual } from "../components/auth/AuthVisual";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const { Title, Text } = Typography;

const SignUpPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<SignUpFormValues>();
  const router = useRouter();
  const [image, setImage] = useState<RcFile | null>(null);

  const validatePhone = (phone: string) =>
    /^\+?(\d{10,14})$/.test(phone.replace(/[\s-]/g, ""));

  const handleSignUp = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setLoading(true);

      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phone", values.phone);
      formData.append("name", values.name);

      const storedPlanId = localStorage.getItem("selectedPlanId");
      if (storedPlanId) {
        formData.append("subscribed_package_id", storedPlanId);
      }

      const storedPlanScans = localStorage.getItem("selectedPlanScans");
      if (storedPlanScans) {
        formData.append("total_scans", storedPlanScans);
      }

      if (values.location) formData.append("location", values.location);
      if (values.website_url)
        formData.append("website_url", values.website_url);
      if (values.category) formData.append("category", values.category);
      if (image) formData.append("image", image);

      const response = await axios.post(`${BASE_URL}/brand/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (storedPlanId) localStorage.removeItem("selectedPlanId");
      if (storedPlanScans) localStorage.removeItem("selectedPlanScans");

      toast.success("Account created successfully!");
      setTimeout(() => router.push("/app/login"), 2000);

      // Check if email verification is required
      if (response.data.requiresVerification) {
        toast.success(
          response.data.message ||
            "Account created! Please check your email to verify your account.",
          {
            autoClose: 8000, // Keep visible longer
          },
        );
        setLoading(false);
        // Don't redirect - let user read message and check email
      } else {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/app/login");
        }, 2000);
      }
    } catch (err: any) {
      if (err.code === "ERR_NETWORK") {
        toast.error("Server connection failed.");
      } else if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else if (err.name !== "ValidationError") {
        toast.error("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      {/* LEFT SIDE - Branding */}
      <AuthVisual
        title="Start Your Journey"
        subtitle="Join hundreds of brands using SnapTap to revolutionize their product visualization."
        isLogin={false}
      >
        <ModelViewer />
      </AuthVisual>

      {/* RIGHT SIDE - Form */}
      <div className="flex-1 flex items-start justify-center p-6 md:p-12 overflow-y-auto pt-12 md:pt-16 scrollbar-hide">
        <div className="w-full max-w-[650px] z-10">
          <div className="bg-white p-8 md:p-12 rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-12">
            <div className="mb-10 text-left">
              <div className="inline-block px-3 py-1 bg-[#007cae]/10 text-[#007cae] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
                Partner Registration
              </div>
              <Title
                level={2}
                className="!mb-3 !text-[#2e2e2e] !font-black !text-3xl md:text-4xl tracking-tight"
              >
                Create Business Account
              </Title>
              <Text className="text-[#555555] text-base font-medium">
                Enter your professional details to get started with SnapTap.
              </Text>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSignUp}
              requiredMark={false}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1"
            >
              <Form.Item
                name="username"
                label={
                  <span className="font-bold text-[#2e2e2e] text-xs uppercase tracking-widest">
                    Username
                  </span>
                }
                rules={[
                  { required: true, message: "Required" },
                  { pattern: /^[^\s]+$/, message: "No spaces" },
                ]}
                getValueFromEvent={(e) =>
                  e.target.value.replace(/\s/g, "").toLowerCase()
                }
                className="sm:col-span-1"
              >
                <Input
                  prefix={<UserOutlined className="text-[#888888] mr-2" />}
                  placeholder="brand_id"
                  className="h-12 rounded-[6px] border-slate-200 focus:border-[#007cae] focus:ring-4 focus:ring-[#007cae]/10 hover:border-[#007cae]/50 transition-all font-medium"
                />
              </Form.Item>

              <Form.Item
                name="name"
                label={
                  <span className="font-bold text-[#2e2e2e] text-xs uppercase tracking-widest">
                    Brand Name
                  </span>
                }
                rules={[{ required: true, message: "Required" }]}
                className="sm:col-span-1"
              >
                <Input
                  prefix={<AppstoreOutlined className="text-[#888888] mr-2" />}
                  placeholder="SnapTap Inc."
                  className="h-12 rounded-[6px] border-slate-200 focus:border-[#007cae] focus:ring-4 focus:ring-[#007cae]/10 hover:border-[#007cae]/50 transition-all font-medium"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={
                  <span className="font-bold text-[#2e2e2e] text-xs uppercase tracking-widest">
                    Email Address
                  </span>
                }
                rules={[
                  { required: true, message: "Required" },
                  { type: "email", message: "Invalid email" },
                ]}
                className="sm:col-span-2"
              >
                <Input
                  prefix={<MailOutlined className="text-[#888888] mr-2" />}
                  placeholder="contact@yourbrand.com"
                  className="h-12 rounded-[6px] border-slate-200 focus:border-[#007cae] focus:ring-4 focus:ring-[#007cae]/10 hover:border-[#007cae]/50 transition-all font-medium"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label={
                  <span className="font-bold text-[#2e2e2e] text-xs uppercase tracking-widest">
                    Phone Number
                  </span>
                }
                rules={[
                  { required: true, message: "Required" },
                  {
                    validator: (_, value) =>
                      !value || validatePhone(value)
                        ? Promise.resolve()
                        : Promise.reject("Invalid phone"),
                  },
                ]}
                className="sm:col-span-1"
              >
                <Input
                  prefix={<PhoneOutlined className="text-[#888888] mr-2" />}
                  placeholder="+1 (555) 000-0000"
                  className="h-12 rounded-[6px] border-slate-200 focus:border-[#007cae] focus:ring-4 focus:ring-[#007cae]/10 hover:border-[#007cae]/50 transition-all font-medium"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={
                  <span className="font-bold text-[#2e2e2e] text-xs uppercase tracking-widest">
                    Security Pin / Pass
                  </span>
                }
                rules={[
                  { required: true, message: "Password is required" },
                  { min: 6, message: "Min 6 chars" },
                ]}
                className="sm:col-span-1"
              >
                <Input.Password
                  prefix={<LockOutlined className="text-[#888888] mr-2" />}
                  placeholder="••••••••••••"
                  className="h-12 rounded-[6px] border-slate-200 focus:border-[#007cae] focus:ring-4 focus:ring-[#007cae]/10 hover:border-[#007cae]/50 transition-all font-medium"
                />
              </Form.Item>

              <Form.Item
                name="location"
                label={
                  <span className="font-bold text-[#2e2e2e] text-xs uppercase tracking-widest">
                    HQ Location
                  </span>
                }
                className="sm:col-span-1"
              >
                <Input
                  prefix={
                    <EnvironmentOutlined className="text-[#888888] mr-2" />
                  }
                  placeholder="New York, NY"
                  className="h-12 rounded-[6px] border-slate-200 focus:border-[#007cae] focus:ring-4 focus:ring-[#007cae]/10 hover:border-[#007cae]/50 transition-all font-medium"
                />
              </Form.Item>

              <Form.Item
                name="website_url"
                label={
                  <span className="font-bold text-[#2e2e2e] text-xs uppercase tracking-widest">
                    Digital Hub / Website
                  </span>
                }
                className="sm:col-span-1"
              >
                <Input
                  prefix={<GlobalOutlined className="text-[#888888] mr-2" />}
                  placeholder="www.yourbrand.com"
                  className="h-12 rounded-[6px] border-slate-200 focus:border-[#007cae] focus:ring-4 focus:ring-[#007cae]/10 hover:border-[#007cae]/50 transition-all font-medium"
                />
              </Form.Item>

              <Form.Item
                name="category"
                label={
                  <span className="font-bold text-[#2e2e2e] text-xs uppercase tracking-widest">
                    Business Sector
                  </span>
                }
                className="sm:col-span-2"
              >
                <Select
                  placeholder="Select industry sector"
                  size="large"
                  allowClear
                  className="rounded-[6px] border-slate-200 hover:border-[#007cae]/50 transition-all font-medium"
                >
                  {CATEGORIES.map((category) => (
                    <Select.Option key={category} value={category}>
                      {category}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="profileImage"
                label={
                  <span className="font-bold text-[#2e2e2e] text-xs uppercase tracking-widest">
                    Brand Mark / Logo
                  </span>
                }
                className="sm:col-span-2 mt-2"
              >
                <Upload.Dragger
                  name="files"
                  multiple={false}
                  maxCount={1}
                  accept=".png,.jpg,.jpeg,.webp"
                  className="!rounded-[12px] !bg-slate-50/50 border-dashed border-2 !border-slate-200 hover:!border-[#007cae]/30 transition-all group"
                  beforeUpload={(file) => {
                    setImage(file);
                    return false;
                  }}
                  onRemove={() => setImage(null)}
                >
                  <div className="py-6">
                    <div className="mx-auto w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <InboxOutlined className="text-[#007cae] text-xl" />
                    </div>
                    <p className="ant-upload-text text-[#2e2e2e] font-bold text-sm">
                      Upload Brand Asset
                    </p>
                    <p className="ant-upload-hint text-[#888888] text-xs mt-1">
                      Drag and drop your high-res logo (PNG, JPG, max 5MB)
                    </p>
                  </div>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item className="sm:col-span-2 mt-8 !mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="h-14 rounded-[8px] !bg-[#007cae] hover:!bg-[#006080] border-none font-black text-lg shadow-xl shadow-[#007cae]/25 transition-all active:scale-[0.98] !text-white flex items-center justify-center gap-3 group"
                >
                  Create Partner Account
                  <Icon
                    icon="mdi:chevron-right"
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-10 text-center pt-10 border-t border-slate-100">
              <p className="text-[#555555] font-medium">
                Already part of the ecosystem?{" "}
                <button
                  onClick={() => router.push("/app/login")}
                  className="font-black text-[#007cae] hover:text-[#006080] transition-colors ml-1 underline-offset-4 hover:underline"
                >
                  Sign In to Dashboard
                </button>
              </p>
            </div>
          </div>

          <p className="text-center text-[#888888] text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
            © 2026 SNAPTAP INC. • ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
