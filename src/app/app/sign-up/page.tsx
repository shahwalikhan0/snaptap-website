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
import { Icon } from "@iconify/react";

const ModelViewer = dynamic(
  () => import("../components/ModelViewerWrapper"),
  {
    ssr: false,
  }
);

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
      if (values.website_url) formData.append("website_url", values.website_url);
      if (values.category) formData.append("category", values.category);
      if (image) formData.append("image", image);

      await axios.post(`${BASE_URL}/brand/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (storedPlanId) localStorage.removeItem("selectedPlanId");
      if (storedPlanScans) localStorage.removeItem("selectedPlanScans");

      toast.success("Account created successfully!");
      setTimeout(() => router.push("/app/login"), 2000);

    } catch (err: any) {
      if (err.code === 'ERR_NETWORK') {
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
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      {/* LEFT SIDE - Branding */}
      <div className="hidden md:flex md:w-[40%] bg-gradient-to-br from-[#007cae]/10 via-[#007cae]/5 to-white flex-col items-center justify-center p-8 md:p-12 pt-28 md:pt-28 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#007cae]/5 rounded-full blur-3xl" />

        <div className="w-full max-w-sm aspect-square relative z-10 mb-8">
          <ModelViewer />
        </div>

        <div className="text-center z-10 max-w-sm">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Join SnapTap
          </h1>
          <p className="text-slate-600 text-lg">
            Create your account and start building your 3D product catalog in minutes.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="flex-1 flex items-start justify-center p-4 sm:p-6 md:p-12 bg-white overflow-y-auto pt-24 sm:pt-28 md:pt-28">
        <div className="w-full max-w-[550px]">
          <div className="mb-10">
            <Title level={2} className="!mb-2 !text-slate-900 font-bold">Create Business Account</Title>
            <Text className="text-slate-400">Enter your details below to get started</Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSignUp}
            requiredMark={false}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2"
          >
            <Form.Item
              name="username"
              label={<span className="font-semibold text-slate-700">Username</span>}
              rules={[
                { required: true, message: "Required" },
                { pattern: /^[^\s]+$/, message: "No spaces" },
              ]}
              className="sm:col-span-1"
            >
              <Input prefix={<UserOutlined className="text-slate-300" />} placeholder="johndoe" className="h-11 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50" />
            </Form.Item>

            <Form.Item
              name="name"
              label={<span className="font-semibold text-slate-700">Full Name</span>}
              rules={[{ required: true, message: "Required" }]}
              className="sm:col-span-1"
            >
              <Input prefix={<UserOutlined className="text-slate-300" />} placeholder="John Doe" className="h-11 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50" />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="font-semibold text-slate-700">Email</span>}
              rules={[
                { required: true, message: "Required" },
                { type: "email", message: "Invalid email" },
              ]}
              className="sm:col-span-2"
            >
              <Input prefix={<MailOutlined className="text-slate-300" />} placeholder="john@example.com" className="h-11 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50" />
            </Form.Item>

            <Form.Item
              name="phone"
              label={<span className="font-semibold text-slate-700">Phone Number</span>}
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
              <Input prefix={<PhoneOutlined className="text-slate-300" />} placeholder="+92..." className="h-11 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50" />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="font-semibold text-slate-700">Password</span>}
              rules={[
                { required: true, message: "Required" },
                { min: 6, message: "Min 6 chars" },
              ]}
              className="sm:col-span-1"
            >
              <Input.Password prefix={<LockOutlined className="text-slate-300" />} placeholder="••••••••" className="h-11 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50" />
            </Form.Item>

            <Form.Item name="category" label={<span className="font-semibold text-slate-700">Category</span>} className="sm:col-span-1 text-slate-300">
              <Select placeholder="Select a business category" className="h-11 rounded-xl [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!h-11 [&_.ant-select-selection-search-input]:!h-11 flex items-center border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50">
                <Select.Option value="Furniture">Furniture</Select.Option>
                <Select.Option value="Electronics">Electronics</Select.Option>
                <Select.Option value="Retail">Retail</Select.Option>
                <Select.Option value="Restaurant">Restaurant</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="location" label={<span className="font-semibold text-slate-700">Location</span>} className="sm:col-span-1">
              <Input prefix={<EnvironmentOutlined className="text-slate-300" />} placeholder="New York, USA" className="h-11 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50" />
            </Form.Item>

            <Form.Item name="website_url" label={<span className="font-semibold text-slate-700">Website URL</span>} className="sm:col-span-2">
              <Input prefix={<GlobalOutlined className="text-slate-300" />} placeholder="https://yourbrand.com" className="h-11 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50" />
            </Form.Item>

            <Form.Item name="profileImage" label={<span className="font-semibold text-slate-700">Brand Logo / Profile Image</span>} className="sm:col-span-2">
              <Upload.Dragger
                name="files"
                multiple={false}
                maxCount={1}
                accept=".png,.jpg,.jpeg,.webp"
                className="!rounded-2xl !bg-slate-50 border-dashed border-2 !border-slate-200"
                beforeUpload={(file) => {
                  setImage(file);
                  return false;
                }}
                onRemove={() => setImage(null)}
              >
                <div className="py-4">
                  <p className="ant-upload-drag-icon !mb-2">
                    <InboxOutlined className="!text-[#007cae]" />
                  </p>
                  <p className="ant-upload-text text-slate-700 font-medium">Click or drag logo here</p>
                  <p className="ant-upload-hint text-slate-400 text-xs text-center">PNG, JPG or WEBP (max 5MB)</p>
                </div>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item className="sm:col-span-2 mt-4 !mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="h-12 rounded-xl !bg-[#007cae] hover:!bg-[#006080] border-none font-bold text-base shadow-lg shadow-[#007cae]/20 transition-all active:scale-95 !text-white"
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-8 text-center pt-8 border-t border-slate-100 mb-12">
            <p className="text-slate-500">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/app/login")}
                className="font-bold text-[#007cae] hover:text-[#006080] transition ml-1"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
