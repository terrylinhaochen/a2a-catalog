
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, Workflow, Bot } from 'lucide-react';

const LangGraph = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="LangGraph A2A Agents - Stateful Multi-Agent Workflows & Agent-to-Agent Protocol"
        description="Explore LangGraph A2A sample patterns for stateful workflows, durable task state, human review, and agent-to-agent interoperability."
        keywords="LangGraph, LangGraph agents, A2A protocol, stateful workflows, multi-agent workflows, LangChain, Agent-to-Agent, workflow automation, agent graphs"
        url="https://a2acatalog.com/frameworks/langgraph"
      />
      
      <StructuredData 
        type="article"
        data={{
          title: "LangGraph A2A Agents - Stateful Multi-Agent Workflows",
          description: "Guide to LangGraph sample patterns for A2A stateful workflows and task graphs.",
          keywords: "LangGraph, A2A protocol, stateful workflows, multi-agent, LangChain",
          category: "AI Framework",
          url: "https://a2acatalog.com/frameworks/langgraph"
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-950">
              LangGraph A2A Agents
              <span className="block text-gray-600">Stateful Multi-Agent Workflows</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore sample-adapter patterns for exposing stateful LangGraph workflows through Agent2Agent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gray-950 hover:bg-gray-800">
                <Link to="/agents?search=LangGraph">Browse LangGraph Agents</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
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
                <Workflow className="w-12 h-12 text-gray-700 mb-4" />
                <CardTitle>Stateful Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Create task graphs that keep durable state, checkpoint progress, and make long-running A2A tasks easier to resume.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <GitBranch className="w-12 h-12 text-gray-700 mb-4" />
                <CardTitle>Agent Graphs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Design graph-based agent interaction patterns that can be wrapped behind Agent Cards and task endpoints.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Bot className="w-12 h-12 text-gray-700 mb-4" />
                <CardTitle>Conditional Logic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Implement conditional logic and human checkpoints while keeping A2A-facing state explicit.</p>
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build with LangGraph?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Explore LangGraph catalog entries and task patterns for stateful agent systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-gray-950 hover:bg-gray-100">
              <Link to="/agents?search=LangGraph">View LangGraph Agents</Link>
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

export default LangGraph;
