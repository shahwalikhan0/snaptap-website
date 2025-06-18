// src/app/navigations/sign-up/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Typography, message, Upload } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { RcFile } from "antd/es/upload/interface";
import { SignUpFormValues } from "./types";

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

      if (image) {
        formData.append("image", image);
      }

      // TODO: Replace with actual API call
      message.success("Signup successful!");
      router.push("/navigations/login");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const error = err as { response?: { data?: { error?: string } } };
        message.error(error.response?.data?.error || "Signup failed.");
      } else if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error("Signup failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div
        style={{
          flex: 1,
          background: "linear-gradient(to bottom right, #6DD5FA, #FFFFFF)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <Title level={2} style={{ textAlign: "center", maxWidth: 400 }}>
          Join SnapTap Today!
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

            <Form.Item name="profileImage" label="Profile Image">
              <Upload.Dragger
                name="files"
                multiple={false}
                maxCount={1}
                accept="image/*"
                beforeUpload={(file) => {
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
              onClick={() => router.push("/navigations/login")}
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
