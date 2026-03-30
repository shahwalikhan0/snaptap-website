import { Form, Input, Button, FormInstance } from "antd";
import { UserOutlined, MailOutlined, UploadOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { ProfileFormValues } from "../types";

interface ProfileSectionProps {
  form: FormInstance<ProfileFormValues>;
  passwordForm: FormInstance;
  Admin: any;
  imageUrl: string | null;
  profileLoading: boolean;
  setIsModalVisible: (val: boolean) => void;
  handleProfileUpdate: () => void;
  setIsDeactivateModalVisible: (val: boolean) => void;
  setIsDeleteModalVisible: (val: boolean) => void;
}

export function ProfileSection({
  form,
  passwordForm,
  Admin,
  imageUrl,
  profileLoading,
  setIsModalVisible,
  handleProfileUpdate,
  setIsDeactivateModalVisible,
  setIsDeleteModalVisible,
}: ProfileSectionProps) {
  return (
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
          <h2 className="text-xl font-bold text-slate-900">{Admin?.name}</h2>
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
              <span className="font-bold text-slate-700">Username</span>
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
          label={<span className="font-bold text-slate-700">Display Name</span>}
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
            <span className="font-bold text-slate-700">Email Address</span>
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
            <span className="font-bold text-slate-700">Bio / Description</span>
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
          <Icon icon="mdi:lock-outline" width={20} className="text-slate-400" />
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
              <span className="font-semibold text-slate-500">New Password</span>
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
          Manage the lifecycle of your account. These actions cannot be easily
          undone.
        </p>

        <div className="space-y-4">
          <div className="p-5 border border-slate-200 rounded-2xl bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-800">Deactivate Account</h4>
              <p className="text-sm text-slate-500 mt-1">
                Take a break. Your products will be hidden from users.
              </p>
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
              <p className="text-sm text-slate-500 mt-1">
                Permanently remove your account and all associated data.
              </p>
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
  );
}
