import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Server, Zap, Lock, Globe, Check, X, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { McpServer } from '@/hooks/useMcpServers';

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

interface ServerConnectionProps {
  availableServers: McpServer[];
  connectedServers: ConnectedMcpServer[];
  onConnect: (serverId: string) => void;
  onDisconnect: (serverId: string) => void;
}

const ServerConnection: React.FC<ServerConnectionProps> = ({ 
  availableServers, 
  connectedServers, 
  onConnect, 
  onDisconnect 
}) => {
  const [serverUrl, setServerUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  // Filter to show only remote servers for the client
  const remoteServers = availableServers.filter(server => server.server_type === 'remote');

  const handleConnect = async (serverId: string) => {
    setIsConnecting(true);
    
    try {
      const server = availableServers.find(s => s.id === serverId);
      if (!server) {
        throw new Error('Server not found');
      }

      // Check if already connected
      if (connectedServers.find(s => s.id === serverId)) {
        toast.error(`${server.name} is already connected`);
        return;
      }

      // Test the remote MCP server connection
      if (server.connection_url) {
        try {
          const response = await fetch(server.connection_url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          });

          if (response.ok) {
            onConnect(serverId);
            toast.success(`Connected to ${server.name} successfully`);
          } else {
            throw new Error(`Server responded with status: ${response.status}`);
          }
        } catch (error) {
          console.warn(`Connection test failed for ${server.name}:`, error);
          // Still allow connection even if test fails (some servers might not respond to GET)
          onConnect(serverId);
          toast.success(`Connected to ${server.name} (connection test inconclusive)`);
        }
      } else {
        // No connection URL, just connect
        onConnect(serverId);
        toast.success(`Connected to ${server.name} successfully`);
      }
    } catch (error) {
      console.error('Connection error:', error);
      toast.error(`Failed to connect: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCustomConnect = () => {
    if (!serverUrl.trim()) {
      toast.error('Please enter a server URL');
      return;
    }
    toast.info('Custom server connection not implemented yet');
  };

  const getAuthIcon = (authType?: string) => {
    return authType === 'oauth' ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />;
  };

  const getAuthBadgeVariant = (authType?: string) => {
    return authType === 'oauth' ? 'default' : 'secondary';
  };

  const getAuthLabel = (authType?: string) => {
    return authType === 'oauth' ? 'OAuth' : 'Open';
  };

  const isConnected = (serverId: string) => {
    return connectedServers.some(s => s.id === serverId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Connect to Remote MCP Server
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serverUrl">Custom MCP Server URL</Label>
            <div className="flex gap-2">
              <Input
                id="serverUrl"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                placeholder="https://your-mcp-server.com/mcp"
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
            <ExternalLink className="w-5 h-5" />
            Available Remote MCP Servers ({remoteServers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="grid gap-3">
              {remoteServers.map((server) => (
                <div key={server.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{server.name}</h4>
                      {server.is_verified && (
                        <Badge variant="default" className="text-xs">
                          Verified
                        </Badge>
                      )}
                      <Badge variant={getAuthBadgeVariant(server.auth_type)} className="text-xs">
                        {getAuthIcon(server.auth_type)}
                        <span className="ml-1">{getAuthLabel(server.auth_type)}</span>
                      </Badge>
                      {server.categories?.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{server.description}</p>
                    <div className="flex gap-1 mb-2">
                      {server.skills?.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>⭐ {server.stars || 0}</span>
                      <span>🔀 {server.forks || 0}</span>
                      <span>👍 {server.votes || 0}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <code className="bg-gray-100 px-2 py-1 rounded">
                        {server.connection_url}
                      </code>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-3">
                    {isConnected(server.id) ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDisconnect(server.id)}
                        className="text-green-600 border-green-600"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleConnect(server.id)}
                        disabled={isConnecting}
                      >
                        {isConnecting ? (
                          <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          <Zap className="w-3 h-3 mr-1" />
                        )}
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerConnection;
