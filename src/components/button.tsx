import React from "react";
import './button.css';

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "delete" | "update";
}

function Button({ onClick, type = "button", children, disabled, className, variant = "primary" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`button ${variant} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
