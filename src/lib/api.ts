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
  messages: Array<{
    role: string;
    content: string;
  }>;
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
      connectedServers: request.connectedServers.length,
      lastMessage: request.messages[request.messages.length - 1]?.content?.substring(0, 100)
    });

    const { data, error } = await supabase.functions.invoke('mcp-chat', {
      body: request
    });

    console.log('Supabase function response:', { 
      hasData: !!data, 
      hasError: !!error,
      dataKeys: data ? Object.keys(data) : null,
      errorMessage: error?.message 
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Function error: ${error.message}`);
    }

    if (!data) {
      console.error('No response data received from function');
      throw new Error('No response data received from function');
    }

    if (data.error) {
      console.error('Function returned error:', data.error);
      throw new Error(data.error);
    }

    if (!data.messages || !Array.isArray(data.messages)) {
      console.error('No messages array in response data:', data);
      throw new Error('No messages array in response data');
    }

    console.log('Successfully received response with message count:', data.messages.length);
    return data;
  } catch (error) {
    console.error('Error in sendMcpChatMessage:', error);
    
    // Provide more specific error messages
    if (error.message?.includes('Function error')) {
      throw new Error(`Server function error: ${error.message}`);
    }
    
    if (error.message?.includes('fetch')) {
      throw new Error(`Network error: ${error.message}`);
    }
    
    if (error.message?.includes('OpenAI API')) {
      throw new Error(`AI service error: ${error.message}`);
    }
    
    throw error;
  }
}; 