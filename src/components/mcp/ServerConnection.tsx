
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Server, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface ServerConnectionProps {
  onConnect: (serverUrl: string) => void;
}

const ServerConnection: React.FC<ServerConnectionProps> = ({ onConnect }) => {
  const [serverUrl, setServerUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const predefinedServers = [
    {
      name: 'GitHub MCP Server',
      url: 'mcp://github',
      description: 'Access GitHub repositories, issues, and pull requests'
    },
    {
      name: 'File System MCP',
      url: 'mcp://filesystem',
      description: 'Read and write local files'
    },
    {
      name: 'Web Search MCP',
      url: 'mcp://web-search',
      description: 'Search the web and retrieve content'
    },
    {
      name: 'Database MCP',
      url: 'mcp://database',
      description: 'Query and manage databases'
    }
  ];

  const handleConnect = async (url: string) => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      onConnect(url);
      setServerUrl('');
      setIsConnecting(false);
    }, 1000);
  };

  const handleCustomConnect = () => {
    if (!serverUrl.trim()) {
      toast.error('Please enter a server URL');
      return;
    }
    handleConnect(serverUrl);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Connect New Server
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serverUrl">Server URL</Label>
            <div className="flex gap-2">
              <Input
                id="serverUrl"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                placeholder="mcp://your-server-url"
                disabled={isConnecting}
              />
              <Button onClick={handleCustomConnect} disabled={isConnecting || !serverUrl.trim()}>
                {isConnecting ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Zap className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            Quick Connect
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {predefinedServers.map((server) => (
              <div key={server.url} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h4 className="font-medium">{server.name}</h4>
                  <p className="text-sm text-gray-500">{server.description}</p>
                  <Badge variant="outline" className="mt-1">
                    {server.url}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleConnect(server.url)}
                  disabled={isConnecting}
                >
                  Connect
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerConnection;
