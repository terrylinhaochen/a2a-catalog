import React from 'react';
import { Agent } from '@/hooks/useAgents';
import { McpServer } from '@/hooks/useMcpServers';
import { Workflow } from '@/hooks/useWorkflows';
import GenericCard from '@/components/GenericCard';
import { Button } from '@/components/ui/button';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import ResultsHeader from '@/components/agents/ResultsHeader';

interface PaginatedGalleryProps {
  items: (Agent | McpServer | Workflow)[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  viewMode: 'grid' | 'list';
  itemType: 'agent' | 'mcp' | 'workflow';
  searchQuery: string;
  selectedCategories: string[];
  onVote: (itemId: string, voteType: 'up' | 'down') => Promise<void>;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
}

const PaginatedGallery = ({
  items,
  totalCount,
  currentPage,
  itemsPerPage,
  viewMode,
  itemType,
  searchQuery,
  selectedCategories,
  onVote,
  onPageChange,
  onClearFilters
}: PaginatedGalleryProps) => {
  return (
    <div className="flex-1">
      {/* Scrollable Gallery Content with fixed height */}
      <div className="h-[calc(100vh-200px)] overflow-y-auto">
        <ResultsHeader
          resultsCount={totalCount}
          searchQuery={searchQuery}
          selectedCategories={selectedCategories}
          showAgents={itemType === 'agent'}
          showMcps={itemType === 'mcp'}
          showWorkflows={itemType === 'workflow'}
        />
        
        {items.length > 0 ? (
          <div className="p-4">
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8' 
              : 'space-y-4 mb-8'
            }>
              {items.map((item) => (
                <GenericCard 
                  key={item.id} 
                  item={item} 
                  onVote={onVote}
                  compact={viewMode === 'list'}
                  type={itemType}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalCount > itemsPerPage && (
              <div className="flex justify-center pb-4">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => onPageChange(currentPage - 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: Math.ceil(totalCount / itemsPerPage) }, (_, i) => i + 1)
                      .filter(page => {
                        const totalPages = Math.ceil(totalCount / itemsPerPage);
                        return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2;
                      })
                      .map((page, index, array) => (
                        <React.Fragment key={page}>
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}
                          <PaginationItem>
                            <PaginationLink
                              onClick={() => onPageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        </React.Fragment>
                      ))}
                    
                    {currentPage < Math.ceil(totalCount / itemsPerPage) && (
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => onPageChange(currentPage + 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 p-4">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or removing some filters
            </p>
            <Button 
              variant="outline"
              onClick={onClearFilters}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginatedGallery;