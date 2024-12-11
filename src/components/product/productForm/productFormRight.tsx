import React, { useEffect, useState } from 'react';
import {
  ProductCreationPayload,
  FilterOption,
  FilterType,
  SubSubCategory,
} from '../../../types/types';
import { useFilter } from '../../../hooks/useFilter';
import GlobalSelectField from '../../globalSelectField';
import InputField from '../../inputField';
import SmallButton from '../../smallButton';
import AddFilterValueForm from './AddFilterValueForm';
import './productForm.css';
import { toast } from 'react-toastify';
import LoadingScreen from '../../loadingScreen';

interface ProductFormRightProps {
  formData: ProductCreationPayload;
  setFormData: React.Dispatch<React.SetStateAction<ProductCreationPayload>>;
  parentCategories: SubSubCategory[];
}

function ProductFormRight({
  formData,
  setFormData,
  parentCategories,
}: ProductFormRightProps) {
  const {
    loading,
    error,
    filters,
    setFilters,
    getFiltersForSubSubCategory,
    createFilterForSubSubCategory,
    createFilterValue,
  } = useFilter();

  const [newFilterName, setNewFilterName] = useState('');
  const [newFilterType, setNewFilterType] = useState<FilterType>(
    FilterType.checkbox
  );
  const [newFilterValues, setNewFilterValues] = useState<string>('');
  const [addingFilter, setAddingFilter] = useState<boolean>(false);
  const [addingFilterValue, setAddingFilterValue] = useState<boolean>(false);

  useEffect(() => {
    if (formData.subSubCategoryId) {
      getFiltersForSubSubCategory(formData.subSubCategoryId).then(
        (fetchedFilters) => {
          const updatedFilters = fetchedFilters.map((filter) => {
            const selectedValues = formData.filters
              .filter((f) => filter.filterValues.some((v) => v.id === f.filterValueId))
              .map((f) => f.filterValueId);
  
            return {
              ...filter,
              filterValues: filter.filterValues.map((value) => ({
                ...value,
                selected: selectedValues.includes(value.id),
              })),
            };
          });
          setFilters(updatedFilters);
        }
      );
    }
    console.log(formData.filters)
  }, [formData.subSubCategoryId, formData.filters]);
  
  

  const handleCategoryChange = (id: number | undefined) => {
    setFormData((prev) => ({
      ...prev,
      subSubCategoryId: id,
      filters: [],
    }));
  };

  const handleFilterChange = (filterOption: FilterOption, value: number) => {
    setFormData((prev) => {
      if (filterOption.type === FilterType.checkbox) {
        const existing = prev.filters.find(
          (f) => f.filterOptionId === filterOption.id && f.filterValueId === value
        );
        return existing
          ? {
              ...prev,
              filters: prev.filters.filter(
                (f) =>
                  !(f.filterOptionId === filterOption.id && f.filterValueId === value)
              ),
            }
          : {
              ...prev,
              filters: [...prev.filters, { filterOptionId: filterOption.id, filterValueId: value }],
            };
      } else if (filterOption.type === FilterType.dropdown || filterOption.type === FilterType.slider) {
        return {
          ...prev,
          filters: [
            ...prev.filters.filter((f) => f.filterOptionId !== filterOption.id),
            { filterOptionId: filterOption.id, filterValueId: value },
          ],
        };
      }
      return prev;
    });
  };
  
  const handleAddFilter = async () => {
    if (!newFilterName || !newFilterType) {
      toast.error('Please provide both filter name and type.');
      return;
    }

    setAddingFilter(true);

    try {
      const filterValuesArray =
        newFilterType !== FilterType.slider
          ? newFilterValues.split(',').map((v) => v.trim()).filter((v) => v)
          : [];
      const createdFilter = await createFilterForSubSubCategory({
        subSubCategoryId: formData.subSubCategoryId!,
        filterName: newFilterName,
        filterValues: filterValuesArray,
        filterType: newFilterType,
      });

      if (createdFilter) {
        setNewFilterName('');
        setNewFilterType(FilterType.checkbox);
        setNewFilterValues('');
        toast.success('Filter added successfully.');
        await getFiltersForSubSubCategory(formData.subSubCategoryId!);
      }
    } catch {
      toast.error('Failed to add filter.');
    } finally {
      setAddingFilter(false);
    }
  };

  const handleAddFilterValue = async (
    filterOptionId: number,
    value: string
  ) => {
    if (!value) {
      toast.error('Filter value cannot be empty.');
      return;
    }

    if (!formData.subSubCategoryId) {
      toast.error('Sub-Sub Category is not selected.');
      return;
    }

    setAddingFilterValue(true);
    try {
      const newValue = await createFilterValue({
        filterOptionId,
        filterValue: value,
      });

      if (newValue) {
        setFilters((prevFilters) =>
          prevFilters.map((filter) =>
            filter.id === filterOptionId
              ? { ...filter, filterValues: [...filter.filterValues, newValue] }
              : filter
          )
        );
        toast.success('Filter value added successfully.');
      }
    } catch {
      toast.error('Failed to add filter value.');
    } finally {
      setAddingFilterValue(false);
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div className="error-message">{error.message}</div>;

  return (
    <div className="product-form-right">
      <h3>Category and Filters</h3>
      <div className="form-group">
        <label htmlFor="category-select-right">Sub-Sub Category</label>
        <GlobalSelectField
          id="category-select-right"
          value={formData.subSubCategoryId || ''}
          onChange={(e) =>
            handleCategoryChange(
              e.target.value ? Number(e.target.value) : undefined
            )
          }
          options={parentCategories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          className="category-select-right"
          placeholder="Select Sub-Sub Category"
        />
      </div>
      {formData.subSubCategoryId && (
        <div className="filters-section">
          <h4>Filters</h4>
          {Array.isArray(filters) && filters.length > 0 ? (
            filters.map((filter) => (
              <div key={filter.id} className="filter-section">
                <div className="filter-header">
                  <span>{filter.name}</span>
                </div>
                <div className="filter-values">
                  {filter.type === FilterType.checkbox &&
                    filter.filterValues?.map((value) => (
                      <div key={value.id} className="checkbox-field">
                        <input
                          type="checkbox"
                          id={`filter-${filter.id}-value-${value.id}`}
                          checked={formData.filters.some(
                            (f) =>
                              f.filterOptionId === filter.id &&
                              f.filterValueId === value.id
                          )}
                          onChange={() =>
                            handleFilterChange(filter, value.id)
                          }
                        />
                        <label
                          htmlFor={`filter-${filter.id}-value-${value.id}`}
                        >
                          {value.value}
                        </label>
                      </div>
                    ))}
                  {filter.type === FilterType.dropdown && (
                    <div className="form-group">
                      <select
                        id={`filter-${filter.id}-select`}
                        value={
                          formData.filters.find(
                            (f) => f.filterOptionId === filter.id
                          )?.filterValueId || ''
                        }
                        onChange={(e) =>
                          handleFilterChange(
                            filter,
                            Number(e.target.value)
                          )
                        }
                      >
                        <option value="">Select {filter.name}</option>
                        {filter.filterValues?.map((value) => (
                          <option key={value.id} value={value.id}>
                            {value.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {filter.type === FilterType.slider && (
                    <div className="form-group">
                      <InputField
                        type="number"
                        id={`slider-${filter.id}`}
                        name={`slider-value-${filter.id}`}
                        value={
                          formData.filters.find(
                            (f) => f.filterOptionId === filter.id
                          )?.filterValueId?.toString() || ''
                        }
                        onChange={(e) =>
                          handleFilterChange(
                            filter,
                            Number(e.target.value)
                          )
                        }
                        placeholder={`Enter ${filter.name}`}
                        className="slider-input"
                      />
                    </div>
                  )}
                </div>
                {filter.type !== FilterType.slider && (
                  <AddFilterValueForm
                    filterOptionId={filter.id}
                    onAdd={handleAddFilterValue}
                  />
                )}
              </div>
            ))
          ) : (
            <p>No filters available.</p>
          )}
          <div className="add-filter-section">
            <h4>Add New Filter</h4>
            <div className="form-group">
              <label htmlFor="new-filter-name">Filter Name</label>
              <InputField
                type="text"
                id="new-filter-name"
                name="newFilterName"
                value={newFilterName}
                onChange={(e) => setNewFilterName(e.target.value)}
                placeholder="Filter Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-filter-type">Filter Type</label>
              <select
                id="new-filter-type"
                name="newFilterType"
                value={newFilterType}
                onChange={(e) =>
                  setNewFilterType(e.target.value as FilterType)
                }
              >
                <option value={FilterType.checkbox}>Checkbox</option>
                <option value={FilterType.dropdown}>Dropdown</option>
                <option value={FilterType.slider}>Slider</option>
              </select>
            </div>
            {newFilterType !== FilterType.slider && (
              <div className="form-group">
                <label htmlFor="new-filter-values">Filter Values</label>
                <InputField
                  type="text"
                  id="new-filter-values"
                  name="newFilterValues"
                  value={newFilterValues}
                  onChange={(e) => setNewFilterValues(e.target.value)}
                  placeholder="Filter Values (comma separated)"
                />
              </div>
            )}
            <SmallButton
              type="button"
              onClick={handleAddFilter}
              variant="primary"
              disabled={addingFilter}
            >
              {addingFilter ? 'Adding...' : 'Add Filter'}
            </SmallButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductFormRight;
