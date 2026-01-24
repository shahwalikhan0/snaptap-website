"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
  Upload,
  Spin,
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isLoggedIn, token, Admin, isInitialized } = useAdmin();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isInitialized) return;

    if (!isLoggedIn) {
      toast.error("Please log in to access the Product Details.");
      router.push("/app/login");
      return;
    }
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/product/detail-for-brand/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.data || res.data.data.brand_id !== Admin?.id) {
          alert("Product not found.");
          router.push("/app/inventory");
          return;
        }
        setProduct(res.data.data);
        form.setFieldsValue({
          name: res.data.data.name,
          price: Number(res.data.data.price),
          category: res.data.data.category,
          description: res.data.data.description,
          is_active: true,
        });
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, isInitialized, isLoggedIn, token, Admin, router, form]);

  const handleUpdate = async (values: any) => {
    setUpdating(true);
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]: any) => {
        if (value !== undefined) formData.append(key, value);
      });

      if (values.image && values.image.file) {
        formData.append("image", values.image.file);
      }

      if (Admin?.id != product?.brand_id) {
        alert("You are not authorized to update this product.");
        return;
      }

      const response = await axios.put(`${BASE_URL}/product/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.data) {
        setProduct(response.data.data);
      }
      setEditing(false);
    } catch {
      //   message.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      if (Admin?.id != product?.brand_id) {
        alert("You are not authorized to delete this product.");
        return;
      }
      await axios.delete(`${BASE_URL}/product/${id}`);
      //   message.success("Product deleted");
      router.push("/inventory");
    } catch {
      //   message.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(true);
  };

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Spin size="large" />
        <Form form={form} />
      </div>
    );
  }

  return (
    <div className="w-full px-6 sm:px-10 md:px-20 py-16 bg-gradient-to-br from-[#F0F9FF] via-white to-[#ECFEFF]">
      <div className="max-w-5xl mx-auto" style={{ marginTop: "7vh" }}>
        <Modal
          open={showDeleteConfirm}
          onCancel={() => setShowDeleteConfirm(false)}
          onOk={() => {
            setShowDeleteConfirm(false);
            handleDelete();
          }}
          okText="Delete"
          okButtonProps={{ danger: true, loading: deleting }}
          title="Confirm Deletion"
        >
          <p>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
        </Modal>
        <Card
          className="rounded-xl shadow-md"
          title={
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-[#007cae]">
                Product Details
              </span>

              <div className="flex gap-2">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => setEditing(true)}
                >
                  Edit
                </Button>
                <Button
                  danger
                  loading={deleting}
                  icon={<DeleteOutlined />}
                  onClick={() => confirmDelete()}
                >
                  Delete
                </Button>
              </div>
            </div>
          }
        >
          {/* Image */}
          <div className="relative w-full h-[280px] bg-gray-100 rounded-xl mb-6">
            <img
              src={product?.image_url}
              alt={product?.name}
              //   fill
              style={{ objectFit: "contain" }}
              className="p-6"
            />
          </div>

          {/* Info */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#00A8DE]">
              {product?.name}
            </h2>
            <p className="text-gray-600">{product?.description}</p>

            <div className="flex flex-wrap gap-4 mt-3">
              <span className="text-lg font-semibold">
                Rs. {product?.price}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {product?.category}
              </span>
              <span
                className={`px-3 py-1 rounded-full ${
                  product?.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product?.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </Card>

        {/* Edit Modal */}
        <Modal
          open={editing}
          onCancel={() => setEditing(false)}
          onOk={() => form.submit()}
          okText="Save Changes"
          okButtonProps={{ loading: updating }}
          title="Edit Product"
        >
          <Form layout="vertical" form={form} onFinish={handleUpdate}>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: "food", label: "Food" },
                  { value: "furniture", label: "Furniture" },
                  { value: "electronics", label: "Electronics" },
                ]}
              />
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
      </div>
    </div>
  );
}
