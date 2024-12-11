import React from 'react';
import "./selectField.css"
interface ParentCategory {
  id: number;
  name: string;
}

interface SelectFieldProps {
  parentId: number | undefined;
  setParentId: (id: number | undefined) => void;
  parentCategories: ParentCategory[];
}

function SelectField({
  parentId,
  setParentId,
  parentCategories,
}: SelectFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setParentId(selectedValue ? Number(selectedValue) : undefined);
  };

  return (
    <select
      className="select-field"
      value={parentId ?? ''}
      onChange={handleChange}
    >
      <option value="">Select Parent Category</option>
      {parentCategories.map((parent) => (
        <option key={parent.id} value={parent.id}>
          {parent.name}
        </option>
      ))}
    </select>
  );
}

export default SelectField;
