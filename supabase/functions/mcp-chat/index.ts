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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, connectedServers } = await req.json() as ChatRequest

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Fetch connected MCP servers from database
    let mcpServers: McpServer[] = []
    if (connectedServers && connectedServers.length > 0) {
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

    // Build system prompt with available MCP servers
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

**Instructions:**
1. Use the available remote MCP servers to help users with their requests
2. When a user asks for information that can be retrieved through an MCP server, reference the appropriate server
3. Provide clear explanations of what you're doing and which server you're using
4. If no relevant MCP server is available, inform the user and suggest alternatives
5. Always be helpful and informative in your responses

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
        }))
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
