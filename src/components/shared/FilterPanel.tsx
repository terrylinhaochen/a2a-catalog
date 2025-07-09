import React from 'react';
import { Category } from '@/hooks/useAgents';

interface FilterPanelProps {
  categories: Category[];
  selectedCategories: string[];
  showFilters: boolean;
  onCategoryToggle: (category: string) => void;
  onClearFilters: () => void;
}

const FilterPanel = ({ 
  categories, 
  selectedCategories, 
  showFilters, 
  onCategoryToggle, 
  onClearFilters 
}: FilterPanelProps) => {
  return (
    <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
      <div className="space-y-6">
        {/* Categories Filter */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Categories</h3>
            {selectedCategories.length > 0 && (
              <button
                onClick={onClearFilters}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => onCategoryToggle(category.name)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 capitalize">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;