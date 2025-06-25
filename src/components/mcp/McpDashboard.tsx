
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Server, 
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import McpClient from './McpClient';
import ServerConnection from './ServerConnection';

interface McpServer {
  id: string;
  name: string;
  url: string;
  status: 'connected' | 'disconnected' | 'error';
  capabilities?: string[];
}

const McpDashboard = () => {
  const { user } = useAuth();
  const [mcpServers, setMcpServers] = useState<McpServer[]>([
    {
      id: '1',
      name: 'GitHub Server',
      url: 'mcp://github',
      status: 'connected',
      capabilities: ['tools', 'resources']
    },
    {
      id: '2',
      name: 'File System',
      url: 'mcp://filesystem',
      status: 'connected',
      capabilities: ['tools', 'resources', 'prompts']
    }
  ]);

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleServerConnect = (serverUrl: string, serverName: string) => {
    const newServer: McpServer = {
      id: Date.now().toString(),
      name: serverName,
      url: serverUrl,
      status: 'connected',
      capabilities: ['tools']
    };
    
    setMcpServers(prev => [...prev, newServer]);
  };

  const handleServerDisconnect = (serverId: string) => {
    setMcpServers(prev => prev.filter(s => s.id !== serverId));
  };

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
              servers={mcpServers} 
              onServerDisconnect={handleServerDisconnect}
            />
          </div>
        </TabsContent>

        <TabsContent value="servers">
          <ServerConnection onConnect={handleServerConnect} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default McpDashboard;
