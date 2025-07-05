"use client";

import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  message,
  Upload,
  Modal,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { useAdmin } from "../../hooks/useAdminContext";
import { ProfileFormValues, BrandDetailFormValues, SectionKey } from "./types";

const { Title, Text } = Typography;

const ManageProfilePage = () => {
  const { Admin, Brand } = useAdmin();
  const [form] = Form.useForm<ProfileFormValues>();
  const [brandForm] = Form.useForm<BrandDetailFormValues>();
  const [activeSection, setActiveSection] = useState<SectionKey>("profile");
  const [imageUrl, setImageUrl] = useState<string | null>(
    Admin?.image_url || null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (Admin) {
      form.setFieldsValue({
        username: Admin.username,
        email: Admin.email,
        fullName: Admin.name,
        description: Admin.description || "",
      });
    }

    if (Brand) {
      const locationParts = (Brand.location || "")
        .split(",")
        .map((p) => p.trim());

      brandForm.setFieldsValue({
        website_url: Brand.website_url || "",
        category: Brand.category || "",
        phone: Brand.phone || "",
        address: locationParts[0] || "",
        city: locationParts[1] || "",
        zip: locationParts.length === 5 ? locationParts[2] : "",
        state:
          locationParts.length === 5
            ? locationParts[3]
            : locationParts[2] || "",
        country:
          locationParts.length === 5
            ? locationParts[4]
            : locationParts[3] || "",
      });
    }
  }, [Admin, Brand, form, brandForm]);

  const handleImageUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleProfileUpdate = async (values: ProfileFormValues) => {
    if (
      values.oldPassword &&
      values.newPassword &&
      values.oldPassword === values.newPassword
    ) {
      message.error("New password cannot be the same as old password.");
      return;
    }

    if (
      values.newPassword &&
      !/(?=.*[A-Za-z])(?=.*\d).{6,}/.test(values.newPassword)
    ) {
      message.error(
        "Password must be at least 6 characters long and contain at least one letter and one number."
      );
      return;
    }

    if (values.newPassword !== values.confirmNewPassword) {
      message.error("New password and confirm password do not match.");
      return;
    }

    message.success("Profile updated successfully (mock)");
    console.log("Profile data:", values);
  };

  const handleBrandUpdate = async (values: BrandDetailFormValues) => {
    const location = [
      values.address,
      values.city,
      values.zip?.trim() ? values.zip : null,
      values.state,
      values.country,
    ]
      .filter(Boolean)
      .join(", ");

    const payload = {
      ...values,
      location,
    };

    console.log("Brand details payload:", payload);
    message.success("Brand details updated successfully (mock)");
  };

  if (!Admin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Text type="danger">You are not logged in as an admin.</Text>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pt-20">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r shadow-md p-6 sticky top-16 h-[calc(100vh-64px)]">
        <Title level={4} className="mb-6 text-blue-500">
          Account Settings
        </Title>
        <div className="space-y-4">
          <button
            onClick={() => setActiveSection("profile")}
            className={`w-full text-left px-4 py-2 rounded-md transition-all font-medium ${
              activeSection === "profile"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            Manage Profile
          </button>
          <button
            onClick={() => setActiveSection("brand")}
            className={`w-full text-left px-4 py-2 rounded-md transition-all font-medium ${
              activeSection === "brand"
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            Edit Brand
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="w-3/4 p-8">
        {activeSection === "profile" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="relative w-24 h-24 mr-6">
                <img
                  src={imageUrl || "/default-profile.png"}
                  className="w-full h-full object-cover rounded-full border-4 border-blue-500"
                  alt="profile"
                />
                <button
                  onClick={() => setIsModalVisible(true)}
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:scale-110 transition"
                >
                  <UploadOutlined />
                </button>
              </div>
              <div>
                <Title level={4} className="text-blue-600">
                  {Admin.name}
                </Title>
                <Text className="text-gray-500">@{Admin.username}</Text>
              </div>
            </div>

            <Form layout="vertical" form={form} onFinish={handleProfileUpdate}>
              <Form.Item name="email" label="Email">
                <Input size="large" />
              </Form.Item>

              <Form.Item name="fullName" label="Brand Name">
                <Input size="large" />
              </Form.Item>

              <Form.Item name="description" label="Description">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Title level={5} className="mt-6 text-blue-500">
                Change Password
              </Title>

              <Form.Item name="oldPassword" label="Old Password">
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item name="newPassword" label="New Password">
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item name="confirmNewPassword" label="Confirm New Password">
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="bg-[#00A8DE] hover:opacity-90 w-full rounded-xl"
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}

        {activeSection === "brand" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Title level={4} className="text-blue-600 mb-4">
              Edit Brand Details
            </Title>
            <Form
              layout="vertical"
              form={brandForm}
              onFinish={handleBrandUpdate}
            >
              <Form.Item name="website_url" label="Your Website">
                <Input size="large" />
              </Form.Item>

              <Form.Item name="category" label="Category">
                <Select placeholder="Select category" size="large">
                  {[
                    "Technology",
                    "Fashion & Apparel",
                    "Food & Beverages",
                    "Automotive",
                    "Beauty & Personal Care",
                    "Home & Garden",
                    "Sports & Fitness",
                    "Healthcare & Pharmaceuticals",
                    "Financial Services",
                    "Entertainment & Media",
                    "Travel & Hospitality",
                    "Retail & E-commerce",
                    "Energy & Utilities",
                    "Real Estate",
                    "Education",
                    "Telecommunications",
                    "Industrial & Manufacturing",
                    "Luxury Goods",
                    "Pet Care",
                    "Gaming & Software",
                  ].map((cat) => (
                    <Select.Option key={cat} value={cat}>
                      {cat}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="phone" label="Contact Phone">
                <Input size="large" />
              </Form.Item>

              <Title level={5} className="mt-4 text-blue-500">
                Location
              </Title>

              <Form.Item name="address" label="Street/Address">
                <Input size="large" />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item name="city" label="City">
                  <Input size="large" />
                </Form.Item>
                <Form.Item name="state" label="State/Province">
                  <Input size="large" />
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item name="zip" label="Zip/Postal Code">
                  <Input size="large" />
                </Form.Item>
                <Form.Item name="country" label="Country">
                  <Select placeholder="Select country" size="large">
                    <Select.Option value="USA">USA</Select.Option>
                    <Select.Option value="Canada">Canada</Select.Option>
                    <Select.Option value="UK">UK</Select.Option>
                    <Select.Option value="India">India</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="bg-[#00A8DE] hover:opacity-90 w-full rounded-xl"
                >
                  Update Brand
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>

      {/* Image Upload Modal */}
      <Modal
        title="Upload Brand Image"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          message.success("Image uploaded (mock)");
          setIsModalVisible(false);
        }}
      >
        <Upload beforeUpload={handleImageUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default ManageProfilePage;
