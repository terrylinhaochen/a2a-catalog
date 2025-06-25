// Cleanup using service role key for full permissions
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lkyitzrjxptvtahigtdz.supabase.co';
// You'll need to replace this with your actual service role key from Supabase dashboard
const supabaseServiceKey = 'YOUR_SERVICE_ROLE_KEY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function serviceRoleCleanup() {
  try {
    console.log('Cleaning up with service role key...');
    
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

    // Find generic API entries
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

    console.log(`\n=== GENERIC API ENTRIES TO DELETE (${genericEntries.length}) ===`);
    genericEntries.forEach(server => {
      console.log(`- ${server.name} (${server.id}): ${server.connection_url}`);
    });

    if (genericEntries.length === 0) {
      console.log('No generic API entries found');
      return;
    }

    // Get the IDs to remove
    const idsToRemove = genericEntries.map(server => server.id);

    // Try deletion with service role
    console.log('\nDeleting with service role key...');
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
    }

  } catch (err) {
    console.error('Error during cleanup:', err);
  }
}

// Check if service role key is provided
if (supabaseServiceKey === 'YOUR_SERVICE_ROLE_KEY') {
  console.log('Please replace YOUR_SERVICE_ROLE_KEY with your actual service role key from the Supabase dashboard.');
  console.log('Go to Settings > API > service_role key');
} else {
  serviceRoleCleanup();
} 