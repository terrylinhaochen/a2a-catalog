import React, { useState } from 'react';
import { Search, Zap, Shield, Globe, TrendingUp, Users, Star, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgentCard from '@/components/AgentCard';
import { mockAgents, categories } from '@/data/mockAgents';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredAgents = mockAgents.filter(agent => agent.featured).slice(0, 3);
  const popularAgents = mockAgents.sort((a, b) => b.votes - a.votes).slice(0, 6);

  const stats = [
    { label: 'Total Agents', value: '1,247', icon: '🤖' },
    { label: 'Categories', value: '24', icon: '📂' },
    { label: 'Monthly Users', value: '52K', icon: '👥' },
    { label: 'API Calls', value: '2.1M', icon: '⚡' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover, integrate, and deploy
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI agents that work together
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
              The definitive marketplace for Agent-to-Agent (A2A) compatible AI agents. Find specialized AI capabilities, from data analysis to content generation, and integrate them into your applications with standardized protocols.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/agents">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  <Globe className="w-5 h-5 mr-2" />
                  Browse All Agents
                </Button>
              </a>
              <a href="/submit">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 transition-colors">
                  <Zap className="w-5 h-5 mr-2" />
                  Submit Your Agent
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Agents */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Agents</h2>
            <p className="text-xl text-gray-600">
              Hand-picked agents that showcase the best of A2A capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>

          <div className="text-center">
            <a href="/agents">
              <Button size="lg" variant="outline">
                View All Agents
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>
            <p className="text-xl text-gray-600">
              Find agents organized by their primary capabilities and use cases
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/categories/${category.id}`}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{category.icon}</div>
                  <Badge variant="secondary">{category.count} agents</Badge>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <div className="flex items-center text-purple-600 font-medium">
                  <span>Explore category</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Agents */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Most Popular</h2>
              <p className="text-xl text-gray-600">
                Community favorites with the highest ratings
              </p>
            </div>
            <a href="/agents?sort=popular">
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                View All Popular
              </Button>
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build with AI Agents?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of developers already building with A2A agents. 
            Submit your own agent or start integrating today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/submit">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Zap className="w-5 h-5 mr-2" />
                Submit Your Agent
              </Button>
            </a>
            <a href="/docs">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 transition-colors">
                <Shield className="w-5 h-5 mr-2" />
                Read Documentation
              </Button>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
