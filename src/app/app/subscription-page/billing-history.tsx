"use client";

import { useEffect, useState } from "react";
import { Table, Tag, Tooltip, Button } from "antd";
import dayjs from "dayjs";
import { useAdmin } from "@/app/hooks/useAdminContext";
import { toast } from "react-toastify";
import api from "@/app/utils/api";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface BillingRecord {
  id: string;
  month: string;
  total_views: number;
  hits_amount: number;
  subscribed_package_amount: number;
  total_amount: number;
  is_paid: boolean;
  paid_at: string | null;
  due_date: string;
}

export default function BillingHistory() {
  const { Brand } = useAdmin();
  const [history, setHistory] = useState<BillingRecord[]>([]);
  const [currentUsage, setCurrentUsage] = useState<BillingRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Brand?.brand_id) {
      fetchBillingData(Brand.brand_id);
    }
  }, [Brand?.brand_id]);

  const fetchBillingData = async (brandId: number) => {
    setLoading(true);
    try {
      const [historyRes, currentRes] = await Promise.all([
        api.get(`/billing/brand/${brandId}/history`),
        api.get(`/billing/brand/${brandId}/current`),
      ]);

      setHistory(historyRes.data || []);
      setCurrentUsage(currentRes.data || null);
    } catch (error) {
      console.error("Error fetching billing data:", error);
      toast.error("Failed to load billing history.");
    } finally {
      setLoading(false);
    }
  };

  const generateInvoicePDF = (record: BillingRecord) => {
    if (!Brand) return;
    const doc = new jsPDF();
    const invoiceNumber = `INV-${dayjs(record.month).format("YYYYMM")}-${Brand.brand_id}`;
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(0, 124, 174);
    doc.text("SnapTap", 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Invoice / Receipt", 20, 28);
    
    // Brand / Billed To
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Billed To:", 20, 45);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Brand: ${(Brand as any).brand_name || "SnapTap User"}`, 20, 52);
    doc.text(`Account ID: ${Brand.brand_id}`, 20, 58);
    
    // Invoice Details
    doc.setTextColor(0);
    doc.text("Invoice Details:", 120, 45);
    doc.setTextColor(100);
    doc.text(`Invoice No: ${invoiceNumber}`, 120, 52);
    doc.text(`Month: ${dayjs(record.month).format("MMMM YYYY")}`, 120, 58);
    if (record.due_date) {
      doc.text(`Due Date: ${dayjs(record.due_date).format("MMM D, YYYY")}`, 120, 64);
    }
    doc.text(`Status: ${record.is_paid ? 'Paid' : 'Unpaid'}`, 120, record.due_date ? 70 : 64);

    // Table
    autoTable(doc, {
      startY: 85,
      head: [['Description', 'Amount']],
      body: [
        ['Base Plan Subscription', `Rs. ${Number(record.subscribed_package_amount).toLocaleString()}`],
        [`Generated Model Views (${Number(record.total_views).toLocaleString()})`, `Rs. ${Number(record.hits_amount).toLocaleString()}`],
      ],
      foot: [['Total', `Rs. ${Number(record.total_amount).toLocaleString()}`]],
      theme: 'grid',
      headStyles: { fillColor: [0, 124, 174] }, // #007cae
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] },
    });
    
    // Footer
    const finalY = (doc as any).lastAutoTable.finalY || 130;
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Thank you for using SnapTap!", 20, finalY + 20);
    if (!record.is_paid) {
      doc.setTextColor(200, 0, 0);
      doc.text("Please complete payment before the due date.", 20, finalY + 26);
    }
    
    doc.save(`${invoiceNumber}.pdf`);
  };

  const columns = [
    {
      title: "Invoice Month",
      dataIndex: "month",
      key: "month",
      render: (text: string) => <span className="font-semibold">{dayjs(text).format("MMMM YYYY")}</span>,
    },
    {
      title: "Generated Views",
      dataIndex: "total_views",
      key: "total_views",
      render: (views: number) => views.toLocaleString(),
    },
    {
      title: "Base Plan",
      dataIndex: "subscribed_package_amount",
      key: "subscribed_package_amount",
      render: (amount: number) => `Rs. ${amount.toLocaleString()}`,
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (amount: number) => <span className="font-black text-slate-800">Rs. {amount.toLocaleString()}</span>,
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      render: (date: string) => <span className="whitespace-nowrap">{dayjs(date).format("MMM D, YYYY")}</span>,
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: BillingRecord) => (
        record.is_paid ? (
          <Tag color="success" className="rounded-[6px] px-3 m-0 border-none font-bold">Paid</Tag>
        ) : (
          <Tooltip title={dayjs().isAfter(dayjs(record.due_date)) ? "Overdue" : "Pending Payment"}>
            <Tag color={dayjs().isAfter(dayjs(record.due_date)) ? "error" : "warning"} className="rounded-[6px] px-3 m-0 border-none font-bold">
              Unpaid
            </Tag>
          </Tooltip>
        )
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: BillingRecord) => (
        <Button 
           type="link" 
           className="text-[#007cae] flex items-center gap-1 font-semibold hover:bg-slate-50 rounded-lg px-2"
           onClick={() => generateInvoicePDF(record)}
        >
          <Icon icon="mdi:download" width={18} />
          PDF
        </Button>
      )
    }
  ];

  if (!Brand) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Billing History</h1>
        <p className="text-slate-500">View your current usage and past invoice history.</p>
      </div>

      {currentUsage && (
        <div className="bg-slate-50 rounded-[6px] border border-slate-100 p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Icon icon="mdi:chart-timeline-variant-shimmer" className="text-[#007cae]" width={20} />
              <h3 className="font-bold text-slate-700 uppercase tracking-wider text-xs">Current Month Estimate</h3>
            </div>
            <p className="text-sm text-slate-500">Usage tracked for {dayjs(currentUsage.month).format("MMMM YYYY")}</p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Total Views</p>
              <p className="text-2xl font-black text-slate-800">{currentUsage.total_views.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Total Amount</p>
              <p className="text-2xl font-black text-[#007cae]">Rs. {currentUsage.total_amount.toLocaleString()}</p>
            </div>
            <div className="flex flex-col justify-center">
               <Button 
                onClick={() => generateInvoicePDF(currentUsage)}
                type="default" 
                className="rounded-[6px] flex items-center gap-1 font-semibold text-slate-600 bg-white shadow-sm border-slate-200"
               >
                 <Icon icon="mdi:file-pdf-box" width={20} className="text-red-500"/> Download PDF
               </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[6px] border border-slate-100 shadow-sm overflow-hidden">
        <Table
          dataSource={history}
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
