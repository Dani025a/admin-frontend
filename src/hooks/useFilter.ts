// src/hooks/useFilter.ts
import { useState } from 'react';
import { apiClient } from '../services/ApiClientProduct';
import {
  FilterOption,
  FilterValue,
  FilterType,
  ProductFilter,
  ApiError,
} from '../types/types';

export const useFilter = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const [filters, setFilters] = useState<FilterOption[]>([]);
  const [filterValues, setFilterValues] = useState<FilterValue[]>([]);

  const getFiltersForSubSubCategory = async (subSubCategoryId: number): Promise<FilterOption[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<FilterOption[]>(`/${subSubCategoryId}/filters`);
      console.log('API response data:', response.data); // Debugging
  
      const enrichedFilters = Array.isArray(response.data)
        ? response.data.map((filter) => {
            let filterValues: FilterValue[] = [];
  
            if (Array.isArray(filter.values)) {
              filterValues = filter.values;
            } else if (Array.isArray(filter.filterValues)) {
              filterValues = filter.filterValues;
            }
  
            return {
              ...filter,
              filterValues,
            };
          })
        : [];
      setFilters(enrichedFilters);
      return enrichedFilters; // Explicitly return the enriched filters
    } catch (err: any) {
      console.error('Error fetching filters:', err);
      setError(err.response?.data || { message: err.message });
      setFilters([]); // Ensure filters is an empty array
      throw err; // Re-throw the error so it can be handled if necessary
    } finally {
      setLoading(false);
    }
  };
  

  /**
   * Create a new filter for a sub-sub-category.
   * @param params - Parameters including subSubCategoryId, filterName, filterValues, and filterType.
   * @returns The created FilterOption or null if failed.
   */
  const createFilterForSubSubCategory = async (params: {
    subSubCategoryId: number;
    filterName: string;
    filterValues: string[];
    filterType: FilterType;
  }): Promise<FilterOption | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<FilterOption>(
        `/${params.subSubCategoryId}/filters`,
        {
          filterName: params.filterName,
          filterValues: params.filterValues,
          filterType: params.filterType,
        }
      );
      console.log('Created filter:', response.data); // Debugging

      // Handle different possible property names for filter values
      let filterValues: FilterValue[] = [];

      if (Array.isArray(response.data.values)) {
        filterValues = response.data.values;
      } else if (Array.isArray(response.data.filterValues)) {
        filterValues = response.data.filterValues;
      }

      const newFilter: FilterOption = {
        ...response.data,
        filterValues,
      };

      setFilters((prevFilters) => [...prevFilters, newFilter]);
      return newFilter;
    } catch (err: any) {
      console.error('Error creating filter:', err);
      setError(err.response?.data || { message: err.message });
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch filter values for a specific filter option.
   * @param filterOptionId - The ID of the filter option.
   */
  const getFilterValuesForOption = async (
    filterOptionId: number
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<FilterValue[]>(
        `/filter-options/${filterOptionId}/values`
      );
      console.log('Filter values:', response.data); // Debugging

      setFilterValues(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      console.error('Error fetching filter values:', err);
      setError(err.response?.data || { message: err.message });
      setFilterValues([]); // Ensure filterValues is an empty array
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new filter value.
   * @param params - Parameters including filterOptionId and filterValue.
   * @returns The created FilterValue or null if failed.
   */
  const createFilterValue = async (params: {
    filterOptionId: number;
    filterValue: string;
  }): Promise<FilterValue | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<FilterValue>(
        '/filter-values',
        params
      );
      console.log('Created filter value:', response.data); // Debugging

      const newValue: FilterValue = response.data;
      setFilterValues((prevValues) => [...prevValues, newValue]);
      return newValue;
    } catch (err: any) {
      console.error('Error creating filter value:', err);
      setError(err.response?.data || { message: err.message });
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new product filter.
   * @param params - Parameters including productId and filterValueId.
   * @returns The created ProductFilter or null if failed.
   */
  const createProductFilter = async (params: {
    productId: number;
    filterValueId: number;
  }): Promise<ProductFilter | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<ProductFilter>(
        '/product-filters',
        params
      );
      return response.data;
    } catch (err: any) {
      console.error('Error creating product filter:', err);
      setError(err.response?.data || { message: err.message });
      return null;
    } finally {
      setLoading(false);
    }
    
  };
  const updateFilterValue = async (filterValueId: number, value: string) => {
    const response = await apiClient.put(`/filter-values/${filterValueId}`, { value });
    return response.data;
  };
  


  return {
    loading,
    error,
    filters,
    setFilters,
    getFiltersForSubSubCategory,
    createFilterForSubSubCategory,
    getFilterValuesForOption,
    createFilterValue,
    createProductFilter,
    updateFilterValue
  };
};
