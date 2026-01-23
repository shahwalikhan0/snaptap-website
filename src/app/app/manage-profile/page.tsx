"use client";

import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Upload,
  Modal,
  Collapse,
  Select,
} from "antd";
import { UploadOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RcFile } from "antd/es/upload";
import { useAdmin } from "../../hooks/useAdminContext";
import { ProfileFormValues, BrandDetailFormValues, SectionKey } from "./types";
import axios from "axios";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ManageProfilePage = () => {
  const router = useRouter();
  const { isLoggedIn, Admin, Brand, token } = useAdmin();
  const [form] = Form.useForm<ProfileFormValues>();
  const [passwordForm] = Form.useForm();
  const [brandForm] = Form.useForm<BrandDetailFormValues>();
  const [activeSection, setActiveSection] = useState<SectionKey>("profile");
  const [imageUrl, setImageUrl] = useState<string | null>(
    Admin?.image_url || null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  interface Package {
    id: number;
    name: string;
  }
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/package`);
        if (res.data) {
           const filtered = res.data.filter((p: Package) => [1, 2, 3].includes(p.id));
           setPackages(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch packages", error);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      alert("Please log in to access the Manage Profile page.");
      router.push("/app/login");
      return;
    }

    if (Admin) {
      form.setFieldsValue({
        username: Admin.username,
        email: Admin.email,
        fullName: Admin.name,
        description: Admin.description || "",
      });
      setImageUrl(Admin.image_url || null);
    }

    if (Brand) {
      brandForm.setFieldsValue({
        website_url: Brand.website_url || "",
        category: Brand.category || "",
        phone: Brand.phone || "",
        location: Brand.location || "",
        subscribed_package_id: Brand.subscribed_package_id,
      });
    } else if (Admin?.id) {
      // If brand data is missing, fetch from API
      const fetchBrandData = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/brand/detail`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.data) {
            const data = res.data;
            const locationParts = (data.location || "")
              .split(",")
              .map((p: string) => p.trim());

            brandForm.setFieldsValue({
              website_url: data.website_url || "",
              category: data.category || "",
              phone: data.phone || "",
              location:
                locationParts.length >= 2
                  ? `${locationParts[0]}, ${locationParts[1]}`
                  : data.location || "",
              subscribed_package_id: data.subscribed_package_id,
            });
          }
        } catch (error) {
          console.error("Error fetching brand details:", error);
        }
      };

      fetchBrandData();
    }
  }, [Admin, Brand, form, brandForm, isLoggedIn, router, token]);

  const handleImageUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleProfileUpdate = async () => {
    try {
      const profileValues = form.getFieldsValue();
      const passwordValues = passwordForm.getFieldsValue();

      const { oldPassword, newPassword, confirmNewPassword } = passwordValues;

      if (oldPassword && newPassword && oldPassword === newPassword) {
        toast.error("Cannot be the same as your current password.");
        return;
      }

      if (newPassword && !/(?=.*[A-Za-z])(?=.*\d).{6,}/.test(newPassword)) {
        toast.error(
          "Password must be at least 6 characters and contain a letter and number."
        );
        return;
      }

      if (newPassword && newPassword !== confirmNewPassword) {
        toast.error("New password and confirm password do not match.");
        return;
      }

      const payload = {
        name: profileValues.fullName,
        username: Admin?.username,
        email: profileValues.email,
        description: profileValues.description,
        image_url: imageUrl,
        password: newPassword || null,
        oldPassword: oldPassword || null,
      };

      const response = await axios.put(
        `${BASE_URL}/brand/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.error) {
        toast.error(response.data.error);
        return;
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    }
  };

  const handleBrandUpdate = async () => {
    try {
      const brandValues = brandForm.getFieldsValue();
      const payload = {
        website_url: brandValues.website_url || "",
        category: brandValues.category || "",
        phone: brandValues.phone || "",
        location: brandValues.location?.trim() || "",
        subscribed_package_id: brandValues.subscribed_package_id,
      };

      const response = await axios.put(
        `${BASE_URL}/brand/update-detail`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.error) {
        toast.error(response.data.error);
        return;
      }

      toast.success("Brand details updated successfully");
    } catch (error) {
      toast.error("Failed to update brand details.");
      console.error(error);
    }
  };

  if (!Admin) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Text type="danger" className="text-red-600 text-lg font-semibold">
          You are not logged in currently. Please log in to access your profile.
        </Text>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        pauseOnHover
      />

      <div className="flex min-h-screen bg-gray-50 pt-20">
        <div className="w-1/4 bg-white border-r shadow-md p-6 sticky top-16 h-[calc(100vh-64px)]">
          <Title level={4} className="mb-6 text-[#00A8DE] font-bold">
            Account Settings
          </Title>
          <div className="space-y-4">
            <button
              onClick={() => setActiveSection("profile")}
              className={`w-full text-left px-4 py-2 rounded-md transition-all font-medium ${
                activeSection === "profile"
                  ? "bg-blue-100 text-[#00A8DE]"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              Manage Profile
            </button>
            <button
              onClick={() => setActiveSection("brand")}
              className={`w-full text-left px-4 py-2 rounded-md transition-all font-medium ${
                activeSection === "brand"
                  ? "bg-blue-100 text-[#00A8DE]"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              Edit Brand
            </button>
          </div>
        </div>

        <div className="w-3/4 p-8">
          {activeSection === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center mb-6 gap-6">
                <div className="relative w-28 h-28">
                  <img
                    src={imageUrl || "/default-profile.png"}
                    className="w-full h-full object-cover rounded-full border-4 border-[#00A8DE]"
                    alt="profile"
                  />
                  <button
                    onClick={() => setIsModalVisible(true)}
                    className="absolute bottom-0 right-0 bg-[#00A8DE] text-white p-3 rounded-full hover:scale-110 transition shadow-lg"
                  >
                    <UploadOutlined />
                  </button>
                </div>
                <div>
                  <Title level={4} className="text-[#00A8DE] font-bold">
                    {Admin?.name}
                  </Title>
                  <Text className="text-gray-500 font-medium">
                    @{Admin?.username}
                  </Text>
                </div>
              </div>

              <Collapse bordered={false} expandIconPosition="end">
                <Panel
                  header={
                    <span className="font-semibold text-base">
                      Profile Information
                    </span>
                  }
                  key="1"
                >
                  <Form layout="vertical" form={form}>
                    <Form.Item
                      name="email"
                      label={<span className="font-semibold">Email</span>}
                    >
                      <Input size="large" className="font-medium" />
                    </Form.Item>
                    <Form.Item
                      name="fullName"
                      label={<span className="font-semibold">Brand Name</span>}
                    >
                      <Input size="large" className="font-medium" />
                    </Form.Item>
                    <Form.Item
                      name="description"
                      label={<span className="font-semibold">Description</span>}
                    >
                      <Input.TextArea rows={3} className="font-medium" />
                    </Form.Item>
                  </Form>
                </Panel>
              </Collapse>

              <Collapse bordered={false} expandIconPosition="end">
                <Panel
                  header={
                    <span className="font-semibold text-base">
                      Change Password
                    </span>
                  }
                  key="2"
                  className="mt-4"
                >
                  <Form layout="vertical" form={passwordForm}>
                    <Form.Item
                      name="oldPassword"
                      label={
                        <span className="font-semibold">Current Password</span>
                      }
                    >
                      <Input.Password
                        size="large"
                        iconRender={() => <EyeInvisibleOutlined />}
                      />
                    </Form.Item>
                    <Form.Item
                      name="newPassword"
                      label={
                        <span className="font-semibold">New Password</span>
                      }
                    >
                      <Input.Password
                        size="large"
                        iconRender={() => <EyeInvisibleOutlined />}
                      />
                    </Form.Item>
                    <Form.Item
                      name="confirmNewPassword"
                      label={
                        <span className="font-semibold">
                          Confirm New Password
                        </span>
                      }
                    >
                      <Input.Password
                        size="large"
                        iconRender={() => <EyeInvisibleOutlined />}
                      />
                    </Form.Item>
                  </Form>
                </Panel>
              </Collapse>

              <Button
                type="primary"
                size="large"
                className="mt-6 px-6 py-3 bg-[#00A8DE] hover:shadow-md hover:scale-105 transition text-white font-semibold rounded-xl"
                onClick={handleProfileUpdate}
              >
                Save Changes
              </Button>
            </motion.div>
          )}

          {activeSection === "brand" && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-8 mt-10"
            >
              <Title level={4} className="text-[#00A8DE] mb-6 font-bold">
                Edit Brand Details
              </Title>
              <Form layout="vertical" form={brandForm}>
                <Form.Item
                  name="website_url"
                  label={<span className="font-semibold">Your Website</span>}
                >
                  <Input size="large" className="font-medium" />
                </Form.Item>
                <Form.Item
                  name="category"
                  label={<span className="font-semibold">Category</span>}
                >
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
                      <Option key={cat} value={cat}>
                        {cat}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="phone"
                  label={<span className="font-semibold">Contact Phone</span>}
                >
                  <Input size="large" className="font-medium" />
                </Form.Item>
                <Form.Item
                  name="location"
                  label={
                    <span className="font-semibold">
                      Location (City, Country)
                    </span>
                  }
                >
                  <Input size="large" className="font-medium" />
                </Form.Item>
                <Form.Item
                  name="subscribed_package_id"
                  label={<span className="font-semibold">Subscription Plan</span>}
                >
                  <Select placeholder="Select plan" size="large">
                    {packages.map((pkg) => (
                      <Option key={pkg.id} value={pkg.id}>
                        {pkg.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
              <Button
                type="primary"
                size="large"
                className="mt-6 px-6 py-3 bg-[#00A8DE] hover:shadow-md hover:scale-105 transition text-white font-semibold rounded-xl"
                onClick={handleBrandUpdate}
              >
                Save Changes
              </Button>
            </motion.div>
          )}
        </div>

        <Modal
          title="Upload Brand Image"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={() => {
            toast.success("Image uploaded (mock)");
            setIsModalVisible(false);
          }}
        >
          <Upload beforeUpload={handleImageUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Modal>
      </div>
    </>
  );
};

export default ManageProfilePage;
