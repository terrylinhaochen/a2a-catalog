import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import SearchAndFilters from '@/components/agents/SearchAndFilters';
import FiltersPanel from '@/components/agents/FiltersPanel';
import ResultsHeader from '@/components/agents/ResultsHeader';
import GenericCard from '@/components/GenericCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { useAgents, Agent } from '@/hooks/useAgents';
import { useMcpServers, McpServer } from '@/hooks/useMcpServers';
import { useWorkflows, Workflow } from '@/hooks/useWorkflows';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type ProtocolType = 'agent' | 'mcp' | 'workflow';

interface ItemCatalogProps {
  defaultProtocol: ProtocolType;
  title: string;
  description: string;
  url: string;
}

const ItemCatalog = ({ defaultProtocol, title, description, url }: ItemCatalogProps) => {
  const { agents, categories, loading: agentsLoading, voteForAgent } = useAgents();
  const { mcpServers, loading: mcpLoading, voteForMcpServer } = useMcpServers();
  const { workflows, loading: workflowsLoading, voteForWorkflow } = useWorkflows();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [paginatedItems, setPaginatedItems] = useState<(Agent | McpServer | Workflow)[]>([]);
  
  const itemsPerPage = 9;
  const loading = agentsLoading || mcpLoading || workflowsLoading;

  // Handle category filter from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const pageParam = searchParams.get('page');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }
  }, [searchParams]);

  // Fetch paginated data
  const fetchPaginatedData = async () => {
    const offset = (currentPage - 1) * itemsPerPage;
    const options = {
      limit: itemsPerPage,
      offset,
      search: searchQuery,
      categories: selectedCategories,
      sortBy
    };

    let result;
    switch (defaultProtocol) {
      case 'agent':
        result = await agents.length > 0 ? { data: agents, count: agents.length } : 
                await { data: [], count: 0 }; // Will be handled by useAgents hook
        break;
      case 'mcp':
        result = await mcpServers.length > 0 ? { data: mcpServers, count: mcpServers.length } : 
                await { data: [], count: 0 }; // Will be handled by useMcpServers hook
        break;
      case 'workflow':
        result = await workflows.length > 0 ? { data: workflows, count: workflows.length } : 
                await { data: [], count: 0 }; // Will be handled by useWorkflows hook
        break;
      default:
        result = { data: [], count: 0 };
    }

    if (result) {
      // Apply client-side filtering for now (can be moved to server-side later)
      let filtered = result.data.filter(item => {
        const matchesSearch = !searchQuery || 
                             item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             item.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesCategory = selectedCategories.length === 0 ||
                               selectedCategories.some(cat => item.categories.includes(cat));
        
        return matchesSearch && matchesCategory;
      });

      // Sort items
      switch (sortBy) {
        case 'popular':
          filtered.sort((a, b) => b.votes - a.votes);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
          break;
        case 'alphabetical':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }

      // Apply pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);
      
      setPaginatedItems(paginatedData);
      setTotalCount(filtered.length);
    }
  };

  // Fetch data when dependencies change
  useEffect(() => {
    if (!loading) {
      fetchPaginatedData();
    }
  }, [currentPage, searchQuery, selectedCategories, sortBy, agents, mcpServers, workflows, loading]);

  const handleCategoryToggle = (category: string) => {
    const newSelectedCategories = selectedCategories.includes(category) 
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newSelectedCategories);
    setCurrentPage(1); // Reset to first page when filtering
    
    // Update URL params
    if (newSelectedCategories.length === 0) {
      searchParams.delete('category');
    } else if (newSelectedCategories.length === 1) {
      searchParams.set('category', newSelectedCategories[0]);
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setCurrentPage(1);
    searchParams.delete('category');
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVote = async (itemId: string, voteType: 'up' | 'down') => {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    try {
      switch (defaultProtocol) {
        case 'agent':
          await voteForAgent(itemId, user.id);
          break;
        case 'workflow':
          await voteForWorkflow(itemId, user.id);
          break;
        case 'mcp':
          await voteForMcpServer(itemId, user.id);
          break;
      }
      
      toast.success('Vote recorded successfully!');
    } catch (error) {
      console.error('Voting error:', error);
      toast.error('Failed to record vote. Please try again.');
    }
  };

  const getItemType = (): 'agent' | 'mcp' | 'workflow' => {
    return defaultProtocol;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={title}
        description={description}
        url={url}
        agents={defaultProtocol === 'agent' ? paginatedItems.slice(0, 10).map(item => ({
          name: item.name,
          description: item.description
        })) : []}
        mcpServers={defaultProtocol === 'mcp' ? paginatedItems.slice(0, 10).map(item => ({
          name: item.name,
          description: item.description
        })) : []}
      />
      
      <StructuredData 
        type="website" 
        data={{
          '@type': 'ItemList',
          name: title,
          description: description,
          numberOfItems: totalCount,
          itemListElement: paginatedItems.slice(0, 10).map((item, index) => ({
            '@type': 'SoftwareApplication',
            position: index + 1,
            name: item.name,
            description: item.description,
            applicationCategory: getItemType() === 'agent' ? 'AI Agent' : getItemType() === 'mcp' ? 'MCP Server' : 'Workflow',
            operatingSystem: 'Web',
            author: {
              '@type': 'Organization',
              name: item.provider
            },
            type: getItemType(),
            programmingLanguage: getItemType() === 'agent' ? ['Python', 'JavaScript', 'TypeScript'] : ['Python', 'JavaScript'],
            runtimePlatform: ['Web Browser', 'Node.js', 'Cloud'],
            featureList: item.skills || item.categories || []
          }))
        }}
      />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">{description}</p>
          
          <SearchAndFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            selectedCategories={selectedCategories}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Panel */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-6">
              {/* Categories Filter */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Categories</h3>
                  {selectedCategories.length > 0 && (
                    <button
                      onClick={handleClearFilters}
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
                        onChange={() => handleCategoryToggle(category.name)}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <ResultsHeader
              resultsCount={totalCount}
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
              showAgents={defaultProtocol === 'agent'}
              showMcps={defaultProtocol === 'mcp'}
              showWorkflows={defaultProtocol === 'workflow'}
            />

            {/* Items Grid */}
            {paginatedItems.length > 0 ? (
              <>
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8' 
                  : 'space-y-4 mb-8'
                }>
                  {paginatedItems.map((item) => {
                    const itemType = getItemType();
                    
                    return (
                      <GenericCard 
                        key={item.id} 
                        item={item} 
                        onVote={handleVote}
                        compact={viewMode === 'list'}
                        type={itemType}
                      />
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalCount > itemsPerPage && (
                  <div className="flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => handlePageChange(currentPage - 1)}
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
                                  onClick={() => handlePageChange(page)}
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
                              onClick={() => handlePageChange(currentPage + 1)}
                              className="cursor-pointer"
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or removing some filters
                </p>
                <Button 
                  variant="outline"
                  onClick={handleClearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCatalog;
