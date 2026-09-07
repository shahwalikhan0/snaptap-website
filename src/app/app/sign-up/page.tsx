"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Form, Input, Button, Typography, Upload, Select } from "antd";
import {
  createBrandAccount,
  resendVerificationLink,
  readSignupConflict,
} from "./services/signupApi";
import {
  SignupConflictNotice,
  type SignupConflictVariant,
} from "./components/SignupConflictNotice";
import { useResendCooldown } from "@/app/hooks/useResendCooldown";
import { readCooldown } from "@/app/utils/resend";
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
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { CATEGORIES } from "@/app/constants/categories";
import { COUNTRIES } from "@/app/constants/countries";
import { LEGAL_BUSINESS_NAME } from "@/app/utils/site";
import { Icon } from "@iconify/react";

const ModelViewer = dynamic(() => import("../components/ModelViewerWrapper"), {
  ssr: false,
});
import { AuthVisual } from "../components/auth/AuthVisual";

const { Title, Text } = Typography;

const SignUpPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<SignUpFormValues>();
  const router = useRouter();
  const [image, setImage] = useState<RcFile | null>(null);

  // ── Email-collision state (409 from POST /brand/create) ───────────────────
  const [conflictVariant, setConflictVariant] =
    useState<SignupConflictVariant | null>(null);
  const [conflictEmail, setConflictEmail] = useState("");
  const [conflictMessage, setConflictMessage] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const { secondsLeft, isCoolingDown, start, reset } = useResendCooldown();

  const clearConflict = () => {
    setConflictVariant(null);
    setConflictEmail("");
    setConflictMessage(null);
    reset();
  };

  const handleResendVerification = async () => {
    if (!conflictEmail || resending || isCoolingDown) return;

    setResending(true);
    try {
      const data = await resendVerificationLink(conflictEmail);
      setConflictVariant("unverified-resent");
      // The 200 body is identical whether or not mail went out — just show it.
      setConflictMessage(data?.message ?? null);
      start();
      toast.success("A new verification link is on its way.");
    } catch (err: unknown) {
      const cooldown = readCooldown(err);
      if (cooldown.isCooldown) {
        start(cooldown.retryAfterSeconds ?? undefined);
        setConflictVariant("unverified-cooldown");
        setConflictMessage(cooldown.message);
      } else if (axios.isAxiosError(err)) {
        toast.error(
          err.code === "ERR_NETWORK"
            ? "Server connection failed."
            : err.response?.data?.error ||
                "Could not resend the link. Please try again.",
        );
      } else {
        toast.error("Could not resend the link. Please try again.");
      }
    } finally {
      setResending(false);
    }
  };

  const validatePhone = (phone: string) =>
    /^\+?(\d{10,14})$/.test(phone.replace(/[\s-]/g, ""));

  const handleSignUp = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      clearConflict();
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

      if (values.country) formData.append("country", values.country);
      if (values.location) formData.append("location", values.location);
      if (values.website_url)
        formData.append("website_url", values.website_url);
      if (values.category) formData.append("category", values.category);
      if (image) formData.append("image", image);

      const responseData = await createBrandAccount(formData);

      if (storedPlanId) localStorage.removeItem("selectedPlanId");
      if (storedPlanScans) localStorage.removeItem("selectedPlanScans");

      // Check if email verification is required
      if (responseData.requiresVerification) {
        toast.success(
          responseData.message ||
            "Account created! Please check your email to verify your account.",
          {
            autoClose: 8000, // Keep visible longer
          },
        );
        // Don't redirect - let user read message and check email
      } else {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/app/login");
        }, 2000);
      }
    } catch (err: unknown) {
      // ── 409: something the user typed is already taken ────────────────────
      const conflict = readSignupConflict(err);
      if (conflict) {
        if (conflict.emailInUse) {
          const email = String(form.getFieldValue("email") ?? "");
          setConflictEmail(email);
          setConflictMessage(conflict.error ?? null);

          if (conflict.accountVerified) {
            // A usable account already exists — point at login / reset.
            setConflictVariant("existing-verified");
            reset();
          } else if (conflict.resent) {
            // The server already mailed a fresh link for us. Start the
            // cooldown so the panel's own button can't immediately re-fire.
            setConflictVariant("unverified-resent");
            start();
          } else {
            // A link went out very recently — gate on the server's window.
            setConflictVariant("unverified-cooldown");
            start(conflict.retryAfterSeconds ?? undefined);
          }
          return;
        }

        // Field-level collisions: mark the offending field inline so the user
        // can see which one to change, not just a toast.
        const fieldErrors: {
          name: keyof SignUpFormValues;
          errors: string[];
        }[] = [];
        if (conflict.usernameInUse) {
          fieldErrors.push({
            name: "username",
            errors: ["That username is taken — try another."],
          });
        }
        if (conflict.nameInUse) {
          fieldErrors.push({
            name: "name",
            errors: ["That brand name is taken — try another."],
          });
        }
        if (fieldErrors.length > 0) {
          form.setFields(fieldErrors);
          form.scrollToField(fieldErrors[0].name);
          toast.error(
            conflict.error || "Some of your details are already in use.",
          );
          return;
        }

        toast.error(conflict.error || "Signup failed. Please try again.");
        return;
      }

      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") {
          toast.error("Server connection failed.");
        } else if (err.response?.data?.error) {
          toast.error(err.response.data.error);
        } else {
          toast.error("Signup failed. Please try again.");
        }
      } else if (err instanceof Error && err.name !== "ValidationError") {
        toast.error("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">

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
              <div className="inline-block px-3 py-1 bg-snaptap-blue-dark/10 text-snaptap-blue-dark text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
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

            {conflictVariant && (
              <SignupConflictNotice
                variant={conflictVariant}
                email={conflictEmail}
                serverMessage={conflictMessage}
                resending={resending}
                isCoolingDown={isCoolingDown}
                secondsLeft={secondsLeft}
                onResend={handleResendVerification}
                onDismiss={clearConflict}
              />
            )}

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
                  // Mirrors the server rule (utils/username.js). Login accepts
                  // a username OR an email, so a username shaped like an
                  // address would collide with somebody else's account.
                  { pattern: /^[^@]*$/, message: 'Cannot contain "@"' },
                ]}
                getValueFromEvent={(e) =>
                  e.target.value.replace(/\s/g, "").toLowerCase()
                }
                className="sm:col-span-1"
              >
                <Input
                  prefix={<UserOutlined className="text-[#888888] mr-2" />}
                  placeholder="brand_id"
                  className="h-12 rounded-brand border-slate-200 focus:border-snaptap-blue-dark focus:ring-4 focus:ring-snaptap-blue-dark/10 hover:border-snaptap-blue-dark/50 transition-all font-medium"
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
                  className="h-12 rounded-brand border-slate-200 focus:border-snaptap-blue-dark focus:ring-4 focus:ring-snaptap-blue-dark/10 hover:border-snaptap-blue-dark/50 transition-all font-medium"
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
                  className="h-12 rounded-brand border-slate-200 focus:border-snaptap-blue-dark focus:ring-4 focus:ring-snaptap-blue-dark/10 hover:border-snaptap-blue-dark/50 transition-all font-medium"
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
                  className="h-12 rounded-brand border-slate-200 focus:border-snaptap-blue-dark focus:ring-4 focus:ring-snaptap-blue-dark/10 hover:border-snaptap-blue-dark/50 transition-all font-medium"
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
                  className="h-12 rounded-brand border-slate-200 focus:border-snaptap-blue-dark focus:ring-4 focus:ring-snaptap-blue-dark/10 hover:border-snaptap-blue-dark/50 transition-all font-medium"
                />
              </Form.Item>

              <Form.Item
                name="country"
                label={
                  <span className="font-bold text-[#2e2e2e] text-xs uppercase tracking-widest">
                    Country
                  </span>
                }
                rules={[{ required: true, message: "Required" }]}
                className="sm:col-span-1"
              >
                <Select
                  showSearch
                  placeholder="Select your country"
                  optionFilterProp="children"
                  className="h-12 [&_.ant-select-selector]:!h-12 [&_.ant-select-selector]:!rounded-brand [&_.ant-select-selector]:!border-slate-200 [&_.ant-select-selection-item]:!leading-[46px]"
                >
                  {COUNTRIES.map((c) => (
                    <Select.Option key={c.code} value={c.code}>
                      {c.name}
                    </Select.Option>
                  ))}
                </Select>
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
                  className="h-12 rounded-brand border-slate-200 focus:border-snaptap-blue-dark focus:ring-4 focus:ring-snaptap-blue-dark/10 hover:border-snaptap-blue-dark/50 transition-all font-medium"
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
                  className="h-12 rounded-brand border-slate-200 focus:border-snaptap-blue-dark focus:ring-4 focus:ring-snaptap-blue-dark/10 hover:border-snaptap-blue-dark/50 transition-all font-medium"
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
                  className="rounded-brand border-slate-200 hover:border-snaptap-blue-dark/50 transition-all font-medium"
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
                  className="!rounded-[12px] !bg-slate-50/50 border-dashed border-2 !border-slate-200 hover:!border-snaptap-blue-dark/30 transition-all group"
                  beforeUpload={(file) => {
                    setImage(file);
                    return false;
                  }}
                  onRemove={() => setImage(null)}
                >
                  <div className="py-6">
                    <div className="mx-auto w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <InboxOutlined className="text-snaptap-blue-dark text-xl" />
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
                  className="h-14 rounded-[8px] font-bold font-black text-lg shadow-xl shadow-snaptap-blue-dark/25 transition-all active:scale-[0.98] !text-white flex items-center justify-center gap-3 group"
                >
                  Create Partner Account
                  <Icon
                    icon="mdi:chevron-right"
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Form.Item>

              {/* Policy consent. Gateway review expects the terms a buyer is
                  agreeing to be reachable from the point of sign-up, not only
                  from the footer. */}
              <Form.Item className="sm:col-span-2 !mb-0">
                <p className="text-center text-xs text-[#888888] leading-relaxed">
                  By creating an account you agree to our{" "}
                  <a
                    href="/navigations/terms"
                    className="text-snaptap-blue-dark font-semibold hover:underline"
                  >
                    Terms &amp; Conditions
                  </a>
                  ,{" "}
                  <a
                    href="/navigations/privacy"
                    className="text-snaptap-blue-dark font-semibold hover:underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="/navigations/refunds"
                    className="text-snaptap-blue-dark font-semibold hover:underline"
                  >
                    Refund &amp; Cancellation Policy
                  </a>
                  .
                </p>
              </Form.Item>
            </Form>

            <div className="mt-10 text-center pt-10 border-t border-slate-100">
              <p className="text-[#555555] font-medium">
                Already part of the ecosystem?{" "}
                <button
                  onClick={() => router.push("/app/login")}
                  className="font-black text-snaptap-blue-dark hover:text-snaptap-blue-deep transition-colors ml-1 underline-offset-4 hover:underline"
                >
                  Sign In to Dashboard
                </button>
              </p>
            </div>
          </div>

          <p className="text-center text-[#888888] text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
            © {new Date().getFullYear()} {LEGAL_BUSINESS_NAME} • ALL RIGHTS
            RESERVED
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
