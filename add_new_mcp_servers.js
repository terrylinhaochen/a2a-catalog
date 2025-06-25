// Add new MCP servers to the database
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const supabaseUrl = 'https://lkyitzrjxptvtahigtdz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreWl0enJqeHB0dnRhaGlndGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMDIzMjIsImV4cCI6MjA2NTg3ODMyMn0.V_gXx2pJWKHMSVstAU8mbw1TSBCct4nBe6IgtgU4VzY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// New MCP servers to add
const newMcpServers = [
  {
    id: randomUUID(),
    name: 'Atlassian MCP',
    description: 'Atlassian software development tools integration',
    provider: 'Atlassian',
    connection_url: 'https://mcp.atlassian.com/v1/sse',
    categories: ['Software Development'],
    skills: ['Project Management', 'Issue Tracking', 'Code Review'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Cloudflare Workers MCP',
    description: 'Cloudflare Workers serverless platform integration',
    provider: 'Cloudflare',
    connection_url: 'https://bindings.mcp.cloudflare.com/sse',
    categories: ['Software Development'],
    skills: ['Serverless Computing', 'Edge Computing', 'Web Development'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Cloudflare Observability MCP',
    description: 'Cloudflare observability and monitoring tools',
    provider: 'Cloudflare',
    connection_url: 'https://observability.mcp.cloudflare.com/sse',
    categories: ['Observability'],
    skills: ['Monitoring', 'Logging', 'Metrics', 'Alerting'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Dialer MCP',
    description: 'Outbound phone calls and communication platform',
    provider: 'Dialer',
    connection_url: 'https://getdialer.app/sse',
    categories: ['Communication'],
    skills: ['Phone Calls', 'Voice Communication', 'Outbound Dialing'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Octagon MCP',
    description: 'Market intelligence and competitive analysis platform',
    provider: 'Octagon',
    connection_url: 'https://mcp.octagonagents.com/mcp',
    categories: ['Market Intelligence'],
    skills: ['Competitive Analysis', 'Market Research', 'Business Intelligence'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'OneContext MCP',
    description: 'RAG-as-a-Service platform for AI applications',
    provider: 'OneContext',
    connection_url: 'https://rag-mcp-2.whatsmcp.workers.dev/sse',
    categories: ['RAG-as-a-Service'],
    skills: ['Retrieval Augmented Generation', 'AI Integration', 'Knowledge Base'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Plaid MCP',
    description: 'Financial data and payment processing platform',
    provider: 'Plaid',
    connection_url: 'https://api.dashboard.plaid.com/mcp/sse',
    categories: ['Payments'],
    skills: ['Financial Data', 'Payment Processing', 'Banking Integration'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Prisma Postgres MCP',
    description: 'Prisma ORM integration for PostgreSQL databases',
    provider: 'Prisma Postgres',
    connection_url: 'https://www.prisma.io/docs/postgres/integrations/mcp-server#remote-mcp-server',
    categories: ['Database'],
    skills: ['PostgreSQL', 'ORM', 'Database Management', 'Data Modeling'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Scorecard MCP',
    description: 'AI evaluation and assessment platform',
    provider: 'Scorecard',
    connection_url: 'https://scorecard-mcp.dare-d5b.workers.dev/mcp',
    categories: ['AI Evaluation'],
    skills: ['AI Assessment', 'Evaluation Metrics', 'Performance Testing'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Webflow MCP',
    description: 'Webflow CMS and website building platform',
    provider: 'Webflow',
    connection_url: 'https://mcp.webflow.com/sse',
    categories: ['CMS'],
    skills: ['Website Building', 'Content Management', 'Design Tools'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Wix MCP',
    description: 'Wix website building and CMS platform',
    provider: 'Wix',
    connection_url: 'https://mcp.wix.com/sse',
    categories: ['CMS'],
    skills: ['Website Building', 'Content Management', 'E-commerce'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Kollektiv MCP',
    description: 'Documentation and knowledge management platform',
    provider: 'Kollektiv',
    connection_url: 'https://mcp.thekollektiv.ai/sse',
    categories: ['Documentation'],
    skills: ['Knowledge Management', 'Documentation', 'Collaboration'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Simplescraper MCP',
    description: 'Web scraping and data extraction platform',
    provider: 'Simplescraper',
    connection_url: 'https://mcp.simplescraper.io/mcp',
    categories: ['Web Scraping'],
    skills: ['Data Extraction', 'Web Scraping', 'Automation'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'WayStation MCP',
    description: 'Productivity and workflow automation platform',
    provider: 'WayStation',
    connection_url: 'https://waystation.ai/mcp',
    categories: ['Productivity'],
    skills: ['Workflow Automation', 'Productivity Tools', 'Task Management'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Cloudflare Docs MCP',
    description: 'Cloudflare documentation and knowledge base',
    provider: 'Cloudflare',
    connection_url: 'https://docs.mcp.cloudflare.com/sse',
    categories: ['Documentation'],
    skills: ['Documentation Search', 'Knowledge Base', 'Technical Docs'],
    auth_type: 'open',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Hugging Face MCP',
    description: 'Hugging Face machine learning models and datasets',
    provider: 'Hugging Face',
    connection_url: 'https://hf.co/mcp',
    categories: ['Software Development'],
    skills: ['Machine Learning', 'AI Models', 'Datasets', 'NLP'],
    auth_type: 'open',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Semgrep MCP',
    description: 'Semgrep static analysis and security scanning',
    provider: 'Semgrep',
    connection_url: 'https://mcp.semgrep.ai/sse',
    categories: ['Software Development'],
    skills: ['Static Analysis', 'Security Scanning', 'Code Review', 'Vulnerability Detection'],
    auth_type: 'open',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Remote MCP Directory',
    description: 'Directory of remote MCP servers and resources',
    provider: 'Remote MCP',
    connection_url: 'https://mcp.remote-mcp.com',
    categories: ['MCP Directory'],
    skills: ['MCP Discovery', 'Server Directory', 'Resource Management'],
    auth_type: 'open',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Bitte MCP',
    description: 'Blockchain data analysis and insights platform',
    provider: 'Bitte',
    connection_url: 'https://mcp.bitte.ai/sse',
    categories: ['Blockchain Data Analysis'],
    skills: ['Blockchain Analysis', 'Data Insights', 'Cryptocurrency'],
    auth_type: 'open',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'McPoogle MCP',
    description: 'MCP server search engine and discovery platform',
    provider: 'McPoogle',
    connection_url: 'https://mcp.mcpoogle.com/sse',
    categories: ['MCP Server Search Engine'],
    skills: ['MCP Discovery', 'Search Engine', 'Server Directory'],
    auth_type: 'open',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'LLM Text MCP',
    description: 'Data analysis and text processing with LLMs',
    provider: 'LLM Text',
    connection_url: 'https://mcp.llmtxt.dev/sse',
    categories: ['Data Analysis'],
    skills: ['Text Processing', 'Data Analysis', 'LLM Integration'],
    auth_type: 'open',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'GitMCP',
    description: 'Git integration and version control management',
    provider: 'GitMCP',
    connection_url: 'https://gitmcp.io/docs',
    categories: ['Software Development'],
    skills: ['Git', 'Version Control', 'Repository Management'],
    auth_type: 'open',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'HubSpot MCP',
    description: 'HubSpot CRM and marketing automation platform',
    provider: 'HubSpot',
    connection_url: 'https://app.hubspot.com/mcp/v1/http',
    categories: ['CRM'],
    skills: ['Customer Relationship Management', 'Marketing Automation', 'Sales Tools'],
    auth_type: 'api_key',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Stripe MCP',
    description: 'Stripe payment processing and financial services',
    provider: 'Stripe',
    connection_url: 'https://mcp.stripe.com/',
    categories: ['Payments'],
    skills: ['Payment Processing', 'Financial Services', 'E-commerce'],
    auth_type: 'api_key',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Needle MCP',
    description: 'RAG-as-a-service platform for AI applications',
    provider: 'Needle',
    connection_url: 'https://mcp.needle-ai.com/mcp',
    categories: ['RAG-as-a-Service'],
    skills: ['Retrieval Augmented Generation', 'AI Integration', 'Knowledge Base'],
    auth_type: 'api_key',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Zapier MCP',
    description: 'Zapier automation and workflow integration platform',
    provider: 'Zapier',
    connection_url: 'https://mcp.zapier.com/api/mcp/mcp',
    categories: ['Automation'],
    skills: ['Workflow Automation', 'App Integration', 'Data Sync'],
    auth_type: 'api_key',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Apify MCP',
    description: 'Web data extraction and automation platform',
    provider: 'Apify',
    connection_url: 'https://mcp.apify.com',
    categories: ['Web Data Extraction Platform'],
    skills: ['Web Scraping', 'Data Extraction', 'Automation'],
    auth_type: 'api_key',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Dappier MCP',
    description: 'RAG-as-a-Service platform for AI applications',
    provider: 'Dappier',
    connection_url: 'https://mcp.dappier.com/mcp',
    categories: ['RAG-as-a-Service'],
    skills: ['Retrieval Augmented Generation', 'AI Integration', 'Knowledge Base'],
    auth_type: 'api_key',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'Mercado Pago MCP',
    description: 'Mercado Pago payment processing platform',
    provider: 'Mercado Pago MCP Server',
    connection_url: 'https://mcp.mercadopago.com/mcp',
    categories: ['Payments'],
    skills: ['Payment Processing', 'E-commerce', 'Financial Services'],
    auth_type: 'api_key',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  },
  {
    id: randomUUID(),
    name: 'monday.com MCP',
    description: 'monday.com project management and CRM platform',
    provider: 'monday.com',
    connection_url: 'https://mcp.monday.com/sse',
    categories: ['Project Management', 'CRM', 'WorkOS', 'Service'],
    skills: ['Project Management', 'Customer Relationship Management', 'Workflow Management'],
    auth_type: 'oauth',
    server_type: 'remote',
    votes: 0,
    is_verified: true
  }
];

async function addNewMcpServers() {
  try {
    console.log('Adding new MCP servers to database...');
    console.log(`Total servers to add: ${newMcpServers.length}`);

    // Check for existing servers to avoid duplicates
    const { data: existingServers, error: fetchError } = await supabase
      .from('mcp_servers')
      .select('id, name, connection_url');

    if (fetchError) {
      console.error('Error fetching existing servers:', fetchError);
      return;
    }

    // Filter out servers that already exist
    const existingUrls = existingServers.map(s => s.connection_url);
    
    const serversToAdd = newMcpServers.filter(server => {
      const alreadyExists = existingUrls.includes(server.connection_url);
      if (alreadyExists) {
        console.log(`Skipping ${server.name} - already exists`);
      }
      return !alreadyExists;
    });

    console.log(`\nServers to add: ${serversToAdd.length}`);

    if (serversToAdd.length === 0) {
      console.log('No new servers to add');
      return;
    }

    // Add the new servers
    const { data: insertedServers, error: insertError } = await supabase
      .from('mcp_servers')
      .insert(serversToAdd)
      .select();

    if (insertError) {
      console.error('Error inserting servers:', insertError);
    } else {
      console.log(`\nSuccessfully added ${insertedServers.length} new MCP servers:`);
      insertedServers.forEach(server => {
        console.log(`- ${server.name} (${server.provider}): ${server.connection_url}`);
      });
    }

    // Verify the total count
    const { data: allServers, error: verifyError } = await supabase
      .from('mcp_servers')
      .select('*')
      .eq('server_type', 'remote');

    if (verifyError) {
      console.error('Error verifying servers:', verifyError);
    } else {
      console.log(`\nTotal remote MCP servers in database: ${allServers.length}`);
    }

  } catch (err) {
    console.error('Error adding MCP servers:', err);
  }
}

addNewMcpServers(); 