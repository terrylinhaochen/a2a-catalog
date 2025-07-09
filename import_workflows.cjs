const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = "https://lkyitzrjxptvtahigtdz.supabase.co";
const supabaseKey = "***REMOVED-SERVICE-KEY***";
const supabase = createClient(supabaseUrl, supabaseKey);

// Path to workflows directory
const workflowsDir = path.join(__dirname, 'n8n-workflows', 'workflows');

// Category mapping from n8n-workflows/context/def_categories.json
const categoryMapping = {
  "APITemplate.io": "Creative Design Automation",
  "AWS Transcribe": "AI Agent Development",
  "AWSComprehend": "AI Agent Development",
  "AWSLambda": "Technical Infrastructure & DevOps",
  "AWSRekognition": "AI Agent Development",
  "AWSS3": "Cloud Storage & File Management",
  "AWSSES": "Marketing & Advertising Automation",
  "AWSSNS": "Communication & Messaging",
  "AWSSQS": "Technical Infrastructure & DevOps",
  "ActiveCampaign": "Marketing & Advertising Automation",
  "Affinity": "CRM & Sales",
  "Agent": "AI Agent Development",
  "Airtable": "Data Processing & Analysis",
  "Asana": "Project Management",
  "Automizy": "Marketing & Advertising Automation",
  "Autopilot": "Marketing & Advertising Automation",
  "Bannerbear": "Creative Design Automation",
  "BasicLLMChain": "AI Agent Development",
  "Beeminder": "Business Process Automation",
  "Bitly": "Marketing & Advertising Automation",
  "Box": "Cloud Storage & File Management",
  "Brandfetch": "Web Scraping & Data Extraction",
  "ChargeBee": "Financial & Accounting",
  "CircleCI": "Technical Infrastructure & DevOps",
  "Clearbit": "Marketing & Advertising Automation",
  "ClickUp": "Project Management",
  "Clockify": "Business Process Automation",
  "Cockpit": "Data Processing & Analysis",
  "Coda": "Data Processing & Analysis",
  "CoinGecko": "Financial & Accounting",
  "ConvertKit": "Marketing & Advertising Automation",
  "Copper": "CRM & Sales",
  "Cortex": "Technical Infrastructure & DevOps",
  "CrateDB": "Data Processing & Analysis",
  "Customerio": "Marketing & Advertising Automation",
  "Deepl": "AI Agent Development",
  "Demio": "Communication & Messaging",
  "Discord": "Communication & Messaging",
  "Discourse": "Communication & Messaging",
  "Disqus": "Communication & Messaging",
  "Drift": "Communication & Messaging",
  "DropBox": "Cloud Storage & File Management",
  "E-goi": "Marketing & Advertising Automation",
  "EditImage": "Creative Design Automation",
  "Emelia": "Marketing & Advertising Automation",
  "ExecuteWorkflow": "Business Process Automation",
  "FTP": "Technical Infrastructure & DevOps",
  "Flow": "Business Process Automation",
  "FreshDesk": "Communication & Messaging",
  "FunctionItem": "Business Process Automation",
  "GetResponse": "Marketing & Advertising Automation",
  "Ghost": "Creative Content & Video Automation",
  "Git": "Technical Infrastructure & DevOps",
  "GitLab": "Technical Infrastructure & DevOps",
  "Github": "Technical Infrastructure & DevOps",
  "Gmail": "Communication & Messaging",
  "GoogleBooks": "Web Scraping & Data Extraction",
  "GoogleCalendar": "Business Process Automation",
  "GoogleCloudFirestore": "Data Processing & Analysis",
  "GoogleContacts": "CRM & Sales",
  "GoogleDrive": "Cloud Storage & File Management",
  "GoogleSheets": "Data Processing & Analysis",
  "GoogleSlides": "Creative Content & Video Automation",
  "GoogleTask": "Project Management",
  "Gotify": "Communication & Messaging",
  "HTML Extract": "Web Scraping & Data Extraction",
  "HTTP": "Web Scraping & Data Extraction",
  "Hackernews": "Web Scraping & Data Extraction",
  "Harvest": "Business Process Automation",
  "HelpScout": "Communication & Messaging",
  "Hubspot": "CRM & Sales",
  "Hunter": "Marketing & Advertising Automation",
  "InMemoryVectorStore": "AI Agent Development",
  "Intercom": "Communication & Messaging",
  "InvoiceNinja": "Financial & Accounting",
  "Iterable": "Marketing & Advertising Automation",
  "Keap": "CRM & Sales",
  "Kitemaker": "Project Management",
  "Lemlist": "Marketing & Advertising Automation",
  "Line": "Communication & Messaging",
  "LingvaNex": "AI Agent Development",
  "Linkedin": "Social Media Management",
  "MQTT": "Technical Infrastructure & DevOps",
  "MailCheck": "Marketing & Advertising Automation",
  "Mailchimp": "Marketing & Advertising Automation",
  "Mailerlite": "Marketing & Advertising Automation",
  "Mailjet": "Marketing & Advertising Automation",
  "Mandrill": "Marketing & Advertising Automation",
  "Matrix": "Communication & Messaging",
  "Mattermost": "Communication & Messaging",
  "Mautic": "Marketing & Advertising Automation",
  "Medium": "Creative Content & Video Automation",
  "MessageBird": "Communication & Messaging",
  "Microsoft OneDrive": "Cloud Storage & File Management",
  "MicrosoftExcel": "Data Processing & Analysis",
  "MicrosoftOutlook": "Communication & Messaging",
  "MicrosoftSQL": "Data Processing & Analysis",
  "Mindee": "AI Agent Development",
  "Mocean": "Communication & Messaging",
  "Monday": "Project Management",
  "MongoDB": "Data Processing & Analysis",
  "Move Binary Data": "Data Processing & Analysis",
  "MySQL": "Data Processing & Analysis",
  "NASA": "Web Scraping & Data Extraction",
  "NextCloud": "Cloud Storage & File Management",
  "OpenThesaurus": "AI Agent Development",
  "OpenWeatherMap": "Web Scraping & Data Extraction",
  "Orbit": "CRM & Sales",
  "Paddle": "Financial & Accounting",
  "PagerDuty": "Technical Infrastructure & DevOps",
  "Paypal": "Financial & Accounting",
  "Peekalink": "Web Scraping & Data Extraction",
  "PhantomBuster": "Web Scraping & Data Extraction",
  "PineconeVectorStore": "AI Agent Development",
  "Pipedrive": "CRM & Sales",
  "PostHog": "Data Processing & Analysis",
  "Postgres": "Data Processing & Analysis",
  "ProfitWell": "Financial & Accounting",
  "Pushbullet": "Communication & Messaging",
  "Pushover": "Communication & Messaging",
  "QdrantVectorStore": "AI Agent Development",
  "QuestDB": "Data Processing & Analysis",
  "QuickBase": "Data Processing & Analysis",
  "QuickBooks": "Financial & Accounting",
  "Rabbitmq": "Technical Infrastructure & DevOps",
  "Raindrop": "Business Process Automation",
  "Reddit": "Social Media Management",
  "Redis": "Data Processing & Analysis",
  "RocketChat": "Communication & Messaging",
  "Rundeck": "Technical Infrastructure & DevOps",
  "S3": "Cloud Storage & File Management",
  "SIGNL4": "Communication & Messaging",
  "Salesforce": "CRM & Sales",
  "Salesmate": "CRM & Sales",
  "Segment": "Data Processing & Analysis",
  "SendGrid": "Marketing & Advertising Automation",
  "SentryIo": "Technical Infrastructure & DevOps",
  "Shopify": "E-commerce & Retail",
  "Slack": "Communication & Messaging",
  "Spontit": "Communication & Messaging",
  "Spotify": "Creative Content & Video Automation",
  "Stackby": "Data Processing & Analysis",
  "Storyblok": "Creative Content & Video Automation",
  "Strapi": "Creative Content & Video Automation",
  "Strava": "Business Process Automation",
  "SummarizationChain": "AI Agent Development",
  "Taiga": "Project Management",
  "Tapfiliate": "Marketing & Advertising Automation",
  "Telegram": "Communication & Messaging",
  "TheHive[v3]": "Technical Infrastructure & DevOps",
  "TheHive[v4]": "Technical Infrastructure & DevOps",
  "TimescaleDB": "Data Processing & Analysis",
  "Todoist": "Project Management",
  "TravisCI": "Technical Infrastructure & DevOps",
  "Trello": "Project Management",
  "Twilio": "Communication & Messaging",
  "Twist": "Communication & Messaging",
  "Twitter": "Social Media Management",
  "UnleashedSoftware": "Business Process Automation",
  "Uplead": "Marketing & Advertising Automation",
  "Vero": "Marketing & Advertising Automation",
  "Vonage": "Communication & Messaging",
  "Webflow": "Creative Design Automation",
  "Wekan": "Project Management",
  "Wise": "Financial & Accounting",
  "Wordpress": "Creative Content & Video Automation",
  "XML": "Data Processing & Analysis",
  "Xero": "Financial & Accounting",
  "Yourls": "Marketing & Advertising Automation",
  "Youtube": "Creative Content & Video Automation",
  "Zendesk": "Communication & Messaging",
  "ZohoCRM": "CRM & Sales",
  "Zoom": "Communication & Messaging",
  "Zulip": "Communication & Messaging",
  "uProc": "Data Processing & Analysis",
  "vectorStorePGVector": "AI Agent Development"
};

