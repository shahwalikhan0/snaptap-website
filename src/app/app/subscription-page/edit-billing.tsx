"use client";

import React, { useEffect, useState } from "react";
import { Form, InputNumber, Select, DatePicker, Button } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

const { Option } = Select;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function EditBilling() {
  const [form] = Form.useForm();
  const { Brand, setBrand } = useAdmin();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Brand) {
      form.setFieldsValue({
        package_name: Brand.package_name,
        totalBilling: Brand.totalBilling,
        status: Brand.status,
        due_date: Brand.due_date ? dayjs(Brand.due_date) : null,
        active_products: Brand.active_products,
        in_active_products: Brand.in_active_products,
        scans_remaining: Brand.scans_remaining,
        total_scans: Brand.total_scans,
      });
    }
  }, [Brand, form]);

  const handleSave = async (values: any) => {
    if (!Brand) return;
    setLoading(true);

    const payload = {
      ...Brand,
      ...values,
      due_date: values.due_date?.format("YYYY-MM-DD"),
    };

    try {
      const response = await axios.patch(`${BASE_URL}/brand/detail/`, payload);
      if (response.data) {
        setBrand(response.data);
        toast.success("Billing information updated.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Could not update. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!Brand) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Billing Settings</h1>
        <p className="text-slate-500">Configure your internal billing metrics and metadata.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-4 sm:p-8 shadow-sm">
        <Form layout="vertical" form={form} onFinish={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">

          <Form.Item label={<span className="font-bold text-slate-700 text-sm">Active Package</span>} name="package_name" className="md:col-span-1">
            <Select size="large" className="[&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!h-12 flex items-center bg-slate-50">
              <Option value="Basic">Basic</Option>
              <Option value="Pro">Pro</Option>
              <Option value="Enterprise">Enterprise</Option>
            </Select>
          </Form.Item>

          <Form.Item label={<span className="font-bold text-slate-700 text-sm">Monthly Total (Rs.)</span>} name="totalBilling" className="md:col-span-1">
            <InputNumber className="w-full !rounded-xl !h-12 flex items-center border-slate-200" min={0} />
          </Form.Item>

          <Form.Item label={<span className="font-bold text-slate-700 text-sm">Payment Status</span>} name="status">
            <Select size="large" className="[&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!h-12 flex items-center">
              <Option value="paid">Paid</Option>
              <Option value="unpaid">Unpaid</Option>
            </Select>
          </Form.Item>

          <Form.Item label={<span className="font-bold text-slate-700 text-sm">Due Date</span>} name="due_date">
            <DatePicker className="w-full !rounded-xl !h-12 border-slate-200" format="YYYY-MM-DD" />
          </Form.Item>

          <div className="md:col-span-2 pt-6 pb-2 border-t border-slate-100 mt-4 mb-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Platform Usage Data</h3>
          </div>

          <Form.Item label={<span className="font-bold text-slate-700 text-sm">Active Products</span>} name="active_products">
            <InputNumber className="w-full !rounded-xl !h-12 flex items-center border-slate-200" min={0} />
          </Form.Item>

          <Form.Item label={<span className="font-bold text-slate-700 text-sm">Inactive Products</span>} name="in_active_products">
            <InputNumber className="w-full !rounded-xl !h-12 flex items-center border-slate-200" min={0} />
          </Form.Item>

          <Form.Item label={<span className="font-bold text-slate-700 text-sm">Scans Remaining</span>} name="scans_remaining">
            <InputNumber className="w-full !rounded-xl !h-12 flex items-center border-slate-200" min={0} />
          </Form.Item>

          <Form.Item label={<span className="font-bold text-slate-700 text-sm">Total Scans Allotted</span>} name="total_scans">
            <InputNumber className="w-full !rounded-xl !h-12 flex items-center border-slate-200" min={0} />
          </Form.Item>

          <div className="md:col-span-2 mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="h-12 px-10 rounded-xl !bg-[#007cae] hover:!bg-[#006080] border-none font-bold shadow-lg shadow-[#007cae]/10 !text-white"
            >
              Save Billing Profile
            </Button>
            <Button
              onClick={() => form.resetFields()}
              className="h-12 px-8 rounded-xl font-bold border-slate-200 text-slate-500 hover:bg-slate-50"
            >
              Discard Changes
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
}
