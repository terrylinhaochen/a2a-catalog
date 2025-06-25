
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Server, Zap, Lock, Globe } from 'lucide-react';
import { toast } from 'sonner';

interface ServerConnectionProps {
  onConnect: (serverUrl: string) => void;
}

const ServerConnection: React.FC<ServerConnectionProps> = ({ onConnect }) => {
  const [serverUrl, setServerUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const predefinedServers = [
    {
      name: 'GitHub',
      url: 'https://api.githubcopilot.com/mcp/',
      description: 'GitHub\'s official MCP Server',
      authType: 'oauth',
      category: 'Development'
    },
    {
      name: 'Sentry',
      url: 'https://mcp.sentry.dev/sse',
      description: 'Developer-first error tracking and performance monitoring platform',
      authType: 'oauth',
      category: 'Monitoring'
    },
    {
      name: 'Linear',
      url: 'https://mcp.linear.app/sse',
      description: 'Linear is a project management tool',
      authType: 'oauth',
      category: 'Project Management'
    },
    {
      name: 'DeepWiki',
      url: 'https://mcp.deepwiki.com/mcp',
      description: 'Automatically generates architecture diagrams and documentation',
      authType: 'open',
      category: 'Documentation'
    },
    {
      name: 'Intercom',
      url: 'https://mcp.intercom.com/sse',
      description: 'Customer support platform',
      authType: 'oauth',
      category: 'Customer Support'
    },
    {
      name: 'Neon',
      url: 'https://mcp.neon.tech/sse',
      description: 'Fully managed serverless PostgreSQL',
      authType: 'oauth',
      category: 'Database'
    },
    {
      name: 'PayPal',
      url: 'https://mcp.paypal.com/sse',
      description: 'Global online payment system',
      authType: 'oauth',
      category: 'Payments'
    },
    {
      name: 'Square',
      url: 'https://mcp.squareup.com/sse',
      description: 'Payment processing platform',
      authType: 'oauth',
      category: 'Payments'
    },
    {
      name: 'CoinGecko',
      url: 'https://mcp.api.coingecko.com/sse',
      description: 'Cryptocurrency data platform',
      authType: 'open',
      category: 'Cryptocurrency'
    },
    {
      name: 'Asana',
      url: 'https://mcp.asana.com/sse',
      description: 'Project management tool',
      authType: 'oauth',
      category: 'Project Management'
    },
    {
      name: 'Globalping',
      url: 'https://mcp.globalping.dev/sse',
      description: 'Remote MCP server for network commands with Globalping',
      authType: 'oauth',
      category: 'Networking'
    },
    {
      name: 'Semgrep',
      url: 'https://mcp.semgrep.ai/sse',
      description: 'Static analysis tool for code security and quality',
      authType: 'open',
      category: 'Security'
    },
    {
      name: 'Fetch',
      url: 'https://remote.mcpservers.org/fetch/mcp',
      description: 'Web content fetching capabilities, converts HTML to markdown',
      authType: 'open',
      category: 'Web Scraping'
    },
    {
      name: 'Sequential Thinking',
      url: 'https://remote.mcpservers.org/sequentialthinking/mcp',
      description: 'Dynamic and reflective problem-solving through structured thinking',
      authType: 'open',
      category: 'AI Tools'
    },
    {
      name: 'EdgeOne Pages',
      url: 'https://remote.mcpservers.org/edgeone-pages/mcp',
      description: 'Deploy HTML content to EdgeOne Pages and get public URLs',
      authType: 'open',
      category: 'Deployment'
    }
  ];

  const handleConnect = async (url: string) => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      onConnect(url);
      setServerUrl('');
      setIsConnecting(false);
      toast.success('Server connected successfully');
    }, 1000);
  };

  const handleCustomConnect = () => {
    if (!serverUrl.trim()) {
      toast.error('Please enter a server URL');
      return;
    }
    handleConnect(serverUrl);
  };

  const getAuthIcon = (authType: string) => {
    return authType === 'oauth' ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />;
  };

  const getAuthBadgeVariant = (authType: string) => {
    return authType === 'oauth' ? 'default' : 'secondary';
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
            <Server className="w-5 h-5" />
            Available MCP Servers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="grid gap-3">
              {predefinedServers.map((server) => (
                <div key={server.url} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{server.name}</h4>
                      <Badge variant={getAuthBadgeVariant(server.authType)} className="text-xs">
                        {getAuthIcon(server.authType)}
                        <span className="ml-1">{server.authType}</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {server.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{server.description}</p>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {server.url}
                    </code>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleConnect(server.url)}
                    disabled={isConnecting}
                    className="ml-3"
                  >
                    Connect
                  </Button>
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
