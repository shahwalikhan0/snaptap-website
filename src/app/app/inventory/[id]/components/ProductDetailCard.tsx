"use client";

import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface ProductDetailCardProps {
  product: any;
  onEdit: () => void;
  onViewQR: () => void;
  onCopyUrl: () => void;
  onDelete: () => void;
  deleting: boolean;
}

export function ProductDetailCard({
  product,
  onEdit,
  onViewQR,
  onCopyUrl,
  onDelete,
  deleting,
}: ProductDetailCardProps) {
  return (
    <Card
      className="rounded-xl shadow-md"
      title={
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span className="text-lg sm:text-xl font-semibold text-[#007cae]">
            Product Details
          </span>

          <div className="flex flex-wrap gap-2">
            <Button
              icon={<EditOutlined />}
              onClick={onEdit}
              className="rounded-xl border-slate-200 hover:!border-[#007cae] hover:!text-[#007cae]"
            >
              Edit
            </Button>
            <Button
              type="default"
              onClick={onViewQR}
              className="rounded-xl border-slate-200 hover:!border-[#007cae] hover:!text-[#007cae]"
            >
              View QR
            </Button>
            <Button
              type="default"
              onClick={onCopyUrl}
              className="rounded-xl border-slate-200 hover:!border-[#007cae] hover:!text-[#007cae]"
            >
              Copy Model URL
            </Button>
            <Button
              danger
              loading={deleting}
              icon={<DeleteOutlined />}
              onClick={onDelete}
              className="rounded-xl border-red-200 hover:!border-red-500 hover:!text-red-500"
            >
              Delete
            </Button>
          </div>
        </div>
      }
    >
      {/* Image */}
      <div className="relative w-full h-[200px] sm:h-[280px] bg-gray-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
        <img
          src={product?.image_url}
          alt={product?.name}
          className="p-6 h-full w-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-[#007cae]">
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
  );
}
