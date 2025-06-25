-- Create a new table for MCP servers with similar structure to agents
CREATE TABLE public.mcp_servers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  provider text NOT NULL,
  logo text,
  categories text[] DEFAULT '{}',
  skills text[] DEFAULT '{}',
  votes integer DEFAULT 0,
  is_verified boolean DEFAULT false,
  github_url text,
  stars integer DEFAULT 0,
  forks integer DEFAULT 0,
  last_updated text,
  user_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  package_name text, -- For npm package name like @recursechat/mcp-server-apple-shortcuts
  repository_url text, -- GitHub repository URL
  server_type text DEFAULT 'local', -- 'local' or 'remote'
  connection_url text, -- For remote servers: https://api.githubcopilot.com/mcp/
  install_command text, -- For local servers: npm install @recursechat/mcp-server-apple-shortcuts
  run_command text, -- For local servers: npx @recursechat/mcp-server-apple-shortcuts
  port integer, -- Default port for local servers
  auth_required boolean DEFAULT false,
  auth_type text -- 'oauth', 'api_key', 'none'
);

-- Add Row Level Security
ALTER TABLE public.mcp_servers ENABLE ROW LEVEL SECURITY;

-- Create policies similar to agents table
CREATE POLICY "Users can view all mcp_servers" 
  ON public.mcp_servers 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create mcp_servers" 
  ON public.mcp_servers 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mcp_servers" 
  ON public.mcp_servers 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mcp_servers" 
  ON public.mcp_servers 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create votes table for MCP servers
CREATE TABLE public.mcp_server_votes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mcp_server_id uuid REFERENCES public.mcp_servers(id) ON DELETE CASCADE,
  user_id uuid,
  created_at timestamp with time zone DEFAULT now()
);

-- Add RLS for MCP server votes
ALTER TABLE public.mcp_server_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all mcp_server_votes" 
  ON public.mcp_server_votes 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create mcp_server_votes" 
  ON public.mcp_server_votes 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can delete their own mcp_server_votes" 
  ON public.mcp_server_votes 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Insert sample MCP servers from Browser Control category (mostly local npm packages)
INSERT INTO public.mcp_servers (name, description, provider, categories, github_url, package_name, repository_url, server_type, install_command, run_command, port, auth_required, auth_type) VALUES
('Apple Shortcuts MCP Server', 'Integrates with macOS Shortcuts for automation via MCP', 'recursechat', ARRAY['Browser Control', 'Automation'], 'https://github.com/recursechat/mcp-server-apple-shortcuts', '@recursechat/mcp-server-apple-shortcuts', 'https://github.com/recursechat/mcp-server-apple-shortcuts', 'local', 'npm install @recursechat/mcp-server-apple-shortcuts', 'npx @recursechat/mcp-server-apple-shortcuts', 3001, false, 'none'),
('Azure OpenAI Web Browsing', 'Implements minimal web browsing using Azure OpenAI and Playwright', 'kimtth', ARRAY['Browser Control', 'Web Browsing'], 'https://github.com/kimtth/mcp-aoai-web-browsing', '@kimtth/mcp-aoai-web-browsing', 'https://github.com/kimtth/mcp-aoai-web-browsing', 'local', 'npm install @kimtth/mcp-aoai-web-browsing', 'npx @kimtth/mcp-aoai-web-browsing', 3002, true, 'api_key'),
('Web Search MCP', 'Provides web search capabilities using Google results without requiring API keys', 'pskill9', ARRAY['Browser Control', 'Search'], 'https://github.com/pskill9/web-search', '@pskill9/web-search', 'https://github.com/pskill9/web-search', 'local', 'npm install @pskill9/web-search', 'npx @pskill9/web-search', 3003, false, 'none'),
('Browser Use MCP Server', 'Packages browser-use as an MCP server, with Docker support for Chromium and VNC', 'co-browser', ARRAY['Browser Control', 'Docker'], 'https://github.com/co-browser/browser-use-mcp-server', '@co-browser/browser-use-mcp-server', 'https://github.com/co-browser/browser-use-mcp-server', 'local', 'npm install @co-browser/browser-use-mcp-server', 'npx @co-browser/browser-use-mcp-server', 3004, false, 'none'),
('Playwright Python MCP', 'Leverages Playwright via Python, optimized for large language models', 'blackwhite084', ARRAY['Browser Control', 'Python'], 'https://github.com/blackwhite084/playwright-plus-python-mcp', '@blackwhite084/playwright-plus-python-mcp', 'https://github.com/blackwhite084/playwright-plus-python-mcp', 'local', 'pip install playwright-plus-python-mcp', 'python -m playwright_plus_python_mcp', 3005, false, 'none'),
('Playwright MCP Server', 'Utilizes Playwright for web automation and data extraction within an MCP framework', 'executeautomation', ARRAY['Browser Control', 'Automation'], 'https://github.com/executeautomation/mcp-playwright', '@executeautomation/playwright-mcp-server', 'https://github.com/executeautomation/mcp-playwright', 'local', 'npm install @executeautomation/playwright-mcp-server', 'npx @executeautomation/playwright-mcp-server', 3006, false, 'none'),
('Automata Playwright MCP', 'Controls web browsers via Playwright through MCP commands', 'automatalabs', ARRAY['Browser Control', 'Web Automation'], 'https://github.com/Automata-Labs-team/MCP-Server-Playwright', '@automatalabs/mcp-server-playwright', 'https://github.com/Automata-Labs-team/MCP-Server-Playwright', 'local', 'npm install @automatalabs/mcp-server-playwright', 'npx @automatalabs/mcp-server-playwright', 3007, false, 'none'),
('Official Puppeteer Server', 'Automates web interactions and scraping using Puppeteer (part of the official servers collection)', 'modelcontextprotocol', ARRAY['Browser Control', 'Web Scraping'], 'https://github.com/modelcontextprotocol/servers', 'modelcontextprotocol/server-puppeteer', 'https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer', 'local', 'npm install modelcontextprotocol/server-puppeteer', 'npx modelcontextprotocol/server-puppeteer', 3008, false, 'none'),
('YouTube Transcript MCP', 'Extracts subtitles and transcripts from YouTube videos for AI processing', 'kimtaeyoon83', ARRAY['Browser Control', 'Media Processing'], 'https://github.com/kimtaeyoon83/mcp-server-youtube-transcript', '@kimtaeyoon83/mcp-server-youtube-transcript', 'https://github.com/kimtaeyoon83/mcp-server-youtube-transcript', 'local', 'npm install @kimtaeyoon83/mcp-server-youtube-transcript', 'npx @kimtaeyoon83/mcp-server-youtube-transcript', 3009, false, 'none');

-- Insert some remote MCP servers
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
('EdgeOne Pages MCP', 'Deploy HTML content to EdgeOne Pages and get public URLs', 'mcpservers', ARRAY['Deployment'], 'https://github.com/mcpservers/edgeone-pages', NULL, 'https://github.com/mcpservers/edgeone-pages', 'remote', 'https://remote.mcpservers.org/edgeone-pages/mcp', false, 'none');

-- Update vote counts based on some reasonable distribution
UPDATE mcp_servers SET votes = FLOOR(RANDOM() * 30 + 5);
UPDATE mcp_servers SET stars = FLOOR(RANDOM() * 500 + 50);
UPDATE mcp_servers SET is_verified = CASE WHEN provider IN ('modelcontextprotocol', 'recursechat', 'github', 'sentry') THEN true ELSE false END;
