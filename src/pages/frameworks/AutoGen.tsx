
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Code, Zap, Users } from 'lucide-react';

const AutoGen = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="AutoGen A2A Agents - Multi-Agent Conversations & Agent-to-Agent Protocol"
        description="Discover AutoGen agents implementing the A2A protocol for multi-agent conversations. Build collaborative AI systems with Microsoft AutoGen framework supporting Agent-to-Agent interoperability."
        keywords="AutoGen, AutoGen agents, A2A protocol, multi-agent conversations, Microsoft AutoGen, Agent-to-Agent, collaborative AI, multi-agent systems, conversational AI agents"
        url="https://a2acatalog.com/frameworks/autogen"
      />
      
      <StructuredData 
        type="article"
        data={{
          title: "AutoGen A2A Agents - Multi-Agent Conversations",
          description: "Comprehensive guide to AutoGen agents implementing the Agent-to-Agent protocol for seamless multi-agent conversations and collaborative AI systems.",
          keywords: "AutoGen, A2A protocol, multi-agent conversations, collaborative AI",
          category: "AI Framework",
          url: "https://a2acatalog.com/frameworks/autogen"
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AutoGen A2A Agents
              <span className="block text-blue-300">Multi-Agent Conversations</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover Microsoft AutoGen agents implementing the Agent-to-Agent protocol for seamless multi-agent conversations and collaborative AI workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                <Link to="/agents?search=AutoGen">Browse AutoGen Agents</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent">
                <a href="https://microsoft.github.io/autogen/" target="_blank" rel="noopener noreferrer">
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
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AutoGen for A2A?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Multi-Agent Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Enable multiple AI agents to collaborate and communicate seamlessly using the A2A protocol for complex problem-solving.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Code className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>A2A Protocol Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Built-in support for Agent-to-Agent protocol ensuring interoperability with other A2A-compliant frameworks.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Workflow Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Create sophisticated automated workflows where agents can delegate tasks and collaborate efficiently.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Use Cases */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular AutoGen A2A Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Code review and debugging workflows",
              "Research and analysis pipelines",
              "Customer service automation",
              "Content creation and editing",
              "Data processing and validation",
              "Educational tutoring systems"
            ].map((useCase, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-4 flex-shrink-0"></div>
                    <span className="font-medium text-gray-800">{useCase}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build with AutoGen?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Explore our catalog of AutoGen agents or contribute your own A2A-compliant agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/agents?search=AutoGen">View AutoGen Agents</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent">
              <Link to="/submit">Submit Your Agent</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AutoGen;
