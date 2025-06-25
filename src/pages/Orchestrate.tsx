
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import McpDashboard from '@/components/mcp/McpDashboard';

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
        {/* MCP Dashboard */}
        <McpDashboard />
      </div>

      <Footer />
    </div>
  );
};

export default Orchestrate;
