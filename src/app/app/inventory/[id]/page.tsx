"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/utils/api";
import { Form, Spin } from "antd";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ProductDetailCard } from "./components/ProductDetailCard";
import { EditProductModal } from "./components/EditProductModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { QRCodeModal } from "./components/QRCodeModal";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isLoggedIn, Admin, isInitialized } = useAdmin();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isInitialized) return;

    if (!isLoggedIn) {
      toast.error("Please log in to access the Product Details.");
      router.push(`/app/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/detail-for-brand/${id}`);

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
      } catch (err: any) {
        console.error("Failed to load product", err);

        // Check for network/server errors
        if (
          err.code === "ERR_NETWORK" ||
          err.message?.includes("Network Error")
        ) {
          toast.error(
            "Server is not accessible. Please check your connection and try again.",
          );
        } else if (!err.response) {
          toast.error("Cannot reach the server. Please try again later.");
        } else if (err.response?.status === 404) {
          toast.error("Product not found.");
          router.push("/app/inventory");
        } else {
          toast.error("Failed to load product details. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, isInitialized, isLoggedIn, Admin, router, form]);

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

      const response = await api.put(`/product/update/${id}`, formData);

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
      await api.delete(`/product/${id}`);
      router.push("/app/inventory");
    } catch {
      //   message.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleDownloadQR = async () => {
    if (!product?.qr_code_url) {
      alert("QR code is not available");
      return;
    }

    try {
      const response = await fetch(product.qr_code_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${product.name}-qr-code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download QR code", error);
      alert("Failed to download QR code");
    }
  };

  const handleCopyUrl = () => {
    if (product?.model_url) {
      navigator.clipboard
        .writeText(product.model_url)
        .then(() => toast.success("Model URL copied to clipboard!"))
        .catch(() => toast.error("Failed to copy URL."));
    } else {
      toast.error("Model URL is not available.");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full px-3 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-16 bg-gradient-to-br from-[#F0F9FF] via-white to-[#ECFEFF] min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      
      <div className="max-w-5xl mx-auto" style={{ marginTop: "5vh" }}>
        <DeleteConfirmModal 
          visible={showDeleteConfirm} 
          onCancel={() => setShowDeleteConfirm(false)} 
          onConfirm={() => {
            setShowDeleteConfirm(false);
            handleDelete();
          }} 
          deleting={deleting} 
        />

        <ProductDetailCard 
          product={product} 
          onEdit={() => setEditing(true)} 
          onViewQR={() => setShowQRModal(true)} 
          onCopyUrl={handleCopyUrl} 
          onDelete={confirmDelete} 
          deleting={deleting} 
        />

        <EditProductModal 
          visible={editing} 
          onCancel={() => setEditing(false)} 
          onUpdate={handleUpdate} 
          updating={updating} 
          form={form} 
        />

        <QRCodeModal 
          visible={showQRModal} 
          onCancel={() => setShowQRModal(false)} 
          onDownload={handleDownloadQR} 
          productName={product?.name || "Product"} 
          qrCodeUrl={product?.qr_code_url} 
        />
      </div>
    </div>
  );
}
