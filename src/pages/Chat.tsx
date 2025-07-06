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
import { Send, Upload, FileText, X, User, Bot } from 'lucide-react';
import { toast } from 'sonner';

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
        // Simulate agent response
        setTimeout(() => {
          const agentResponse: ChatMessage = {
            id: `agent-${Date.now()}`,
            content: "Thanks for your request! Our agent team has received your task and will review it shortly. We may have some follow-up questions to better understand your requirements. Is there any additional context or specific requirements you'd like to share?",
            sender: 'agent',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, agentResponse]);
          setShowThinking(false);
        }, 2000);
      }, 1000);
      
    } catch (error) {
      console.error('Error loading work request:', error);
      toast.error('Failed to load your request');
    } finally {
      setIsLoading(false);
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

      setMessages(prev => [...prev, message]);
      setNewMessage('');
      setFiles([]);
      
      // Show thinking state
      setShowThinking(true);
      
      // Simulate agent response delay
      setTimeout(() => {
        const agentResponse: ChatMessage = {
          id: `agent-${Date.now()}`,
          content: "Thank you for the additional information. Our team is reviewing your request and will get back to you shortly with next steps.",
          sender: 'agent',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentResponse]);
        setShowThinking(false);
      }, 1500);
      
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <SEO 
        title="Chat - A2A Catalog"
        description="Chat with our agent team about your request"
        url="https://a2acatalog.com/chat"
      />
      
      <Navbar />
      
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl min-h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Agent Team Chat</h1>
                <p className="text-sm text-gray-500">We're here to help with your request</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-3 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    {message.files && message.files.length > 0 && (
                      <div className="mt-2 space-y-1">
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
                <div className="flex space-x-3 max-w-xs lg:max-w-md">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-6">
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="relative">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full min-h-[60px] pr-24 resize-none"
                  disabled={isSending}
                />
                
                <div className="absolute bottom-3 right-3 flex space-x-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 w-8 p-0"
                    disabled={isSending}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    type="submit"
                    size="sm"
                    className="h-8 w-8 p-0"
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
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024 / 1024).toFixed(1)} MB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0"
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
    </div>
  );
};

export default Chat;