// Function to extract integrations from node types
function extractIntegrations(nodes) {
  const integrations = new Set();
  
  nodes.forEach(node => {
    if (node.type) {
      // Extract the node type (remove namespace prefix)
      const nodeType = node.type.includes('.') ? node.type.split('.').pop() : node.type;
      
      // Skip generic n8n nodes
      const skipNodes = ['stickyNote', 'if', 'switch', 'merge', 'code', 'set', 'function', 'split', 'itemLists', 'wait', 'loop', 'executeWorkflow', 'noOp', 'filter', 'aggregate', 'sort', 'limit', 'rename', 'removeDuplicates', 'dateTime', 'xml', 'json', 'moveBinaryData', 'compression', 'crypto', 'spreadsheetFile', 'pdf', 'html', 'readPdf', 'editImage', 'executionData', 'readBinaryFile', 'readBinaryFiles', 'writeBinaryFile', 'summarizationChain', 'basicLLMChain', 'vectorStorePGVector', 'pineconeVectorStore', 'inMemoryVectorStore', 'qdrantVectorStore', 'langchainSearch', 'langchainAgent'];
      
      if (skipNodes.includes(nodeType)) {
        return;
      }
      
      // Map n8n node types to proper integration names
      const nodeTypeMapping = {
        'telegram': 'Telegram',
        'gmail': 'Gmail',
        'googleSheets': 'Google Sheets',
        'googleDrive': 'Google Drive',
        'googleCalendar': 'Google Calendar',
        'googleContacts': 'Google Contacts',
        'googleSlides': 'Google Slides',
        'googleTask': 'Google Tasks',
        'googleBooks': 'Google Books',
        'googleCloudFirestore': 'Google Cloud Firestore',
        'slack': 'Slack',
        'discord': 'Discord',
        'airtable': 'Airtable',
        'hubspot': 'HubSpot',
        'trello': 'Trello',
        'notion': 'Notion',
        'asana': 'Asana',
        'clickup': 'ClickUp',
        'pipedrive': 'Pipedrive',
        'salesforce': 'Salesforce',
        'stripe': 'Stripe',
        'shopify': 'Shopify',
        'twitter': 'Twitter',
        'linkedin': 'LinkedIn',
        'facebook': 'Facebook',
        'instagram': 'Instagram',
        'youtube': 'YouTube',
        'spotify': 'Spotify',
        'twilio': 'Twilio',
        'mailchimp': 'Mailchimp',
        'sendgrid': 'SendGrid',
        'mailjet': 'Mailjet',
        'mandrill': 'Mandrill',
        'mailerlite': 'MailerLite',
        'mailCheck': 'MailCheck',
        'getresponse': 'GetResponse',
        'convertkit': 'ConvertKit',
        'activecampaign': 'ActiveCampaign',
        'customerio': 'Customer.io',
        'http': 'HTTP Request',
        'webhook': 'Webhook',
        'mysql': 'MySQL',
        'postgres': 'PostgreSQL',
        'mongodb': 'MongoDB',
        'redis': 'Redis',
        'microsoftSQL': 'Microsoft SQL',
        'microsoftExcel': 'Microsoft Excel',
        'microsoftOutlook': 'Microsoft Outlook',
        'microsoftOneDrive': 'Microsoft OneDrive',
        'aws': 'AWS',
        'awsS3': 'AWS S3',
        'awsLambda': 'AWS Lambda',
        'awsSES': 'AWS SES',
        'awsSNS': 'AWS SNS',
        'awsSQS': 'AWS SQS',
        'awsRekognition': 'AWS Rekognition',
        'awsTranscribe': 'AWS Transcribe',
        'awsComprehend': 'AWS Comprehend',
        'dropbox': 'Dropbox',
        'onedrive': 'OneDrive',
        'github': 'GitHub',
        'gitlab': 'GitLab',
        'git': 'Git',
        'zendesk': 'Zendesk',
        'intercom': 'Intercom',
        'freshdesk': 'FreshDesk',
        'helpscout': 'HelpScout',
        'mattermost': 'Mattermost',
        'matrix': 'Matrix',
        'rocketchat': 'Rocket.Chat',
        'zulip': 'Zulip',
        'openai': 'OpenAI',
        'anthropic': 'Anthropic',
        'deepl': 'DeepL',
        'lingvanex': 'LingvaNex',
        'openthesaurus': 'OpenThesaurus',
        'mindee': 'Mindee',
        'ftp': 'FTP',
        'ssh': 'SSH',
        'docker': 'Docker',
        'kubernetes': 'Kubernetes',
        'jenkins': 'Jenkins',
        'travisci': 'Travis CI',
        'circleci': 'CircleCI',
        'jira': 'Jira',
        'confluence': 'Confluence',
        'monday': 'Monday.com',
        'basecamp': 'Basecamp',
        'todoist': 'Todoist',
        'microsoft365': 'Microsoft 365',
        'zoom': 'Zoom',
        'webex': 'Webex',
        'teams': 'Microsoft Teams',
        'calendly': 'Calendly',
        'adobe': 'Adobe',
        'figma': 'Figma',
        'canva': 'Canva',
        'bannerbear': 'Bannerbear',
        'webflow': 'Webflow',
        'wordpress': 'WordPress',
        'drupal': 'Drupal',
        'ghost': 'Ghost',
        'medium': 'Medium',
        'storyblok': 'Storyblok',
        'strapi': 'Strapi'
      };
      
      const integrationName = nodeTypeMapping[nodeType.toLowerCase()] || 
                            nodeType.charAt(0).toUpperCase() + nodeType.slice(1);
      integrations.add(integrationName);
    }
  });
  
  return Array.from(integrations);
}

