import { Modal, ModalBody, ModalHeader } from "flowbite-react";

const ModalWrapper = ({ isOpen, onClose, children }) => {
  return (
    <Modal dismissible show={isOpen} size="lg" onClose={onClose} popup className='py-48'>
      <ModalHeader />
      <ModalBody>
        {children}
      </ModalBody>
    </Modal>
  );
};

export default ModalWrapper;
