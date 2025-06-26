import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment
const supabaseUrl = 'https://lkyitzrjxptvtahigtdz.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('Missing Supabase service role key. Please set SUPABASE_SERVICE_ROLE_KEY environment variable.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testMcpServers() {
  try {
    console.log('Fetching MCP servers from database...');
    
    // Get all remote MCP servers
    const { data: mcpServers, error } = await supabase
      .from('mcp_servers')
      .select('*')
      .eq('server_type', 'remote')
      .not('connection_url', 'is', null);

    if (error) {
      console.error('Error fetching MCP servers:', error);
      return;
    }

    console.log(`Found ${mcpServers.length} remote MCP servers:`);
    mcpServers.forEach(server => {
      console.log(`- ${server.name} (ID: ${server.id})`);
      console.log(`  URL: ${server.connection_url}`);
      console.log(`  Auth: ${server.auth_type || 'none'}`);
      console.log('');
    });

    // Test DeepWiki connection
    const deepwikiServer = mcpServers.find(s => s.name.toLowerCase().includes('deepwiki'));
    if (deepwikiServer) {
      console.log('Testing DeepWiki MCP connection...');
      
      try {
        const response = await fetch(deepwikiServer.connection_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "test-1",
            method: "initialize",
            params: {
              protocolVersion: "2024-11-05",
              capabilities: {
                tools: {},
                resources: {}
              },
              clientInfo: {
                name: "a2a-catalog-test",
                version: "1.0.0"
              }
            }
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('DeepWiki connection successful:', data);
        } else {
          console.log('DeepWiki connection failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('DeepWiki connection error:', error.message);
      }
    }

    // Test the chat function with a real server ID
    if (mcpServers.length > 0) {
      const testServer = mcpServers[0];
      console.log(`\nTesting chat function with server: ${testServer.name} (${testServer.id})`);
      
      const chatResponse = await fetch('https://lkyitzrjxptvtahigtdz.supabase.co/functions/v1/mcp-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWl0enJqeHB0dnRhaGlndGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzI5NzQsImV4cCI6MjA1MDU0ODk3NH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8'
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: 'Can you generate an architecture diagram for https://github.com/terrylinhaochen/a2a-open-catalog' }
          ],
          connectedServers: [testServer.id]
        })
      });

      if (chatResponse.ok) {
        const chatData = await chatResponse.json();
        console.log('Chat function response:', JSON.stringify(chatData, null, 2));
      } else {
        console.error('Chat function error:', chatResponse.status, chatResponse.statusText);
      }
    }

  } catch (err) {
    console.error('Test failed:', err);
  }
}

testMcpServers(); 