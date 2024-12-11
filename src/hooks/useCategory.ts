// useCategory.ts
import { useState } from 'react';
import { apiClient } from '../services/ApiClientProduct';
import { MainCategory, SubCategory, SubSubCategory } from '../types/types';

type CategoryType = 'MainCategory' | 'SubCategory' | 'SubSubCategory';

const categoryPaths = {
  MainCategory: {
    singular: 'main-category',
    plural: 'main-categories',
  },
  SubCategory: {
    singular: 'sub-category',
    plural: 'sub-categories',
  },
  SubSubCategory: {
    singular: 'sub-sub-category',
    plural: 'sub-sub-categories',
  },
};

interface UseCategoryReturn<T> {
  data: T[] | null;
  loading: boolean;
  error: string | null;
  getCategories: () => Promise<void>;
  createCategory: (name: string, parentId?: number) => Promise<void>;
  updateCategory: (id: number, name: string, parentId?: number) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategory = <T extends MainCategory | SubCategory | SubSubCategory>(
  categoryType: CategoryType
): UseCategoryReturn<T> => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const singularPath = `/${categoryPaths[categoryType].singular}`;
  const pluralPath = `/${categoryPaths[categoryType].plural}`;

  const getCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<T[]>(pluralPath);
      setData(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.error || `Failed to fetch ${categoryPaths[categoryType].plural}`
      );
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (name: string, parentId?: number) => {
    setLoading(true);
    setError(null);
    try {
      const payload: any = { name };
      if (parentId) {
        if (categoryType === 'SubCategory') {
          payload.mainCategoryId = parentId;
        } else if (categoryType === 'SubSubCategory') {
          payload.subCategoryId = parentId;
        }
      }
      await apiClient.post<T>(singularPath, payload);

      await getCategories();
    } catch (err: any) {
      setError(
        err.response?.data?.error || `Failed to create ${categoryPaths[categoryType].singular}`
      );
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id: number, name: string, parentId?: number) => {
    setLoading(true);
    setError(null);
    try {
      const payload: any = { name };
      if (parentId !== undefined) {
        if (categoryType === 'SubCategory') {
          payload.mainCategoryId = parentId;
        } else if (categoryType === 'SubSubCategory') {
          payload.subCategoryId = parentId;
        }
      }
      await apiClient.put<T>(`${singularPath}/${id}`, payload);

      await getCategories();
    } catch (err: any) {
      setError(
        err.response?.data?.error || `Failed to update ${categoryPaths[categoryType].singular}`
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`${singularPath}/${id}`);

      await getCategories();
    } catch (err: any) {
      setError(
        err.response?.data?.error || `Failed to delete ${categoryPaths[categoryType].singular}`
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
