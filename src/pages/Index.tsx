
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgentCard from '@/components/AgentCard';
import { useAgents } from '@/hooks/useAgents';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, TrendingUp, Sparkles } from 'lucide-react';

const Index = () => {
  const { agents, categories, loading } = useAgents();

  const featuredAgents = agents.filter(agent => agent.featured).slice(0, 6);
  const popularAgents = agents.sort((a, b) => b.votes - a.votes).slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            A2A Protocol
            <span className="block text-purple-200">Agent Directory</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover and connect with AI agents built on the Agent-to-Agent protocol. 
            Enable seamless collaboration between autonomous agents across platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-purple-600 hover:bg-gray-100">
              <Link to="/agents">
                Explore Agents <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-purple-600">
              <Link to="/submit">Submit Your Agent</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Agents Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">Featured Agents</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hand-picked agents that showcase the best of A2A capabilities
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : featuredAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 mb-4">No featured agents available yet.</p>
                <Button asChild>
                  <Link to="/submit">Be the first to submit an agent</Link>
                </Button>
              </CardContent>
            </Card>
          )}
          
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/agents">View All Agents</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Explore by Category Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find agents organized by their primary capabilities and use cases
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.slice(0, 8).map((category) => (
                <Link
                  key={category.id}
                  to={`/agents?category=${encodeURIComponent(category.name)}`}
                  className="group"
                >
                  <Card className="hover:shadow-md transition-shadow duration-200 group-hover:border-purple-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {category.count || 0} agents
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/categories">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Most Popular Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">Most Popular</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Community favorites with the highest ratings
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : popularAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularAgents.map((agent, index) => (
                <div key={agent.id} className="relative">
                  {index < 3 && (
                    <Badge 
                      className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                    >
                      <Star className="w-3 h-3 mr-1" />
                      #{index + 1}
                    </Badge>
                  )}
                  <AgentCard agent={agent} />
                </div>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 mb-4">No agents available yet.</p>
                <Button asChild>
                  <Link to="/submit">Be the first to submit an agent</Link>
                </Button>
              </CardContent>
            </Card>
          )}
          
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/agents">View All Agents</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build the Future of AI?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join the A2A ecosystem and contribute to the next generation of collaborative AI agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-purple-600 hover:bg-gray-100">
              <Link to="/submit">Submit Your Agent</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-purple-600">
              <Link to="/docs">Read Documentation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
