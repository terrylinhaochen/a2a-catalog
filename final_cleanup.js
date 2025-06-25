// Final cleanup to remove remaining generic API entries
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lkyitzrjxptvtahigtdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWl0enJqeHB0dnRhaGlndGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMDIzMjIsImV4cCI6MjA2NTg3ODMyMn0.V_gXx2pJWKHMSVstAU8mbw1TSBCct4nBe6IgtgU4VzY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function finalCleanup() {
  try {
    console.log('Final cleanup of remaining generic API entries...');
    
    // Get all remote servers
    const { data: remoteServers, error: fetchError } = await supabase
      .from('mcp_servers')
      .select('*')
      .eq('server_type', 'remote');

    if (fetchError) {
      console.error('Error fetching servers:', fetchError);
      return;
    }

    console.log(`Total remote servers found: ${remoteServers.length}`);

    // Define the specific generic API URLs to remove
    const genericApiUrls = [
      'https://api.github.com/copilot',
      'https://api.sentry.io',
      'https://api.linear.app',
      'https://api.deepwiki.com',
      'https://api.notion.com',
      'https://api.slack.com',
      'https://api.figma.com',
      'https://api.zapier.com'
    ];

    // Find servers to remove
    const toRemove = remoteServers.filter(server => {
      const url = server.connection_url || '';
      return genericApiUrls.some(genericUrl => url === genericUrl);
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

    // Perform the deletion
    console.log('\nDeleting generic API entries...');
    const { error: deleteError } = await supabase
      .from('mcp_servers')
      .delete()
      .in('id', idsToRemove);
    
    if (deleteError) {
      console.error('Error deleting entries:', deleteError);
    } else {
      console.log(`Successfully deleted ${idsToRemove.length} generic API entries`);
      
      // Verify the cleanup
      console.log('\n=== VERIFICATION ===');
      const { data: remainingServers, error: verifyError } = await supabase
        .from('mcp_servers')
        .select('*')
        .eq('server_type', 'remote');

      if (verifyError) {
        console.error('Error verifying cleanup:', verifyError);
      } else {
        console.log(`Remaining remote servers: ${remainingServers.length}`);
        remainingServers.forEach(server => {
          console.log(`- ${server.name}: ${server.connection_url}`);
        });
      }
    }

  } catch (err) {
    console.error('Error during cleanup:', err);
  }
}

finalCleanup(); 