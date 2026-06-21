import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import ItemCatalogHeader from '@/components/shared/ItemCatalogHeader';
import FilterPanel from '@/components/shared/FilterPanel';
import PaginatedGallery from '@/components/shared/PaginatedGallery';
import { useAgents, Agent } from '@/hooks/useAgents';
import { useMcpServers, McpServer } from '@/hooks/useMcpServers';
import { useWorkflows, Workflow } from '@/hooks/useWorkflows';
import { usePagination } from '@/hooks/usePagination';
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
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const itemsPerPage = 9;
  const loading = agentsLoading || mcpLoading || workflowsLoading;

  // Get items based on protocol
  const items = React.useMemo(() => {
    switch (defaultProtocol) {
      case 'agent': return agents;
      case 'mcp': return mcpServers;
      case 'workflow': return workflows;
      default: return [];
    }
  }, [defaultProtocol, agents, mcpServers, workflows]);

  // Use pagination hook
  const {
    currentPage,
    totalCount,
    paginatedItems,
    handlePageChange,
    resetToFirstPage
  } = usePagination({
    items,
    itemsPerPage,
    searchQuery,
    selectedCategories,
    sortBy
  });

  // Handle category filter from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  const handleCategoryToggle = (category: string) => {
    const newSelectedCategories = selectedCategories.includes(category) 
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newSelectedCategories);
    resetToFirstPage();
    
    // Update URL params
    if (newSelectedCategories.length === 0) {
      searchParams.delete('category');
    } else if (newSelectedCategories.length === 1) {
      searchParams.set('category', newSelectedCategories[0]);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    resetToFirstPage();
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const handleVote = async (itemId: string, voteType: 'up' | 'down') => {
    try {
      switch (defaultProtocol) {
        case 'agent':
          await voteForAgent(itemId);
          break;
        case 'workflow':
          await voteForWorkflow(itemId);
          break;
        case 'mcp':
          await voteForMcpServer(itemId);
          break;
      }
      
      toast.success('Saved locally for this session');
    } catch (error) {
      console.error('Voting error:', error);
      toast.error('Failed to record vote. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
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
            applicationCategory: defaultProtocol === 'agent' ? 'AI Agent' : defaultProtocol === 'mcp' ? 'MCP Server' : 'Workflow',
            operatingSystem: 'Web',
            author: {
              '@type': 'Organization',
              name: item.provider
            },
            type: defaultProtocol,
            programmingLanguage: defaultProtocol === 'agent' ? ['Python', 'JavaScript', 'TypeScript'] : ['Python', 'JavaScript'],
            runtimePlatform: ['Web Browser', 'Node.js', 'Cloud'],
            featureList: item.skills || item.categories || []
          }))
        }}
      />
      
      <ItemCatalogHeader
        title={title}
        description={description}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterPanel
            categories={categories}
            selectedCategories={selectedCategories}
            showFilters={showFilters}
            onCategoryToggle={handleCategoryToggle}
            onClearFilters={handleClearFilters}
          />

          <PaginatedGallery
            items={paginatedItems}
            totalCount={totalCount}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            viewMode={viewMode}
            itemType={defaultProtocol}
            searchQuery={searchQuery}
            selectedCategories={selectedCategories}
            onVote={handleVote}
            onPageChange={handlePageChange}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>
    </>
  );
};

export default ItemCatalog;
