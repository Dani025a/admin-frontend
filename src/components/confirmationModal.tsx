import React from 'react';
import Modal from 'react-modal';
import './confirmationModal.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  message,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Deletion"
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <h2 className="modal-title">Confirm Deletion</h2>
      <p className="modal-message">{message}</p>
      <div className="modal-buttons">
        <button onClick={onConfirm} className="confirm-button">
          Yes, Delete
        </button>
        <button onClick={onRequestClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
