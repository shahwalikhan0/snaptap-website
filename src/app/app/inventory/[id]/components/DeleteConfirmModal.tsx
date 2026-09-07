"use client";

import { Modal } from "antd";

interface DeleteConfirmModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  deleting: boolean;
}

export function DeleteConfirmModal({
  visible,
  onCancel,
  onConfirm,
  deleting,
}: DeleteConfirmModalProps) {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Delete Product"
      okButtonProps={{ danger: true, loading: deleting }}
      title={
        <span className="text-lg font-bold text-slate-900">
          Delete this product?
        </span>
      }
      centered
    >
      {/* The <ul> used to sit inside the <p>, which is invalid HTML — the
          browser closes the <p> early and React can hydrate it differently
          than it rendered on the server. */}
      <p className="text-sm text-slate-600 leading-relaxed">
        This cannot be undone. Deleting it permanently removes:
      </p>
      <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
        <li className="flex gap-2">
          <span className="text-slate-300">&bull;</span>
          Product details and files (images, 3D model, QR code)
        </li>
        <li className="flex gap-2">
          <span className="text-slate-300">&bull;</span>
          All analytics for it (views, hits, ratings)
        </li>
        <li className="flex gap-2">
          <span className="text-slate-300">&bull;</span>
          Customer feedback and favourites
        </li>
      </ul>
    </Modal>
  );
}
