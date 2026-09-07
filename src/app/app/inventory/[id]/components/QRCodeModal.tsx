"use client";

import { Modal } from "antd";
import { Button } from "@/app/app/components/ui";
import { Icon } from "@iconify/react";

interface QRCodeModalProps {
  visible: boolean;
  onCancel: () => void;
  onDownload: () => void;
  productName: string;
  qrCodeUrl: string | null | undefined;
}

export function QRCodeModal({
  visible,
  onCancel,
  onDownload,
  productName,
  qrCodeUrl,
}: QRCodeModalProps) {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      title={
        <span className="text-lg font-bold text-slate-900">Product QR Code</span>
      }
      centered
      footer={[
        <Button
          key="close"
          variant="secondary"
          size="md"
          onClick={onCancel}
          className="h-10 px-6"
        >
          Close
        </Button>,
        qrCodeUrl && (
          <Button
            key="download"
            size="md"
            onClick={onDownload}
            className="h-10 px-8"
          >
            Download QR
          </Button>
        ),
      ]}
      
    >
      {qrCodeUrl ? (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-brand border border-slate-100 mt-4">
          <div className="bg-white p-5 rounded-brand border border-slate-200 mb-5">
            <img
              src={qrCodeUrl}
              alt={`QR code for ${productName}`}
              className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
            />
          </div>

          <h3 className="font-semibold text-slate-900 mb-1">{productName}</h3>
          <p className="text-sm text-slate-500 text-center max-w-xs leading-relaxed">
            Scan this code to open the AR viewer for this product.
          </p>
        </div>
      ) : (
        <div className="p-12 text-center">
          <div className="w-14 h-14 bg-slate-50 rounded-brand flex items-center justify-center mx-auto mb-4">
            <Icon
              icon="solar:qr-code-linear"
              className="text-slate-300"
              width={32}
            />
          </div>
          <p className="text-sm font-semibold text-slate-500">
            No QR code available
          </p>
          <p className="text-sm text-slate-400 mt-1">
            It is generated once the 3D model finishes processing.
          </p>
        </div>
      )}
    </Modal>
  );
}
