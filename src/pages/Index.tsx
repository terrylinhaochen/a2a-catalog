
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgentCard from '@/components/AgentCard';
import { useAgents } from '@/hooks/useAgents';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, TrendingUp, Sparkles, Globe, Zap, BookOpen, Code } from 'lucide-react';

const Index = () => {
  const { agents, categories, loading } = useAgents();

  const featuredAgents = agents.filter(agent => agent.featured).slice(0, 6);
  const popularAgents = agents.sort((a, b) => b.votes - a.votes).slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section with Glassmorphism */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl mb-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative p-12 md:p-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              A New Era of AI Agent Collaboration
              <span className="block text-3xl md:text-4xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-2">
                Seamless Interoperability
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Discover a dynamic ecosystem where AI agents from any platform connect, communicate, and automate—together. Unlock seamless interoperability and drive innovation with the A2A Catalog.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                <a href="/agents">
                  <Globe className="w-5 h-5 mr-2" />
                  Browse All Agents
                </a>
              </Button>
              <Button size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-purple-600" asChild>
                <a href="/submit">
                  <Zap className="w-5 h-5 mr-2" />
                  Submit Your Agent
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Agents Section */}
        <section className="mb-16">
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
            <div className="grid grid-cols-1 m+:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </section>

        {/* Explore by Category Section */}
        <section className="mb-16">
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
        </section>

        {/* Most Popular Section */}
        <section className="mb-16">
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
        </section>

        {/* Getting Started with A2A Section */}
        <section className="mb-16">
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
        </section>
      </div>

      {/* CTA Section - Glassmorphism Card */}
      <Card className="backdrop-blur-md bg-white/70 border border-white/20 shadow-xl mx-4 sm:mx-6 lg:mx-8 mb-16">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </CardTitle>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the A2A ecosystem and contribute to the next generation of collaborative AI agents.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/submit">Submit Your Agent</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/docs">Read Documentation</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Footer />
    </div>
  );
};

export default Index;
