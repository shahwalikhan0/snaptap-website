"use client";

import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Modal,
  Select,
  Spin,
} from "antd";
import { UploadOutlined, EyeInvisibleOutlined, UserOutlined, MailOutlined, GlobalOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RcFile } from "antd/es/upload";
import { useAdmin } from "../../hooks/useAdminContext";
import { ProfileFormValues, BrandDetailFormValues, SectionKey } from "./types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const { Option } = Select;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ManageProfilePage = () => {
  const router = useRouter();
  const { isLoggedIn, Admin, Brand, token } = useAdmin();
  const [form] = Form.useForm<ProfileFormValues>();
  const [passwordForm] = Form.useForm();
  const [brandForm] = Form.useForm<BrandDetailFormValues>();
  const [activeSection, setActiveSection] = useState<SectionKey>("profile");
  const [imageUrl, setImageUrl] = useState<string | null>(Admin?.image_url || null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [brandLoading, setBrandLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in to manage your profile.");
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
    }
  }, [Admin, Brand, form, brandForm, isLoggedIn, router]);

  const handleImageUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result as string);
    reader.readAsDataURL(file);
    return false;
  };

  const handleProfileUpdate = async () => {
    setProfileLoading(true);
    try {
      const profileValues = form.getFieldsValue();
      const passwordValues = passwordForm.getFieldsValue();
      const { oldPassword, newPassword, confirmNewPassword } = passwordValues;

      if (newPassword && newPassword !== confirmNewPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      const payload = {
        name: profileValues.fullName,
        username: Admin?.username,
        description: profileValues.description,
        image_url: imageUrl,
        password: newPassword || null,
        oldPassword: oldPassword || null,
      };

      await axios.put(`${BASE_URL}/brand/update`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleBrandUpdate = async () => {
    setBrandLoading(true);
    try {
      const brandValues = brandForm.getFieldsValue();
      const payload = {
        website_url: brandValues.website_url || "",
        category: brandValues.category || "",
        phone: brandValues.phone || "",
        location: brandValues.location?.trim() || "",
        subscribed_package_id: brandValues.subscribed_package_id,
      };

      await axios.put(`${BASE_URL}/brand/update-detail`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Brand details updated successfully");
    } catch (error) {
      toast.error("Failed to update brand details.");
    } finally {
      setBrandLoading(false);
    }
  };

  if (!Admin) return null;

  return (
    <div className="min-h-screen bg-slate-50/30 pt-24">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-96px)]">

        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-[320px] bg-slate-50/50 p-6 flex flex-col gap-2 border-r border-slate-100">
          <div className="mb-8">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4">Account Settings</h2>
          </div>

          <button
            onClick={() => setActiveSection("profile")}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${activeSection === "profile"
                ? "bg-white text-[#00A8DE] shadow-sm border border-slate-200 ring-1 ring-[#00A8DE]/5"
                : "text-slate-500 hover:bg-slate-100"
              }`}
          >
            <Icon icon="mdi:account-box-outline" width={22} className={activeSection === "profile" ? "text-[#00A8DE]" : "text-slate-400"} />
            Manage Profile
          </button>

          <button
            onClick={() => setActiveSection("brand")}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${activeSection === "brand"
                ? "bg-white text-[#00A8DE] shadow-sm border border-slate-200 ring-1 ring-[#00A8DE]/5"
                : "text-slate-500 hover:bg-slate-100"
              }`}
          >
            <Icon icon="mdi:store-edit-outline" width={22} className={activeSection === "brand" ? "text-[#00A8DE]" : "text-slate-400"} />
            Edit Brand Info
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white p-6 md:p-12 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeSection === "profile" ? (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl space-y-10"
              >
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage Profile</h1>
                  <p className="text-slate-500">Update your account identity and login credentials.</p>
                </div>

                <div className="flex items-center gap-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={imageUrl || "/default-profile.png"}
                        className="w-full h-full object-cover"
                        alt="avatar"
                      />
                    </div>
                    <button
                      onClick={() => setIsModalVisible(true)}
                      className="absolute -bottom-1 -right-1 bg-[#00A8DE] text-white w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition shadow-lg ring-2 ring-white"
                    >
                      <UploadOutlined />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{Admin?.name}</h2>
                    <p className="text-[#00A8DE] font-semibold text-sm">@{Admin?.username}</p>
                  </div>
                </div>

                <Form layout="vertical" form={form} className="space-y-4">
                  <Form.Item name="fullName" label={<span className="font-bold text-slate-700">Display Name</span>}>
                    <Input size="large" prefix={<UserOutlined className="text-slate-300" />} className="h-12 rounded-xl" />
                  </Form.Item>
                  <Form.Item name="email" label={<span className="font-bold text-slate-700">Email Address</span>}>
                    <Input size="large" disabled prefix={<MailOutlined className="text-slate-300" />} className="h-12 rounded-xl bg-slate-50" />
                  </Form.Item>
                  <Form.Item name="description" label={<span className="font-bold text-slate-700">Bio / Description</span>}>
                    <Input.TextArea rows={4} className="rounded-xl p-4" placeholder="Briefly describe your business..." />
                  </Form.Item>
                </Form>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Icon icon="mdi:lock-outline" width={20} className="text-slate-400" />
                    Security Settings
                  </h3>
                  <Form layout="vertical" form={passwordForm} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item name="oldPassword" label={<span className="font-semibold text-slate-500">Current Password</span>} className="md:col-span-2">
                      <Input.Password size="large" className="h-12 rounded-xl" />
                    </Form.Item>
                    <Form.Item name="newPassword" label={<span className="font-semibold text-slate-500">New Password</span>}>
                      <Input.Password size="large" className="h-12 rounded-xl" />
                    </Form.Item>
                    <Form.Item name="confirmNewPassword" label={<span className="font-semibold text-slate-500">Confirm Password</span>}>
                      <Input.Password size="large" className="h-12 rounded-xl" />
                    </Form.Item>
                  </Form>
                </div>

                <Button
                  type="primary"
                  size="large"
                  loading={profileLoading}
                  className="h-12 px-10 rounded-xl bg-[#00A8DE] hover:bg-[#007cae] border-none font-bold"
                  onClick={handleProfileUpdate}
                >
                  Save All Changes
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="brand"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl space-y-10"
              >
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit Brand Details</h1>
                  <p className="text-slate-500">Customize your business presence on SnapTap.</p>
                </div>

                <Form layout="vertical" form={brandForm} className="space-y-4">
                  <Form.Item name="website_url" label={<span className="font-bold text-slate-700">Official Website</span>}>
                    <Input size="large" prefix={<GlobalOutlined className="text-slate-300" />} className="h-12 rounded-xl" placeholder="https://..." />
                  </Form.Item>

                  <Form.Item name="category" label={<span className="font-bold text-slate-700">Business Category</span>}>
                    <Select size="large" className="[&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!h-12 flex items-center">
                      {["Technology", "Fashion", "Food & Beverages", "Retail", "Gaming", "Other"].map(cat => (
                        <Option key={cat} value={cat}>{cat}</Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item name="phone" label={<span className="font-bold text-slate-700">Contact Number</span>}>
                      <Input size="large" prefix={<PhoneOutlined className="text-slate-300" />} className="h-12 rounded-xl" />
                    </Form.Item>
                    <Form.Item name="location" label={<span className="font-bold text-slate-700">Headquarters</span>}>
                      <Input size="large" prefix={<EnvironmentOutlined className="text-slate-300" />} className="h-12 rounded-xl" placeholder="City, Country" />
                    </Form.Item>
                  </div>
                </Form>

                <Button
                  type="primary"
                  size="large"
                  loading={brandLoading}
                  className="h-12 px-10 rounded-xl bg-[#00A8DE] hover:bg-[#007cae] border-none font-bold"
                  onClick={handleBrandUpdate}
                >
                  Update Brand Profile
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <Modal
        title={<span className="text-lg font-bold">Update Profile Image</span>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        className="[&_.ant-modal-content]:!rounded-3xl"
      >
        <div className="p-6 text-center">
          <Upload
            beforeUpload={handleImageUpload}
            showUploadList={false}
          >
            <div className="w-full py-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition">
              <UploadOutlined className="text-3xl text-[#00A8DE] mb-3" />
              <p className="text-slate-600 font-medium">Click here to upload your photo</p>
              <p className="text-slate-400 text-xs">JPG, PNG or WEBP formats only</p>
            </div>
          </Upload>
          <Button
            block
            type="primary"
            className="mt-6 h-11 rounded-xl bg-[#00A8DE] border-none font-bold"
            onClick={() => setIsModalVisible(false)}
          >
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ManageProfilePage;
