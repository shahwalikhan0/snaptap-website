"use client";

import { Modal, Button } from "antd";
import { Icon } from "@iconify/react";

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
      title={<span className="text-xl font-black text-slate-800 tracking-tight">Product Access QR</span>}
      centered
      footer={[
        <Button key="close" onClick={onCancel} className="rounded-[6px] font-bold h-10 px-6">
          Close
        </Button>,
        qrCodeUrl && (
          <Button 
            key="download" 
            type="primary" 
            onClick={onDownload}
            className="rounded-[6px] !bg-snaptap-blue-dark hover:!bg-snaptap-blue-deep border-none font-bold h-10 px-8"
          >
            Download Asset
          </Button>
        ),
      ]}
      className="[&_.ant-modal-content]:!rounded-[6px]"
    >
      {qrCodeUrl ? (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[6px] border border-slate-100 mt-4">
          <div className="bg-white p-6 rounded-[12px] shadow-sm border border-slate-100 mb-6 group cursor-pointer overflow-hidden relative">
            <img
              src={qrCodeUrl}
              alt={`QR Code for ${productName}`}
              className="w-48 h-48 sm:w-64 sm:h-64 object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-snaptap-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <h3 className="text-lg font-black text-slate-900 mb-2">{productName}</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] text-center max-w-xs leading-loose">
            Scan this code to launch the <span className="text-snaptap-blue-dark">Instant AR Viewer</span> for this specific product.
          </p>
        </div>
      ) : (
        <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="solar:qr-code-bold-duotone" className="text-slate-200" width={40} />
            </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">QR Code Missing</p>
        </div>
      )}
    </Modal>
  );
}
