import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface McpServer {
  id: string;
  name: string;
  description: string;
  provider: string;
  connection_url?: string;
  categories?: string[];
  skills?: string[];
  auth_type?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  connectedServers: string[]; // Array of connected server IDs
}

// MCP Protocol interfaces
interface McpRequest {
  jsonrpc: "2.0";
  id: string;
  method: string;
  params?: any;
}

interface McpResponse {
  jsonrpc: "2.0";
  id: string;
  result?: any;
  error?: {
    code: number;
    message: string;
  };
}

// Function to communicate with MCP servers
async function callMcpServer(serverUrl: string, method: string, params?: any): Promise<any> {
  try {
    const request: McpRequest = {
      jsonrpc: "2.0",
      id: crypto.randomUUID(),
      method,
      params
    };

    console.log(`Calling MCP server ${serverUrl} with method: ${method}`);

    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`MCP server responded with status: ${response.status}`);
    }

    const data: McpResponse = await response.json();
    
    if (data.error) {
      throw new Error(`MCP server error: ${data.error.message}`);
    }

    return data.result;
  } catch (error) {
    console.error(`Error calling MCP server ${serverUrl}:`, error);
    throw error;
  }
}

// Function to get server capabilities
async function getServerCapabilities(serverUrl: string): Promise<any> {
  try {
    return await callMcpServer(serverUrl, 'initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {
        tools: {},
        resources: {}
      },
      clientInfo: {
        name: 'a2a-catalog-mcp-client',
        version: '1.0.0'
      }
    });
  } catch (error) {
    console.warn(`Could not get capabilities for ${serverUrl}:`, error);
    return null;
  }
}

// Function to call specific MCP tools
async function callMcpTool(serverUrl: string, toolName: string, params: any): Promise<any> {
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
    const body = await req.json()
    const { messages, connectedServers } = body as ChatRequest

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid messages array')
    }

    if (!connectedServers || !Array.isArray(connectedServers)) {
      throw new Error('Invalid connectedServers array')
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration')
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

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

    // Get the last user message
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || '';
    
    // Try to use MCP servers for specific requests
    let mcpResults: any[] = [];
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
        
        else if (serverName.includes('fetch') && (message.includes('fetch') || message.includes('web') || message.includes('url'))) {
          // Try to use Fetch MCP for web content
          try {
            const url = message.match(/https?:\/\/[^\s]+/)?.[0];
            if (url) {
              const result = await callMcpTool(server.connection_url, 'fetch_url', {
                url: url
              });
              
              mcpResults.push({
                server: server.name,
                result: result,
                success: true
              });
              
              mcpContext += `\n\n**Fetch Result:** Retrieved content from ${url}`;
            }
          } catch (error) {
            mcpResults.push({
              server: server.name,
              error: error.message,
              success: false
            });
            mcpContext += `\n\n**Fetch Error:** ${error.message}`;
          }
        }

        // Add more server-specific logic here for other MCP servers
        
      } catch (error) {
        console.error(`Error with server ${server.name}:`, error);
        mcpResults.push({
          server: server.name,
          error: error.message,
          success: false
        });
      }
    }

    // Build system prompt with available MCP servers and results
    let systemPrompt = `You are an AI assistant with access to the following remote MCP (Model Context Protocol) servers:

${mcpServers.map(server => `
**${server.name}** (${server.provider})
- Description: ${server.description}
- Categories: ${server.categories?.join(', ') || 'N/A'}
- Skills: ${server.skills?.join(', ') || 'N/A'}
- Connection: ${server.connection_url || 'N/A'}
- Auth: ${server.auth_type || 'none'}
`).join('\n')}

${mcpServers.length === 0 ? 'No MCP servers are currently connected. Users can connect remote servers through the MCP dashboard.' : ''}

**MCP Server Results:**
${mcpContext || 'No MCP servers were called for this request.'}

**Instructions:**
1. Use the available remote MCP servers to help users with their requests
2. When a user asks for information that can be retrieved through an MCP server, reference the appropriate server
3. Provide clear explanations of what you're doing and which server you're using
4. If MCP server results are available, incorporate them into your response
5. If no relevant MCP server is available, inform the user and suggest alternatives
6. Always be helpful and informative in your responses

**Available Remote MCP Servers:**
${mcpServers.length > 0 ? mcpServers.map(server => `- ${server.name}: ${server.description} (${server.connection_url})`).join('\n') : '- No remote MCP servers connected'}

**Important Notes:**
- These are remote MCP servers accessible via HTTP endpoints
- Some servers may require OAuth authentication
- You can reference these servers when users ask for specific capabilities
- For actual MCP protocol communication, users would need to use a proper MCP client

Remember to use the MCP servers when appropriate to provide real, up-to-date information and perform actions on behalf of the user.`

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
          ...messages
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

    return new Response(
      JSON.stringify({
        message: assistantMessage,
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
