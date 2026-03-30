"use client";

import { Modal, Form, Input, InputNumber, Select, Switch, Upload, Button, FormInstance } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CATEGORIES } from "@/app/constants/categories";

interface EditProductModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpdate: (values: any) => void;
  updating: boolean;
  form: FormInstance;
}

export function EditProductModal({
  visible,
  onCancel,
  onUpdate,
  updating,
  form,
}: EditProductModalProps) {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Save Changes"
      okButtonProps={{ loading: updating }}
      title="Edit Product"
    >
      <Form layout="vertical" form={form} onFinish={onUpdate}>
        <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Select placeholder="Select a category" size="large" allowClear>
            {CATEGORIES.map((category) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="is_active" label="Active" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="image" label="Product Image">
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Replace Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
