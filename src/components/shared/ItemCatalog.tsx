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
import { useAgents, Agent } from '@/hooks/useAgents';
import { useMcpServers, McpServer } from '@/hooks/useMcpServers';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type ProtocolType = 'agent' | 'mcp' | 'all';

interface ItemCatalogProps {
  defaultProtocol?: ProtocolType;
  title: string;
  description: string;
  url: string;
}

const ItemCatalog = ({ defaultProtocol = 'all', title, description, url }: ItemCatalogProps) => {
  const { agents, categories, loading: agentsLoading, voteForAgent } = useAgents();
  const { mcpServers, loading: mcpLoading, voteForMcpServer } = useMcpServers();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showAgents, setShowAgents] = useState(defaultProtocol === 'all' || defaultProtocol === 'agent');
  const [showMcps, setShowMcps] = useState(defaultProtocol === 'all' || defaultProtocol === 'mcp');

  const loading = agentsLoading || mcpLoading;

  // Handle category filter from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  // Combined items based on protocol filter
  const combinedItems = useMemo((): (Agent | McpServer)[] => {
    let items: (Agent | McpServer)[] = [];
    
    if (showAgents) {
      items = [...items, ...agents];
    }
    
    if (showMcps) {
      items = [...items, ...mcpServers];
    }
    
    return items;
  }, [agents, mcpServers, showAgents, showMcps]);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = combinedItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

    return filtered;
  }, [combinedItems, searchQuery, selectedCategories, sortBy]);

  const handleCategoryToggle = (category: string) => {
    const newSelectedCategories = selectedCategories.includes(category) 
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newSelectedCategories);
    
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
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const handleVote = async (itemId: string, voteType: 'up' | 'down') => {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    try {
      const isAgent = agents.some(a => a.id === itemId);
      
      if (isAgent) {
        await voteForAgent(itemId, user.id);
      } else {
        await voteForMcpServer(itemId, user.id);
      }
      
      toast.success('Vote recorded successfully!');
    } catch (error) {
      console.error('Voting error:', error);
      toast.error('Failed to record vote. Please try again.');
    }
  };

  const getItemType = (item: Agent | McpServer): 'agent' | 'mcp' => {
    return agents.some(a => a.id === item.id) ? 'agent' : 'mcp';
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
        agents={filteredAndSortedItems.filter(item => getItemType(item) === 'agent').slice(0, 10).map(item => ({
          name: item.name,
          description: item.description
        }))}
        mcpServers={filteredAndSortedItems.filter(item => getItemType(item) === 'mcp').slice(0, 10).map(item => ({
          name: item.name,
          description: item.description
        }))}
      />
      
      <StructuredData 
        type="website" 
        data={{
          '@type': 'ItemList',
          name: title,
          description: description,
          numberOfItems: filteredAndSortedItems.length,
          itemListElement: filteredAndSortedItems.slice(0, 10).map((item, index) => ({
            '@type': 'SoftwareApplication',
            position: index + 1,
            name: item.name,
            description: item.description,
            applicationCategory: getItemType(item) === 'agent' ? 'AI Agent' : 'MCP Server',
            operatingSystem: 'Web',
            author: {
              '@type': 'Organization',
              name: item.provider
            },
            type: getItemType(item),
            programmingLanguage: getItemType(item) === 'agent' ? ['Python', 'JavaScript', 'TypeScript'] : ['Python', 'JavaScript'],
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
              {/* Protocol Filter */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">Protocols</h3>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={showAgents}
                        onChange={(e) => setShowAgents(e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">A2A Agents</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {agents.length}
                    </Badge>
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={showMcps}
                        onChange={(e) => setShowMcps(e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">MCPs</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {mcpServers.length}
                    </Badge>
                  </label>
                </div>
              </div>

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
          <div className="flex-1 max-h-screen overflow-y-auto">
            <ResultsHeader
              resultsCount={filteredAndSortedItems.length}
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
              showAgents={showAgents}
              showMcps={showMcps}
            />

            {/* Items Grid */}
            {filteredAndSortedItems.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredAndSortedItems.map((item) => {
                  const itemType = getItemType(item);
                  
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
