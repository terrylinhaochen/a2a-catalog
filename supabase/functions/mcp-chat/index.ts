import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const langsmithApiKey = Deno.env.get('LANGSMITH_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: string;
  content: string;
}

interface McpRequest {
  message: string;
  connectedServers: string[];
  chatHistory: ChatMessage[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, connectedServers, chatHistory }: McpRequest = await req.json();

    console.log('Processing MCP chat request:', { message, connectedServers: connectedServers.length });

    // Check if OpenAI API key is available
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key not configured',
        details: 'Please add your OpenAI API key to the Supabase secrets'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare system prompt based on connected MCP servers
    const systemPrompt = `You are an MCP (Model Context Protocol) assistant helping users interact with connected servers. 

Connected MCP servers: ${connectedServers.join(', ')}

Available capabilities:
- File system operations (read_file, list_files, write_file)
- GitHub operations (create_repository, list_repositories, manage_issues)
- Web search and content retrieval
- Database queries and management

When users ask for actions, use the available MCP servers and tools to perform real operations. Be helpful and specific about which servers and tools you would use, and execute actual commands when possible.`;

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    console.log('Calling OpenAI API with model: gpt-4o-mini');

    // Call OpenAI API with improved error handling
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error response:', errorText);
      
      let errorMessage = `OpenAI API error: ${response.statusText}`;
      let userFriendlyMessage = 'Failed to process your message. Please try again.';
      
      if (response.status === 429) {
        errorMessage = 'OpenAI API rate limit exceeded';
        userFriendlyMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (response.status === 401) {
        errorMessage = 'OpenAI API authentication failed';
        userFriendlyMessage = 'Invalid API key. Please check your OpenAI API key configuration.';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request to OpenAI API';
        userFriendlyMessage = 'Invalid request format. Please try rephrasing your message.';
      }

      return new Response(JSON.stringify({ 
        error: userFriendlyMessage,
        details: errorMessage,
        status: response.status
      }), {
        status: response.status === 429 ? 429 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected OpenAI API response format:', data);
      throw new Error('Unexpected response format from OpenAI API');
    }

    const assistantMessage = data.choices[0].message.content;
    console.log('Successfully processed chat request');

    // Log to LangSmith if API key is available
    if (langsmithApiKey) {
      try {
        await fetch('https://api.smith.langchain.com/runs', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${langsmithApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'mcp-chat-interaction',
            run_type: 'llm',
            inputs: { message, connectedServers },
            outputs: { response: assistantMessage },
            session_name: 'mcp-client-session',
          }),
        });
      } catch (error) {
        console.log('LangSmith logging failed:', error);
      }
    }

    return new Response(JSON.stringify({ 
      response: assistantMessage,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in mcp-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process chat message',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
