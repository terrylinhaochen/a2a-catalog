import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgentCard from '@/components/AgentCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAgents } from '@/hooks/useAgents';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { Zap, Shield, Globe, Users, ArrowRight, Star, TrendingUp } from 'lucide-react';

const Index = () => {
  const { agents, categories, loading } = useAgents();
  
  // Implement proper SEO for homepage
  useSEO({
    title: 'A2A Catalog - AI Agent Marketplace | Discover & Deploy A2A Compatible Agents',
    description: 'Comprehensive marketplace for Agent-to-Agent (A2A) compatible AI agents. Discover, integrate, and deploy specialized AI capabilities with standardized protocols.',
    keywords: ['AI agents', 'A2A protocol', 'agent marketplace', 'artificial intelligence', 'agent-to-agent', 'AI integration', 'AI automation', 'enterprise AI'],
    type: 'website',
    ogImage: 'https://lovable.dev/opengraph-image-p98pqg.png'
  });

  const featuredAgents = agents.filter(agent => agent.featured).slice(0, 6);
  const topCategories = categories.slice(0, 6);
  
  const stats = [
    { label: 'Active Agents', value: agents.length.toString(), icon: <Zap className="w-5 h-5" /> },
    { label: 'Categories', value: categories.length.toString(), icon: <Globe className="w-5 h-5" /> },
    { label: 'Total Votes', value: agents.reduce((sum, agent) => sum + agent.votes, 0).toString(), icon: <Star className="w-5 h-5" /> }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Future of <span className="text-purple-300">Agent Collaboration</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Discover, integrate, and deploy AI agents with the revolutionary Agent-to-Agent (A2A) protocol. 
              Build autonomous multi-agent ecosystems that work together seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agents">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50">
                  Explore Agents <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
                  <div className="text-purple-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      {featuredAgents.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Agents</h2>
              <p className="text-xl text-gray-600">Discover the most popular and innovative A2A compatible agents</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
            <div className="text-center">
              <Link to="/agents">
                <Button size="lg" variant="outline">
                  View All Agents <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {topCategories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Categories</h2>
              <p className="text-xl text-gray-600">Explore agents by their capabilities and use cases</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {topCategories.map((category) => (
                <Link key={category.id} to={`/agents?category=${encodeURIComponent(category.name)}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <div className="text-2xl">{category.icon}</div>
                      </div>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">
                        {category.count || 0} agents
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link to="/categories">
                <Button size="lg" variant="outline">
                  View All Categories <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* A2A Protocol Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why A2A Protocol?</h2>
            <p className="text-xl text-gray-600">The next generation of agent interoperability</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-purple-600" />,
                title: "Seamless Integration",
                description: "Agents communicate naturally without shared memory or context"
              },
              {
                icon: <Shield className="w-8 h-8 text-purple-600" />,
                title: "Enterprise Security",
                description: "Built-in authentication and authorization for enterprise environments"
              },
              {
                icon: <Globe className="w-8 h-8 text-purple-600" />,
                title: "Open Standards",
                description: "Based on HTTP, SSE, and JSON-RPC for easy adoption"
              },
              {
                icon: <Users className="w-8 h-8 text-purple-600" />,
                title: "Multi-Agent Collaboration",
                description: "Enable complex workflows across different agent systems"
              }
            ].map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
