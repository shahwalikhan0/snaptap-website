import { Form, Input, Button, FormInstance, Select } from "antd";
import { GlobalOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { BrandDetailFormValues } from "../types";
import { CATEGORIES } from "@/app/constants/categories";

const { Option } = Select;

interface BrandSectionProps {
  brandForm: FormInstance<BrandDetailFormValues>;
  brandLoading: boolean;
  handleBrandUpdate: () => void;
  isBrandModified: boolean;
  setIsBrandModified: (val: boolean) => void;
}

export function BrandSection({
  brandForm,
  brandLoading,
  handleBrandUpdate,
  isBrandModified,
  setIsBrandModified,
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
            className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
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
            className="[&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!h-12 flex items-center border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
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
          >
            <Input
              size="large"
              prefix={<PhoneOutlined className="text-slate-300" />}
              className="h-12 rounded-xl border-slate-200 focus:border-[#007cae] hover:border-[#007cae]/50"
            />
          </Form.Item>
          <Form.Item
            name="location"
            label={<span className="font-bold text-slate-700">Headquarters</span>}
          >
            <Input
              size="large"
              prefix={<EnvironmentOutlined className="text-slate-300" />}
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
        disabled={!isBrandModified}
        className="h-12 px-10 rounded-xl !bg-[#007cae] hover:!bg-[#006080] border-none font-bold !text-white disabled:!bg-slate-300 disabled:!text-slate-500"
        onClick={handleBrandUpdate}
      >
        Update Brand Profile
      </Button>
    </motion.div>
  );
}
