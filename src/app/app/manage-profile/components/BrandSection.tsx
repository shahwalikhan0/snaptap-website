import { Form, Input, Button, FormInstance, Select } from "antd";
import { GlobalOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { BrandDetailFormValues } from "../types";
import { CATEGORIES } from "@/app/constants/categories";
import { COUNTRIES } from "@/app/constants/countries";

const { Option } = Select;

interface BrandSectionProps {
  brandForm: FormInstance<BrandDetailFormValues>;
  brandLoading: boolean;
  handleBrandUpdate: () => void;
  isBrandModified: boolean;
  setIsBrandModified: (val: boolean) => void;
  setIsDeactivateModalVisible: (val: boolean) => void;
  setIsDeleteModalVisible: (val: boolean) => void;
}

export function BrandSection({
  brandForm,
  brandLoading,
  handleBrandUpdate,
  isBrandModified,
  setIsBrandModified,
  setIsDeactivateModalVisible,
  setIsDeleteModalVisible,
}: BrandSectionProps) {
  return (
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

      <Form layout="vertical" form={brandForm} className="space-y-4" onValuesChange={() => setIsBrandModified(true)}>
        <Form.Item
          name="website_url"
          label={
            <span className="font-bold text-slate-700">Official Website</span>
          }
        >
          <Input
            size="large"
            prefix={<GlobalOutlined className="text-slate-300" />}
            className="h-12 rounded-brand border-slate-200 focus:border-snaptap-blue-dark hover:border-snaptap-blue-dark/50"
            placeholder="https://..."
          />
        </Form.Item>

        <Form.Item
          name="category"
          label={
            <span className="font-bold text-slate-700">Business Category</span>
          }
        >
          <Select
            size="large"
            className="[&_.ant-select-selector]:!rounded-brand [&_.ant-select-selector]:!h-12 flex items-center border-slate-200 focus:border-snaptap-blue-dark hover:border-snaptap-blue-dark/50"
          >
            {CATEGORIES.map((cat) => (
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
              <span className="font-bold text-slate-700">Contact Number</span>
            }
            rules={[
              { required: true, message: "Phone number is required" },
              {
                validator: (_, value) =>
                  !value || /^\+?\d{10,14}$/.test(String(value).replace(/[\s-]/g, ""))
                    ? Promise.resolve()
                    : Promise.reject("Invalid phone number"),
              },
            ]}
          >
            <Input
              size="large"
              prefix={<PhoneOutlined className="text-slate-300" />}
              placeholder="+1 234 567 8900"
              className="h-12 rounded-brand border-slate-200 focus:border-snaptap-blue-dark hover:border-snaptap-blue-dark/50"
            />
          </Form.Item>
          <Form.Item
            name="country"
            label={<span className="font-bold text-slate-700">Country</span>}
            rules={[{ required: true, message: "Country is required" }]}
            extra={
              <span className="text-xs text-slate-400">
                Used for billing and regional pricing.
              </span>
            }
          >
            <Select
              size="large"
              showSearch
              optionFilterProp="children"
              placeholder="Select your country"
              className="h-12 [&_.ant-select-selector]:!h-12 [&_.ant-select-selector]:!rounded-brand [&_.ant-select-selector]:!border-slate-200 [&_.ant-select-selection-item]:!leading-[46px]"
            >
              {COUNTRIES.map((c) => (
                <Option key={c.code} value={c.code}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="location"
            label={<span className="font-bold text-slate-700">Headquarters</span>}
          >
            <Input
              size="large"
              prefix={<EnvironmentOutlined className="text-slate-300" />}
              className="h-12 rounded-brand border-slate-200 focus:border-snaptap-blue-dark hover:border-snaptap-blue-dark/50"
              placeholder="City, Country"
            />
          </Form.Item>
        </div>
      </Form>

      <Button
        type="primary"
        size="large"
        loading={brandLoading}
        disabled={!isBrandModified}
        className="h-12 px-10 rounded-brand font-bold !text-white disabled:!bg-slate-300 disabled:!text-slate-500"
        onClick={handleBrandUpdate}
      >
        Update Brand Profile
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
          <div className="p-5 border border-slate-200 rounded-brand bg-surface-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-800">Deactivate Account</h4>
              <p className="text-sm text-slate-500 mt-1">
                Take a break. Your products will be hidden from users.
              </p>
            </div>
            <Button
              size="large"
              onClick={() => setIsDeactivateModalVisible(true)}
              className="rounded-brand font-bold whitespace-nowrap bg-orange-50 text-orange-600 hover:!bg-orange-100 hover:!text-orange-700 border-none px-6"
            >
              Deactivate
            </Button>
          </div>

          <div className="p-5 border border-red-100 rounded-brand bg-red-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
              className="rounded-brand font-bold whitespace-nowrap px-6"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
