// CategoryCard.tsx
import React, { useState, ChangeEvent } from 'react';
import './CategoryCard.css';
import SmallButton from '../../smallButton';
import SelectField from '../../selectField';
import InputField from '../../inputField';
import ConfirmationModal from '../../confirmationModal';
import {
  MainCategory,
  SubCategory,
  SubSubCategory,
} from '../../../types/types';

interface CategoryCardProps {
  category: MainCategory | SubCategory | SubSubCategory;
  categoryType: 'MainCategory' | 'SubCategory' | 'SubSubCategory';
  parentCategories?: (MainCategory | SubCategory)[];
  onUpdate: (id: number, name: string, parentId?: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

function CategoryCard({
  category,
  categoryType,
  parentCategories,
  onUpdate,
  onDelete,
}: CategoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [parentId, setParentId] = useState<number | undefined>(
    categoryType === 'SubCategory'
      ? (category as SubCategory).mainCategoryId
      : categoryType === 'SubSubCategory'
      ? (category as SubSubCategory).subCategoryId
      : undefined
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [operationError, setOperationError] = useState<string | null>(null);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setOperationError(null);
    try {
      await onUpdate(category.id, name, parentId);
      setIsEditing(false);
    } catch (error: any) {
      setOperationError(error.message || 'An error occurred during update');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setOperationError(null);
    try {
      await onDelete(category.id);
    } catch (error: any) {
      setOperationError(error.message || 'An error occurred during deletion');
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const renderRelations = () => {
    if (categoryType === 'SubCategory' && (category as SubCategory).mainCategory) {
      return <p>Main Category: {(category as SubCategory).mainCategory?.name}</p>;
    } else if (
      categoryType === 'SubSubCategory' &&
      (category as SubSubCategory).subCategory
    ) {
      const subCategory = (category as SubSubCategory).subCategory;
      return (
        <>
          <p>Sub Category: {subCategory.name}</p>
        </>
      );
    }
    return null;
  };

  return (
    <div className="category-card">
      {isEditing ? (
        <>
          <InputField
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className="input-text"
          />
          {categoryType !== 'MainCategory' &&
            parentCategories &&
            parentCategories.length > 0 && (
              <SelectField
                parentId={parentId}
                setParentId={setParentId}
                parentCategories={parentCategories}
              />
            )}
        </>
      ) : (
        <>
          <span className="category-name">{category.name}</span>
          {renderRelations()}
        </>
      )}
      {operationError && <p className="error-message">{operationError}</p>}
      <div className="button-group">
        {isEditing ? (
          <SmallButton onClick={handleUpdate} variant="update" disabled={isUpdating}>
            {isUpdating ? 'Saving...' : 'Save'}
          </SmallButton>
        ) : (
          <SmallButton onClick={() => setIsEditing(true)} variant="update">
            Edit
          </SmallButton>
        )}
        <SmallButton onClick={handleDeleteClick} variant="delete" disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </SmallButton>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete this ${categoryType}? This action cannot be undone and will delete all relations.`}
      />
    </div>
  );
}

export default CategoryCard;
