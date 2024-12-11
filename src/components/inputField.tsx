import React from "react";

interface inputFieldProps {
  type: "text" | "email" | "password" | "number" | "textarea";
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  name?: string;
}

function InputField({ type, id, value, onChange, placeholder, className, name }: inputFieldProps) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={`input-field ${className}`}
    />
  );
}

export default InputField;