// Function to determine trigger type from nodes
function determineTriggerType(nodes) {
  const triggerNodes = nodes.filter(node => 
    node.type && (
      node.type.includes('trigger') || 
      node.type.includes('webhook') || 
      node.type.includes('cron') ||
      node.type.includes('manual')
    )
  );
  
  if (triggerNodes.length === 0) return 'manual';
  if (triggerNodes.length > 1) return 'complex';
  
  const triggerType = triggerNodes[0].type.toLowerCase();
  
  if (triggerType.includes('webhook')) return 'webhook';
  if (triggerType.includes('cron') || triggerType.includes('schedule')) return 'scheduled';
  if (triggerType.includes('manual')) return 'manual';
  
  return 'manual';
}

// Function to determine complexity based on node count
function determineComplexity(nodeCount) {
  if (nodeCount <= 5) return 'low';
  if (nodeCount <= 15) return 'medium';
  return 'high';
}

// Function to create workflow name from filename
function createWorkflowName(filename) {
  return filename
    .replace(/^\d+_/, '') // Remove number prefix
    .replace(/\.json$/, '') // Remove .json extension
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
}

// Function to generate categories from integrations
function generateCategories(integrations) {
  const categories = new Set();
  
  integrations.forEach(integration => {
    const category = categoryMapping[integration];
    if (category) {
      categories.add(category);
    }
  });
  
  return Array.from(categories).length > 0 ? Array.from(categories) : ['Uncategorized'];
}

