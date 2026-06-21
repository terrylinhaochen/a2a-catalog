import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  connectedServers: string[]; // Array of connected server IDs
  sessionId?: string; // Optional session ID for chat continuity
}

interface McpServer {
  id: string;
  name: string;
  description: string;
  provider: string;
  categories?: string[];
  skills?: string[];
  connection_url?: string;
  auth_type?: string;
}

interface McpResponse {
  jsonrpc: "2.0";
  id: string;
  result?: unknown;
  error?: {
    code: number;
    message: string;
  };
}

// Function to call MCP server
async function callMcpServer(url: string, method: string, params: Record<string, unknown>): Promise<unknown> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: '1',
      method: method,
      params: params
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: McpResponse = await response.json();
  
  if (data.error) {
    throw new Error(`MCP server error: ${data.error.message}`);
  }

  return data.result;
}

// Function to call specific MCP tools
async function callMcpTool(serverUrl: string, toolName: string, params: Record<string, unknown>): Promise<unknown> {
  try {
    return await callMcpServer(serverUrl, 'tools/call', {
      name: toolName,
      arguments: params
    });
  } catch (error) {
    console.error(`Error calling tool ${toolName} on ${serverUrl}:`, error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get user from JWT token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify the JWT token and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      throw new Error('Invalid authentication token');
    }

    const body = await req.json()
    const { messages, connectedServers, sessionId } = body as ChatRequest

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid messages array')
    }

    if (!connectedServers || !Array.isArray(connectedServers)) {
      throw new Error('Invalid connectedServers array')
    }

    // Fetch connected MCP servers from database
    let mcpServers: McpServer[] = []
    if (connectedServers.length > 0) {
      const { data, error } = await supabase
        .from('mcp_servers')
        .select('*')
        .in('id', connectedServers)
        .eq('server_type', 'remote') // Only remote servers for the client

      if (error) {
        console.error('Error fetching MCP servers:', error)
        throw new Error('Failed to fetch MCP servers')
      }

      mcpServers = data || []
    }

    // Load existing conversation history if sessionId is provided
    let conversationHistory: ChatMessage[] = []
    if (sessionId) {
      try {
        const { data: existingChat, error: chatError } = await supabase
          .from('chat_logs')
          .select('messages')
          .eq('user_id', user.id)
          .eq('session_id', sessionId)
          .order('updated_at', { ascending: false })
          .limit(1)
          .single()

        if (!chatError && existingChat && existingChat.messages) {
          conversationHistory = existingChat.messages
        }
      } catch (error) {
        console.log('No existing conversation found for session:', sessionId)
      }
    }

    // Combine existing history with new messages, avoiding duplicates
    const allMessages = [...conversationHistory, ...messages]
    
    // Get the last user message
    const lastUserMessage = allMessages.filter(m => m.role === 'user').pop()?.content || '';
    
    // Try to use MCP servers for specific requests
    const mcpResults: Array<{
      server: string;
      result?: unknown;
      error?: string;
      success: boolean;
    }> = [];
    let mcpContext = '';

    for (const server of mcpServers) {
      if (!server.connection_url) continue;

      try {
        // Check if the user is asking for something this server can help with
        const serverName = server.name.toLowerCase();
        const message = lastUserMessage.toLowerCase();

        if (serverName.includes('deepwiki') && (message.includes('diagram') || message.includes('architecture') || message.includes('documentation'))) {
          // Try to use DeepWiki for architecture diagrams
          try {
            const result = await callMcpTool(server.connection_url, 'generate_diagram', {
              repository_url: message.match(/https:\/\/github\.com\/[^\s]+/)?.[0] || 'https://github.com/terrylinhaochen/a2a-open-catalog',
              diagram_type: 'architecture'
            });
            
            mcpResults.push({
              server: server.name,
              result: result,
              success: true
            });
            
            mcpContext += `\n\n**DeepWiki Result:** Successfully generated architecture diagram for the repository.`;
          } catch (error) {
            mcpResults.push({
              server: server.name,
              error: error.message,
              success: false
            });
            mcpContext += `\n\n**DeepWiki Error:** ${error.message}`;
          }
        }
      } catch (error) {
        console.error(`Error with server ${server.name}:`, error);
        mcpResults.push({
          server: server.name,
          error: error.message,
          success: false
        });
      }
    }

    // Build system prompt with improved instructions for clear deliverables
    const systemPrompt = `You are an AI assistant specializing in helping users define clear project deliverables and requirements. Your role is to:

1. **Ask short, concise questions** to understand the user's needs efficiently
2. **Gather essential information** in 2-3 focused questions maximum
3. **End the conversation** when you have enough information to create a proposal
4. **Provide clear next steps** and timeline expectations

**Key Guidelines:**
- Ask only 1-2 specific, focused questions per response
- Keep questions short and direct
- Focus on the most critical information needed
- When you have enough information, thank the user and end the conversation
- Always mention the 2-business-day timeline for the detailed proposal

**Response Format:**
- If more information is needed: Ask 1-2 specific questions
- If enough information is gathered: Thank the user, confirm you have what you need, and mention they'll receive a detailed proposal within 2 business days via email

**Available MCP Servers:**
${mcpServers.length > 0 ? mcpServers.map(server => `- ${server.name}: ${server.description} (${server.connection_url})`).join('\n') : '- No remote MCP servers connected'}

**MCP Server Results:**
${mcpContext || 'No MCP servers were called for this request.'}

Remember: Be concise, ask focused questions, and end the conversation when you have sufficient information to create a comprehensive project proposal.`

    // Get OpenAI API key
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...allMessages
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenAI API error:', errorData)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content || 'No response generated'

    // Log the chat conversation to database
    const chatLogData = {
      user_id: user.id,
      session_id: sessionId || `session_${Date.now()}`,
      messages: allMessages.concat([{ role: 'assistant', content: assistantMessage }]),
      connected_servers: connectedServers,
      metadata: {
        mcp_results: mcpResults,
        model_used: 'gpt-4o-mini',
        tokens_used: data.usage?.total_tokens || 0
      }
    };

    // Check if record exists and update or insert accordingly
    const { data: existingRecord, error: checkError } = await supabase
      .from('chat_logs')
      .select('id')
      .eq('user_id', user.id)
      .eq('session_id', chatLogData.session_id)
      .limit(1)
      .single()

    let logError = null
    if (existingRecord && !checkError) {
      // Update existing record
      const { error } = await supabase
        .from('chat_logs')
        .update(chatLogData)
        .eq('id', existingRecord.id)
      logError = error
    } else {
      // Insert new record
      const { error } = await supabase
        .from('chat_logs')
        .insert(chatLogData)
      logError = error
    }

    if (logError) {
      console.error('Error logging chat:', logError);
      // Don't throw error here as the main functionality should still work
    }

    return new Response(
      JSON.stringify({
        message: assistantMessage,
        sessionId: chatLogData.session_id,
        mcpServers: mcpServers.map(server => ({
          id: server.id,
          name: server.name,
          provider: server.provider,
          description: server.description,
          connectionUrl: server.connection_url,
          authType: server.auth_type
        })),
        mcpResults: mcpResults
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
      error: 'Failed to process chat message',
      details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
      }
    )
  }
})
