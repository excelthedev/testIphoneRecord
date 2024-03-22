import { Modal } from "antd";
import React from "react";
import { State } from "../types/state";

export const PageModal: React.FC<State.ModalProps> = ({
  cancelText,
  centered,
  children,
  closable,
  handleCancel,
  maskClosable,
  modalFooter,
  modalTitle,
  modalWith,
  okText,
  onOk,
  openModal,
  className,
}) => {
  return (
    <Modal
      open={openModal}
      onCancel={handleCancel}
      title={<div className="text-center">{modalTitle}</div>}
      cancelText={cancelText}
      okText={okText}
      width={modalWith}
      closeIcon={null}
      closable={closable}
      maskClosable={maskClosable}
      footer={modalFooter}
      centered={centered}
      onOk={onOk}
      okButtonProps={{ type: "primary", style: { backgroundColor: "#096A95" } }}
      className={className}
    >
      <div className="max-h-[85vh] overflow-auto">{children}</div>
    </Modal>
  );
};
