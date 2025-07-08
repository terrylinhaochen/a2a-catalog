import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Server, Loader2, ExternalLink, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { sendMcpChatMessage, ChatMessage as ApiChatMessage } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

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

interface McpClientProps {
  servers: ConnectedMcpServer[];
  onServerDisconnect: (serverId: string) => void;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const McpClient: React.FC<McpClientProps> = ({ servers, onServerDisconnect }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: `Welcome to the AI Project Assistant! I'm here to help you define clear project deliverables and requirements. I'll ask you some questions to understand your needs better and then provide you with a detailed proposal within 2 business days.`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(`session_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    if (!user) {
      toast.error('Please sign in to use the chat feature');
      return;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Get connected server IDs
      const connectedServerIds = servers.map(server => server.id);

      // Convert messages to API format
      const apiMessages: ApiChatMessage[] = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await sendMcpChatMessage({
        messages: apiMessages,
        connectedServers: connectedServerIds,
        sessionId: sessionId
      });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Update session ID if provided
      if (response.sessionId) {
        setSessionId(response.sessionId);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Show more specific error messages
      let errorMessage = 'Sorry, I encountered an error while processing your request. Please try again.';
      
      if (error.message) {
        if (error.message.includes('Function error')) {
          errorMessage = 'Server function error. Please check if the MCP chat function is deployed.';
        } else if (error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection.';
        } else if (error.message.includes('OpenAI API')) {
          errorMessage = 'AI service error. Please try again later.';
        } else if (error.message.includes('not authenticated')) {
          errorMessage = 'Please sign in to use the chat feature.';
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      toast.error(errorMessage);
      
      const errorChatMessage: ChatMessage = {
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorChatMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!user) {
    return (
      <div className="flex flex-col h-[600px] max-h-[600px] space-y-4">
        <Card className="flex-shrink-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Upload className="w-5 h-5" />
              AI Project Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-sm">
              Please sign in to start a conversation with our AI assistant and get help with your project requirements.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[600px] space-y-4">
      {/* Connected Servers Status */}
      <Card className="flex-shrink-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Upload className="w-5 h-5" />
            AI Project Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          {servers.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No MCP servers connected. Connect servers in the Servers tab to enhance the AI assistant's capabilities.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {servers.map((server) => (
                <div key={server.id} className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-800">{server.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {server.provider}
                  </Badge>
                  <div className="text-xs text-gray-500 max-w-48 truncate">
                    {server.url}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onServerDisconnect(server.id)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="pb-3 flex-shrink-0">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Project Requirements Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          {/* Messages Area */}
          <div className="flex-1 px-4 min-h-0">
            <ScrollArea className="h-full">
              <div className="space-y-4 py-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : message.role === 'system'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-gray-50 text-gray-900'
                      }`}
                    >
                      <div className="whitespace-pre-wrap break-words">{message.content}</div>
                      <div className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTimestamp(message.timestamp)}
                      </div>
                    </div>

                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="bg-gray-50 rounded-lg px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-gray-500">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>

          {/* Input Area */}
          <div className="border-t p-4 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your project requirements..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                size="icon"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default McpClient;
