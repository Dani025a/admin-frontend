import React, { useState } from 'react'; 
import InputField from '../../inputField';
import SmallButton from '../../smallButton';
import './productForm.css';
import { toast } from 'react-toastify';

interface AddFilterValueFormProps {
  filterOptionId: number;
  onAdd: (filterOptionId: number, value: string) => void;
}

function AddFilterValueForm({ filterOptionId, onAdd }: AddFilterValueFormProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      onAdd(filterOptionId, value.trim());
      setValue('');
    } else {
      toast.error('Filter value cannot be empty.');
    }
  };

  return (
    <div className="add-filter-value-form">
      <InputField
        type="text"
        name={`new-filter-value-${filterOptionId}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New filter value"
      />
      <SmallButton type="button" onClick={handleSubmit} variant="primary">
        Add Value
      </SmallButton>
    </div>
  );
}

export default AddFilterValueForm;
