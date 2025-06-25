// Analyze MCP servers in the database
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lkyitzrjxptvtahigtdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWl0enJqeHB0dnRhaGlndGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMDIzMjIsImV4cCI6MjA2NTg3ODMyMn0.V_gXx2pJWKHMSVstAU8mbw1TSBCct4nBe6IgtgU4VzY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function analyzeDatabase() {
  try {
    console.log('Analyzing MCP servers database...');
    
    // Get all MCP servers
    const { data: allServers, error: fetchError } = await supabase
      .from('mcp_servers')
      .select('*')
      .order('name');

    if (fetchError) {
      console.error('Error fetching servers:', fetchError);
      return;
    }

    console.log(`Total MCP servers found: ${allServers.length}`);

    // Group by server type
    const byType = {};
    allServers.forEach(server => {
      const type = server.server_type || 'unknown';
      if (!byType[type]) byType[type] = [];
      byType[type].push(server);
    });

    console.log('\n=== BREAKDOWN BY TYPE ===');
    Object.entries(byType).forEach(([type, servers]) => {
      console.log(`${type}: ${servers.length} servers`);
    });

    // Show remote servers specifically
    const remoteServers = allServers.filter(s => s.server_type === 'remote');
    console.log(`\n=== REMOTE SERVERS (${remoteServers.length}) ===`);
    
    // Group remote servers by provider
    const byProvider = {};
    remoteServers.forEach(server => {
      const provider = server.provider || 'unknown';
      if (!byProvider[provider]) byProvider[provider] = [];
      byProvider[provider].push(server);
    });

    Object.entries(byProvider).forEach(([provider, servers]) => {
      console.log(`\n${provider} (${servers.length}):`);
      servers.forEach(server => {
        console.log(`  - ${server.name}: ${server.connection_url}`);
      });
    });

    // Check for potential duplicates (same name but different providers)
    console.log('\n=== POTENTIAL DUPLICATES ===');
    const nameGroups = {};
    remoteServers.forEach(server => {
      const cleanName = server.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!nameGroups[cleanName]) nameGroups[cleanName] = [];
      nameGroups[cleanName].push(server);
    });

    const potentialDuplicates = Object.entries(nameGroups).filter(([name, servers]) => servers.length > 1);
    
    if (potentialDuplicates.length === 0) {
      console.log('No potential duplicates found');
    } else {
      potentialDuplicates.forEach(([cleanName, servers]) => {
        console.log(`\n"${cleanName}":`);
        servers.forEach(server => {
          console.log(`  - ${server.name} (${server.provider}): ${server.connection_url}`);
        });
      });
    }

    // Show some sample entries
    console.log('\n=== SAMPLE ENTRIES ===');
    allServers.slice(0, 5).forEach(server => {
      console.log(`\nID: ${server.id}`);
      console.log(`Name: ${server.name}`);
      console.log(`Provider: ${server.provider}`);
      console.log(`Type: ${server.server_type}`);
      console.log(`URL: ${server.connection_url}`);
      console.log(`Description: ${server.description?.substring(0, 100)}...`);
    });

  } catch (err) {
    console.error('Error analyzing database:', err);
  }
}

analyzeDatabase(); 