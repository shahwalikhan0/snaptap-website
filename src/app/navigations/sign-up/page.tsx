"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  message,
  Upload,
} from "antd";
import { Fade } from "@mui/material";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAdmin } from "../../hooks/useAdminContext";
import axios from "axios";

const { Title, Text, Link } = Typography;

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();
  const { setAdmin } = useAdmin();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const response = await axios.post("/api/users/create-seller", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAdmin(response.data); // Assuming backend returns AdminDataType
      message.success("Signup successful!");
      router.push("/navigations/dashboard");
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (info: any) => {
    if (info.file.status === "removed") {
      setImageFile(null);
    } else {
      setImageFile(info.file.originFileObj);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
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
            Join us and start your journey
          </Text>

          <Form
            form={form}
            name="signup"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
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

            <Form.Item
              name="profileImage"
              label="Profile Image"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
            >
              <Upload
                beforeUpload={() => false}
                onChange={handleImageChange}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>I agree to the Terms and Conditions</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{ borderRadius: "8px", backgroundColor: "#00A8DE" }}
              >
                Sign Up
              </Button>
            </Form.Item>

            <Text style={{ display: "block", textAlign: "center" }}>
              Already have an account?{" "}
              <Link onClick={() => router.push("/navigations/login")}>
                Log in
              </Link>
            </Text>
          </Form>
        </div>
      </Fade>
    </div>
  );
};

export default SignupPage;
