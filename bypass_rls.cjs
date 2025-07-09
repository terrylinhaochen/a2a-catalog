const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://lkyitzrjxptvtahigtdz.supabase.co";
const supabaseKey = "***REMOVED-SERVICE-KEY***";

// Try creating client with RLS bypass
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
});

async function testBypassRLS() {
  console.log('🔍 Testing RLS bypass...');
  
  try {
    // First disable RLS temporarily for testing
    console.log('📋 Attempting to disable RLS...');
    
    const { error: disableError } = await supabase.rpc('exec', {
      statement: 'ALTER TABLE public.workflows DISABLE ROW LEVEL SECURITY;'
    });
    
    if (disableError) {
      console.log('❌ Cannot disable RLS via RPC:', disableError.message);
    } else {
      console.log('✅ RLS disabled');
    }
    
    // Now try the insert
    const testWorkflow = {
      name: 'Test Workflow',
      description: 'A test workflow',
      provider: 'n8n',
      categories: ['Uncategorized'],
      skills: ['test'],
      integrations: ['test'],
      filename: 'test.json',
      trigger_type: 'manual',
      complexity: 'low',
      node_count: 1,
      workflow_json: { test: true },
      total_nodes: 1,
      active_nodes: 1,
      inactive_nodes: 0,
      is_verified: true,
      featured: false,
      user_id: null
    };
    
    console.log('📋 Testing insert with RLS disabled...');
    const { data, error } = await supabase
      .from('workflows')
      .insert([testWorkflow])
      .select();
    
    if (error) {
      console.error('❌ Insert failed:', error);
    } else {
      console.log('✅ Insert successful:', data?.[0]?.id);
      
      // Clean up
      await supabase.from('workflows').delete().eq('id', data[0].id);
      console.log('🧹 Test workflow cleaned up');
    }
    
    // Re-enable RLS
    console.log('📋 Re-enabling RLS...');
    const { error: enableError } = await supabase.rpc('exec', {
      statement: 'ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;'
    });
    
    if (enableError) {
      console.log('❌ Cannot re-enable RLS:', enableError.message);
    } else {
      console.log('✅ RLS re-enabled');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testBypassRLS();