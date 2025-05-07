"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Divider } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Fade } from "@mui/material";
import { useRouter } from "next/navigation";

const { Title, Text, Link } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const router = useRouter();

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Login successful!");
      // redirect to dashboard or homepage
    }, 2000);
  };

  const handleGoogleLogin = () => {
    message.info("Google login not implemented yet!");
    // Google OAuth logic would go here
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Fade in={formVisible} timeout={1000}>
        <div
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "1rem" }}
          >
            Welcome Back
          </Title>
          <Text
            type="secondary"
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Login to your SnapTap account
          </Text>

          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{ borderRadius: "8px" }}
              >
                Log In
              </Button>
            </Form.Item>

            <Text style={{ display: "block", textAlign: "center" }}>
              Don't have an account?{" "}
              <Link onClick={() => router.push("/navigations/sign-up")}>
                Sign up
              </Link>
            </Text>
          </Form>
        </div>
      </Fade>
    </div>
  );
};

export default LoginPage;
