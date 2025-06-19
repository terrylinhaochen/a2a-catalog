
import React from 'react';

interface ResultsHeaderProps {
  resultsCount: number;
  searchQuery: string;
  selectedCategories: string[];
}

const ResultsHeader = ({ resultsCount, searchQuery, selectedCategories }: ResultsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {resultsCount} agents found
        </h2>
        {searchQuery && (
          <p className="text-gray-600">
            Results for "{searchQuery}"
          </p>
        )}
        {selectedCategories.length > 0 && (
          <p className="text-gray-600">
            Filtered by: {selectedCategories.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultsHeader;
