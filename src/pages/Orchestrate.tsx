
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import McpDashboard from '@/components/mcp/McpDashboard';
import { Workflow, Zap, MessageSquare } from 'lucide-react';

const Orchestrate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SEO 
        title="Orchestrate - MCP Client & Agent Workflow Management | A2A Catalog"
        description="Advanced MCP client and agent orchestration platform. Connect to MCP servers, manage workflows, and coordinate A2A-compatible agents."
        keywords="MCP client, model context protocol, agent orchestration, workflow management, A2A agents"
        url="https://a2acatalog.com/orchestrate"
      />
      
      <StructuredData 
        type="website"
        data={{
          title: "Orchestrate - MCP Client & Agent Workflow Management",
          description: "Advanced MCP client and agent orchestration platform for A2A-compatible agents.",
          keywords: "MCP client, agent orchestration, workflow management, A2A agents",
          url: "https://a2acatalog.com/orchestrate"
        }}
      />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl mb-8">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative p-8 md:p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-3">
                <Workflow className="w-12 h-12 text-white" />
                <Zap className="w-8 h-8 text-purple-300" />
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Orchestrate
              <span className="block text-purple-300">MCP Client & Agent Workflows</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
              Connect to MCP servers, execute tools, and orchestrate complex agent workflows. 
              Experience the power of the Model Context Protocol in action.
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Live MCP Client</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Workflow className="w-4 h-4 text-purple-300" />
                <span className="text-white font-medium">Workflow Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* MCP Dashboard */}
        <McpDashboard />
      </div>

      <Footer />
    </div>
  );
};

export default Orchestrate;
