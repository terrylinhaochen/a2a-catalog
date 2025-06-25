// Simple test script to check MCP function
const { createClient } = require('@supabase/supabase-js');

// You'll need to replace these with your actual values
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseServiceKey = 'YOUR_SUPABASE_SERVICE_ROLE_KEY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testMcpFunction() {
  try {
    console.log('Testing MCP chat function...');
    
    const { data, error } = await supabase.functions.invoke('mcp-chat', {
      body: {
        messages: [
          { role: 'user', content: 'Hello, can you help me?' }
        ],
        connectedServers: []
      }
    });

    if (error) {
      console.error('Function error:', error);
    } else {
      console.log('Function response:', data);
    }
  } catch (err) {
    console.error('Test failed:', err);
  }
}

testMcpFunction(); 