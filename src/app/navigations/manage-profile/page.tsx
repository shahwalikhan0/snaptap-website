"use client";

import React, { useEffect } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useAdmin } from "../../hooks/useAdminContext";

const { Title, Text } = Typography;

const ManageProfilePage = () => {
  const { Admin } = useAdmin();
  const [form] = Form.useForm();

  useEffect(() => {
    if (Admin) {
      form.setFieldsValue({
        username: Admin.username || "",
        email: Admin.email || "",
        fullName: Admin.username || "",
      });
    }
  }, [Admin, form]);

  const handleUpdate = () => {
    const values = form.getFieldsValue();
    message.success("Profile updated (dummy for now)");
    console.log("Updated values:", values);
  };

  if (!Admin) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text type="danger">You are not logged in as an admin.</Text>
      </div>
    );
  }

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
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "1rem" }}>
          Manage Admin Profile
        </Title>
        <Text
          type="secondary"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          View or update your admin details
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
          requiredMark={false}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Username is required." }]}
          >
            <Input size="large" placeholder="admin123" disabled />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", message: "Enter a valid email." }]}
          >
            <Input size="large" placeholder="admin@snap.com" />
          </Form.Item>

          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Full name is required." }]}
          >
            <Input size="large" placeholder="John Doe" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                borderRadius: "8px",
                backgroundColor: "#00A8DE",
                borderColor: "#00A8DE",
              }}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ManageProfilePage;
