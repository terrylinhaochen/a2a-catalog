import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  X, 
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
import { supabase } from '@/integrations/supabase/client';

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

interface McpClientProps {
  servers: McpServer[];
  onServerDisconnect: (serverId: string) => void;
}

const McpClient: React.FC<McpClientProps> = ({ servers, onServerDisconnect }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'MCP Client initialized. Connected to servers with AI integration enabled.',
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
    },
    {
      name: 'search_repositories',
      description: 'Search GitHub repositories',
      inputSchema: { type: 'object', properties: { query: { type: 'string' } } }
    },
    {
      name: 'fetch_web_content',
      description: 'Fetch and convert web content to markdown',
      inputSchema: { type: 'object', properties: { url: { type: 'string' } } }
    }
  ]);
  
  const [isRunning, setIsRunning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatScrollAreaRef = useRef<HTMLDivElement>(null);
  const previousMessageCountRef = useRef(messages.length);

  const scrollToBottom = () => {
    if (chatScrollAreaRef.current) {
      const scrollContainer = chatScrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    // Only scroll to bottom if a new message was actually added
    if (messages.length > previousMessageCountRef.current) {
      setTimeout(scrollToBottom, 100); // Small delay to ensure DOM is updated
    }
    previousMessageCountRef.current = messages.length;
  }, [messages]);

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
    
    try {
      const connectedServers = servers
        .filter(s => s.status === 'connected')
        .map(s => s.url);

      const chatHistory = messages.map(m => ({
        role: m.type === 'user' ? 'user' : 'assistant',
        content: m.content
      }));

      console.log('Sending message to MCP chat function:', {
        message: inputMessage,
        connectedServers: connectedServers.length,
        chatHistoryLength: chatHistory.length
      });

      const { data, error } = await supabase.functions.invoke('mcp-chat', {
        body: {
          message: inputMessage,
          connectedServers,
          chatHistory
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (data.error) {
        console.error('MCP chat error:', data);
        addMessage('system', `Error: ${data.error}`);
        
        // Show specific error messages
        if (data.status === 429) {
          toast.error('Rate limit exceeded. Please wait and try again.');
        } else if (data.details?.includes('API key')) {
          toast.error('API key issue. Please check your OpenAI configuration.');
        } else {
          toast.error(data.error);
        }
        return;
      }

      addMessage('assistant', data.response);
      toast.success('Message processed successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorMessage = 'Error: Failed to process message. Please try again.';
      
      if (error.message?.includes('FunctionsHttpError')) {
        errorMessage = 'Error: Server is experiencing issues. Please try again in a moment.';
      } else if (error.message?.includes('Too Many Requests')) {
        errorMessage = 'Error: Too many requests. Please wait a moment before trying again.';
      }
      
      addMessage('system', errorMessage);
      toast.error('Failed to send message');
    } finally {
      setIsRunning(false);
    }
    
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

  const executeTool = async (toolName: string) => {
    addMessage('system', `Executing tool: ${toolName}`);
    setIsRunning(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('mcp-tool-execution', {
        body: {
          toolName,
          parameters: {},
          serverUrl: servers[0]?.url
        }
      });

      if (error) throw error;

      if (data.success) {
        addMessage('assistant', `Tool "${toolName}" executed successfully:\n\n${JSON.stringify(data.result, null, 2)}`);
        toast.success(`Tool ${toolName} executed successfully`);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error executing tool:', error);
      addMessage('system', `Error executing tool "${toolName}": ${error.message}`);
      toast.error(`Failed to execute tool ${toolName}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
      {/* Servers Panel */}
      <Card className="lg:col-span-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Server className="w-5 h-5" />
            Connected Servers ({servers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-4">
          <ScrollArea className="flex-1">
            <div className="space-y-2">
              {servers.map((server) => (
                <div key={server.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        server.status === 'connected' ? 'bg-green-500' : 
                        server.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
                      }`} />
                      <span className="font-medium text-sm">{server.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">{server.url}</p>
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
                    onClick={() => onServerDisconnect(server.id)}
                    title="Disconnect server"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Available Tools</h4>
            <ScrollArea className="h-48">
              <div className="space-y-1">
                {availableTools.map((tool) => (
                  <Button
                    key={tool.name}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs"
                    onClick={() => executeTool(tool.name)}
                    disabled={isRunning}
                  >
                    <Wrench className="w-3 h-3 mr-2" />
                    {tool.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="lg:col-span-2 flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="w-5 h-5" />
              MCP Chat Interface
              <Badge variant="outline" className="ml-2">
                <Zap className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
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
        
        <CardContent className="flex-1 flex flex-col p-4 min-h-0">
          <ScrollArea ref={chatScrollAreaRef} className="flex-1 mb-4 border rounded-lg p-4 h-[400px]">
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
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
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
          
          <div className="flex gap-2 items-end">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Send a message to MCP servers..."
              onKeyDown={handleKeyPress}
              disabled={isRunning}
              className="flex-1 min-h-[60px] max-h-[120px] resize-none"
              rows={2}
            />
            <Button 
              onClick={sendMessage} 
              disabled={isRunning || !inputMessage.trim()}
              className="h-[60px] px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default McpClient;
