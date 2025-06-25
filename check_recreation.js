// Check if entries are being recreated
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lkyitzrjxptvtahigtdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWl0enJqeHB0dnRhaGlndGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMDIzMjIsImV4cCI6MjA2NTg3ODMyMn0.V_gXx2pJWKHMSVstAU8mbw1TSBCct4nBe6IgtgU4VzY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkRecreation() {
  try {
    console.log('Checking if entries are being recreated...');
    
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

    console.log(`\n=== GENERIC API ENTRIES (${genericEntries.length}) ===`);
    genericEntries.forEach(server => {
      console.log(`ID: ${server.id}`);
      console.log(`Name: ${server.name}`);
      console.log(`Provider: ${server.provider}`);
      console.log(`URL: ${server.connection_url}`);
      console.log(`Created: ${server.created_at}`);
      console.log(`Updated: ${server.updated_at}`);
      console.log('---');
    });

    // Check if these are the same IDs we tried to delete
    const expectedIds = [
      'c0ea00b6-7882-4d58-9940-0f7ba3047bc1',
      '1f704059-68b2-4581-99cf-609396abf99a',
      'ce7bf517-33ea-43ee-ac8c-9a3653226059',
      '8c176834-f090-477b-a15e-6b265a5fd17e',
      '297a2f09-72c9-4c79-a4e1-9a086ecabd2b',
      '0ed77900-c29d-4742-996e-b15ab8a785d9',
      '169d1fe0-cd23-407f-ad17-928aa8a38756',
      '9b011dfb-5c10-4c20-9e61-2b5ba44fee10'
    ];

    console.log('\n=== ID COMPARISON ===');
    const foundIds = genericEntries.map(s => s.id);
    console.log('Expected IDs (from deletion):', expectedIds);
    console.log('Found IDs (current):', foundIds);
    
    const sameIds = foundIds.filter(id => expectedIds.includes(id));
    const differentIds = foundIds.filter(id => !expectedIds.includes(id));
    
    console.log(`Same IDs: ${sameIds.length}`);
    console.log(`Different IDs: ${differentIds.length}`);
    
    if (differentIds.length > 0) {
      console.log('Different IDs found - entries may have been recreated:');
      differentIds.forEach(id => {
        const server = genericEntries.find(s => s.id === id);
        console.log(`- ${server.name}: ${server.connection_url}`);
      });
    }

    // Try a different approach - update instead of delete
    console.log('\n=== TRYING UPDATE APPROACH ===');
    for (const server of genericEntries) {
      console.log(`\nUpdating ${server.name} to mark as deleted...`);
      
      const { error: updateError } = await supabase
        .from('mcp_servers')
        .update({ 
          name: `${server.name} (DELETED)`,
          description: 'This entry has been marked for deletion',
          connection_url: null
        })
        .eq('id', server.id);
      
      if (updateError) {
        console.error(`Failed to update ${server.name}:`, updateError);
      } else {
        console.log(`Successfully updated ${server.name}`);
      }
    }

    // Wait a moment and check again
    console.log('\nWaiting 2 seconds...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check again
    const { data: updatedServers, error: checkError } = await supabase
      .from('mcp_servers')
      .select('*')
      .eq('server_type', 'remote');

    if (checkError) {
      console.error('Error checking updated servers:', checkError);
    } else {
      console.log(`\n=== AFTER UPDATE CHECK ===`);
      console.log(`Total remote servers: ${updatedServers.length}`);
      
      const stillGeneric = updatedServers.filter(server => {
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
      
      console.log(`Still have generic URLs: ${stillGeneric.length}`);
      if (stillGeneric.length > 0) {
        stillGeneric.forEach(server => {
          console.log(`- ${server.name}: ${server.connection_url}`);
        });
      }
    }

  } catch (err) {
    console.error('Error during check:', err);
  }
}

checkRecreation(); 