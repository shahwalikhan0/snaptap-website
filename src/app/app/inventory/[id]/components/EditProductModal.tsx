"use client";

import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Upload,
  Button,
  FormInstance,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CATEGORIES } from "@/app/constants/categories";

interface EditProductModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpdate: (values: Record<string, unknown>) => void;
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
      confirmLoading={updating}
      title={
        <span className="text-xl font-black text-slate-800 tracking-tight">
          Edit Product Catalog
        </span>
      }
      centered
      width={600}
      className="[&_.ant-modal-header]:!mb-6"
      okButtonProps={{
        className:
          "font-bold rounded-brand h-10 px-6",
      }}
      cancelButtonProps={{
        className: "font-bold rounded-brand h-10 px-6",
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onUpdate}
        className="space-y-4"
      >
        <Form.Item
          name="name"
          label={
            <span className="font-bold text-slate-700 text-xs uppercase tracking-widest">
              Product Display Name
            </span>
          }
          rules={[{ required: true }]}
        >
          <Input className="h-11 rounded-brand border-slate-200 focus:border-snaptap-blue-dark" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="price"
            label={
              <span className="font-bold text-slate-700 text-xs uppercase tracking-widest">
                Unit Price (USD)
              </span>
            }
            rules={[{ required: true }]}
          >
            <InputNumber className="w-full h-11 flex items-center rounded-brand border-slate-200 focus:border-snaptap-blue-dark" />
          </Form.Item>

          <Form.Item
            name="category"
            label={
              <span className="font-bold text-slate-700 text-xs uppercase tracking-widest">
                Market Category
              </span>
            }
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select
              placeholder="Select a category"
              size="large"
              allowClear
              className="rounded-brand"
            >
              {CATEGORIES.map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label={
            <span className="font-bold text-slate-700 text-xs uppercase tracking-widest">
              Detailed Description
            </span>
          }
        >
          <Input.TextArea
            rows={4}
            className="rounded-brand border-slate-200 focus:border-snaptap-blue-dark"
          />
        </Form.Item>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-brand border border-slate-100">
          <div>
            <p className="font-bold text-slate-800 text-sm">Active</p>
            <p className="text-xs text-slate-500">
              Toggle visibility for AR viewer
            </p>
          </div>
          <Form.Item name="is_active" valuePropName="checked" className="mb-0">
            <Switch className="bg-slate-300" />
          </Form.Item>
        </div>

        <Form.Item
          name="image"
          label={
            <span className="font-bold text-slate-700 text-xs uppercase tracking-widest">
              Update Visual Asset
            </span>
          }
        >
          <Upload beforeUpload={() => false} maxCount={1} listType="picture">
            <Button
              icon={<UploadOutlined />}
              className="rounded-brand border-dashed border-slate-300 h-11 w-full font-bold"
            >
              Choose New Image
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
