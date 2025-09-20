"use client";
import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { BillingFormValues } from "./types";
import {
  Form,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Space,
  Typography,
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useAdmin } from "@/app/hooks/useAdminContext";

const { Title } = Typography;
const { Option } = Select;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function EditBilling() {
  const [form] = useForm();
  const { Brand, setBrand } = useAdmin();

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

  const handleSave = async (values: BillingFormValues) => {
    if (!Brand) return;

    const payload = {
      ...Brand,
      ...values,
      due_date: values.due_date?.format("YYYY-MM-DD"),
    };

    try {
      const response = await axios.patch(`${BASE_URL}/brand/detail/`, payload, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data) {
        setBrand(response.data);
        message.success("Billing information updated successfully");
      } else {
        message.error("Failed to update billing information");
      }
    } catch (error) {
      console.error("Error updating brand:", error);
      message.error("Could not update billing information. Try again.");
    }
  };

  if (!Brand) {
    return (
      <div style={{ padding: "30px" }}>
        <Title level={4} type="danger">
          No brand data found. Please try again.
        </Title>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <Title level={3}>Edit Billing Information</Title>
      <Form layout="vertical" form={form} onFinish={handleSave}>
        <Form.Item
          label="Package Name"
          name="package_name"
          rules={[{ required: true, message: "Package name is required" }]}
        >
          <Select>
            <Option value="Basic">Basic</Option>
            <Option value="Standard">Standard</Option>
            <Option value="Premium">Premium</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Total Billing (Rs.)"
          name="totalBilling"
          rules={[
            { required: true, message: "Total billing amount is required" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Status is required" }]}
        >
          <Select>
            <Option value="paid">Paid</Option>
            <Option value="unpaid">Unpaid</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="due_date"
          rules={[{ required: true, message: "Due date is required" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Active Products"
          name="active_products"
          rules={[{ type: "number", min: 0, message: "Must be 0 or greater" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          label="Inactive Products"
          name="in_active_products"
          rules={[{ type: "number", min: 0, message: "Must be 0 or greater" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          label="Scans Remaining"
          name="scans_remaining"
          rules={[{ type: "number", min: 0, message: "Must be 0 or greater" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          label="Total Scans"
          name="total_scans"
          rules={[{ type: "number", min: 0, message: "Must be 0 or greater" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Space>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
          <Button htmlType="button" onClick={() => form.resetFields()}>
            Cancel
          </Button>
        </Space>
      </Form>
    </div>
  );
}
