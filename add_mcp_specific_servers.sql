-- Add MCP-specific servers to the database
-- Run this in your Supabase SQL Editor

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
(gen_random_uuid(), 'Asana MCP', 'Project management tool', 'asana', 'https://mcp.asana.com/sse', ARRAY['Project Management'], ARRAY['project_management', 'task_tracking', 'team_collaboration'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'CoinGecko MCP', 'Cryptocurrency data platform', 'coingecko', 'https://mcp.api.coingecko.com/sse', ARRAY['Cryptocurrency'], ARRAY['crypto_data', 'market_analysis', 'price_tracking'], 'none', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'DeepWiki MCP', 'Automatically generates architecture diagrams and documentation', 'deepwiki', 'https://mcp.deepwiki.com/mcp', ARRAY['Documentation', 'AI'], ARRAY['architecture_diagrams', 'documentation_generation', 'ai_assisted_writing'], 'none', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'EdgeOne Pages MCP', 'Deploy HTML content to EdgeOne Pages and get public URLs', 'mcpservers', 'https://remote.mcpservers.org/edgeone-pages/mcp', ARRAY['Deployment'], ARRAY['static_deployment', 'cdn_distribution', 'html_hosting'], 'none', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Fetch MCP', 'Web content fetching capabilities, converts HTML to markdown', 'mcpservers', 'https://remote.mcpservers.org/fetch/mcp', ARRAY['Web Scraping'], ARRAY['web_fetching', 'html_to_markdown', 'content_extraction'], 'none', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'GitHub Copilot MCP', 'GitHub Copilot MCP server for code assistance and repository management', 'github', 'https://api.githubcopilot.com/mcp/', ARRAY['Development', 'Code Assistance'], ARRAY['code_completion', 'repository_management', 'ai_assisted_coding'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Globalping MCP', 'Remote MCP server for network commands with Globalping', 'globalping', 'https://mcp.globalping.dev/sse', ARRAY['Networking'], ARRAY['network_commands', 'ping_analysis', 'network_monitoring'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Intercom MCP', 'Customer support platform', 'intercom', 'https://mcp.intercom.com/sse', ARRAY['Customer Support'], ARRAY['customer_support', 'conversation_management', 'help_desk'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Linear MCP', 'Linear is a project management tool', 'linear', 'https://mcp.linear.app/sse', ARRAY['Project Management'], ARRAY['issue_tracking', 'project_management', 'team_workflow'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Neon MCP', 'Fully managed serverless PostgreSQL', 'neon', 'https://mcp.neon.tech/sse', ARRAY['Database'], ARRAY['postgresql', 'serverless_database', 'database_management'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'PayPal MCP', 'Global online payment system', 'paypal', 'https://mcp.paypal.com/sse', ARRAY['Payments'], ARRAY['payment_processing', 'online_payments', 'financial_transactions'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Sentry MCP', 'Developer-first error tracking and performance monitoring platform', 'sentry', 'https://mcp.sentry.dev/sse', ARRAY['Monitoring', 'Error Tracking'], ARRAY['error_tracking', 'performance_monitoring', 'application_monitoring'], 'oauth', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Sequential Thinking MCP', 'Dynamic and reflective problem-solving through structured thinking', 'mcpservers', 'https://remote.mcpservers.org/sequentialthinking/mcp', ARRAY['AI Tools'], ARRAY['problem_solving', 'structured_thinking', 'ai_reasoning'], 'none', 'remote', 0, true, NOW(), NOW()),
(gen_random_uuid(), 'Square MCP', 'Payment processing platform', 'square', 'https://mcp.squareup.com/sse', ARRAY['Payments'], ARRAY['payment_processing', 'point_of_sale', 'financial_services'], 'oauth', 'remote', 0, true, NOW(), NOW());

-- Verify the additions
SELECT 
    'Total Remote MCP Servers' as metric,
    COUNT(*) as count
FROM public.mcp_servers 
WHERE server_type = 'remote' AND connection_url IS NOT NULL; 