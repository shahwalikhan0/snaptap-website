"use client";

import { Modal, Button } from "antd";

interface QRCodeModalProps {
  visible: boolean;
  onCancel: () => void;
  onDownload: () => void;
  productName: string;
  qrCodeUrl: string | undefined;
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
      title="Product QR Code"
      footer={[
        <Button key="close" onClick={onCancel}>
          Close
        </Button>,
        qrCodeUrl && (
          <Button key="download" type="primary" onClick={onDownload}>
            Download
          </Button>
        ),
      ]}
    >
      {qrCodeUrl ? (
        <div className="flex flex-col items-center justify-center p-6">
          <img
            src={qrCodeUrl}
            alt={`QR Code for ${productName}`}
            className="w-full max-w-sm h-auto"
          />
          <p className="mt-4 text-gray-600 text-sm text-center">
            Scan this QR code to view product details
          </p>
        </div>
      ) : (
        <div className="p-6 text-center">
          <p className="text-gray-500">QR code is not available for this product</p>
        </div>
      )}
    </Modal>
  );
}
