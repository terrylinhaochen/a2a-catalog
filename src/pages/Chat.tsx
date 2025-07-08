import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Send, FileText, X, User, Bot, Plus, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { sendMcpChatMessage, ChatMessage as ApiChatMessage } from '@/lib/api';

interface WorkRequest {
  id: string;
  description: string;
  user_email: string;
  file_urls: string[];
  service_source: string;
  created_at: string;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  files?: string[];
}

interface ChatLog {
  id: string;
  user_id: string;
  session_id: string;
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  metadata: {
    work_request_id?: string;
    service_source?: string;
    model_used: string;
    tokens_used?: number;
  };
  created_at: string;
  updated_at: string;
}

const Chat = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [workRequest, setWorkRequest] = useState<WorkRequest | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const [sessionId, setSessionId] = useState<string>(`chat_${Date.now()}`);
  const [isGettingResponse, setIsGettingResponse] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const requestId = searchParams.get('request_id');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (requestId) {
      loadWorkRequest();
    } else {
      setIsLoading(false);
    }
  }, [user, requestId, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadWorkRequest = async () => {
    if (!requestId) return;

    try {
      const { data, error } = await supabase
        .from('work_requests')
        .select('*')
        .eq('id', requestId)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      setWorkRequest(data);
      
      // Add the original request as the first message
      const initialMessage: ChatMessage = {
        id: 'initial',
        content: data.description,
        sender: 'user',
        timestamp: new Date(data.created_at),
        files: data.file_urls || []
      };
      
      setMessages([initialMessage]);
      
      // Show thinking state after loading the request
      setTimeout(() => {
        setShowThinking(true);
        // Get AI response
        getAIResponse([initialMessage], data.service_source);
      }, 1000);
      
    } catch (error) {
      console.error('Error loading work request:', error);
      toast.error('Failed to load your request');
    } finally {
      setIsLoading(false);
    }
  };

  const getAIResponse = async (currentMessages: ChatMessage[], serviceSource?: string) => {
    if (isGettingResponse) {
      console.log('Already getting response, skipping...');
      return;
    }
    
    setIsGettingResponse(true);
    
    try {
      console.log('Getting AI response for', currentMessages.length, 'messages');
      
      // Convert messages to API format
      const apiMessages: ApiChatMessage[] = currentMessages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant' as const,
        content: msg.content
      }));

      // Call the MCP chat API
      const response = await sendMcpChatMessage({
        messages: apiMessages,
        connectedServers: [],
        sessionId: sessionId
      });

      console.log('Received AI response:', response.message.substring(0, 100) + '...');

      const agentResponse: ChatMessage = {
        id: `agent-${Date.now()}`,
        content: response.message,
        sender: 'agent',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentResponse]);

      // Update session ID if provided
      if (response.sessionId) {
        setSessionId(response.sessionId);
      }
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback response
      const fallbackResponse: ChatMessage = {
        id: `agent-${Date.now()}`,
        content: "Thanks for your request! Our agent team has received your task and will review it shortly. We may have some follow-up questions to better understand your requirements. Is there any additional context or specific requirements you'd like to share?",
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setShowThinking(false);
      setIsGettingResponse(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (): Promise<string[]> => {
    if (files.length === 0) return [];

    const uploadPromises = files.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('work-requests')
        .upload(fileName, file);

      if (error) throw error;
      return fileName;
    });

    return Promise.all(uploadPromises);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() && files.length === 0) return;
    if (isSending || isGettingResponse) return; // Prevent multiple submissions

    console.log('Sending message:', newMessage.substring(0, 50) + '...');
    setIsSending(true);
    
    try {
      let fileUrls: string[] = [];
      if (files.length > 0) {
        fileUrls = await uploadFiles();
      }

      const message: ChatMessage = {
        id: `user-${Date.now()}`,
        content: newMessage.trim(),
        sender: 'user',
        timestamp: new Date(),
        files: fileUrls
      };

      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      setNewMessage('');
      setFiles([]);
      
      // Show thinking state
      setShowThinking(true);
      
      // Get AI response
      await getAIResponse(updatedMessages, workRequest?.service_source);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your conversation...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      <SEO 
        title="Chat - A2A Catalog"
        description="Chat with our agent team about your request"
        url="https://a2acatalog.com/chat"
      />
      
      <Navbar />
      
      {/* Two Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Chat */}
        <div className="w-1/2 flex flex-col p-6">
          {/* Chat Container with Glassmorphism */}
          <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl flex flex-col min-h-0">
            {/* Chat Header */}
            <div className="border-b border-white/20 p-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-white">AI Project Assistant</h1>
                    <p className="text-sm text-white/70">Ready to help define your project requirements</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
                  onClick={() => {
                    setMessages([]);
                    setNewMessage('');
                    setFiles([]);
                    setSessionId(`chat_${Date.now()}`);
                    setShowThinking(false);
                    setIsSending(false);
                    setIsGettingResponse(false);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Chat
                </Button>
              </div>
            </div>

            {/* Messages - Fixed height with scroll */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 max-h-[calc(100vh-300px)]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white/10 text-white/90'
                    }`}>
                      {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-white text-gray-900'
                        : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      {message.files && message.files.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {message.files.map((file, index) => (
                            <div key={index} className="flex items-center space-x-2 text-xs opacity-75">
                              <FileText className="w-3 h-3" />
                              <span>{file.split('/').pop()}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Thinking indicator */}
              {showThinking && (
                <div className="flex justify-start">
                  <div className="flex space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white/90" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input - Fixed at bottom */}
            <div className="border-t border-white/20 p-4 flex-shrink-0">
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="Describe your project requirements..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full min-h-[80px] bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/50 pl-16 pr-24 resize-none rounded-xl"
                    disabled={isSending}
                  />
                  
                  <div className="absolute bottom-3 left-3">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-8 w-8 p-0 hover:bg-white/20 text-white/70 hover:text-white"
                      disabled={isSending}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-3 right-3">
                    <Button
                      type="submit"
                      size="sm"
                      className="h-8 px-4 bg-white text-gray-900 hover:bg-white/90 text-sm font-medium"
                      disabled={isSending || (!newMessage.trim() && files.length === 0)}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                  />
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-white/70" />
                          <span className="text-sm text-white">{file.name}</span>
                          <span className="text-xs text-white/50">
                            ({(file.size / 1024 / 1024).toFixed(1)} MB)
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-6 w-6 p-0 hover:bg-white/20 text-white/70 hover:text-white"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Right Panel - Artifacts */}
        <div className="w-1/2 flex flex-col p-6 pl-3">
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl flex flex-col min-h-0">
            <div className="border-b border-white/10 p-6 flex-shrink-0">
              <h2 className="text-xl font-semibold text-white">Project Requirements</h2>
              <p className="text-sm text-white/70">Your project details and deliverables will appear here</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center min-h-0">
              <div className="text-center text-white/50">
                <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Bot className="w-10 h-10 text-white/50" />
                </div>
                <p className="text-sm">Project requirements and deliverables<br />will be generated as we discuss your needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;