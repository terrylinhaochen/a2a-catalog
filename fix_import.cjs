const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Configuration - you'll need to set these
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';

console.log('=== Fixed Import Script ===');
console.log('Make sure to set your environment variables:');
console.log('export SUPABASE_URL="your-supabase-url"');
console.log('export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"');
console.log('');

if (supabaseUrl.includes('your-project') || supabaseKey.includes('your-service-role-key')) {
  console.error('❌ Please set your actual Supabase credentials in environment variables');
  console.log('');
  console.log('Run these commands first:');
  console.log('export SUPABASE_URL="https://your-project.supabase.co"');
  console.log('export SUPABASE_SERVICE_ROLE_KEY="eyJ..."');
  console.log('');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Fixed category mapping
const categoryMapping = {
  "Telegram": "Communication & Messaging",
  "Gmail": "Communication & Messaging",
  "GoogleSheets": "Data Processing & Analysis",
  "GoogleDrive": "Cloud Storage & File Management",
  "GoogleCalendar": "Business Process Automation",
  "Slack": "Communication & Messaging",
  "Discord": "Communication & Messaging",
  "Airtable": "Data Processing & Analysis",
  "Hubspot": "CRM & Sales",
  "Trello": "Project Management",
  "Notion": "Project Management",
  "Asana": "Project Management",
  "ClickUp": "Project Management",
  "Pipedrive": "CRM & Sales",
  "Salesforce": "CRM & Sales",
  "Stripe": "Financial & Accounting",
  "Shopify": "E-commerce & Retail",
  "Twitter": "Social Media Management",
  "Linkedin": "Social Media Management",
  "Facebook": "Social Media Management",
  "Instagram": "Social Media Management",
  "Youtube": "Creative Content & Video Automation",
  "Spotify": "Creative Content & Video Automation",
  "Twilio": "Communication & Messaging",
  "Mailchimp": "Marketing & Advertising Automation",
  "SendGrid": "Marketing & Advertising Automation",
  "HTTP": "Web Scraping & Data Extraction",
  "Webhook": "Technical Infrastructure & DevOps",
  "MySQL": "Data Processing & Analysis",
  "Postgres": "Data Processing & Analysis",
  "MongoDB": "Data Processing & Analysis",
  "Redis": "Data Processing & Analysis",
  "AWS": "Technical Infrastructure & DevOps",
  "DropBox": "Cloud Storage & File Management",
  "Github": "Technical Infrastructure & DevOps",
  "GitLab": "Technical Infrastructure & DevOps",
  "Zendesk": "Communication & Messaging",
  "Intercom": "Communication & Messaging",
  "OpenAI": "AI Agent Development",
  "Anthropic": "AI Agent Development"
};

// Enhanced integration extraction
function extractIntegrations(nodes) {
  const integrations = new Set();
  
  nodes.forEach(node => {
    if (node.type && node.type.includes('.')) {
      const nodeType = node.type.split('.').pop();
      
      // Clean up node type and map to integration
      const cleanType = nodeType.replace(/([A-Z])/g, ' $1').trim();
      const words = cleanType.split(' ');
      
      // Try to find matching integration
      for (const [integration, category] of Object.entries(categoryMapping)) {
        if (integration.toLowerCase() === nodeType.toLowerCase() || 
            integration.toLowerCase().includes(nodeType.toLowerCase()) ||
            nodeType.toLowerCase().includes(integration.toLowerCase())) {
          integrations.add(integration);
          break;
        }
      }
      
      // Fallback: add cleaned type
      if (integrations.size === 0) {
        integrations.add(cleanType);
      }
    }
  });
  
  return Array.from(integrations);
}

// Enhanced workflow processing
function processWorkflow(workflowData, filename) {
  const nodes = workflowData.nodes || [];
  const integrations = extractIntegrations(nodes);
  const nodeCount = nodes.length;
  
  // Determine trigger type
  const triggerNodes = nodes.filter(node => 
    node.type && (
      node.type.includes('trigger') || 
      node.type.includes('webhook') || 
      node.type.includes('cron') ||
      node.type.includes('manual')
    )
  );
  
  let triggerType = 'manual';
  if (triggerNodes.length > 1) {
    triggerType = 'complex';
  } else if (triggerNodes.length === 1) {
    const type = triggerNodes[0].type.toLowerCase();
    if (type.includes('webhook')) triggerType = 'webhook';
    else if (type.includes('cron') || type.includes('schedule')) triggerType = 'scheduled';
  }
  
  // Determine complexity
  let complexity = 'low';
  if (nodeCount > 15) complexity = 'high';
  else if (nodeCount > 5) complexity = 'medium';
  
  // Generate categories from integrations
  const categories = new Set();
  integrations.forEach(integration => {
    const category = categoryMapping[integration];
    if (category) {
      categories.add(category);
    }
  });
  
  if (categories.size === 0) {
    categories.add('Uncategorized');
  }
  
  // Create workflow name
  const name = filename
    .replace(/^\d+_/, '')
    .replace(/\.json$/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  
  // Generate description
  const description = `${name} - An n8n workflow automation with ${nodeCount} nodes. Integrates ${integrations.slice(0, 3).join(', ')} with ${triggerType} trigger. Complexity: ${complexity}.`;
  
  // Create skills array
  const skills = [...integrations, ...Array.from(categories)];
  
  return {
    name,
    description,
    provider: 'n8n',
    categories: Array.from(categories),
    skills,
    integrations,
    filename,
    trigger_type: triggerType,
    complexity,
    node_count: nodeCount,
    workflow_json: workflowData,
    total_nodes: nodeCount,
    active_nodes: workflowData.active === false ? 0 : nodeCount,
    inactive_nodes: workflowData.active === false ? nodeCount : 0,
    is_verified: true,
    featured: complexity === 'high' && integrations.length >= 3
  };
}

async function importWorkflows() {
  console.log('Starting workflow import...');
  
  try {
    // Test database connection first
    const { data: testData, error: testError } = await supabase
      .from('workflows')
      .select('count', { count: 'exact', head: true });
    
    if (testError) {
      console.error('❌ Database connection failed:', testError);
      return;
    }
    
    console.log('✅ Database connection successful');
    
    // Get workflow files
    const workflowsDir = path.join(__dirname, 'n8n-workflows', 'workflows');
    
    if (!fs.existsSync(workflowsDir)) {
      console.error('❌ Workflows directory not found:', workflowsDir);
      return;
    }
    
    const files = fs.readdirSync(workflowsDir)
      .filter(file => file.endsWith('.json'))
      .sort();
    
    console.log(`Found ${files.length} workflow files`);
    
    const workflowsToInsert = [];
    let processed = 0;
    
    for (const filename of files) {
      try {
        const filePath = path.join(workflowsDir, filename);
        const workflowData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        const workflow = processWorkflow(workflowData, filename);
        workflowsToInsert.push(workflow);
        
        processed++;
        if (processed % 100 === 0) {
          console.log(`Processed ${processed} workflows...`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error.message);
        continue;
      }
    }
    
    console.log(`✅ Processed ${workflowsToInsert.length} workflows`);
    
    // Insert in smaller batches with better error handling
    const batchSize = 50; // Reduced batch size
    let inserted = 0;
    
    for (let i = 0; i < workflowsToInsert.length; i += batchSize) {
      const batch = workflowsToInsert.slice(i, i + batchSize);
      
      try {
        const { data, error } = await supabase
          .from('workflows')
          .insert(batch)
          .select('id');
        
        if (error) {
          console.error(`❌ Batch ${Math.floor(i/batchSize) + 1} error:`, error);
          
          // Try inserting one by one to identify problematic records
          for (const workflow of batch) {
            try {
              const { error: singleError } = await supabase
                .from('workflows')
                .insert([workflow]);
              
              if (singleError) {
                console.error(`❌ Failed to insert ${workflow.filename}:`, singleError);
              } else {
                inserted++;
              }
            } catch (singleErr) {
              console.error(`❌ Exception inserting ${workflow.filename}:`, singleErr.message);
            }
          }
        } else {
          inserted += batch.length;
          console.log(`✅ Inserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(workflowsToInsert.length/batchSize)} (${inserted}/${workflowsToInsert.length})`);
        }
        
      } catch (error) {
        console.error(`❌ Batch exception:`, error.message);
        continue;
      }
    }
    
    console.log(`\n🎉 Successfully imported ${inserted} workflows!`);
    
  } catch (error) {
    console.error('❌ Import error:', error);
  }
}

// Run the import
importWorkflows();