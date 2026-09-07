"use client";

import { ReactNode } from "react";
import { Button, Dropdown } from "antd";
import { Button as UiButton, Badge, Card } from "@/app/app/components/ui";
import {
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  MoreOutlined,
  QrcodeOutlined,
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

/** One row of the facts list — label left, value right, hairline divider. */
function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-sm text-slate-500 shrink-0">{label}</dt>
      <dd className="text-sm font-semibold text-slate-900 text-right min-w-0 truncate">
        {value}
      </dd>
    </div>
  );
}

const formatDate = (value?: string | null) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

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
      {/* Back */}
      <Link
        href="/app/inventory"
        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-snaptap-blue-dark transition-colors"
      >
        <Icon
          icon="solar:alt-arrow-left-linear"
          width={16}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
        Back to Inventory
      </Link>

      {/* Page header — title on the left, actions on the right, which is
          where they're expected. They used to sit at the bottom of the info
          column with the ⋯ menu floating beside the title. */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-slate-500 mb-1">{product?.category}</p>
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 truncate">
              {product?.name}
            </h1>
            <Badge
              tone={product?.is_active ? "success" : "neutral"}
              className="shrink-0"
            >
              {product?.is_active ? "Live" : "Inactive"}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <UiButton size="md" onClick={onEdit}>
            <EditOutlined />
            Edit Details
          </UiButton>
          <UiButton variant="secondary" size="md" onClick={onViewQR}>
            <QrcodeOutlined />
            View QR
          </UiButton>

          <Dropdown
            menu={{
              items: [
                {
                  key: "copy",
                  label: "Copy Model URL",
                  icon: <CopyOutlined />,
                  onClick: onCopyUrl,
                },
                { type: "divider" },
                {
                  key: "delete",
                  label: deleting ? "Deleting…" : "Permanently Delete",
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
            {/* stays antd: Dropdown injects a ref into its trigger */}
            <Button
              type="text"
              aria-label="More actions"
              icon={<MoreOutlined className="text-xl text-slate-400" />}
              className="h-10 w-10 flex items-center justify-center rounded-brand border border-slate-200 hover:border-slate-300"
            />
          </Dropdown>
        </div>
      </div>

      <Card variant="elevated" padding="none" className="overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Visual */}
          <div className="lg:w-[45%] bg-surface-inset border-b lg:border-b-0 lg:border-r border-slate-100 p-8 flex items-center justify-center min-h-[300px]">
            <img
              src={product?.image_url ?? undefined}
              alt={product?.name}
              className="max-h-[320px] w-full object-contain"
            />
          </div>

          {/* Facts + description */}
          <div className="flex-1 p-6 sm:p-8">
            <dl className="divide-y divide-slate-100 -mt-3">
              <DetailRow label="Price" value={formatPrice(product?.price)} />
              <DetailRow label="Category" value={product?.category || "—"} />
              <DetailRow
                label="Status"
                value={product?.is_active ? "Live" : "Inactive"}
              />
              <DetailRow label="Added" value={formatDate(product?.created_at)} />
            </dl>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900 mb-2">
                Description
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product?.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
