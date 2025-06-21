
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, GitBranch, Workflow, Bot } from 'lucide-react';

const LangGraph = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="LangGraph A2A Agents - Stateful Multi-Agent Workflows & Agent-to-Agent Protocol"
        description="Build stateful multi-agent workflows with LangGraph implementing A2A protocol. Create complex agent graphs and workflows with LangChain's LangGraph framework."
        keywords="LangGraph, LangGraph agents, A2A protocol, stateful workflows, multi-agent workflows, LangChain, Agent-to-Agent, workflow automation, agent graphs"
        url="https://a2acatalog.com/frameworks/langgraph"
      />
      
      <StructuredData 
        type="article"
        data={{
          title: "LangGraph A2A Agents - Stateful Multi-Agent Workflows",
          description: "Comprehensive guide to LangGraph agents implementing the Agent-to-Agent protocol for stateful multi-agent workflows and complex agent graphs.",
          keywords: "LangGraph, A2A protocol, stateful workflows, multi-agent, LangChain",
          category: "AI Framework",
          url: "https://a2acatalog.com/frameworks/langgraph"
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-900 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              LangGraph A2A Agents
              <span className="block text-green-300">Stateful Multi-Agent Workflows</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Build sophisticated stateful multi-agent workflows with LangGraph implementing the Agent-to-Agent protocol for complex decision-making processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-green-900 hover:bg-gray-100">
                <Link to="/agents?search=LangGraph">Browse LangGraph Agents</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-900 bg-transparent">
                <a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noopener noreferrer">
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
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose LangGraph for A2A?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Workflow className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Stateful Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Create complex stateful workflows where agents maintain context and state across interactions using A2A protocol.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <GitBranch className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Agent Graphs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Design sophisticated agent interaction patterns with graph-based architectures supporting A2A interoperability.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Bot className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Conditional Logic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Implement complex conditional logic and decision trees in your multi-agent systems with full A2A compliance.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Use Cases */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular LangGraph A2A Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Complex decision-making workflows",
              "Multi-step research processes",
              "Conditional workflow automation",
              "Stateful conversation management",
              "Process orchestration systems",
              "Advanced reasoning pipelines"
            ].map((useCase, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <ArrowRight className="w-5 h-5 text-green-600 mr-3" />
                    <span className="font-medium">{useCase}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build with LangGraph?</h2>
          <p className="text-xl text-green-100 mb-8">
            Explore our catalog of LangGraph agents or contribute your own A2A-compliant workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Link to="/agents?search=LangGraph">View LangGraph Agents</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent">
              <Link to="/submit">Submit Your Agent</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LangGraph;
