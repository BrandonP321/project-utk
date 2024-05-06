import { useMemo, useState } from "react";
import Modal from "./Modal";

type DefaultModalProps = Pick<Modal.Props, "onClose" | "show">;

export function useModal() {
  const [showModal, setShowModal] = useState(false);

  const modalProps: DefaultModalProps = useMemo(
    () => ({
      show: showModal,
      onClose: () => setShowModal(false),
    }),
    [showModal],
  );

  return {
    modalProps,
    showModal: () => setShowModal(true),
    hideModal: () => setShowModal(false),
    toggleModal: () => setShowModal(!showModal),
  };
}
