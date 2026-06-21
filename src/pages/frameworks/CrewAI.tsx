
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Bot, Briefcase } from 'lucide-react';

const CrewAI = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="CrewAI A2A Agents - Role-Based Multi-Agent Teams & Agent-to-Agent Protocol"
        description="Explore CrewAI A2A sample patterns for role-based agent teams, delegation, and task artifacts."
        keywords="CrewAI, CrewAI agents, A2A protocol, role-based agents, multi-agent teams, agent crews, Agent-to-Agent, collaborative AI, team automation"
        url="https://a2acatalog.com/frameworks/crewai"
      />
      
      <StructuredData 
        type="article"
        data={{
          title: "CrewAI A2A Agents - Role-Based Multi-Agent Teams",
          description: "Guide to CrewAI sample patterns for exposing role-based teams through A2A.",
          keywords: "CrewAI, A2A protocol, role-based agents, multi-agent teams, agent crews",
          category: "AI Framework",
          url: "https://a2acatalog.com/frameworks/crewai"
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-950">
              CrewAI A2A Agents
              <span className="block text-gray-600">Role-Based Multi-Agent Teams</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore sample-adapter patterns for exposing role-based CrewAI teams through Agent2Agent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gray-950 hover:bg-gray-800">
                <Link to="/agents?search=CrewAI">Browse CrewAI Agents</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://crewai.com/" target="_blank" rel="noopener noreferrer">
                  Official Documentation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose CrewAI for A2A?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-gray-700 mb-4" />
                <CardTitle>Role-Based Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Create specialized agent teams with defined roles and responsibilities, then expose the team as a remote A2A agent.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Bot className="w-12 h-12 text-gray-700 mb-4" />
                <CardTitle>Task Delegation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Model task delegation internally while returning clear A2A task status, messages, and artifacts externally.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Briefcase className="w-12 h-12 text-gray-700 mb-4" />
                <CardTitle>Business Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Useful when the remote agent represents a coordinated team rather than a single tool call.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Use Cases */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular CrewAI A2A Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Content creation teams",
              "Marketing campaign automation",
              "Business process optimization",
              "Project management workflows",
              "Sales pipeline automation",
              "Customer support crews"
            ].map((useCase, index) => (
              <Card key={index} className="border-l-4 border-l-gray-300">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-4 flex-shrink-0"></div>
                    <span className="font-medium text-gray-800">{useCase}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build with CrewAI?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Explore CrewAI catalog entries and task patterns for delegated agent teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-gray-950 hover:bg-gray-100">
              <Link to="/agents?search=CrewAI">View CrewAI Agents</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-950 bg-transparent">
              <Link to="/workflows">View Task Patterns</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CrewAI;
