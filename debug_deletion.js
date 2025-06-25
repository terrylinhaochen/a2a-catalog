// Debug script to understand why deletion isn't working
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lkyitzrjxptvtahigtdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWl0enJqeHB0dnRhaGlndGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMDIzMjIsImV4cCI6MjA2NTg3ODMyMn0.V_gXx2pJWKHMSVstAU8mbw1TSBCct4nBe6IgtgU4VzY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugDeletion() {
  try {
    console.log('Debugging deletion issue...');
    
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

    // Find the specific generic API entries
    const genericEntries = remoteServers.filter(server => {
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

    console.log(`\n=== GENERIC API ENTRIES FOUND ===`);
    genericEntries.forEach(server => {
      console.log(`ID: ${server.id}`);
      console.log(`Name: ${server.name}`);
      console.log(`Provider: ${server.provider}`);
      console.log(`URL: ${server.connection_url}`);
      console.log(`Created: ${server.created_at}`);
      console.log(`Updated: ${server.updated_at}`);
      console.log('---');
    });

    if (genericEntries.length === 0) {
      console.log('No generic API entries found');
      return;
    }

    // Try deleting one by one to see which ones fail
    console.log('\n=== TRYING INDIVIDUAL DELETIONS ===');
    for (const server of genericEntries) {
      console.log(`\nTrying to delete: ${server.name} (${server.id})`);
      
      const { error: deleteError } = await supabase
        .from('mcp_servers')
        .delete()
        .eq('id', server.id);
      
      if (deleteError) {
        console.error(`Failed to delete ${server.name}:`, deleteError);
      } else {
        console.log(`Successfully deleted ${server.name}`);
      }
    }

    // Verify after individual deletions
    console.log('\n=== VERIFICATION AFTER INDIVIDUAL DELETIONS ===');
    const { data: remainingServers, error: verifyError } = await supabase
      .from('mcp_servers')
      .select('*')
      .eq('server_type', 'remote');

    if (verifyError) {
      console.error('Error verifying:', verifyError);
    } else {
      console.log(`Remaining remote servers: ${remainingServers.length}`);
      const stillGeneric = remainingServers.filter(server => {
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
      
      if (stillGeneric.length > 0) {
        console.log('Still have generic entries:');
        stillGeneric.forEach(server => {
          console.log(`- ${server.name}: ${server.connection_url}`);
        });
      } else {
        console.log('All generic entries successfully removed!');
      }
    }

  } catch (err) {
    console.error('Error during debug:', err);
  }
}

debugDeletion(); 