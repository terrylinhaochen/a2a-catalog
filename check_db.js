// Check if remote MCP servers are in the database
import { createClient } from '@supabase/supabase-js';

// You'll need to manually set these values from your Supabase project
const supabaseUrl = 'https://lkyitzrjxptvtahigtdz.supabase.co'; // Replace with your actual URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWl0enJqeHB0dnRhaGlndGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMDIzMjIsImV4cCI6MjA2NTg3ODMyMn0.V_gXx2pJWKHMSVstAU8mbw1TSBCct4nBe6IgtgU4VzY'; // Replace with your actual anon key

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabase() {
  try {
    console.log('Checking MCP servers in database...');
    
    const { data, error } = await supabase
      .from('mcp_servers')
      .select('*')
      .eq('server_type', 'remote');

    if (error) {
      console.error('Database error:', error);
    } else {
      console.log('Remote MCP servers found:', data?.length || 0);
      if (data && data.length > 0) {
        console.log('Servers:');
        data.forEach(server => {
          console.log(`- ${server.name} (${server.provider}): ${server.connection_url}`);
        });
      } else {
        console.log('No remote MCP servers found in database.');
        console.log('You need to run the SQL script to add them.');
      }
    }
  } catch (err) {
    console.error('Error checking database:', err);
  }
}

checkDatabase(); 