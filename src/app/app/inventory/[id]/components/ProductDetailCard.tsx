"use client";

import { Card, Button, Dropdown } from "antd";
import { EditOutlined, DeleteOutlined, CopyOutlined, MoreOutlined } from "@ant-design/icons";

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
      className="rounded-[6px] shadow-md"
      title={
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span className="text-lg sm:text-xl font-semibold text-[#007cae]">
            Product Details
          </span>

          <div className="flex items-center gap-2">
            <Button
              type="default"
              onClick={onViewQR}
              className="rounded-[6px] border-slate-200 hover:!border-[#007cae] hover:!text-[#007cae]"
            >
              View QR
            </Button>
            <Dropdown
              menu={{
                items: [
                  {
                    key: "edit",
                    label: "Edit",
                    icon: <EditOutlined />,
                    onClick: onEdit,
                  },
                  {
                    key: "copy",
                    label: "Copy Model URL",
                    icon: <CopyOutlined />,
                    onClick: onCopyUrl,
                  },
                  {
                    type: "divider",
                  },
                  {
                    key: "delete",
                    label: deleting ? "Deleting..." : "Delete",
                    icon: <DeleteOutlined />,
                    onClick: onDelete,
                    danger: true,
                    disabled: deleting,
                  },
                ],
              }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button
                type="text"
                icon={<MoreOutlined className="text-xl text-slate-600" />}
                className="rounded-[6px] flex items-center justify-center hover:bg-slate-100"
              />
            </Dropdown>
          </div>
        </div>
      }
    >
      {/* Image */}
      <div className="relative w-full h-[200px] sm:h-[280px] bg-gray-100 rounded-[6px] mb-6 flex items-center justify-center overflow-hidden">
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
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-[6px]">
            {product?.category}
          </span>
          <span
            className={`px-3 py-1 rounded-[6px] ${
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
