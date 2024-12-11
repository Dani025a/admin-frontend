import React from "react";
import './smallButton.css'

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "primary" | "delete" | "update";
  className?: string;
}

function SmallButton({ onClick, type = "button", children, disabled, variant = "primary" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`small-button ${variant}`}
    >
      {children}
    </button>
  );
}

export default SmallButton;
