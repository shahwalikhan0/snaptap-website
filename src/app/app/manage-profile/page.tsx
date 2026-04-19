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
import { ProfileSection } from "./components/ProfileSection";
import { BrandSection } from "./components/BrandSection";

const { Option } = Select;

const ManageProfilePage = () => {
  const router = useRouter();
  const { isLoggedIn, Admin, Brand, token, logout, setAdmin, setBrand } = useAdmin();
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
  const [isProfileModified, setIsProfileModified] = useState(false);
  const [isBrandModified, setIsBrandModified] = useState(false);

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
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      toast.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
      setIsProfileModified(true);
      setIsModalVisible(false);
    };
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

      if (response.data?.data) {
        setAdmin({ ...Admin, ...response.data.data } as any);
        setIsProfileModified(false);
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

      if (response.data?.data) {
        setBrand({ ...Brand, ...response.data.data } as any);
        setIsBrandModified(false);
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
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-[6px] font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
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
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-[6px] font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
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
              <ProfileSection
                form={form}
                passwordForm={passwordForm}
                Admin={Admin}
                imageUrl={imageUrl}
                profileLoading={profileLoading}
                setIsModalVisible={setIsModalVisible}
                handleProfileUpdate={handleProfileUpdate}
                setIsDeactivateModalVisible={setIsDeactivateModalVisible}
                setIsDeleteModalVisible={setIsDeleteModalVisible}
                isProfileModified={isProfileModified}
                setIsProfileModified={setIsProfileModified}
              />
            ) : (
              <BrandSection
                brandForm={brandForm}
                brandLoading={brandLoading}
                handleBrandUpdate={handleBrandUpdate}
                isBrandModified={isBrandModified}
                setIsBrandModified={setIsBrandModified}
              />
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
        className="[&_.ant-modal-content]:!rounded-[6px]"
      >
        <div className="p-6 text-center">
          <Upload beforeUpload={handleImageUpload} showUploadList={false} accept="image/*">
            <div className="w-full py-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[6px] cursor-pointer hover:bg-slate-100 transition">
              <UploadOutlined className="text-3xl text-[#007cae] mb-3" />
              <p className="text-slate-600 font-medium">
                Click here to upload your photo
              </p>
              <p className="text-slate-400 text-xs">
                JPG, PNG or WEBP formats only
              </p>
            </div>
          </Upload>
        </div>
      </Modal>

      {/* Deactivate Modal */}
      <Modal
        title={<span className="text-lg font-bold text-orange-600">Deactivate Account</span>}
        open={isDeactivateModalVisible}
        onCancel={() => setIsDeactivateModalVisible(false)}
        footer={null}
        centered
        className="[&_.ant-modal-content]:!rounded-[6px]"
      >
        <div className="p-2">
          <div className="bg-orange-50 border border-orange-100 rounded-[6px] p-4 mb-6">
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
              className="flex-1 h-12 rounded-[6px] font-bold border-slate-200"
              onClick={() => setIsDeactivateModalVisible(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className="flex-1 h-12 rounded-[6px] font-bold !bg-orange-500 hover:!bg-orange-600 border-none"
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
        className="[&_.ant-modal-content]:!rounded-[6px]"
      >
        <div className="p-2">
          <div className="bg-red-50 border border-red-100 rounded-[6px] p-4 mb-6">
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
                className="h-12 rounded-[6px] border-slate-200 focus:border-red-500 hover:border-red-500/50"
                placeholder="Your password"
                autoComplete="new-password"
              />
            </Form.Item>
            <div className="flex gap-3 mt-2">
              <Button
                className="flex-1 h-12 rounded-[6px] font-bold border-slate-200"
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
                className="flex-[2] h-12 rounded-[6px] font-bold"
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
