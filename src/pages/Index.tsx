import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Code, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import WorkRequestForm from '@/components/WorkRequestForm';
import HeroSection from '@/components/home/HeroSection';
import SearchSection from '@/components/home/SearchSection';
import GallerySection from '@/components/home/GallerySection';
import ServiceCategories from '@/components/home/ServiceCategories';
import ViewAllToolsSection from '@/components/home/ViewAllToolsSection';
import { useAgents, Agent } from '@/hooks/useAgents';
import { useMcpServers, McpServer } from '@/hooks/useMcpServers';
import { useWorkflows, Workflow } from '@/hooks/useWorkflows';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Index = () => {
  const { agents, loading: agentsLoading, voteForAgent } = useAgents();
  const { mcpServers, loading: mcpLoading, voteForMcpServer } = useMcpServers();
  const { workflows, loading: workflowsLoading, voteForWorkflow } = useWorkflows();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'featured' | 'popular' | 'recent'>('featured');

  const loading = agentsLoading || mcpLoading || workflowsLoading;
  const allItems = [...agents, ...mcpServers, ...workflows];

  // Filter items based on selected filter
  const getFilteredItems = () => {
    let filtered = allItems;
    
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
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
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    try {
      const isAgent = agents.some(a => a.id === itemId);
      const isWorkflow = workflows.some(w => w.id === itemId);
      
      if (isAgent) {
        await voteForAgent(itemId, user.id);
      } else if (isWorkflow) {
        await voteForWorkflow(itemId, user.id);
      } else {
        await voteForMcpServer(itemId, user.id);
      }
      
      toast.success('Vote recorded successfully!');
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
        title="A2A Catalog - Human-Mediated AI Agents & Professional Services"
        description="Connect with expert AI agents for professional services. From competitor analysis to content creation, get results-based solutions with human oversight."
        keywords="AI agents, professional services, competitor analysis, content creation, sales marketing, human-mediated AI"
        url="https://a2acatalog.com"
      />
      
      <StructuredData 
        type="website"
        data={{
          title: "A2A Catalog - AI Agents & Professional Services",
          description: "Professional AI agents and services marketplace with human oversight",
          keywords: "AI agents, professional services, marketplace",
          url: "https://a2acatalog.com"
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />


      {/* Service Categories Section */}
      <ServiceCategories />
      
      {/* Gallery Section */}
      <div className="bg-gray-50 py-16">
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

      <ViewAllToolsSection />

      <Footer />
    </div>
  );
};

export default Index;
