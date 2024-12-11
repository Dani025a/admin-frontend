import React from "react";

interface textAreaProps {
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  name?: string;
}

function TextArea({ id, value, onChange, placeholder, className, name }: textAreaProps) {
  return (
    <textarea
      id={id}
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={`input-field ${className}`}
    />
  );
}

export default TextArea;