// Function to generate description from workflow content
function generateDescription(workflowData, integrations, triggerType) {
  const name = workflowData.name || 'Workflow';
  const integrationsText = integrations.slice(0, 3).join(', ');
  const triggerText = triggerType === 'manual' ? 'manual trigger' : 
                    triggerType === 'webhook' ? 'webhook trigger' :
                    triggerType === 'scheduled' ? 'scheduled trigger' : 'automated trigger';
  
  return `${name} - An n8n workflow automation that integrates ${integrationsText} with ${triggerText}. This workflow automates tasks and processes data between connected services.`;
}

// Main function to process workflows
async function importWorkflows() {
  console.log('Starting workflow import...');
  
  try {
    // Get all JSON files in the workflows directory
    const files = fs.readdirSync(workflowsDir)
      .filter(file => file.endsWith('.json'))
      .sort();
    
    console.log(`Found ${files.length} workflow files to process`);
    
    const workflowsToInsert = [];
    
    for (const filename of files) {
      try {
        const filePath = path.join(workflowsDir, filename);
        const workflowData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Extract information from workflow
        const nodes = workflowData.nodes || [];
        const integrations = extractIntegrations(nodes);
        const triggerType = determineTriggerType(nodes);
        const nodeCount = nodes.length;
        const complexity = determineComplexity(nodeCount);
        const categories = generateCategories(integrations);
        const name = createWorkflowName(filename);
        const description = generateDescription(workflowData, integrations, triggerType);
        
        // Create skills array from node types and workflow characteristics
        const skills = [...integrations, triggerType, complexity, 'automation', 'workflow'];
        
        const workflow = {
          name,
          description,
          provider: 'n8n',
          categories,
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
          is_verified: true, // Mark all imported workflows as verified
          featured: complexity === 'high' && integrations.length >= 3, // Feature complex workflows
          user_id: null // Null user_id for system-imported workflows
        };
        
        workflowsToInsert.push(workflow);
        
        if (workflowsToInsert.length % 100 === 0) {
          console.log(`Processed ${workflowsToInsert.length} workflows...`);
        }
        
      } catch (error) {
        console.error(`Error processing file ${filename}:`, error.message);
        continue;
      }
    }
    
    console.log(`Prepared ${workflowsToInsert.length} workflows for insertion`);
    
    // Insert workflows in batches
    const batchSize = 100;
    let inserted = 0;
    
    for (let i = 0; i < workflowsToInsert.length; i += batchSize) {
      const batch = workflowsToInsert.slice(i, i + batchSize);
      
      try {
        const { data, error } = await supabase
          .from('workflows')
          .insert(batch);
        
        if (error) {
          console.error('Error inserting batch:', error);
          continue;
        }
        
        inserted += batch.length;
        console.log(`Inserted ${inserted}/${workflowsToInsert.length} workflows`);
        
      } catch (error) {
        console.error('Error inserting batch:', error);
        continue;
      }
    }
    
    console.log(`Successfully imported ${inserted} workflows!`);
    
    // Print summary statistics
    const stats = {
      totalWorkflows: inserted,
      byTriggerType: {},
      byComplexity: {},
      byCategory: {},
      topIntegrations: {}
    };
    
    workflowsToInsert.forEach(workflow => {
      // Count by trigger type
      stats.byTriggerType[workflow.trigger_type] = (stats.byTriggerType[workflow.trigger_type] || 0) + 1;
      
      // Count by complexity
      stats.byComplexity[workflow.complexity] = (stats.byComplexity[workflow.complexity] || 0) + 1;
      
      // Count by categories
      workflow.categories.forEach(cat => {
        stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;
      });
      
      // Count by integrations
      workflow.integrations.forEach(integration => {
        stats.topIntegrations[integration] = (stats.topIntegrations[integration] || 0) + 1;
      });
    });
    
    console.log('\n=== Import Summary ===');
    console.log(`Total workflows imported: ${stats.totalWorkflows}`);
    console.log('\nBy trigger type:');
    Object.entries(stats.byTriggerType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    
    console.log('\nBy complexity:');
    Object.entries(stats.byComplexity).forEach(([complexity, count]) => {
      console.log(`  ${complexity}: ${count}`);
    });
    
    console.log('\nTop 10 categories:');
    Object.entries(stats.byCategory)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([category, count]) => {
        console.log(`  ${category}: ${count}`);
      });
    
    console.log('\nTop 10 integrations:');
    Object.entries(stats.topIntegrations)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([integration, count]) => {
        console.log(`  ${integration}: ${count}`);
      });
    
  } catch (error) {
    console.error('Error during import:', error);
  }
}

// Run the import
if (require.main === module) {
  importWorkflows();
}

module.exports = { importWorkflows };