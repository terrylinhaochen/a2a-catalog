-- Update Remote MCP Servers with the new list
-- Run this in your Supabase SQL Editor

-- First, remove existing remote MCP servers
DELETE FROM public.mcp_servers 
WHERE server_type = 'remote' AND connection_url IS NOT NULL;

-- Insert the new remote MCP servers
INSERT INTO public.mcp_servers (
    id,
    name,
    description,
    provider,
    connection_url,
    categories,
    skills,
    auth_type,
    server_type,
    votes,
    is_verified,
    created_at,
    updated_at
) VALUES
(gen_random_uuid(), 'GitHub Copilot MCP', 'GitHub''s official MCP Server', 'github', 'https://api.githubcopilot.com/mcp/', ARRAY['Development', 'Code Assistance'], ARRAY['code_completion', 'repository_management', 'ai_assisted_coding'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Sentry MCP', 'Sentry is a developer-first error tracking and performance monitoring platform.', 'sentry', 'https://mcp.sentry.dev/sse', ARRAY['Monitoring', 'Error Tracking'], ARRAY['error_tracking', 'performance_monitoring', 'application_monitoring'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Linear MCP', 'Linear is a project management tool.', 'linear', 'https://mcp.linear.app/sse', ARRAY['Project Management'], ARRAY['issue_tracking', 'project_management', 'team_workflow'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'DeepWiki MCP', 'DeepWiki automatically generates architecture diagrams, documentation, and links to source code to help you understand unfamiliar codebases quickly.', 'deepwiki', 'https://mcp.deepwiki.com/mcp', ARRAY['Documentation', 'AI'], ARRAY['architecture_diagrams', 'documentation_generation', 'ai_assisted_writing'], 'open', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Intercom MCP', 'Intercom is a customer support platform.', 'intercom', 'https://mcp.intercom.com/sse', ARRAY['Customer Support'], ARRAY['customer_support', 'conversation_management', 'help_desk'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Neon MCP', 'Neon is a fully managed serverless PostgreSQL.', 'neon', 'https://mcp.neon.tech/sse', ARRAY['Database'], ARRAY['postgresql', 'serverless_database', 'database_management'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'PayPal MCP', 'PayPal is a global online payment system.', 'paypal', 'https://mcp.paypal.com/sse', ARRAY['Payments'], ARRAY['payment_processing', 'online_payments', 'financial_transactions'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Square MCP', 'Square is a payment processing platform.', 'square', 'https://mcp.squareup.com/sse', ARRAY['Payments'], ARRAY['payment_processing', 'point_of_sale', 'financial_services'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'CoinGecko MCP', 'CoinGecko is a cryptocurrency data platform.', 'coingecko', 'https://mcp.api.coingecko.com/sse', ARRAY['Cryptocurrency'], ARRAY['crypto_data', 'market_analysis', 'price_tracking'], 'open', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Asana MCP', 'Asana is a project management tool.', 'asana', 'https://mcp.asana.com/sse', ARRAY['Project Management'], ARRAY['project_management', 'task_tracking', 'team_collaboration'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Globalping MCP', 'Remote MCP server that gives LLMs access to run network commands with Globalping', 'globalping', 'https://mcp.globalping.dev/sse', ARRAY['Networking'], ARRAY['network_commands', 'ping_analysis', 'network_monitoring'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Semgrep MCP', 'Semgrep is a static analysis tool for code security and quality.', 'semgrep', 'https://mcp.semgrep.ai/sse', ARRAY['Security', 'Code Analysis'], ARRAY['static_analysis', 'security_scanning', 'code_quality'], 'open', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Fetch MCP', 'An MCP server that provides web content fetching capabilities. This server enables LLMs to retrieve and process content from web pages, converting HTML to markdown for easier consumption.', 'mcpservers', 'https://remote.mcpservers.org/fetch/mcp', ARRAY['Web Scraping'], ARRAY['web_fetching', 'html_to_markdown', 'content_extraction'], 'open', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Sequential Thinking MCP', 'An MCP server implementation that provides a tool for dynamic and reflective problem-solving through a structured thinking process.', 'mcpservers', 'https://remote.mcpservers.org/sequentialthinking/mcp', ARRAY['AI Tools'], ARRAY['problem_solving', 'structured_thinking', 'ai_reasoning'], 'open', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'EdgeOne Pages MCP', 'An MCP service designed for deploying HTML content to EdgeOne Pages and obtaining an accessible public URL.', 'mcpservers', 'https://remote.mcpservers.org/edgeone-pages/mcp', ARRAY['Deployment'], ARRAY['static_deployment', 'cdn_distribution', 'html_hosting'], 'open', 'remote', 0, true, NOW(), NOW());

-- Verify the update
SELECT 
    'Total Remote MCP Servers' as metric,
    COUNT(*) as count
FROM public.mcp_servers 
WHERE server_type = 'remote' AND connection_url IS NOT NULL;

-- Show all remote MCP servers
SELECT 
    name,
    provider,
    connection_url as endpoint,
    auth_type,
    categories
FROM public.mcp_servers 
WHERE server_type = 'remote' AND connection_url IS NOT NULL
ORDER BY name; 