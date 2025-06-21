
import React from 'react';

interface ResultsHeaderProps {
  resultsCount: number;
  searchQuery: string;
  selectedCategories: string[];
  showAgents?: boolean;
  showMcps?: boolean;
}

const ResultsHeader = ({ 
  resultsCount, 
  searchQuery, 
  selectedCategories, 
  showAgents = true, 
  showMcps = false 
}: ResultsHeaderProps) => {
  const getResultsText = () => {
    if (showAgents && showMcps) {
      return `${resultsCount} protocols found`;
    } else if (showAgents) {
      return `${resultsCount} agents found`;
    } else if (showMcps) {
      return `${resultsCount} MCPs found`;
    } else {
      return `${resultsCount} items found`;
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {getResultsText()}
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
