"use client";
require("dotenv").config();

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAdmin } from "../../hooks/useAdminContext";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const { Title, Text, Link } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { setBrand, setAdmin } = useAdmin();
  const router = useRouter();
  const { isLoggedIn } = useAdmin();

  if (isLoggedIn) {
    router.replace("/");
  }
  const fetchBrand = async (id: Number) => {
    console.log("Fetching brand with ID:", id);
    try {
      if (!id) return;

      const response = await axios.get(
        `${BASE_URL}/api/brands/brand-detail/${id}`
      );

      if (response.data?.id) {
        setBrand(response.data);
      }
    } catch (error) {
      console.error("Error fetching brand:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const values = form.getFieldsValue();
    const { username, password } = values;
    const newErrors: Record<string, string> = {};

    if (!username) newErrors.username = "Username is required.";
    if (!password) newErrors.password = "Password is required.";

    form.setFields(
      Object.entries(newErrors).map(([name, error]) => ({
        name,
        errors: [error],
      }))
    );

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users/allow-seller-login/${username}/${password}`
      );

      if (response.data.id) {
        setAdmin(response.data);
        message.success("Admin login successful!");
        fetchBrand(response.data.id);

        router.replace("/");
      } else {
        message.error("Invalid admin username or password.");
        return;
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleNav = (path: string) => {
    router.push(path);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "row",
      }}
    >
      {/* LEFT SIDE - Gradient with heading */}
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
        }}
      >
        <Title
          level={2}
          style={{
            fontSize: "2.5rem",
            color: "#0A2540",
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          Welcome, SnapTap Was Waiting!
        </Title>
      </div>

      {/* RIGHT SIDE - Login form */}
      <div
        style={{
          flex: 1,
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "1rem" }}
          >
            Admin Login
          </Title>
          <Text
            type="secondary"
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Login to your SnapTap admin account
          </Text>

          <Form
            form={form}
            layout="vertical"
            name="admin-login"
            onFinish={handleLogin}
            requiredMark={false}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Username is required." }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Password is required." }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{
                  borderRadius: "8px",
                  backgroundColor: "#00A8DE",
                  borderColor: "#0A66C2",
                }}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Text type="secondary">Don't have an account?</Text>{" "}
            <Button
              type="link"
              onClick={() => handleNav("/navigations/sign-up")}
              style={{ padding: 0 }}
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
