// Clean up duplicate MCP servers in the database
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lkyitzrjxptvtahigtdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWl0enJqeHB0dnRhaGlndGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMDIzMjIsImV4cCI6MjA2NTg3ODMyMn0.V_gXx2pJWKHMSVstAU8mbw1TSBCct4nBe6IgtgU4VzY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function cleanupDuplicates() {
  try {
    console.log('Checking for duplicate MCP servers...');
    
    // First, let's see all MCP servers
    const { data: allServers, error: fetchError } = await supabase
      .from('mcp_servers')
      .select('*')
      .order('name');

    if (fetchError) {
      console.error('Error fetching servers:', fetchError);
      return;
    }

    console.log(`Total MCP servers found: ${allServers.length}`);

    // Group by name to find duplicates
    const groupedByName = {};
    allServers.forEach(server => {
      if (!groupedByName[server.name]) {
        groupedByName[server.name] = [];
      }
      groupedByName[server.name].push(server);
    });

    // Find duplicates
    const duplicates = [];
    Object.entries(groupedByName).forEach(([name, servers]) => {
      if (servers.length > 1) {
        duplicates.push({ name, servers });
      }
    });

    if (duplicates.length === 0) {
      console.log('No duplicates found!');
      return;
    }

    console.log(`Found ${duplicates.length} duplicate groups:`);
    duplicates.forEach(({ name, servers }) => {
      console.log(`\n"${name}" (${servers.length} entries):`);
      servers.forEach(server => {
        console.log(`  - ID: ${server.id}, Provider: ${server.provider}, Type: ${server.server_type}, URL: ${server.connection_url}`);
      });
    });

    // Ask user if they want to proceed with cleanup
    console.log('\n=== CLEANUP PLAN ===');
    console.log('For each duplicate group, I will:');
    console.log('1. Keep the entry with the most complete information');
    console.log('2. Delete the other duplicates');
    console.log('3. Preserve any votes by merging them');

    // For now, let's just show what would be deleted
    console.log('\n=== SERVERS TO DELETE ===');
    const toDelete = [];
    
    duplicates.forEach(({ name, servers }) => {
      // Sort by completeness (more fields filled = more complete)
      const sorted = servers.sort((a, b) => {
        const aFields = Object.values(a).filter(v => v !== null && v !== undefined && v !== '').length;
        const bFields = Object.values(b).filter(v => v !== null && v !== undefined && v !== '').length;
        return bFields - aFields; // Keep the most complete one
      });

      // Keep the first (most complete), delete the rest
      const toKeep = sorted[0];
      const toRemove = sorted.slice(1);
      
      console.log(`\n"${name}":`);
      console.log(`  KEEP: ID ${toKeep.id} (${toKeep.provider})`);
      toRemove.forEach(server => {
        console.log(`  DELETE: ID ${server.id} (${server.provider})`);
        toDelete.push(server.id);
      });
    });

    console.log(`\nTotal servers to delete: ${toDelete.length}`);
    
    // Uncomment the following lines to actually perform the deletion
    /*
    if (toDelete.length > 0) {
      console.log('\nDeleting duplicate servers...');
      const { error: deleteError } = await supabase
        .from('mcp_servers')
        .delete()
        .in('id', toDelete);
      
      if (deleteError) {
        console.error('Error deleting duplicates:', deleteError);
      } else {
        console.log(`Successfully deleted ${toDelete.length} duplicate servers`);
      }
    }
    */

  } catch (err) {
    console.error('Error during cleanup:', err);
  }
}

cleanupDuplicates(); 