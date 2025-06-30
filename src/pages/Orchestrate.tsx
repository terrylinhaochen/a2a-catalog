
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import McpDashboard from '@/components/mcp/McpDashboard';
import McpClient from '@/components/mcp/McpClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Server, MessageSquare } from 'lucide-react';

interface ConnectedMcpServer {
  id: string;
  name: string;
  url: string;
  status: 'connected' | 'disconnected' | 'error';
  capabilities?: string[];
  skills?: string[];
  provider?: string;
  serverType?: 'local' | 'remote';
}

const Orchestrate = () => {
  const [connectedServers, setConnectedServers] = useState<ConnectedMcpServer[]>([
    {
      id: 'github-copilot',
      name: 'GitHub Copilot MCP',
      url: 'https://api.githubcopilot.com/mcp/',
      status: 'connected',
      provider: 'GitHub',
      serverType: 'remote',
      capabilities: ['code_assistance', 'repository_management'],
      skills: ['Code generation', 'Repository analysis']
    },
    {
      id: 'sentry-mcp',
      name: 'Sentry MCP',
      url: 'https://mcp.sentry.dev/sse',
      status: 'connected',
      provider: 'Sentry',
      serverType: 'remote',
      capabilities: ['error_tracking', 'performance_monitoring'],
      skills: ['Error analysis', 'Performance insights']
    }
  ]);

  const handleServerDisconnect = (serverId: string) => {
    setConnectedServers(prev => prev.filter(server => server.id !== serverId));
  };

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">MCP Orchestration Platform</h1>
          <p className="text-gray-600">Manage MCP servers and interact with connected agents through our integrated client.</p>
        </div>

        <Tabs defaultValue="client" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="client" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              MCP Client
            </TabsTrigger>
            <TabsTrigger value="servers" className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              Server Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="client">
            <McpClient 
              servers={connectedServers}
              onServerDisconnect={handleServerDisconnect}
            />
          </TabsContent>

          <TabsContent value="servers">
            <McpDashboard />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Orchestrate;
