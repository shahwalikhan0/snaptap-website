"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Modal, Select } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  MailOutlined,
  GlobalOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RcFile } from "antd/es/upload";
import { useAdmin } from "../../hooks/useAdminContext";
import { ProfileFormValues, BrandDetailFormValues, SectionKey } from "./types";
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const { Option } = Select;

const ManageProfilePage = () => {
  const router = useRouter();
  const { isLoggedIn, Admin, Brand, token, logout } = useAdmin();
  const [form] = Form.useForm<ProfileFormValues>();
  const [passwordForm] = Form.useForm();
  const [brandForm] = Form.useForm<BrandDetailFormValues>();
  const [activeSection, setActiveSection] = useState<SectionKey>("profile");
  const [imageUrl, setImageUrl] = useState<string | null>(
    Admin?.image_url || null,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [brandLoading, setBrandLoading] = useState(false);

  // Account Management States
  const [isDeactivateModalVisible, setIsDeactivateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deactivating, setDeactivating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in to manage your profile.");
      router.push(`/app/login?redirect=${encodeURIComponent(window.location.pathname)}`);
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
          const res = await api.get("/brand/detail");

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
        username: profileValues.username || Admin?.username,
        description: profileValues.description,
        image_url: imageUrl,
        password: newPassword || null,
        oldPassword: oldPassword || null,
      };

      const response = await api.put("/brand/update", payload);

      if (response.data?.error) {
        toast.error(response.data.error);
        return;
      }

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

      const response = await api.put("/brand/update-detail", payload);

      if (response.data?.error) {
        toast.error(response.data.error);
        return;
      }

      toast.success("Brand details updated successfully");
    } catch (error) {
      toast.error("Failed to update brand details.");
    } finally {
      setBrandLoading(false);
    }
  };

  const handleDeactivateAccount = async () => {
    setDeactivating(true);
    try {
      const response = await api.put("/brand/deactivate");
      if (response.data?.success) {
        toast.success(response.data.message);
        if (response.data.warning) {
          toast.info(response.data.warning, { autoClose: 10000 });
        }
        setIsDeactivateModalVisible(false);
        // Logout via Context to clean up all storage and redirect
        setTimeout(() => logout(), 3000);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Failed to deactivate account.");
    } finally {
      setDeactivating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error("Password is required to delete your account.");
      return;
    }
    setDeleting(true);
    try {
      const response = await api.delete("/brand/delete", {
        data: { password: deletePassword },
      });
      if (response.data?.success) {
        toast.success(response.data.message, { autoClose: 10000 });
        setIsDeleteModalVisible(false);
        setTimeout(() => logout(), 4000);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Failed to delete account.");
    } finally {
      setDeleting(false);
    }
  };

  if (!Admin) return null;

  return (
    <div className="min-h-screen bg-slate-50/30 pt-20 sm:pt-28">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-96px)]">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-[320px] bg-slate-50/50 p-3 sm:p-6 flex lg:flex-col gap-2 border-b lg:border-b-0 lg:border-r border-slate-100 overflow-x-auto">
          <div className="mb-8">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 hidden lg:block">
              Account Settings
            </h2>
          </div>

          <button
            onClick={() => setActiveSection("profile")}
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
              activeSection === "profile"
                ? "bg-white text-[#007cae] shadow-sm border border-slate-200 ring-1 ring-[#007cae]/5"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            <Icon
              icon="mdi:account-box-outline"
              width={22}
              className={
                activeSection === "profile"
                  ? "text-[#007cae]"
                  : "text-slate-400"
              }
            />
            Manage Profile
          </button>

          <button
            onClick={() => setActiveSection("brand")}
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
              activeSection === "brand"
                ? "bg-white text-[#007cae] shadow-sm border border-slate-200 ring-1 ring-[#007cae]/5"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            <Icon
              icon="mdi:store-edit-outline"
              width={22}
              className={
                activeSection === "brand" ? "text-[#007cae]" : "text-slate-400"
              }
            />
            Edit Brand Info
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white p-4 sm:p-6 md:p-12 overflow-y-auto">
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
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Manage Profile
                  </h1>
                  <p className="text-slate-500">
                    Update your account identity and login credentials.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 sm:p-6 bg-slate-50 rounded-3xl border border-slate-100">
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
                      className="absolute -bottom-1 -right-1 !bg-[#007cae] text-white w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition shadow-lg ring-2 ring-white"
                    >
                      <UploadOutlined />
                    </button>
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold text-slate-900">
                      {Admin?.name}
                    </h2>
                    <p className="text-[#007cae] font-semibold text-sm">
                      @{Admin?.username}
                    </p>
                  </div>
                </div>

                <Form layout="vertical" form={form} className="space-y-4">
                  <Form.Item
                    name="username"
                    label={
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700">
                          Username
                        </span>
                        <span className="text-xs text-slate-400 font-normal mt-0.5">
                          Will be saved as lowercase
                        </span>
                      </div>
                    }
                    rules={[
                      { required: true, message: "Required" },
                      { pattern: /^[^\s]+$/, message: "No spaces" },
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={<UserOutlined className="text-slate-300" />}
                      className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
                    />
                  </Form.Item>
                  <Form.Item
                    name="fullName"
                    label={
                      <span className="font-bold text-slate-700">
                        Display Name
                      </span>
                    }
                  >
                    <Input
                      size="large"
                      prefix={<UserOutlined className="text-slate-300" />}
                      className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={
                      <span className="font-bold text-slate-700">
                        Email Address
                      </span>
                    }
                  >
                    <Input
                      size="large"
                      disabled
                      prefix={<MailOutlined className="text-slate-300" />}
                      className="h-12 rounded-xl bg-slate-50"
                    />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label={
                      <span className="font-bold text-slate-700">
                        Bio / Description
                      </span>
                    }
                  >
                    <Input.TextArea
                      rows={4}
                      className="rounded-xl p-4 border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
                      placeholder="Briefly describe your business..."
                    />
                  </Form.Item>
                </Form>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Icon
                      icon="mdi:lock-outline"
                      width={20}
                      className="text-slate-400"
                    />
                    Security Settings
                  </h3>
                  <Form
                    layout="vertical"
                    form={passwordForm}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <Form.Item
                      name="oldPassword"
                      label={
                        <span className="font-semibold text-slate-500">
                          Current Password
                        </span>
                      }
                      className="md:col-span-2"
                    >
                      <Input.Password
                        size="large"
                        className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
                      />
                    </Form.Item>
                    <Form.Item
                      name="newPassword"
                      label={
                        <span className="font-semibold text-slate-500">
                          New Password
                        </span>
                      }
                    >
                      <Input.Password
                        size="large"
                        className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
                      />
                    </Form.Item>
                    <Form.Item
                      name="confirmNewPassword"
                      label={
                        <span className="font-semibold text-slate-500">
                          Confirm Password
                        </span>
                      }
                    >
                      <Input.Password
                        size="large"
                        className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
                      />
                    </Form.Item>
                  </Form>
                </div>

                <Button
                  type="primary"
                  size="large"
                  loading={profileLoading}
                  className="h-12 px-10 rounded-xl !bg-[#007cae] hover:!bg-[#006080] border-none font-bold !text-white"
                  onClick={handleProfileUpdate}
                >
                  Save All Changes
                </Button>

                <div className="pt-10 border-t border-slate-100 mt-10">
                  <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
                    <Icon icon="mdi:alert-octagon-outline" width={22} />
                    Account Management
                  </h3>
                  <p className="text-slate-500 mb-6 text-sm">
                    Manage the lifecycle of your account. These actions cannot be easily undone.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-5 border border-slate-200 rounded-2xl bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-800">Deactivate Account</h4>
                        <p className="text-sm text-slate-500 mt-1">Take a break. Your products will be hidden from users.</p>
                      </div>
                      <Button 
                        size="large" 
                        onClick={() => setIsDeactivateModalVisible(true)}
                        className="rounded-xl font-bold whitespace-nowrap bg-orange-50 text-orange-600 hover:!bg-orange-100 hover:!text-orange-700 border-none px-6"
                      >
                        Deactivate
                      </Button>
                    </div>

                    <div className="p-5 border border-red-100 rounded-2xl bg-red-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-800">Delete Account</h4>
                        <p className="text-sm text-slate-500 mt-1">Permanently remove your account and all associated data.</p>
                      </div>
                      <Button 
                        danger 
                        size="large" 
                        onClick={() => setIsDeleteModalVisible(true)}
                        className="rounded-xl font-bold whitespace-nowrap px-6"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
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
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Edit Brand Details
                  </h1>
                  <p className="text-slate-500">
                    Customize your business presence on SnapTap.
                  </p>
                </div>

                <Form layout="vertical" form={brandForm} className="space-y-4">
                  <Form.Item
                    name="website_url"
                    label={
                      <span className="font-bold text-slate-700">
                        Official Website
                      </span>
                    }
                  >
                    <Input
                      size="large"
                      prefix={<GlobalOutlined className="text-slate-300" />}
                      className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
                      placeholder="https://..."
                    />
                  </Form.Item>

                  <Form.Item
                    name="category"
                    label={
                      <span className="font-bold text-slate-700">
                        Business Category
                      </span>
                    }
                  >
                    <Select
                      size="large"
                      className="[&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!h-12 flex items-center border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
                    >
                      {[
                        "Technology",
                        "Fashion",
                        "Food & Beverages",
                        "Retail",
                        "Gaming",
                        "Other",
                      ].map((cat) => (
                        <Option key={cat} value={cat}>
                          {cat}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="phone"
                      label={
                        <span className="font-bold text-slate-700">
                          Contact Number
                        </span>
                      }
                    >
                      <Input
                        size="large"
                        prefix={<PhoneOutlined className="text-slate-300" />}
                        className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
                      />
                    </Form.Item>
                    <Form.Item
                      name="location"
                      label={
                        <span className="font-bold text-slate-700">
                          Headquarters
                        </span>
                      }
                    >
                      <Input
                        size="large"
                        prefix={
                          <EnvironmentOutlined className="text-slate-300" />
                        }
                        className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
                        placeholder="City, Country"
                      />
                    </Form.Item>
                  </div>
                </Form>

                <Button
                  type="primary"
                  size="large"
                  loading={brandLoading}
                  className="h-12 px-10 rounded-xl !bg-[#007cae] hover:!bg-[#006080] border-none font-bold !text-white"
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
          <Upload beforeUpload={handleImageUpload} showUploadList={false}>
            <div className="w-full py-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition">
              <UploadOutlined className="text-3xl text-[#007cae] mb-3" />
              <p className="text-slate-600 font-medium">
                Click here to upload your photo
              </p>
              <p className="text-slate-400 text-xs">
                JPG, PNG or WEBP formats only
              </p>
            </div>
          </Upload>
          <Button
            block
            type="primary"
            className="mt-6 h-11 rounded-xl !bg-[#007cae] hover:!bg-[#006080] border-none font-bold !text-white"
            onClick={() => setIsModalVisible(false)}
          >
            Done
          </Button>
        </div>
      </Modal>

      {/* Deactivate Modal */}
      <Modal
        title={<span className="text-lg font-bold text-orange-600">Deactivate Account</span>}
        open={isDeactivateModalVisible}
        onCancel={() => setIsDeactivateModalVisible(false)}
        footer={null}
        centered
        className="[&_.ant-modal-content]:!rounded-3xl"
      >
        <div className="p-2">
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6">
            <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
              <Icon icon="mdi:pause-circle-outline" width={20} />
              What happens when you deactivate?
            </h4>
            <ul className="text-sm text-orange-700 space-y-2 list-disc pl-5">
              <li>Your profile and products will be hidden from all users.</li>
              <li>Your active subscription will be automatically cancelled and you will not be billed.</li>
              <li>You can reactivate simply by logging back in within <strong className="font-bold">6 months</strong>.</li>
              <li>After 6 months, your account and data will be <strong className="font-bold">permanently deleted</strong>.</li>
            </ul>
          </div>
          
          <p className="text-slate-600 mb-6 font-medium">
            Are you sure you want to proceed with deactivation?
          </p>

          <div className="flex gap-3">
            <Button
              className="flex-1 h-12 rounded-xl font-bold border-slate-200"
              onClick={() => setIsDeactivateModalVisible(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className="flex-1 h-12 rounded-xl font-bold !bg-orange-500 hover:!bg-orange-600 border-none"
              loading={deactivating}
              onClick={handleDeactivateAccount}
            >
              Yes, Deactivate
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title={<span className="text-lg font-bold text-red-600">Delete Account</span>}
        open={isDeleteModalVisible}
        onCancel={() => {
          setIsDeleteModalVisible(false);
          setDeletePassword("");
        }}
        footer={null}
        centered
        className="[&_.ant-modal-content]:!rounded-3xl"
      >
        <div className="p-2">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6">
            <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
              <Icon icon="mdi:delete-alert-outline" width={20} />
              This action represents permanent deletion
            </h4>
            <p className="text-sm text-red-700 leading-relaxed">
              Once initiated, your account will be scheduled for deletion in <strong className="font-bold">30 days</strong>. 
              After 30 days, your brand profile, 3D models, active subscriptions, and user engagement metrics will be <strong className="font-bold">deleted forever</strong> without any possibility of recovery.
            </p>
          </div>

          <Form layout="vertical">
            <Form.Item label={<span className="font-bold text-slate-700">Enter Password to Confirm Deletion</span>} required>
              <Input.Password
                size="large"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="h-12 rounded-xl border-slate-200 focus:border-red-500 hover:border-red-500/50"
                placeholder="Your password"
                autoComplete="new-password"
              />
            </Form.Item>
            <div className="flex gap-3 mt-2">
              <Button
                className="flex-1 h-12 rounded-xl font-bold border-slate-200"
                onClick={() => {
                  setIsDeleteModalVisible(false);
                  setDeletePassword("");
                }}
              >
                Cancel
              </Button>
              <Button
                danger
                type="primary"
                className="flex-[2] h-12 rounded-xl font-bold"
                loading={deleting}
                disabled={!deletePassword}
                onClick={handleDeleteAccount}
              >
                Schedule Deletion (30 Days)
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageProfilePage;
