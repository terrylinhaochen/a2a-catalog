
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import SearchAndFilters from '@/components/agents/SearchAndFilters';
import FiltersPanel from '@/components/agents/FiltersPanel';
import AgentsGrid from '@/components/agents/AgentsGrid';
import ResultsHeader from '@/components/agents/ResultsHeader';
import { useAgents } from '@/hooks/useAgents';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'react-router-dom';

const Agents = () => {
  const { agents, categories, loading, voteForAgent } = useAgents();
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

  const filteredAndSortedAgents = useMemo(() => {
    let filtered = agents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           agent.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategories.length === 0 ||
                             selectedCategories.some(cat => agent.categories.includes(cat));
      
      return matchesSearch && matchesCategory;
    });

    // Sort agents
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
  }, [agents, searchQuery, selectedCategories, sortBy]);

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

  const handleVote = async (agentId: string, voteType: 'up' | 'down') => {
    if (!user) return;
    await voteForAgent(agentId, user.id);
  };

  // Generate dynamic SEO data based on current search/filters
  const generateSEOData = () => {
    let title = 'AI Agent Catalog - Discover A2A Compatible Agents';
    let description = 'Discover and integrate A2A-compliant AI agents including AutoGen, LangGraph, CrewAI, LlamaIndex, Semantic Kernel, and more. Find agents for expense reports, image generation, data analysis, and automation.';
    
    if (searchQuery) {
      title = `${searchQuery} Agents - A2A Agent Catalog`;
      description = `Find A2A-compatible agents for ${searchQuery}. Browse our catalog of AI agents including specialized solutions for your needs.`;
    }
    
    if (selectedCategories.length > 0) {
      const categoryStr = selectedCategories.join(', ');
      title = `${categoryStr} AI Agents - A2A Catalog`;
      description = `Discover A2A-compatible ${categoryStr.toLowerCase()} agents. Find verified AI agents for ${categoryStr.toLowerCase()} tasks and automation.`;
    }
    
    return { title, description };
  };

  const { title, description } = generateSEOData();

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
        title={title}
        description={description}
        url="https://a2acatalog.com/agents"
        agents={filteredAndSortedAgents.map(agent => ({
          name: agent.name,
          description: agent.description
        }))}
      />
      
      <StructuredData 
        type="website" 
        data={{
          '@type': 'ItemList',
          name: 'A2A Compatible AI Agents',
          description: 'Comprehensive catalog of Agent-to-Agent protocol compatible AI agents',
          numberOfItems: filteredAndSortedAgents.length,
          itemListElement: filteredAndSortedAgents.slice(0, 10).map((agent, index) => ({
            '@type': 'SoftwareApplication',
            position: index + 1,
            name: agent.name,
            description: agent.description,
            applicationCategory: 'AI Agent',
            operatingSystem: 'Web',
            author: {
              '@type': 'Organization',
              name: agent.provider
            }
          }))
        }}
      />
      
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Agent Catalog</h1>
          <p className="text-gray-600 mb-6">
            Discover and integrate A2A-compliant AI agents for your applications
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
              resultsCount={filteredAndSortedAgents.length}
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
            />

            <AgentsGrid
              agents={filteredAndSortedAgents}
              viewMode={viewMode}
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
              onVote={handleVote}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Agents;
