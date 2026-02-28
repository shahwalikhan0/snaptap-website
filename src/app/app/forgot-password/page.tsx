"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Form, Input, Button, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const { Title, Text } = Typography;

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setEmailError("");
      const values = await form.validateFields();
      setLoading(true);

      await axios.post(`${BASE_URL}/brand/forgot-password`, {
        email: values.email,
      });

      toast.success("Reset code sent! Check your email.", { autoClose: 4000 });

      // Keep loading=true so button stays disabled during redirect
      router.push(`/app/reset-password?email=${encodeURIComponent(values.email)}`);
    } catch (err: any) {
      if (err.code === "ERR_NETWORK") {
        toast.error("Server unreachable. Check your connection.");
      } else if (err.response?.status === 404) {
        // Email not found — show inline error on the field
        setEmailError(err.response.data.error || "No account found with that email address.");
      } else if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else if (err.name !== "ValidationError") {
        toast.error("Something went wrong. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      {/* LEFT — decorative */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#007cae]/10 via-[#007cae]/5 to-white flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#007cae]/5 rounded-full blur-3xl" />
        <div className="z-10 text-center max-w-sm">
          <div className="flex items-center justify-center w-28 h-28 rounded-full bg-[#007cae]/10 mx-auto mb-8">
            <Icon icon="mdi:email-lock-outline" className="text-[#007cae]" width={56} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Forgot your password?
          </h1>
          <p className="text-slate-600 text-lg">
            No worries — enter your email and we&apos;ll send you a 6-digit reset code.
          </p>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex items-start justify-center p-4 sm:p-6 md:p-12 bg-white pt-24 sm:pt-28 md:pt-28">
        <div className="w-full max-w-[400px]">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[#007cae]/10 flex items-center justify-center mb-6">
              <Icon icon="mdi:email-lock-outline" className="text-[#007cae]" width={32} />
            </div>
            <Title level={2} className="!mb-2 !text-slate-900 font-bold">
              Reset Password
            </Title>
            <Text className="text-slate-400 text-center">
              Enter the email registered with your SnapTap account.
            </Text>
          </div>

          <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
            <Form.Item
              name="email"
              label={<span className="font-semibold text-slate-700">Email Address</span>}
              rules={[
                { required: true, message: "Please enter your email." },
                { type: "email", message: "Please enter a valid email." },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-slate-400 mr-2" />}
                placeholder="you@example.com"
                onChange={() => emailError && setEmailError("")}
                className={`h-12 rounded-xl border-slate-200 hover:border-[#007cae]/50 focus:border-[#007cae] ${
                  emailError ? "!border-red-400" : ""
                }`}
              />
            </Form.Item>
            {emailError && (
              <p className="-mt-4 mb-3 text-sm text-red-500 flex items-center gap-1">
                <span>⚠</span> {emailError}
              </p>
            )}

            <Form.Item className="!mb-0 mt-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="h-12 rounded-xl !bg-[#007cae] hover:!bg-[#006080] border-none font-bold text-base shadow-lg shadow-[#007cae]/20 transition-all active:scale-95 !text-white"
              >
                Send Reset Code
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-8 text-center pt-8 border-t border-slate-100">
            <p className="text-slate-500">
              Remember your password?{" "}
              <button
                onClick={() => router.push("/app/login")}
                className="font-bold text-[#007cae] hover:text-[#006080] transition ml-1 cursor-pointer"
              >
                Back to Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
