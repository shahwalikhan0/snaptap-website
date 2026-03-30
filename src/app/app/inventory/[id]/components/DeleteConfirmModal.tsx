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
      okText="Delete"
      okButtonProps={{ danger: true, loading: deleting }}
      title="Confirm Deletion"
    >
      <p>
        Are you sure you want to delete this product? <br />
        <b>Warning:</b> This action cannot be undone. It will permanently delete:
        <ul className="list-disc ml-5 mt-2">
          <li>Product details and files (Images, 3D Models, QR Code)</li>
          <li>All associated analytics (Views, Hits, Ratings)</li>
          <li>Customer feedback and favorites</li>
        </ul>
      </p>
    </Modal>
  );
}
