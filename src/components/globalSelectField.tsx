import React from 'react';
import './globalSelectField.css';

interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectFieldProps {
  id?: string;
  value: string | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
  placeholder?: string
}

const globalSelectField: React.FC<SelectFieldProps> = ({
  id,
  value,
  onChange,
  options,
  className,
  placeholder
}) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`global-select-field ${className || ''}`}
    >
      <option value="someOption">Select {placeholder}</option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default globalSelectField;
