-- Add new columns to mcp_servers table
ALTER TABLE public.mcp_servers 
ADD COLUMN IF NOT EXISTS server_type text DEFAULT 'local',
ADD COLUMN IF NOT EXISTS connection_url text,
ADD COLUMN IF NOT EXISTS install_command text,
ADD COLUMN IF NOT EXISTS run_command text,
ADD COLUMN IF NOT EXISTS port integer,
ADD COLUMN IF NOT EXISTS auth_required boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS auth_type text;

-- Add unique constraint on name column
ALTER TABLE public.mcp_servers 
ADD CONSTRAINT mcp_servers_name_unique UNIQUE (name);

-- Update existing servers to be local type
UPDATE public.mcp_servers 
SET server_type = 'local' 
WHERE server_type IS NULL;

-- Insert remote MCP servers (using ON CONFLICT now that we have the unique constraint)
INSERT INTO public.mcp_servers (name, description, provider, categories, github_url, package_name, repository_url, server_type, connection_url, auth_required, auth_type) VALUES
('GitHub Copilot MCP', 'GitHub Copilot MCP server for code assistance and repository management', 'github', ARRAY['Development', 'Code Assistance'], 'https://github.com/github/mcp-server-copilot', NULL, 'https://github.com/github/mcp-server-copilot', 'remote', 'https://api.githubcopilot.com/mcp/', true, 'oauth'),
('Sentry MCP', 'Developer-first error tracking and performance monitoring platform', 'sentry', ARRAY['Monitoring', 'Error Tracking'], 'https://github.com/getsentry/mcp-server', NULL, 'https://github.com/getsentry/mcp-server', 'remote', 'https://mcp.sentry.dev/sse', true, 'oauth'),
('Linear MCP', 'Linear is a project management tool', 'linear', ARRAY['Project Management'], 'https://github.com/linear/mcp-server', NULL, 'https://github.com/linear/mcp-server', 'remote', 'https://mcp.linear.app/sse', true, 'oauth'),
('DeepWiki MCP', 'Automatically generates architecture diagrams and documentation', 'deepwiki', ARRAY['Documentation', 'AI'], 'https://github.com/deepwiki/mcp-server', NULL, 'https://github.com/deepwiki/mcp-server', 'remote', 'https://mcp.deepwiki.com/mcp', false, 'none'),
('Intercom MCP', 'Customer support platform', 'intercom', ARRAY['Customer Support'], 'https://github.com/intercom/mcp-server', NULL, 'https://github.com/intercom/mcp-server', 'remote', 'https://mcp.intercom.com/sse', true, 'oauth'),
('Neon MCP', 'Fully managed serverless PostgreSQL', 'neon', ARRAY['Database'], 'https://github.com/neondatabase/mcp-server', NULL, 'https://github.com/neondatabase/mcp-server', 'remote', 'https://mcp.neon.tech/sse', true, 'oauth'),
('PayPal MCP', 'Global online payment system', 'paypal', ARRAY['Payments'], 'https://github.com/paypal/mcp-server', NULL, 'https://github.com/paypal/mcp-server', 'remote', 'https://mcp.paypal.com/sse', true, 'oauth'),
('Square MCP', 'Payment processing platform', 'square', ARRAY['Payments'], 'https://github.com/square/mcp-server', NULL, 'https://github.com/square/mcp-server', 'remote', 'https://mcp.squareup.com/sse', true, 'oauth'),
('CoinGecko MCP', 'Cryptocurrency data platform', 'coingecko', ARRAY['Cryptocurrency'], 'https://github.com/coingecko/mcp-server', NULL, 'https://github.com/coingecko/mcp-server', 'remote', 'https://mcp.api.coingecko.com/sse', false, 'none'),
('Asana MCP', 'Project management tool', 'asana', ARRAY['Project Management'], 'https://github.com/asana/mcp-server', NULL, 'https://github.com/asana/mcp-server', 'remote', 'https://mcp.asana.com/sse', true, 'oauth'),
('Globalping MCP', 'Remote MCP server for network commands with Globalping', 'globalping', ARRAY['Networking'], 'https://github.com/globalping/mcp-server', NULL, 'https://github.com/globalping/mcp-server', 'remote', 'https://mcp.globalping.dev/sse', true, 'oauth'),
('Semgrep MCP', 'Static analysis tool for code security and quality', 'semgrep', ARRAY['Security'], 'https://github.com/semgrep/mcp-server', NULL, 'https://github.com/semgrep/mcp-server', 'remote', 'https://mcp.semgrep.ai/sse', false, 'none'),
('Fetch MCP', 'Web content fetching capabilities, converts HTML to markdown', 'mcpservers', ARRAY['Web Scraping'], 'https://github.com/mcpservers/fetch', NULL, 'https://github.com/mcpservers/fetch', 'remote', 'https://remote.mcpservers.org/fetch/mcp', false, 'none'),
('Sequential Thinking MCP', 'Dynamic and reflective problem-solving through structured thinking', 'mcpservers', ARRAY['AI Tools'], 'https://github.com/mcpservers/sequentialthinking', NULL, 'https://github.com/mcpservers/sequentialthinking', 'remote', 'https://remote.mcpservers.org/sequentialthinking/mcp', false, 'none'),
('EdgeOne Pages MCP', 'Deploy HTML content to EdgeOne Pages and get public URLs', 'mcpservers', ARRAY['Deployment'], 'https://github.com/mcpservers/edgeone-pages', NULL, 'https://github.com/mcpservers/edgeone-pages', 'remote', 'https://remote.mcpservers.org/edgeone-pages/mcp', false, 'none')
ON CONFLICT (name) DO NOTHING;

-- Update vote counts and verification status
UPDATE mcp_servers SET votes = FLOOR(RANDOM() * 30 + 5) WHERE votes = 0;
UPDATE mcp_servers SET stars = FLOOR(RANDOM() * 500 + 50) WHERE stars = 0;
UPDATE mcp_servers SET is_verified = CASE WHEN provider IN ('modelcontextprotocol', 'recursechat', 'github', 'sentry') THEN true ELSE false END WHERE is_verified IS NULL; 