const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://lkyitzrjxptvtahigtdz.supabase.co";
const supabaseKey = "***REMOVED-SERVICE-KEY***";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testWorkflowInsert() {
  console.log('🧪 Testing workflow table insertion...');
  
  try {
    // Test workflow data
    const testWorkflow = {
      name: 'Test N8N Workflow',
      description: 'A sample n8n workflow for testing the import functionality',
      provider: 'n8n',
      categories: ['Business Process Automation'],
      skills: ['automation', 'data processing'],
      integrations: ['Gmail', 'Slack'],
      filename: 'test_workflow.json',
      trigger_type: 'manual',
      complexity: 'low',
      node_count: 3,
      total_nodes: 3,
      active_nodes: 3,
      inactive_nodes: 0,
      workflow_json: {
        name: 'Test Workflow',
        nodes: [
          { id: '1', type: 'n8n-nodes-base.manualTrigger', position: [100, 100] },
          { id: '2', type: 'n8n-nodes-base.gmail', position: [300, 100] },
          { id: '3', type: 'n8n-nodes-base.slack', position: [500, 100] }
        ],
        connections: {}
      },
      is_verified: true,
      featured: false,
      user_id: null
    };
    
    console.log('📋 Inserting test workflow...');
    const { data, error } = await supabase
      .from('workflows')
      .insert([testWorkflow])
      .select();
    
    if (error) {
      console.error('❌ Insert failed:', error);
      return false;
    }
    
    console.log('✅ Test workflow inserted successfully!');
    console.log('📋 Workflow ID:', data[0].id);
    
    // Clean up - delete the test workflow
    await supabase
      .from('workflows')
      .delete()
      .eq('id', data[0].id);
    
    console.log('🧹 Test workflow cleaned up');
    
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
}

async function checkWorkflowDirectory() {
  const fs = require('fs');
  const path = require('path');
  
  console.log('📁 Checking for n8n-workflows directory...');
  
  const workflowsDir = path.join(__dirname, 'n8n-workflows', 'workflows');
  
  if (!fs.existsSync(workflowsDir)) {
    console.log('❌ n8n-workflows/workflows directory not found');
    console.log('📋 Expected path:', workflowsDir);
    console.log('💡 Please ensure you have the n8n-workflows repository cloned in this directory');
    return false;
  }
  
  const files = fs.readdirSync(workflowsDir).filter(file => file.endsWith('.json'));
  console.log(`✅ Found ${files.length} JSON workflow files`);
  
  if (files.length > 0) {
    console.log('📋 Sample files:', files.slice(0, 5).join(', '));
  }
  
  return files.length > 0;
}

async function main() {
  console.log('🚀 Testing import prerequisites...\n');
  
  const dbTest = await testWorkflowInsert();
  console.log('');
  const dirTest = await checkWorkflowDirectory();
  
  console.log('\n=== Test Results ===');
  console.log('Database connection:', dbTest ? '✅ Working' : '❌ Failed');
  console.log('Workflow files:', dirTest ? '✅ Found' : '❌ Missing');
  
  if (dbTest && dirTest) {
    console.log('\n🎉 All prerequisites met! You can now run: node import_workflows.cjs');
  } else {
    console.log('\n⚠️  Please resolve the issues above before running the import');
  }
}

main();