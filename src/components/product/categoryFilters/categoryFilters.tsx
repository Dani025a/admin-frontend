import React from 'react';
import { SubSubCategory, FilterType } from '../../../types/types';
import GlobalSelectField from '../../globalSelectField';
import Button from '../../button';
import { useFilter } from '../../../hooks/useFilter';
import InputField from '../../inputField';

interface CategoryFiltersProps {
  selectedSubSubCategory: number | undefined;
  setSelectedSubSubCategory: (id: number | undefined) => void;
  selectedFilters: { [key: number]: any };
  setSelectedFilters: React.Dispatch<React.SetStateAction<{ [key: number]: any }>>;
  filterHook: ReturnType<typeof useFilter>;
  handleOpenValuePopup: (filterOptionId: number) => void;
  handleOpenFilterPopup: () => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedSubSubCategory,
  setSelectedSubSubCategory,
  selectedFilters,
  setSelectedFilters,
  filterHook,
  handleOpenValuePopup,
  handleOpenFilterPopup,
}) => {
  return (
    <div className="right-column">
      <h2>Category and Filters</h2>
      <label htmlFor="subSubCategory">Select Sub-Sub-Category:</label>
      {filterHook.loading ? (
        <p>Loading categories...</p>
      ) : filterHook.error ? (
        <p>Error loading categories: {filterHook.error.message || filterHook.error}</p>
      ) : (
        <GlobalSelectField
          id="subSubCategory"
          value={selectedSubSubCategory || ''}
          onChange={(e) => {
            setSelectedSubSubCategory(Number(e.target.value));
            setSelectedFilters({});
          }}
          options={[
            { value: '', label: '-- Select a Sub-Sub-Category --' },
            ...(filterHook.data || []).map((category: SubSubCategory) => ({
              value: category.id,
              label: category.name,
            })),
          ]}
        />
      )}

      {selectedSubSubCategory ? (
        <>
          <h3>Available Filters</h3>
          {filterHook.loading ? (
            <p>Loading filters...</p>
          ) : filterHook.error ? (
            <p>Error loading filters: {filterHook.error.message || filterHook.error}</p>
          ) : filterHook.filters.length > 0 ? (
            filterHook.filters.map((filterOption) => (
              <div className="filter-group" key={filterOption.id}>
                <label>{filterOption.name}:</label>
                {filterOption.type === FilterType.dropdown ? (
                  <GlobalSelectField
                    value={selectedFilters[filterOption.id] || ''}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        [filterOption.id]: e.target.value ? Number(e.target.value) : '',
                      })
                    }
                    options={[
                      { value: '', label: '-- Select a value --', disabled: true },
                      ...(filterOption.filterValues?.map((value) => ({
                        value: value.id,
                        label: value.value,
                      })) || []),
                    ]}
                  />
                ) : filterOption.type === FilterType.checkbox ? (
                  <div className="checkbox-group">
                    {filterOption.filterValues?.length > 0 ? (
                      filterOption.filterValues.map((value) => (
                        <label key={value.id} className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={
                              selectedFilters[filterOption.id]?.includes(value.id) || false
                            }
                            onChange={(e) => {
                              const currentSelected = selectedFilters[filterOption.id] || [];
                              if (e.target.checked) {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  [filterOption.id]: [...currentSelected, value.id],
                                });
                              } else {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  [filterOption.id]: currentSelected.filter(
                                    (id: number) => id !== value.id
                                  ),
                                });
                              }
                            }}
                          />
                          {value.value}
                        </label>
                      ))
                    ) : (
                      <p>No values available for this filter.</p>
                    )}
                  </div>
                ) : filterOption.type === FilterType.slider ? (
                  <InputField
                    type="number"
                    value={selectedFilters[filterOption.id] || ''}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        [filterOption.id]: e.target.value ? Number(e.target.value) : '',
                      })
                    }
                    placeholder="Enter value"
                  />
                ) : null}

                {filterOption.type !== FilterType.slider && (
                  <Button
                    onClick={() => handleOpenValuePopup(filterOption.id)}
                    variant="primary"
                    type="button"
                    className="add-filter-value-button"
                  >
                    Add New Value
                  </Button>
                )}
              </div>
            ))
          ) : (
            <p>No filters available for this category.</p>
          )}
          <Button
            onClick={handleOpenFilterPopup}
            variant="primary"
            type="button"
            className="add-filter-option-button"
          >
            Add New Filter Option
          </Button>
        </>
      ) : (
        <p>You have not chosen a category.</p>
      )}
    </div>
  );
};

export default CategoryFilters;
