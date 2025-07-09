const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://lkyitzrjxptvtahigtdz.supabase.co";
const supabaseKey = "***REMOVED-SERVICE-KEY***";

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixRLSPolicy() {
  console.log('🔧 Fixing RLS policy to allow service role inserts...');
  
  try {
    // Drop existing policy
    const { error: dropError } = await supabase.rpc('exec', {
      query: `DROP POLICY IF EXISTS "Authenticated users can insert workflows" ON public.workflows;`
    });
    
    if (dropError) {
      console.error('❌ Error dropping policy:', dropError);
      return;
    }
    
    console.log('✅ Dropped existing policy');
    
    // Create new policy that allows service role
    const { error: createError } = await supabase.rpc('exec', {
      query: `CREATE POLICY "Authenticated users can insert workflows" ON public.workflows
        FOR INSERT WITH CHECK (auth.uid() IS NOT NULL OR auth.role() = 'service_role');`
    });
    
    if (createError) {
      console.error('❌ Error creating new policy:', createError);
      return;
    }
    
    console.log('✅ Created new policy allowing service role inserts');
    
    // Test the fix
    const testWorkflow = {
      name: 'Test Workflow',
      description: 'A test workflow for debugging',
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
      featured: false
    };
    
    console.log('🧪 Testing insert with new policy...');
    const { data: insertData, error: insertError } = await supabase
      .from('workflows')
      .insert([testWorkflow])
      .select();
    
    if (insertError) {
      console.error('❌ Insert still failed:', insertError);
      return;
    }
    
    console.log('✅ Insert successful!');
    
    // Clean up test workflow
    if (insertData && insertData.length > 0) {
      await supabase
        .from('workflows')
        .delete()
        .eq('id', insertData[0].id);
      console.log('🧹 Test workflow cleaned up');
    }
    
    console.log('🎉 RLS policy fixed successfully!');
    
  } catch (error) {
    console.error('❌ Error fixing RLS policy:', error);
  }
}

fixRLSPolicy();