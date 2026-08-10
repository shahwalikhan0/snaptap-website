"use client";

import React, { Suspense, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Form, Input, Button, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import { verifyOtp, resetPassword } from "./services/resetPasswordApi";
import { BRAND } from "@/app/utils/tokens";

const { Title, Text } = Typography;

// ─── Step 1: OTP Verification ────────────────────────────────────────────────
const VerifyOtpStep = ({
  email,
  otp,
  setOtp,
  onVerified,
}: {
  email: string;
  otp: string[];
  setOtp: (v: string[]) => void;
  onVerified: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(email, otpValue);
      toast.success("Code verified! Now set your new password.");
      onVerified();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") {
          toast.error("Server unreachable. Check your connection.");
        } else if (err.response?.data?.error) {
          toast.error(err.response.data.error);
        } else {
          toast.error("Verification failed. Please try again.");
        }
      } else {
        toast.error("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* LEFT — decorative */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-snaptap-blue-dark/10 via-snaptap-blue-dark/5 to-white flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-snaptap-blue-dark/5 rounded-brand blur-3xl" />
        <div className="z-10 text-center max-w-sm">
          <div className="flex items-center justify-center w-28 h-28 rounded-brand bg-snaptap-blue-dark/10 mx-auto mb-8">
            <Icon
              icon="mdi:shield-check-outline"
              className="text-snaptap-blue-dark"
              width={56}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Check your inbox
          </h1>
          <p className="text-slate-600 text-lg">
            We sent a 6-digit code to your email. Enter it to confirm your
            identity.
          </p>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex items-start justify-center p-4 sm:p-6 md:p-12 bg-white pt-24 sm:pt-28 md:pt-28">
        <div className="w-full max-w-[400px]">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-7 h-7 rounded-brand bg-snaptap-blue-dark text-white text-xs font-bold">
              1
            </div>
            <div className="h-px flex-1 bg-slate-200" />
            <div className="flex items-center justify-center w-7 h-7 rounded-brand bg-slate-200 text-slate-400 text-xs font-bold">
              2
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 rounded-brand bg-snaptap-blue-dark/10 flex items-center justify-center mb-6">
              <Icon
                icon="mdi:shield-check-outline"
                className="text-snaptap-blue-dark"
                width={32}
              />
            </div>
            <Title level={2} className="!mb-2 !text-slate-900 font-bold">
              Verify Your Code
            </Title>
            {email && (
              <Text className="text-slate-400 text-center text-sm">
                Code sent to{" "}
                <span className="font-semibold text-slate-600">{email}</span>
              </Text>
            )}
          </div>

          {/* 6-digit OTP boxes */}
          <div className="mb-8">
            <p className="font-semibold text-slate-700 mb-3">
              6-Digit Reset Code
            </p>
            <div className="flex gap-3 justify-center" onPaste={handleOtpPaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-bold border-2 rounded-brand border-slate-200 focus:border-snaptap-blue-dark focus:outline-none transition-colors text-slate-900"
                  style={{ caretColor: BRAND.blueDark }}
                />
              ))}
            </div>
            <p className="text-xs text-slate-400 text-center mt-2">
              Code expires in 15 minutes.
            </p>
          </div>

          <Button
            type="primary"
            loading={loading}
            block
            onClick={handleVerify}
            className="h-12 rounded-brand font-bold text-base shadow-lg shadow-snaptap-blue-dark/20 transition-all active:scale-95 !text-white"
          >
            Verify Code
          </Button>

          <div className="mt-8 text-center pt-8 border-t border-slate-100">
            <p className="text-slate-500">
              Didn&apos;t receive a code?{" "}
              <button
                onClick={() => router.push("/app/forgot-password")}
                className="font-bold text-snaptap-blue-dark hover:text-snaptap-blue-deep transition ml-1"
              >
                Resend code
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── Step 2: New Password ─────────────────────────────────────────────────────
const NewPasswordStep = ({ email, otp }: { email: string; otp: string[] }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      await resetPassword(email, otp.join(""), values.newPassword);

      toast.success("Password reset successful! Redirecting to login...", {
        autoClose: 3000,
      });
      setTimeout(() => router.push("/app/login"), 2500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") {
          toast.error("Server unreachable. Check your connection.");
        } else if (err.response?.data?.error) {
          toast.error(err.response.data.error);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else if (err instanceof Error && err.name !== "ValidationError") {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* LEFT — decorative */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-snaptap-blue-dark/10 via-snaptap-blue-dark/5 to-white flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-snaptap-blue-dark/5 rounded-brand blur-3xl" />
        <div className="z-10 text-center max-w-sm">
          <div className="flex items-center justify-center w-28 h-28 rounded-brand bg-snaptap-blue-dark/10 mx-auto mb-8">
            <Icon icon="mdi:lock-reset" className="text-snaptap-blue-dark" width={56} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Set new password
          </h1>
          <p className="text-slate-600 text-lg">
            Choose a strong password you haven&apos;t used before.
          </p>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex items-start justify-center p-4 sm:p-6 md:p-12 bg-white pt-24 sm:pt-28 md:pt-28">
        <div className="w-full max-w-[400px]">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-7 h-7 rounded-brand bg-green-500 text-white text-xs font-bold">
              ✓
            </div>
            <div className="h-px flex-1 bg-snaptap-blue-dark" />
            <div className="flex items-center justify-center w-7 h-7 rounded-brand bg-snaptap-blue-dark text-white text-xs font-bold">
              2
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 rounded-brand bg-snaptap-blue-dark/10 flex items-center justify-center mb-6">
              <Icon
                icon="mdi:lock-reset"
                className="text-snaptap-blue-dark"
                width={32}
              />
            </div>
            <Title level={2} className="!mb-2 !text-slate-900 font-bold">
              New Password
            </Title>
            <Text className="text-slate-400 text-center text-sm">
              Code verified ✅ — now choose your new password.
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
          >
            <Form.Item
              name="newPassword"
              label={
                <span className="font-semibold text-slate-700">
                  New Password
                </span>
              }
              rules={[
                { required: true, message: "Please enter a new password." },
                { min: 6, message: "Password must be at least 6 characters." },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-slate-400 mr-2" />}
                placeholder="••••••••"
                className="h-12 rounded-brand border-slate-200 focus:border-snaptap-blue-dark hover:border-snaptap-blue-dark/50"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={
                <span className="font-semibold text-slate-700">
                  Confirm New Password
                </span>
              }
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
                className="h-12 rounded-brand border-slate-200 focus:border-snaptap-blue-dark hover:border-snaptap-blue-dark/50"
              />
            </Form.Item>

            <Form.Item className="!mb-0 mt-2">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="h-12 rounded-brand font-bold text-base shadow-lg shadow-snaptap-blue-dark/20 transition-all active:scale-95 !text-white"
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

// ─── Page shell ──────────────────────────────────────────────────────────────
const ResetPasswordInner = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [step, setStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      {step === 1 ? (
        <VerifyOtpStep
          email={email}
          otp={otp}
          setOtp={setOtp}
          onVerified={() => setStep(2)}
        />
      ) : (
        <NewPasswordStep email={email} otp={otp} />
      )}
    </div>
  );
};

const ResetPasswordPage = () => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-slate-400">Loading…</span>
      </div>
    }
  >
    <ResetPasswordInner />
  </Suspense>
);

export default ResetPasswordPage;
