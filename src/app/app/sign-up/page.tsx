// src/app/app/sign-up/page.tsx
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

      if (values.location) {
        formData.append("location", values.location);
      }
      if (values.website_url) {
        formData.append("website_url", values.website_url);
      }
      if (values.category) {
        formData.append("category", values.category);
      }

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(`${BASE_URL}/brand/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (storedPlanId) {
        localStorage.removeItem("selectedPlanId");
      }
      if (storedPlanScans) {
        localStorage.removeItem("selectedPlanScans");
      }

      // Check if email verification is required
      if (response.data.requiresVerification) {
        toast.success(response.data.message || "Account created! Please check your email to verify your account.", {
          autoClose: 8000, // Keep visible longer
        });
        setLoading(false);
        // Don't redirect - let user read message and check email
      } else {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/app/login");
        }, 2000);
      }
      
    } catch (err: any) {
      console.error("Signup error:", err);
      
      // Check for network/server errors
      if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        toast.error("Server is not accessible. Please check your connection and try again.");
      } else if (!err.response) {
        toast.error("Cannot reach the server. Please try again later.");
      } else if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Signup failed. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        pauseOnHover
      />
      {/* LEFT SIDE - 3D Model */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(to bottom right, #6DD5FA, #FFFFFF)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          color: "#0A2540",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="w-full h-[400px] relative z-10">
          <ModelViewer />
        </div>
        <Title
          level={2}
          style={{
            fontSize: "2.5rem",
            color: "#00A8DE",
            maxWidth: 400,
            textAlign: "center",
            marginTop: "20px",
            zIndex: 20,
          }}
        >
          Join SnapTap Today
        </Title>
      </div>

      <div
        style={{
          flex: 1,
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          marginTop: "10vh",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Title level={2} style={{ textAlign: "center" }}>
            Create Account
          </Title>
          <Text
            type="secondary"
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Sign up for your SnapTap admin account
          </Text>

          <Form form={form} layout="vertical" onFinish={handleSignUp}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Username is required." },
                {
                  pattern: /^[^\s]+$/,
                  message: "Username must not contain spaces.",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Full name is required." }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your full name"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Email is required." },
                { type: "email", message: "Please enter a valid email." },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Phone number is required." },
                {
                  validator: (_, value) =>
                    validatePhone(value)
                      ? Promise.resolve()
                      : Promise.reject("Please enter a valid phone number"),
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Enter your phone number"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Password is required." },
                { min: 6, message: "Password must be at least 6 characters." },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                size="large"
              />
            </Form.Item>

            <Form.Item name="location" label="Location (Optional)">
              <Input
                prefix={<EnvironmentOutlined />}
                placeholder="Enter your location"
                size="large"
              />
            </Form.Item>

            <Form.Item name="website_url" label="Website URL (Optional)">
              <Input
                prefix={<GlobalOutlined />}
                placeholder="https://yourwebsite.com"
                size="large"
              />
            </Form.Item>

            <Form.Item name="category" label="Business Category (Optional)">
              <Select
                placeholder="Select a category"
                size="large"
                allowClear
              >
                {CATEGORIES.map((category) => (
                  <Select.Option key={category} value={category}>
                    {category}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="profileImage" label="Profile Image">
              <Upload.Dragger
                name="files"
                multiple={false}
                maxCount={1}
                accept=".png,.jpg,.jpeg,.webp"
                beforeUpload={(file) => {
                  const allowedTypes = [
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                    "image/webp",
                  ];
                  if (!allowedTypes.includes(file.type)) {
                    toast.error(
                      "Invalid file type. Only PNG, JPG, and WEBP are allowed."
                    );
                    return Upload.LIST_IGNORE;
                  }
                  setImage(file);
                  return false;
                }}
                onRemove={() => setImage(null)}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to upload profile image
                </p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{
                  borderRadius: 8,
                  backgroundColor: "#00A8DE",
                  borderColor: "#0A66C2",
                }}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Text type="secondary">Already have an account?</Text>{" "}
            <Button
              type="link"
              onClick={() => router.push("/app/login")}
              style={{ padding: 0 }}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
