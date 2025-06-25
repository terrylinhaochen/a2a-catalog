
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

    // Prepare system prompt based on connected MCP servers
    const systemPrompt = `You are an MCP (Model Context Protocol) assistant helping users interact with connected servers. 

Connected MCP servers: ${connectedServers.join(', ')}

Available capabilities:
- File system operations (read_file, list_files, write_file)
- GitHub operations (create_repository, list_repositories, manage_issues)
- Web search and content retrieval
- Database queries and management

When users ask for actions, explain what you would do with the available MCP servers and simulate realistic responses. Be helpful and specific about which servers and tools you would use.`;

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    // Call OpenAI API
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

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

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
