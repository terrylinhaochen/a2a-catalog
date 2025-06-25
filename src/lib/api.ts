import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  connectedServers: string[];
}

export interface ChatResponse {
  message: string;
  mcpServers: Array<{
    id: string;
    name: string;
    provider: string;
    description: string;
  }>;
}

export const sendMcpChatMessage = async (request: ChatRequest): Promise<ChatResponse> => {
  const { data, error } = await supabase.functions.invoke('mcp-chat', {
    body: request
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}; 