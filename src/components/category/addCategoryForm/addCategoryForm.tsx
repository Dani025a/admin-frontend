import React, { useState, ChangeEvent, FormEvent } from 'react';
import './AddCategoryForm.css';
import InputField from '../../inputField';
import SmallButton from '../../smallButton';
import { MainCategory, SubCategory } from '../../../types/types';
import SelectField from '../../selectField';

interface AddCategoryFormProps {
  onAdd: (name: string, parentId?: number) => Promise<void>;
  categoryType: 'MainCategory' | 'SubCategory' | 'SubSubCategory';
  parentCategories?: (MainCategory | SubCategory)[];
}

function AddCategoryForm({
  onAdd,
  categoryType,
  parentCategories,
}: AddCategoryFormProps) {
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await onAdd(name, parentId);
      setName('');
      setParentId(undefined);
    } catch (error: any) {
      setSubmitError(error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-category-form" onSubmit={handleSubmit}>
      <h3 className="h3">Add {categoryType}</h3>
      <InputField
        type="text"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        placeholder={`Enter ${categoryType} Name`}
        className="input-text"
      />
      {parentCategories && parentCategories.length > 0 ? (
        <SelectField
          parentId={parentId}
          setParentId={setParentId}
          parentCategories={parentCategories}
        />
      ) : categoryType !== 'MainCategory' ? (
        <p>No parent categories available.</p>
      ) : null}
      {submitError && <p className="error-message">{submitError}</p>}
      <SmallButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add'}
      </SmallButton>
    </form>
  );
}

export default AddCategoryForm;
