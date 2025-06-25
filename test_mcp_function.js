// Simple test script to check MCP function
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get Supabase credentials from environment
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Please check your environment variables.');
  process.exit(1);
}

console.log('Using Supabase URL:', supabaseUrl);
console.log('Service key available:', !!supabaseServiceKey);

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testMcpFunction() {
  try {
    console.log('Testing MCP chat function...');
    
    const testRequest = {
      messages: [
        { role: 'user', content: 'Hello, can you help me?' }
      ],
      connectedServers: []
    };
    
    console.log('Sending request:', testRequest);
    
    const { data, error } = await supabase.functions.invoke('mcp-chat', {
      body: testRequest
    });

    if (error) {
      console.error('Function error:', error);
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        status: error.status,
        statusText: error.statusText
      });
    } else {
      console.log('Function response:', data);
      console.log('Response message:', data?.message);
    }
  } catch (err) {
    console.error('Test failed:', err);
    console.error('Error details:', {
      message: err.message,
      name: err.name,
      stack: err.stack
    });
  }
}

testMcpFunction(); 