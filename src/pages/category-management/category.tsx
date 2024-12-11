import React, { useEffect } from 'react';
import './category.css';
import AddCategoryForm from '../../components/category/addCategoryForm/addCategoryForm';
import CategoryList from '../../components/category/categoryList/categoryList';
import { useCategory } from '../../hooks/useCategory';
import { MainCategory, SubCategory, SubSubCategory } from '../../types/types';

function Category() {
  const mainCategoryHook = useCategory<MainCategory>('MainCategory');
  const {
    data: mainCategories,
    loading: mainLoading,
    error: mainError,
    getCategories: getMainCategories,
    createCategory: createMainCategory,
    updateCategory: updateMainCategory,
    deleteCategory: deleteMainCategory,
  } = mainCategoryHook;

  const subCategoryHook = useCategory<SubCategory>('SubCategory');
  const {
    data: subCategories,
    loading: subLoading,
    error: subError,
    getCategories: getSubCategories,
    createCategory: createSubCategory,
    updateCategory: updateSubCategory,
    deleteCategory: deleteSubCategory,
  } = subCategoryHook;

  const subSubCategoryHook = useCategory<SubSubCategory>('SubSubCategory');
  const {
    data: subSubCategories,
    loading: subSubLoading,
    error: subSubError,
    getCategories: getSubSubCategories,
    createCategory: createSubSubCategory,
    updateCategory: updateSubSubCategory,
    deleteCategory: deleteSubSubCategory,
  } = subSubCategoryHook;

  useEffect(() => {
    getMainCategories();
    getSubCategories();
    getSubSubCategories();
  }, []);

  if (mainLoading || subLoading || subSubLoading) {
    return <p>Loading categories...</p>;
  }

  if (mainError || subError || subSubError) {
    return (
      <div>
        {mainError && <p className="error-message">{mainError}</p>}
        {subError && <p className="error-message">{subError}</p>}
        {subSubError && <p className="error-message">{subSubError}</p>}
      </div>
    );
  }

  const handleAddMainCategory = async (name: string) => {
    await createMainCategory(name);
  };

  const handleAddSubCategory = async (name: string, parentId?: number) => {
    if (parentId) {
      await createSubCategory(name, parentId);
    }
  };

  const handleAddSubSubCategory = async (name: string, parentId?: number) => {
    if (parentId) {
      await createSubSubCategory(name, parentId);
    }
  };

  const updatedata = async () => {
    await getSubCategories();
    await getSubSubCategories();
    await getMainCategories();

  }

  const handleUpdateMainCategory = async (id: number, name: string) => {
    await updateMainCategory(id, name);
    await updatedata();
  };

  const handleUpdateSubCategory = async (id: number, name: string, parentId?: number) => {
    await updateSubCategory(id, name, parentId);
    await updatedata();
  };

  const handleUpdateSubSubCategory = async (id: number, name: string, parentId?: number) => {
    await updateSubSubCategory(id, name, parentId);
    await updatedata();
  };

  const handleDeleteMainCategory = async (id: number) => {
    await deleteMainCategory(id);
    await updatedata();
  };

  const handleDeleteSubCategory = async (id: number) => {
    await deleteSubCategory(id);
    await updatedata();
  };

  const handleDeleteSubSubCategory = async (id: number) => {
    await deleteSubSubCategory(id);
    await updatedata();
  };

  return (
    <div className="category-page">
      <h1 className="title">Manage Categories</h1>

      <div className="category-columns">
        <div className="category-column">
          <h2 className="h3">Main Categories</h2>
          <AddCategoryForm
            onAdd={handleAddMainCategory}
            categoryType="MainCategory"
          />
          <CategoryList
            categories={mainCategories}
            loading={mainLoading}
            error={mainError}
            updateCategory={handleUpdateMainCategory}
            deleteCategory={handleDeleteMainCategory}
            categoryType="MainCategory"
          />
        </div>

        <div className="category-column">
          <h2 className="h3">Sub Categories</h2>
          {mainCategories ? (
            <>
              <AddCategoryForm
                onAdd={handleAddSubCategory}
                categoryType="SubCategory"
                parentCategories={mainCategories}
              />
              <CategoryList
                categories={subCategories}
                parentCategories={mainCategories}
                loading={subLoading}
                error={subError}
                updateCategory={handleUpdateSubCategory}
                deleteCategory={handleDeleteSubCategory}
                categoryType="SubCategory"
              />
            </>
          ) : (
            <p>Loading Main Categories...</p>
          )}
        </div>

        <div className="category-column">
          <h2 className="h3">Sub Sub Categories</h2>
          {subCategories ? (
            <>
              <AddCategoryForm
                onAdd={handleAddSubSubCategory}
                categoryType="SubSubCategory"
                parentCategories={subCategories}
              />
              <CategoryList
                categories={subSubCategories}
                parentCategories={subCategories}
                loading={subSubLoading}
                error={subSubError}
                updateCategory={handleUpdateSubSubCategory}
                deleteCategory={handleDeleteSubSubCategory}
                categoryType="SubSubCategory"
              />
            </>
          ) : (
            <p>Loading Sub Categories...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
