import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Square, 
  Send, 
  Trash2, 
  Download, 
  Upload,
  Settings,
  Zap,
  MessageSquare,
  Wrench,
  Server
} from 'lucide-react';
import { toast } from 'sonner';

interface McpServer {
  id: string;
  name: string;
  url: string;
  status: 'connected' | 'disconnected' | 'error';
  capabilities?: string[];
}

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface Tool {
  name: string;
  description: string;
  inputSchema: any;
}

const McpClient = () => {
  const [servers, setServers] = useState<McpServer[]>([
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
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'MCP Client initialized. Connected to 2 servers.',
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [availableTools, setAvailableTools] = useState<Tool[]>([
    {
      name: 'list_files',
      description: 'List files in a directory',
      inputSchema: { type: 'object', properties: { path: { type: 'string' } } }
    },
    {
      name: 'read_file',
      description: 'Read contents of a file',
      inputSchema: { type: 'object', properties: { path: { type: 'string' } } }
    },
    {
      name: 'create_repository',
      description: 'Create a new GitHub repository',
      inputSchema: { type: 'object', properties: { name: { type: 'string' }, description: { type: 'string' } } }
    }
  ]);
  
  const [isRunning, setIsRunning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectServer = (serverUrl: string) => {
    const newServer: McpServer = {
      id: Date.now().toString(),
      name: `Server ${servers.length + 1}`,
      url: serverUrl,
      status: 'connected',
      capabilities: ['tools']
    };
    
    setServers([...servers, newServer]);
    addMessage('system', `Connected to server: ${serverUrl}`);
    toast.success('Server connected successfully');
  };

  const disconnectServer = (serverId: string) => {
    setServers(servers.filter(s => s.id !== serverId));
    addMessage('system', `Server disconnected`);
    toast.info('Server disconnected');
  };

  const addMessage = (type: 'user' | 'assistant' | 'system', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    addMessage('user', inputMessage);
    setIsRunning(true);
    
    // Simulate MCP processing
    setTimeout(() => {
      addMessage('assistant', `Processing: "${inputMessage}" - This would be handled by the connected MCP servers.`);
      setIsRunning(false);
    }, 1000);
    
    setInputMessage('');
  };

  const clearMessages = () => {
    setMessages([{
      id: '1',
      type: 'system',
      content: 'MCP Client cleared. Ready for new session.',
      timestamp: new Date()
    }]);
  };

  const executeTool = (toolName: string) => {
    addMessage('system', `Executing tool: ${toolName}`);
    setIsRunning(true);
    
    setTimeout(() => {
      addMessage('assistant', `Tool "${toolName}" executed successfully. Results would appear here.`);
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Servers Panel */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            MCP Servers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {servers.map((server) => (
              <div key={server.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      server.status === 'connected' ? 'bg-green-500' : 
                      server.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
                    }`} />
                    <span className="font-medium">{server.name}</span>
                  </div>
                  <p className="text-sm text-gray-500">{server.url}</p>
                  <div className="flex gap-1 mt-1">
                    {server.capabilities?.map((cap) => (
                      <Badge key={cap} variant="secondary" className="text-xs">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => disconnectServer(server.id)}
                >
                  <Square className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="font-medium">Available Tools</h4>
            <div className="space-y-1">
              {availableTools.map((tool) => (
                <Button
                  key={tool.name}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => executeTool(tool.name)}
                >
                  <Wrench className="w-4 h-4 mr-2" />
                  {tool.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="lg:col-span-2 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              MCP Chat Interface
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={clearMessages}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 mb-4 border rounded-lg p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : message.type === 'system'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-gray-200 text-gray-800'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isRunning && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full" />
                      <span className="text-sm">Processing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Send a message to MCP servers..."
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              disabled={isRunning}
            />
            <Button onClick={sendMessage} disabled={isRunning || !inputMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default McpClient;
