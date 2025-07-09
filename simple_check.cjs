const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://lkyitzrjxptvtahigtdz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWl0enJqeHB0dnRhaGlndGR6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDMwMjMyMiwiZXhwIjoyMDY1ODc4MzIyfQ.op6Jwr4GBgYgit0Kh3MW9weihwPtZiWTHuy4LpXg6vI";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('🔍 Checking what tables exist...');
  
  try {
    // Try to select from workflows table
    const { data: workflowsData, error: workflowsError } = await supabase
      .from('workflows')
      .select('count', { count: 'exact', head: true });
    
    if (workflowsError) {
      console.log('❌ Workflows table does not exist:', workflowsError.message);
      
      // Check for experts table (should be removed after migration)
      const { data: expertsData, error: expertsError } = await supabase
        .from('experts')
        .select('count', { count: 'exact', head: true });
      
      if (expertsError) {
        console.log('❌ Experts table also does not exist:', expertsError.message);
      } else {
        console.log('✅ Experts table still exists - migration not applied');
      }
    } else {
      console.log('✅ Workflows table exists with', workflowsData, 'records');
    }
    
    // Check for agents table
    const { data: agentsData, error: agentsError } = await supabase
      .from('agents')
      .select('count', { count: 'exact', head: true });
    
    if (agentsError) {
      console.log('❌ Agents table does not exist:', agentsError.message);
    } else {
      console.log('✅ Agents table exists');
    }
    
    // Check for mcp_servers table
    const { data: mcpData, error: mcpError } = await supabase
      .from('mcp_servers')
      .select('count', { count: 'exact', head: true });
    
    if (mcpError) {
      console.log('❌ MCP servers table does not exist:', mcpError.message);
    } else {
      console.log('✅ MCP servers table exists');
    }
    
  } catch (error) {
    console.error('❌ Check failed:', error);
  }
}

checkTables();