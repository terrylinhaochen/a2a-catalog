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
  try {
    console.log('Sending MCP chat request:', {
      messageCount: request.messages.length,
      connectedServers: request.connectedServers.length
    });

    const { data, error } = await supabase.functions.invoke('mcp-chat', {
      body: request
    });

    console.log('Supabase function response:', { data, error });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Function error: ${error.message}`);
    }

    if (!data) {
      throw new Error('No response data received from function');
    }

    if (data.error) {
      console.error('Function returned error:', data.error);
      throw new Error(data.error);
    }

    if (!data.message) {
      throw new Error('No message in response data');
    }

    return data;
  } catch (error) {
    console.error('Error in sendMcpChatMessage:', error);
    
    // Provide more specific error messages
    if (error.message?.includes('Function error')) {
      throw new Error('Server function error. Please check if the MCP chat function is deployed.');
    }
    
    if (error.message?.includes('fetch')) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw error;
  }
}; 