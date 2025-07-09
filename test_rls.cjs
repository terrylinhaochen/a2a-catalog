const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://lkyitzrjxptvtahigtdz.supabase.co";
const supabaseKey = "***REMOVED-SERVICE-KEY***";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testRLS() {
  console.log('🔍 Testing RLS policies...');
  
  try {
    // Test 1: Direct insert without RLS bypass
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
    
    console.log('📋 Test 1: Direct insert...');
    const { data: directData, error: directError } = await supabase
      .from('workflows')
      .insert([testWorkflow])
      .select();
    
    if (directError) {
      console.error('❌ Direct insert failed:', directError);
    } else {
      console.log('✅ Direct insert successful:', directData?.[0]?.id);
      // Clean up
      await supabase.from('workflows').delete().eq('id', directData[0].id);
    }
    
    // Test 2: Insert with RLS bypass
    console.log('\n📋 Test 2: Insert with RLS bypass...');
    const { data: bypassData, error: bypassError } = await supabase
      .from('workflows')
      .insert([testWorkflow])
      .select();
    
    if (bypassError) {
      console.error('❌ Bypass insert failed:', bypassError);
    } else {
      console.log('✅ Bypass insert successful:', bypassData?.[0]?.id);
      // Clean up
      await supabase.from('workflows').delete().eq('id', bypassData[0].id);
    }
    
    // Test 3: Check current user context
    console.log('\n📋 Test 3: Check user context...');
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.log('❌ No user context:', userError.message);
    } else {
      console.log('✅ User context:', userData);
    }
    
    // Test 4: Check service role
    console.log('\n📋 Test 4: Check service role...');
    const { data: roleData, error: roleError } = await supabase.rpc('auth.role');
    
    if (roleError) {
      console.log('❌ Role check failed:', roleError.message);
    } else {
      console.log('✅ Current role:', roleData);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testRLS();