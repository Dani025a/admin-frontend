// CategoryList.tsx
import React from 'react';
import './CategoryList.css';
import CategoryCard from '../categoryCard/categoryCard';
import { MainCategory, SubCategory, SubSubCategory } from '../../../types/types';

interface CategoryListProps {
  categories: (MainCategory | SubCategory | SubSubCategory)[] | null;
  parentCategories?: (MainCategory | SubCategory)[];
  loading: boolean;
  error: string | null;
  updateCategory: (id: number, name: string, parentId?: number) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  categoryType: 'MainCategory' | 'SubCategory' | 'SubSubCategory';
}

function CategoryList({
  categories,
  parentCategories,
  loading,
  error,
  updateCategory,
  deleteCategory,
  categoryType,
}: CategoryListProps) {
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="category-list">
      {categories &&
        categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            categoryType={categoryType}
            parentCategories={parentCategories}
            onUpdate={updateCategory}
            onDelete={deleteCategory}
          />
        ))}
    </div>
  );
}

export default CategoryList;
