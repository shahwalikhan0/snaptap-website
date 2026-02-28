"use client";

import React, { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Form, Input, Button, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const { Title, Text } = Typography;

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // OTP digit handler — auto-advance focus
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }

    try {
      const values = await form.validateFields();
      setLoading(true);

      await axios.post(`${BASE_URL}/brand/reset-password`, {
        email,
        otp: otpValue,
        newPassword: values.newPassword,
      });

      toast.success("Password reset successful! Redirecting to login...", { autoClose: 3000 });
      setTimeout(() => router.push("/app/login"), 2500);
    } catch (err: any) {
      if (err.code === "ERR_NETWORK") {
        toast.error("Server unreachable. Check your connection.");
      } else if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else if (err.name !== "ValidationError") {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
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
            <Icon icon="mdi:shield-check-outline" className="text-[#007cae]" width={56} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Almost there!
          </h1>
          <p className="text-slate-600 text-lg">
            Enter the 6-digit code from your email and choose a new password.
          </p>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex items-start justify-center p-4 sm:p-6 md:p-12 bg-white pt-24 sm:pt-28 md:pt-28">
        <div className="w-full max-w-[400px]">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[#007cae]/10 flex items-center justify-center mb-6">
              <Icon icon="mdi:shield-check-outline" className="text-[#007cae]" width={32} />
            </div>
            <Title level={2} className="!mb-2 !text-slate-900 font-bold">
              Enter Reset Code
            </Title>
            {email && (
              <Text className="text-slate-400 text-center text-sm">
                Code sent to <span className="font-semibold text-slate-600">{email}</span>
              </Text>
            )}
          </div>

          {/* 6-digit OTP input boxes */}
          <div className="mb-6">
            <p className="font-semibold text-slate-700 mb-3">Reset Code</p>
            <div className="flex gap-3 justify-center" onPaste={handleOtpPaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-bold border-2 rounded-xl border-slate-200 focus:border-[#007cae] focus:outline-none transition-colors text-slate-900"
                  style={{ caretColor: "#007cae" }}
                />
              ))}
            </div>
            <p className="text-xs text-slate-400 text-center mt-2">
              Code expires in 15 minutes.
            </p>
          </div>

          {/* New password form */}
          <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
            <Form.Item
              name="newPassword"
              label={<span className="font-semibold text-slate-700">New Password</span>}
              rules={[
                { required: true, message: "Please enter a new password." },
                { min: 6, message: "Password must be at least 6 characters." },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-slate-400 mr-2" />}
                placeholder="••••••••"
                className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={<span className="font-semibold text-slate-700">Confirm New Password</span>}
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Please confirm your password." },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match."));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-slate-400 mr-2" />}
                placeholder="••••••••"
                className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
              />
            </Form.Item>

            <Form.Item className="!mb-0 mt-2">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="h-12 rounded-xl !bg-[#007cae] hover:!bg-[#006080] border-none font-bold text-base shadow-lg shadow-[#007cae]/20 transition-all active:scale-95 !text-white"
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-8 text-center pt-8 border-t border-slate-100">
            <p className="text-slate-500">
              Didn&apos;t receive a code?{" "}
              <button
                onClick={() => router.push("/app/forgot-password")}
                className="font-bold text-[#007cae] hover:text-[#006080] transition ml-1"
              >
                Resend code
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
