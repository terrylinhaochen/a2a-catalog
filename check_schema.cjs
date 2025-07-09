const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || "https://lkyitzrjxptvtahigtdz.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWl0enJqeHB0dnRhaGlndGR6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDMwMjMyMiwiZXhwIjoyMDY1ODc4MzIyfQ.op6Jwr4GBgYgit0Kh3MW9weihwPtZiWTHuy4LpXg6vI";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log('🔍 Checking database schema...');
  
  try {
    // Check if workflows table exists
    const { data: tablesData, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'workflows');
    
    if (tablesError) {
      console.error('❌ Error checking tables:', tablesError);
      return;
    }
    
    if (!tablesData || tablesData.length === 0) {
      console.log('❌ Workflows table does not exist!');
      console.log('📋 Please run: supabase db push');
      return;
    }
    
    console.log('✅ Workflows table exists');
    
    // Check table columns
    const { data: columnsData, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_schema', 'public')
      .eq('table_name', 'workflows')
      .order('ordinal_position');
    
    if (columnsError) {
      console.error('❌ Error checking columns:', columnsError);
      return;
    }
    
    console.log('📋 Workflows table columns:');
    columnsData.forEach(col => {
      console.log(`  - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? 'nullable' : 'not null'}`);
    });
    
    // Try a simple insert
    const testWorkflow = {
      name: 'Test Workflow',
      description: 'A simple test',
      provider: 'n8n',
      filename: 'test.json',
      categories: ['Uncategorized'],
      skills: ['test'],
      integrations: ['test'],
      trigger_type: 'manual',
      complexity: 'low',
      node_count: 1,
      total_nodes: 1,
      active_nodes: 1,
      inactive_nodes: 0,
      workflow_json: { test: true }
    };
    
    console.log('\n🧪 Testing simple insert...');
    const { data: insertData, error: insertError } = await supabase
      .from('workflows')
      .insert([testWorkflow])
      .select();
    
    if (insertError) {
      console.error('❌ Insert failed:', insertError);
      console.log('📋 Error details:');
      console.log('  - Code:', insertError.code);
      console.log('  - Message:', insertError.message);
      console.log('  - Details:', insertError.details);
      console.log('  - Hint:', insertError.hint);
    } else {
      console.log('✅ Insert successful!');
      console.log('📋 Inserted workflow ID:', insertData[0].id);
      
      // Clean up
      await supabase.from('workflows').delete().eq('id', insertData[0].id);
      console.log('🧹 Test workflow cleaned up');
    }
    
  } catch (error) {
    console.error('❌ Schema check failed:', error);
  }
}

checkSchema();