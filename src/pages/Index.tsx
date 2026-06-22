import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import HeroSection from '@/components/home/HeroSection';
import GallerySection from '@/components/home/GallerySection';
import ServiceCategories from '@/components/home/ServiceCategories';
import ViewAllToolsSection from '@/components/home/ViewAllToolsSection';
import TaskIntakeSection from '@/components/home/TaskIntakeSection';
import SocialListeningCaseStudy from '@/components/home/SocialListeningCaseStudy';
import { useAgents, Agent } from '@/hooks/useAgents';
import { useMcpServers, McpServer } from '@/hooks/useMcpServers';
import { useWorkflows, Workflow } from '@/hooks/useWorkflows';
import { toast } from 'sonner';

const Index = () => {
  const { agents, loading: agentsLoading, voteForAgent } = useAgents();
  const { mcpServers, loading: mcpLoading, voteForMcpServer } = useMcpServers();
  const { workflows, loading: workflowsLoading, voteForWorkflow } = useWorkflows();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'featured' | 'popular' | 'recent'>('featured');

  const loading = agentsLoading || mcpLoading || workflowsLoading;
  const allItems = [...agents, ...mcpServers, ...workflows];

  // Filter items based on selected filter
  const getFilteredItems = () => {
    let filtered = allItems;
    
    if (searchQuery) {
      const tokens = searchQuery
        .toLowerCase()
        .split(/\s+/)
        .map(token => token.trim())
        .filter(token => token.length > 2);

      filtered = filtered.filter(item => {
        const searchableText = [
          item.name,
          item.description,
          item.provider,
          ...(item.skills || []),
          ...(item.categories || []),
        ].join(' ').toLowerCase();

        return tokens.length > 0
          ? tokens.some(token => searchableText.includes(token))
          : searchableText.includes(searchQuery.toLowerCase());
      });
    }

    switch (filterType) {
      case 'featured':
        return filtered.filter(item => item.featured === true).slice(0, 12);
      case 'popular':
        return filtered.sort((a, b) => b.votes - a.votes).slice(0, 12);
      case 'recent':
        return filtered.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()).slice(0, 12);
      default:
        return filtered.slice(0, 12);
    }
  };

  const filteredItems = getFilteredItems();

  const handleVote = async (itemId: string, voteType: 'up' | 'down') => {
    try {
      const isAgent = agents.some(a => a.id === itemId);
      const isWorkflow = workflows.some(w => w.id === itemId);
      
      if (isAgent) {
        await voteForAgent(itemId);
      } else if (isWorkflow) {
        await voteForWorkflow(itemId);
      } else {
        await voteForMcpServer(itemId);
      }
      
      toast.success('Saved locally for this session');
    } catch (error) {
      console.error('Voting error:', error);
      toast.error('Failed to record vote. Please try again.');
    }
  };

  const getItemType = (item: Agent | McpServer | Workflow): 'agent' | 'mcp' | 'workflow' => {
    if (agents.some(a => a.id === item.id)) return 'agent';
    if (workflows.some(w => w.id === item.id)) return 'workflow';
    return 'mcp';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="A2A Catalog - Skills, MCP Tools, and Agent Task Patterns"
        description="Discovery catalog for Agent2Agent communication, MCP servers, Agent Skills, and task lifecycle patterns."
        keywords="A2A protocol, Agent2Agent, MCP, Model Context Protocol, Agent Skills, AI agents, multi-agent systems"
        url="https://a2acatalog.com"
      />
      
      <StructuredData 
        type="website"
        data={{
          title: "A2A Catalog - Skills, MCP Tools, and Agent Task Patterns",
          description: "Discovery catalog for Agent2Agent communication, MCP servers, Agent Skills, and task lifecycle patterns.",
          keywords: "A2A protocol, MCP, Agent Skills, task lifecycle, AI agents",
          url: "https://a2acatalog.com"
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      <TaskIntakeSection onFindSkills={setSearchQuery} />

      {/* Service Categories Section */}
      <ServiceCategories />
      
      {/* Gallery Section */}
      <div id="featured-catalog" className="bg-gray-50 py-16">
        <GallerySection
          filteredItems={filteredItems}
          loading={loading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleVote={handleVote}
          getItemType={getItemType}
          agents={agents}
        />
      </div>

      <SocialListeningCaseStudy />

      <ViewAllToolsSection />

      <Footer />
    </div>
  );
};

export default Index;
