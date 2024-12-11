import React, { ReactNode } from 'react';
import './Popup.css';

interface PopupProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Popup({ title, isOpen, onClose, children }: PopupProps) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="popup-content">{children}</div>
      </div>
    </div>
  );
}

export default Popup;
