
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Server, 
  MessageSquare, 
  Wrench, 
  Settings,
  BarChart3,
  Clock,
  CheckCircle
} from 'lucide-react';
import McpClient from './McpClient';
import ServerConnection from './ServerConnection';

const McpDashboard = () => {
  const [connectedServers, setConnectedServers] = useState(2);
  const [activeConnections, setActiveConnections] = useState(5);
  const [messagesProcessed, setMessagesProcessed] = useState(1247);
  const [toolsExecuted, setToolsExecuted] = useState(89);

  const handleServerConnect = (serverUrl: string) => {
    setConnectedServers(prev => prev + 1);
    setActiveConnections(prev => prev + 1);
  };

  const stats = [
    {
      title: 'Connected Servers',
      value: connectedServers,
      icon: Server,
      color: 'text-blue-600'
    },
    {
      title: 'Active Connections',
      value: activeConnections,
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'Messages Processed',
      value: messagesProcessed,
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      title: 'Tools Executed',
      value: toolsExecuted,
      icon: Wrench,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Interface */}
      <Tabs defaultValue="client" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="client" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Client
          </TabsTrigger>
          <TabsTrigger value="servers" className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            Servers
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="client">
          <div className="h-[calc(100vh-320px)]">
            <McpClient />
          </div>
        </TabsContent>

        <TabsContent value="servers">
          <ServerConnection onConnect={handleServerConnect} />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                MCP Client Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-reconnect</h4>
                    <p className="text-sm text-gray-500">Automatically reconnect to servers on disconnect</p>
                  </div>
                  <Badge variant="outline">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Enabled
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Logging Level</h4>
                    <p className="text-sm text-gray-500">Control the verbosity of client logs</p>
                  </div>
                  <Badge variant="secondary">INFO</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Connection Timeout</h4>
                    <p className="text-sm text-gray-500">Timeout for server connections</p>
                  </div>
                  <Badge variant="outline">30s</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Message History</h4>
                    <p className="text-sm text-gray-500">Number of messages to keep in memory</p>
                  </div>
                  <Badge variant="outline">1000</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default McpDashboard;
