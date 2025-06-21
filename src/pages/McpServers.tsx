
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import SearchAndFilters from '@/components/agents/SearchAndFilters';
import FiltersPanel from '@/components/agents/FiltersPanel';
import ResultsHeader from '@/components/agents/ResultsHeader';
import GenericCard from '@/components/GenericCard';
import { Button } from '@/components/ui/button';
import { useMcpServers } from '@/hooks/useMcpServers';
import { useAgents } from '@/hooks/useAgents';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const McpServers = () => {
  const { mcpServers, loading, voteForMcpServer } = useMcpServers();
  const { categories } = useAgents(); // Reuse same categories
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Handle category filter from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  const filteredAndSortedMcpServers = useMemo(() => {
    let filtered = mcpServers.filter(server => {
      const matchesSearch = server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           server.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           server.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategories.length === 0 ||
                             selectedCategories.some(cat => server.categories.includes(cat));
      
      return matchesSearch && matchesCategory;
    });

    // Sort MCP servers
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
  }, [mcpServers, searchQuery, selectedCategories, sortBy]);

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

  const handleVote = async (serverId: string, voteType: 'up' | 'down') => {
    if (!user) {
      toast.error('Please sign in to vote for MCP servers');
      return;
    }

    try {
      await voteForMcpServer(serverId, user.id);
      toast.success('Vote recorded successfully!');
    } catch (error) {
      console.error('Voting error:', error);
      toast.error('Failed to record vote. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="MCP Server Catalog - Discover Model Context Protocol Servers"
        description="Discover and integrate MCP-compatible servers for browser automation, web scraping, API integrations, and more. Find verified MCP servers for your AI applications."
        url="https://a2acatalog.com/mcps"
      />
      
      <StructuredData 
        type="website" 
        data={{
          '@type': 'ItemList',
          name: 'MCP Server Catalog',
          description: 'Comprehensive catalog of Model Context Protocol compatible servers',
          numberOfItems: filteredAndSortedMcpServers.length,
          itemListElement: filteredAndSortedMcpServers.slice(0, 10).map((server, index) => ({
            '@type': 'SoftwareApplication',
            position: index + 1,
            name: server.name,
            description: server.description,
            applicationCategory: 'MCP Server',
            operatingSystem: 'Web',
            author: {
              '@type': 'Organization',
              name: server.provider
            }
          }))
        }}
      />
      
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">MCP Server Catalog</h1>
          <p className="text-gray-600 mb-6">
            Discover and integrate Model Context Protocol servers for enhanced AI capabilities
          </p>
          
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
          <FiltersPanel
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            onClearFilters={handleClearFilters}
            showFilters={showFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            <ResultsHeader
              resultsCount={filteredAndSortedMcpServers.length}
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
            />

            {/* MCP Servers Grid */}
            {filteredAndSortedMcpServers.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredAndSortedMcpServers.map((server) => (
                  <GenericCard 
                    key={server.id} 
                    item={server} 
                    onVote={handleVote}
                    compact={viewMode === 'list'}
                    type="mcp"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No MCP servers found</h3>
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

      <Footer />
    </div>
  );
};

export default McpServers;
