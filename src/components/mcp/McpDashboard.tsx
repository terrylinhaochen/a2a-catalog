import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Server, 
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useMcpServers, McpServer } from '@/hooks/useMcpServers';
import McpClient from './McpClient';
import ServerConnection from './ServerConnection';

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

const McpDashboard = () => {
  const { user } = useAuth();
  const { mcpServers, loading } = useMcpServers();
  const [connectedServers, setConnectedServers] = useState<ConnectedMcpServer[]>([]);

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleServerConnect = (serverId: string) => {
    const server = mcpServers.find(s => s.id === serverId);
    if (!server) return;

    // Determine the connection URL based on server type
    let connectionUrl: string;
    if (server.server_type === 'remote') {
      // Use the remote connection URL
      connectionUrl = server.connection_url || `https://mcp.${server.provider}.com/mcp`;
    } else {
      // For local servers, use localhost with the specified port
      connectionUrl = `http://localhost:${server.port || 3000}/mcp`;
    }

    const connectedServer: ConnectedMcpServer = {
      id: server.id,
      name: server.name,
      url: connectionUrl,
      status: 'connected',
      capabilities: server.categories,
      skills: server.skills,
      provider: server.provider,
      serverType: server.server_type
    };
    
    setConnectedServers(prev => [...prev, connectedServer]);
  };

  const handleServerDisconnect = (serverId: string) => {
    setConnectedServers(prev => prev.filter(s => s.id !== serverId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
        <span className="ml-2">Loading MCP servers...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Interface */}
      <Tabs defaultValue="client" className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="client" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Client
          </TabsTrigger>
          <TabsTrigger value="servers" className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            Servers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="client">
          <div className="h-full">
            <McpClient 
              servers={connectedServers} 
              onServerDisconnect={handleServerDisconnect}
            />
          </div>
        </TabsContent>

        <TabsContent value="servers">
          <ServerConnection 
            availableServers={mcpServers}
            connectedServers={connectedServers}
            onConnect={handleServerConnect}
            onDisconnect={handleServerDisconnect}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default McpDashboard;
