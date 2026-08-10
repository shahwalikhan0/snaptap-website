"use client";

import { useEffect, useState } from "react";
import { Table, Tag, Tooltip } from "antd";
import { Button } from "@/app/app/components/ui";
import dayjs from "dayjs";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { toast } from "react-toastify";
import api from "@/app/utils/api";
import { ENDPOINTS } from "@/app/utils/endpoints";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { fetchInvoices, InvoiceRecord } from "./services/paymentApi";
import { PaymentMethodCard } from "./components/PaymentMethodCard";
import { formatCurrency } from "@/app/utils/currency";

interface BillingEstimate {
  month: string;
  total_views: number;
  hits_amount: number;
  subscribed_package_amount: number;
  total_amount: number;
  is_estimate?: boolean;
}

const STATUS_TAG: Record<
  InvoiceRecord["status"],
  { color: string; label: string; hint: string }
> = {
  paid: { color: "success", label: "Paid", hint: "Charged successfully" },
  pending: { color: "processing", label: "Pending", hint: "Charge in progress" },
  failed: {
    color: "warning",
    label: "Retrying",
    hint: "Charge failed — we will retry automatically",
  },
  delinquent: {
    color: "error",
    label: "Overdue",
    hint: "Payment could not be collected — update your card",
  },
  void: { color: "default", label: "Void", hint: "Cancelled invoice" },
};

export default function BillingHistory() {
  const { Brand } = useAdmin();
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [currentUsage, setCurrentUsage] = useState<BillingEstimate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!Brand?.brand_id) return;
    const load = async (brandId: number) => {
      setLoading(true);
      try {
        const [invoiceData, currentRes] = await Promise.all([
          fetchInvoices(brandId),
          api.get(ENDPOINTS.BILLING_CURRENT(brandId)),
        ]);
        setInvoices(invoiceData);
        setCurrentUsage(currentRes.data || null);
      } catch (error) {
        console.error("Error fetching billing data:", error);
        toast.error("Failed to load billing history.");
      } finally {
        setLoading(false);
      }
    };
    load(Brand.brand_id);
  }, [Brand?.brand_id]);

  const generateInvoicePDF = (record: InvoiceRecord) => {
    if (!Brand) return;
    const doc = new jsPDF();
    const invoiceNumber = `INV-${dayjs(record.month).format("YYYYMM")}-${Brand.brand_id}`;

    doc.setFontSize(22);
    doc.setTextColor(0, 124, 174);
    doc.text("SnapTap", 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Invoice / Receipt", 20, 28);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Billed To:", 20, 45);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Brand: ${Brand.brand_name || "SnapTap User"}`, 20, 52);
    doc.text(`Account ID: ${Brand.brand_id}`, 20, 58);

    doc.setTextColor(0);
    doc.text("Invoice Details:", 120, 45);
    doc.setTextColor(100);
    doc.text(`Invoice No: ${invoiceNumber}`, 120, 52);
    doc.text(`Month: ${dayjs(record.month).format("MMMM YYYY")}`, 120, 58);
    doc.text(`Status: ${STATUS_TAG[record.status].label}`, 120, 64);
    if (record.paid_at) {
      doc.text(`Paid: ${dayjs(record.paid_at).format("MMM D, YYYY")}`, 120, 70);
    }

    autoTable(doc, {
      startY: 85,
      head: [["Description", "Amount"]],
      body: [
        ["Base Plan Subscription", formatCurrency(record.base_amount)],
        [
          `Generated Model Views (${Number(record.total_views).toLocaleString()})`,
          formatCurrency(record.usage_amount),
        ],
      ],
      foot: [["Total", formatCurrency(record.total_amount)]],
      theme: "grid",
      headStyles: { fillColor: [0, 124, 174] },
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] },
    });

    const finalY =
      (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable
        .finalY || 130;
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Thank you for using SnapTap!", 20, finalY + 20);
    if (record.status === "failed" || record.status === "delinquent") {
      doc.setTextColor(200, 0, 0);
      doc.text(
        "Payment could not be collected. Please update your card on the website.",
        20,
        finalY + 26,
      );
    }

    doc.save(`${invoiceNumber}.pdf`);
  };

  const columns = [
    {
      title: "Invoice Month",
      dataIndex: "month",
      key: "month",
      render: (text: string) => (
        <span className="font-semibold">{dayjs(text).format("MMMM YYYY")}</span>
      ),
    },
    {
      title: "Views",
      dataIndex: "total_views",
      key: "total_views",
      render: (views: number) => views.toLocaleString(),
    },
    {
      title: "Base Plan",
      dataIndex: "base_amount",
      key: "base_amount",
      render: (amount: string) => formatCurrency(amount),
    },
    {
      title: "Usage",
      dataIndex: "usage_amount",
      key: "usage_amount",
      render: (amount: string) => formatCurrency(amount),
    },
    {
      title: "Total",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (amount: string) => (
        <span className="font-black text-slate-800">
          {formatCurrency(amount)}
        </span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_: unknown, record: InvoiceRecord) => {
        const tag = STATUS_TAG[record.status] || STATUS_TAG.pending;
        return (
          <Tooltip title={tag.hint}>
            <Tag
              color={tag.color}
              className="rounded-brand px-3 m-0 border-none font-bold"
            >
              {tag.label}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: "Paid On",
      dataIndex: "paid_at",
      key: "paid_at",
      render: (date: string | null) => (
        <span className="whitespace-nowrap">
          {date ? dayjs(date).format("MMM D, YYYY") : "—"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: InvoiceRecord) => (
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 px-2 hover:bg-slate-50"
          onClick={() => generateInvoicePDF(record)}
        >
          <Icon icon="mdi:download" width={18} />
          PDF
        </Button>
      ),
    },
  ];

  if (!Brand) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Billing &amp; Payments
        </h1>
        <p className="text-slate-500">
          Invoices are charged automatically to your saved card on the 1st of
          each month.
        </p>
      </div>

      <PaymentMethodCard />

      {currentUsage && (
        <div className="bg-slate-50 rounded-brand border border-slate-100 p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Icon
                icon="mdi:chart-timeline-variant-shimmer"
                className="text-snaptap-blue-dark"
                width={20}
              />
              <h3 className="font-bold text-slate-700 uppercase tracking-wider text-xs">
                Current Month Estimate
              </h3>
            </div>
            <p className="text-sm text-slate-500">
              Usage tracked for {dayjs(currentUsage.month).format("MMMM YYYY")} —
              billed on the 1st
            </p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">
                Total Views
              </p>
              <p className="text-2xl font-black text-slate-800">
                {currentUsage.total_views.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">
                Estimated Amount
              </p>
              <p className="text-2xl font-black text-snaptap-blue-dark">
                {formatCurrency(currentUsage.total_amount)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-brand border border-slate-100 shadow-sm overflow-hidden">
        <Table
          dataSource={invoices}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={false}
          className="[&_.ant-table-thead>tr>th]:!bg-slate-50 [&_.ant-table-thead>tr>th]:!text-slate-500 [&_.ant-table-thead>tr>th]:!font-bold [&_.ant-table-thead>tr>th]:!border-b-slate-100 [&_.ant-table-tbody>tr>td]:!border-b-slate-50"
        />
      </div>
    </div>
  );
}
