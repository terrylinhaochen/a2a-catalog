const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = "https://lkyitzrjxptvtahigtdz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWl0enJqeHB0dnRhaGlndGR6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDMwMjMyMiwiZXhwIjoyMDY1ODc4MzIyfQ.op6Jwr4GBgYgit0Kh3MW9weihwPtZiWTHuy4LpXg6vI";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log('🧪 Testing workflow insert...');
  
  try {
    // First, let's try a very simple workflow
    const simpleWorkflow = {
      name: 'Simple Test Workflow',
      description: 'A simple test workflow',
      provider: 'n8n',
      categories: ['Uncategorized'],
      skills: ['test'],
      integrations: ['test'],
      filename: 'test.json',
      trigger_type: 'manual',
      complexity: 'low',
      node_count: 1,
      total_nodes: 1,
      active_nodes: 1,
      inactive_nodes: 0,
      workflow_json: { test: true },
      is_verified: true,
      featured: false
    };
    
    console.log('📋 Inserting simple workflow...');
    const { data: simpleData, error: simpleError } = await supabase
      .from('workflows')
      .insert([simpleWorkflow])
      .select();
    
    if (simpleError) {
      console.error('❌ Simple insert failed:', simpleError);
      return;
    }
    
    console.log('✅ Simple insert successful!');
    console.log('📋 Workflow ID:', simpleData[0].id);
    
    // Now let's try with a real workflow file
    const workflowsDir = path.join(__dirname, 'n8n-workflows', 'workflows');
    const files = fs.readdirSync(workflowsDir).filter(file => file.endsWith('.json'));
    
    if (files.length === 0) {
      console.log('❌ No workflow files found');
      return;
    }
    
    const testFile = files[0];
    console.log('📋 Testing with file:', testFile);
    
    const filePath = path.join(workflowsDir, testFile);
    const workflowData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    console.log('📋 Workflow data structure:');
    console.log('  - Name:', workflowData.name);
    console.log('  - Nodes:', workflowData.nodes?.length || 0);
    console.log('  - Active:', workflowData.active);
    console.log('  - Keys:', Object.keys(workflowData));
    
    // Create a workflow object similar to what the import script creates
    const realWorkflow = {
      name: workflowData.name || 'Test Workflow',
      description: `Test workflow from ${testFile}`,
      provider: 'n8n',
      categories: ['Uncategorized'],
      skills: ['test'],
      integrations: ['test'],
      filename: testFile,
      trigger_type: 'manual',
      complexity: 'low',
      node_count: workflowData.nodes?.length || 0,
      total_nodes: workflowData.nodes?.length || 0,
      active_nodes: workflowData.active === false ? 0 : (workflowData.nodes?.length || 0),
      inactive_nodes: workflowData.active === false ? (workflowData.nodes?.length || 0) : 0,
      workflow_json: workflowData,
      is_verified: true,
      featured: false
    };
    
    console.log('📋 Inserting real workflow...');
    const { data: realData, error: realError } = await supabase
      .from('workflows')
      .insert([realWorkflow])
      .select();
    
    if (realError) {
      console.error('❌ Real workflow insert failed:', realError);
      console.log('📋 Error details:');
      console.log('  - Code:', realError.code);
      console.log('  - Message:', realError.message);
      console.log('  - Details:', realError.details);
      console.log('  - Hint:', realError.hint);
      return;
    }
    
    console.log('✅ Real workflow insert successful!');
    console.log('📋 Real workflow ID:', realData[0].id);
    
    // Clean up both test workflows
    await supabase.from('workflows').delete().eq('id', simpleData[0].id);
    await supabase.from('workflows').delete().eq('id', realData[0].id);
    console.log('🧹 Test workflows cleaned up');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testInsert();