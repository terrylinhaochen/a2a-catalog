// Clean up generic API entries, keep only actual MCP servers
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lkyitzrjxptvtahigtdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWl0enJqeHB0dnRhaGlndGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMDIzMjIsImV4cCI6MjA2NTg3ODMyMn0.V_gXx2pJWKHMSVstAU8mbw1TSBCct4nBe6IgtgU4VzY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function cleanupGenericApis() {
  try {
    console.log('Cleaning up generic API entries...');
    
    // Get all remote servers
    const { data: remoteServers, error: fetchError } = await supabase
      .from('mcp_servers')
      .select('*')
      .eq('server_type', 'remote');

    if (fetchError) {
      console.error('Error fetching servers:', fetchError);
      return;
    }

    // Define which entries to keep (actual MCP servers) vs remove (generic APIs)
    const keepEntries = [
      'github-copilot', // GitHub Copilot MCP
      'sentry', // Sentry MCP  
      'linear', // Linear MCP
      'deepwiki', // DeepWiki MCP
    ];

    const removeEntries = [
      'github-copilot-generic', // GitHub Copilot (generic API)
      'sentry-generic', // Sentry (generic API)
      'linear-generic', // Linear (generic API) 
      'deep-wiki-generic', // Deep Wiki (generic API)
    ];

    // Find servers to remove (generic API endpoints)
    const toRemove = remoteServers.filter(server => {
      const url = server.connection_url || '';
      return url.includes('api.github.com/copilot') ||
             url.includes('api.sentry.io') ||
             url.includes('api.linear.app') ||
             url.includes('api.deepwiki.com') ||
             url.includes('api.notion.com') ||
             url.includes('api.slack.com') ||
             url.includes('api.figma.com') ||
             url.includes('api.zapier.com');
    });

    console.log(`\n=== SERVERS TO REMOVE (Generic APIs) ===`);
    toRemove.forEach(server => {
      console.log(`- ${server.name} (${server.provider}): ${server.connection_url}`);
    });

    console.log(`\nTotal to remove: ${toRemove.length}`);

    if (toRemove.length === 0) {
      console.log('No generic API entries found to remove');
      return;
    }

    // Get the IDs to remove
    const idsToRemove = toRemove.map(server => server.id);

    // Show what will remain
    const remaining = remoteServers.filter(server => !idsToRemove.includes(server.id));
    console.log(`\n=== SERVERS TO KEEP (Actual MCP Servers) ===`);
    remaining.forEach(server => {
      console.log(`- ${server.name} (${server.provider}): ${server.connection_url}`);
    });

    // Uncomment the following lines to actually perform the deletion
    console.log('\nDeleting generic API entries...');
    const { error: deleteError } = await supabase
      .from('mcp_servers')
      .delete()
      .in('id', idsToRemove);
    
    if (deleteError) {
      console.error('Error deleting entries:', deleteError);
    } else {
      console.log(`Successfully deleted ${idsToRemove.length} generic API entries`);
    }

  } catch (err) {
    console.error('Error during cleanup:', err);
  }
}

cleanupGenericApis(); 