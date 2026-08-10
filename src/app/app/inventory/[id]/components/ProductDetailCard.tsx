"use client";

import { Card, Button, Dropdown, Tag } from "antd";
import { Button as UiButton } from "@/app/app/components/ui";
import {
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  MoreOutlined,
  QrcodeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";
import Link from "next/link";

import type { Product } from "../../types";
import { formatPrice } from "@/app/utils/currency";

interface ProductDetailCardProps {
  product: Product | null;
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
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/app/inventory">
        <UiButton
          variant="ghost"
          size="sm"
          className="pl-0 font-bold text-slate-500 hover:text-snaptap-blue-dark group"
        >
          <ArrowLeftOutlined className="text-snaptap-blue-dark" />
          <span className="group-hover:-translate-x-1 transition-transform inline-block underline-offset-4 hover:underline">
            Back to Inventory
          </span>
        </UiButton>
      </Link>

      <Card className="rounded-brand border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-0 [&_.ant-card-body]:p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Visual Column */}
          <div className="lg:w-[45%] bg-slate-50 p-6 sm:p-10 flex items-center justify-center relative group min-h-[350px]">
            <img
              src={product?.image_url ?? undefined}
              alt={product?.name}
              className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-snaptap-blue/5 to-transparent opacity-50" />

            <div className="absolute top-4 left-4 z-20">
              <Tag
                className={`rounded-[4px] border-none px-3 py-0.5 font-bold uppercase text-[10px] tracking-widest ${
                  product?.is_active
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                    : "bg-red-500 text-white shadow-lg shadow-red-500/20"
                }`}
              >
                {product?.is_active ? "Live AR" : "Inactive"}
              </Tag>
            </div>
          </div>

          {/* Info Column */}
          <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between bg-white border-l border-slate-100">
            <div>
              <div className="flex justify-between items-start gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-snaptap-blue-dark mb-2">
                    <Icon icon="solar:tag-bold-duotone" width={20} />
                    <span className="font-bold uppercase tracking-widest text-xs">
                      {product?.category}
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                    {product?.name}
                  </h1>
                </div>

                <Dropdown
                  menu={{
                    items: [
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
                        label: deleting ? "Deleting..." : "Permanently Delete",
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
                    icon={<MoreOutlined className="text-2xl text-slate-400" />}
                    className="h-10 w-10 flex items-center justify-center rounded-brand hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                  />
                </Dropdown>
              </div>

              <div className="flex items-baseline gap-2 mb-8 p-4 bg-slate-50 rounded-brand border border-slate-100 w-fit">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Pricing
                </span>
                <span className="text-3xl font-black text-slate-900 leading-none">
                  {formatPrice(product?.price)}
                </span>
              </div>

              <div className="mb-10">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Icon icon="solar:notes-bold-duotone" width={16} />
                  Product Description
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {product?.description ||
                    "No detailed description available for this catalog entry."}
                </p>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <UiButton
                onClick={onEdit}
                className="h-12 shadow-lg shadow-snaptap-blue-dark/10"
              >
                <EditOutlined />
                Edit Details
              </UiButton>
              <UiButton
                variant="secondary"
                onClick={onViewQR}
                className="h-12 hover:border-snaptap-blue-dark hover:text-snaptap-blue-dark"
              >
                <QrcodeOutlined />
                View QR
              </UiButton>
            </div>
          </div>
        </div>
      </Card>

      {/* Footer Meta */}
      <div className="flex flex-wrap items-center gap-6 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
        <div className="flex items-center gap-2">
          <Icon
            icon="solar:calendar-bold-duotone"
            className="text-snaptap-blue-dark"
          />
          Created: {product?.created_at ? new Date(product.created_at).toLocaleDateString() : "N/A"}
        </div>
        {product?.model_url && (
          <>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-2 text-snaptap-blue-dark">
              <Icon icon="solar:globus-bold-duotone" />
              AR Assets Synced
            </div>
          </>
        )}
      </div>
    </div>
  );
}
