import { Modal, ModalHeader, ModalBody } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ModalWrapper = ({ isOpen, onClose, onBack, children }) => {
  return (
    <Modal dismissible show={isOpen} size="lg" onClose={onClose} popup>
      <ModalHeader>
      <div className="flex justify-between items-center w-full pl-2 pr-1">
          {/* Show Go Back only if `onBack` is passed */}
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Go back"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-gray-400 dark:text-gray-300 text-[16px]" />
            </button>
          ) : <div />} {/* Placeholder to keep spacing if no back button */}
        </div>
      </ModalHeader>

      <ModalBody>
        {children}
      </ModalBody>
    </Modal>
  );
};

export default ModalWrapper;
