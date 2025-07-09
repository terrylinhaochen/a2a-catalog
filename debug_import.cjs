const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Set' : 'Not set');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test database connection and check schema
async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from('workflows')
      .select('count', { count: 'exact', head: true });
    
    if (testError) {
      console.error('Database connection error:', testError);
      return false;
    }
    
    console.log('Database connection successful');
    console.log('Current workflows count:', testData);
    
    // Test schema by checking table structure
    const { data: schemaData, error: schemaError } = await supabase
      .rpc('get_table_schema', { table_name: 'workflows' })
      .limit(1);
    
    if (schemaError) {
      console.log('Schema check error (this is expected if RPC doesn\'t exist):', schemaError.message);
    }
    
    // Try to insert a test workflow
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
    
    console.log('\nTesting single workflow insert...');
    const { data: insertData, error: insertError } = await supabase
      .from('workflows')
      .insert([testWorkflow])
      .select();
    
    if (insertError) {
      console.error('Insert error:', insertError);
      return false;
    }
    
    console.log('Insert successful:', insertData);
    
    // Clean up test workflow
    if (insertData && insertData.length > 0) {
      await supabase
        .from('workflows')
        .delete()
        .eq('id', insertData[0].id);
      console.log('Test workflow cleaned up');
    }
    
    return true;
  } catch (error) {
    console.error('Database test error:', error);
    return false;
  }
}

// Test with a real workflow file
async function testRealWorkflow() {
  try {
    console.log('\nTesting with real workflow file...');
    
    const workflowsDir = path.join(__dirname, 'n8n-workflows', 'workflows');
    const files = fs.readdirSync(workflowsDir).filter(file => file.endsWith('.json'));
    
    if (files.length === 0) {
      console.error('No workflow files found');
      return false;
    }
    
    const testFile = files[0];
    console.log('Testing with file:', testFile);
    
    const filePath = path.join(workflowsDir, testFile);
    const workflowData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    console.log('Workflow data keys:', Object.keys(workflowData));
    console.log('Workflow nodes count:', workflowData.nodes?.length || 0);
    
    // Create workflow object
    const workflow = {
      name: workflowData.name || 'Test Workflow',
      description: 'A test workflow from real file',
      provider: 'n8n',
      categories: ['Uncategorized'],
      skills: ['test'],
      integrations: ['test'],
      filename: testFile,
      trigger_type: 'manual',
      complexity: 'low',
      node_count: workflowData.nodes?.length || 0,
      workflow_json: workflowData,
      total_nodes: workflowData.nodes?.length || 0,
      active_nodes: workflowData.nodes?.length || 0,
      inactive_nodes: 0,
      is_verified: true,
      featured: false
    };
    
    console.log('Attempting to insert real workflow...');
    const { data: insertData, error: insertError } = await supabase
      .from('workflows')
      .insert([workflow])
      .select();
    
    if (insertError) {
      console.error('Real workflow insert error:', insertError);
      return false;
    }
    
    console.log('Real workflow insert successful:', insertData?.[0]?.id);
    
    // Clean up
    if (insertData && insertData.length > 0) {
      await supabase
        .from('workflows')
        .delete()
        .eq('id', insertData[0].id);
      console.log('Real workflow cleaned up');
    }
    
    return true;
  } catch (error) {
    console.error('Real workflow test error:', error);
    return false;
  }
}

async function main() {
  console.log('=== Database Debug Tool ===\n');
  
  const dbTest = await testDatabase();
  if (!dbTest) {
    console.error('Database test failed');
    return;
  }
  
  const realTest = await testRealWorkflow();
  if (!realTest) {
    console.error('Real workflow test failed');
    return;
  }
  
  console.log('\n=== All tests passed! ===');
}

main();