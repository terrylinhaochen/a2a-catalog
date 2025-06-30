
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GenericCard from '@/components/GenericCard';
import { useAgents } from '@/hooks/useAgents';
import { useMcpServers } from '@/hooks/useMcpServers';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Sparkles, TrendingUp, Clock, BookOpen, Code, Zap } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const { agents, loading: agentsLoading, voteForAgent } = useAgents();
  const { mcpServers, loading: mcpLoading, voteForMcpServer } = useMcpServers();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'featured' | 'popular' | 'recent'>('featured');

  const loading = agentsLoading || mcpLoading;
  const allItems = [...agents, ...mcpServers];

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

  const getItemType = (item: any): 'agent' | 'mcp' => {
    return agents.some(a => a.id === item.id) ? 'agent' : 'mcp';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Overlaid Gallery */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            A New Era of AI Agent Collaboration
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover Now
          </p>
        </div>

        {/* Gallery Section - Overlaid on Hero */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search agents, skills, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg bg-white/90 backdrop-blur-sm border-white/20"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={filterType === 'featured' ? 'default' : 'outline'}
              onClick={() => setFilterType('featured')}
              className={`flex items-center gap-2 ${
                filterType === 'featured' 
                  ? 'bg-white text-purple-900 hover:bg-gray-100' 
                  : 'bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-purple-600'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Featured
            </Button>
            <Button
              variant={filterType === 'popular' ? 'default' : 'outline'}
              onClick={() => setFilterType('popular')}
              className={`flex items-center gap-2 ${
                filterType === 'popular' 
                  ? 'bg-white text-purple-900 hover:bg-gray-100' 
                  : 'bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-purple-600'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Popular
            </Button>
            <Button
              variant={filterType === 'recent' ? 'default' : 'outline'}
              onClick={() => setFilterType('recent')}
              className={`flex items-center gap-2 ${
                filterType === 'recent' 
                  ? 'bg-white text-purple-900 hover:bg-gray-100' 
                  : 'bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-purple-600'
              }`}
            >
              <Clock className="w-4 h-4" />
              Recent
            </Button>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-64 bg-white/10 backdrop-blur-sm animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden">
                  <GenericCard 
                    item={item} 
                    type={getItemType(item)}
                    onVote={handleVote} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 bg-white/90 backdrop-blur-sm border-white/20">
              <CardContent>
                <p className="text-gray-500 mb-4">No items found matching your search.</p>
                <Button onClick={() => setSearchQuery('')} variant="outline">
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}

          {/* View All Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button variant="outline" asChild className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-purple-600">
              <Link to="/agents">View All AI Agents</Link>
            </Button>
            <Button variant="outline" asChild className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-purple-600">
              <Link to="/mcps">View All MCP Servers</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Getting Started Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Started with A2A</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn about the Agent-to-Agent protocol and start building interoperable AI agents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Documentation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">
                  Explore the official A2A protocol documentation and specification
                </p>
                <Button asChild className="w-full">
                  <a href="https://google-a2a.github.io/A2A/latest/" target="_blank" rel="noopener noreferrer">
                    Read Docs
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <Code className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Examples</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">
                  Browse working examples and sample implementations
                </p>
                <Button asChild className="w-full">
                  <a href="https://github.com/google-a2a/A2A" target="_blank" rel="noopener noreferrer">
                    View Examples
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Tutorials</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">
                  Follow step-by-step guides to implement A2A in your projects
                </p>
                <Button asChild className="w-full">
                  <a href="https://google-a2a.github.io/A2A/latest/tutorials/python/" target="_blank" rel="noopener noreferrer">
                    Start Learning
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
