
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Category } from '@/hooks/useAgents';

interface FiltersPanelProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onClearFilters: () => void;
  showFilters: boolean;
}

const FiltersPanel = ({
  categories,
  selectedCategories,
  onCategoryToggle,
  onClearFilters,
  showFilters
}: FiltersPanelProps) => {
  return (
    <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
      <div className="bg-white rounded-lg border p-6 sticky top-24">
        <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={() => onCategoryToggle(category.name)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <div className="flex-1 flex items-center justify-between">
                <span className="text-sm text-gray-700">{category.name}</span>
                <Badge variant="outline" className="text-xs">
                  {category.count || 0}
                </Badge>
              </div>
            </label>
          ))}
        </div>
        
        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="mt-4 w-full text-gray-500"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FiltersPanel;
