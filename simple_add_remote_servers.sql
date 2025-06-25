-- Simple script to add remote MCP servers
-- Run this in your Supabase SQL Editor

-- First, let's add the new columns if they don't exist
ALTER TABLE public.mcp_servers 
ADD COLUMN IF NOT EXISTS server_type text DEFAULT 'local';

ALTER TABLE public.mcp_servers 
ADD COLUMN IF NOT EXISTS connection_url text;

ALTER TABLE public.mcp_servers 
ADD COLUMN IF NOT EXISTS auth_required boolean DEFAULT false;

ALTER TABLE public.mcp_servers 
ADD COLUMN IF NOT EXISTS auth_type text;

-- Mark existing servers as local
UPDATE public.mcp_servers 
SET server_type = 'local' 
WHERE server_type IS NULL;

-- Add remote MCP servers one by one to avoid conflicts
INSERT INTO public.mcp_servers (name, description, provider, categories, server_type, connection_url, auth_required, auth_type) 
SELECT 'GitHub Copilot MCP', 'GitHub Copilot MCP server for code assistance and repository management', 'github', ARRAY['Development', 'Code Assistance'], 'remote', 'https://api.githubcopilot.com/mcp/', true, 'oauth'
WHERE NOT EXISTS (SELECT 1 FROM public.mcp_servers WHERE name = 'GitHub Copilot MCP');

INSERT INTO public.mcp_servers (name, description, provider, categories, server_type, connection_url, auth_required, auth_type) 
SELECT 'Sentry MCP', 'Developer-first error tracking and performance monitoring platform', 'sentry', ARRAY['Monitoring', 'Error Tracking'], 'remote', 'https://mcp.sentry.dev/sse', true, 'oauth'
WHERE NOT EXISTS (SELECT 1 FROM public.mcp_servers WHERE name = 'Sentry MCP');

INSERT INTO public.mcp_servers (name, description, provider, categories, server_type, connection_url, auth_required, auth_type) 
SELECT 'Linear MCP', 'Linear is a project management tool', 'linear', ARRAY['Project Management'], 'remote', 'https://mcp.linear.app/sse', true, 'oauth'
WHERE NOT EXISTS (SELECT 1 FROM public.mcp_servers WHERE name = 'Linear MCP');

INSERT INTO public.mcp_servers (name, description, provider, categories, server_type, connection_url, auth_required, auth_type) 
SELECT 'DeepWiki MCP', 'Automatically generates architecture diagrams and documentation', 'deepwiki', ARRAY['Documentation', 'AI'], 'remote', 'https://mcp.deepwiki.com/mcp', false, 'none'
WHERE NOT EXISTS (SELECT 1 FROM public.mcp_servers WHERE name = 'DeepWiki MCP');

INSERT INTO public.mcp_servers (name, description, provider, categories, server_type, connection_url, auth_required, auth_type) 
SELECT 'Fetch MCP', 'Web content fetching capabilities, converts HTML to markdown', 'mcpservers', ARRAY['Web Scraping'], 'remote', 'https://remote.mcpservers.org/fetch/mcp', false, 'none'
WHERE NOT EXISTS (SELECT 1 FROM public.mcp_servers WHERE name = 'Fetch MCP');

INSERT INTO public.mcp_servers (name, description, provider, categories, server_type, connection_url, auth_required, auth_type) 
SELECT 'Sequential Thinking MCP', 'Dynamic and reflective problem-solving through structured thinking', 'mcpservers', ARRAY['AI Tools'], 'remote', 'https://remote.mcpservers.org/sequentialthinking/mcp', false, 'none'
WHERE NOT EXISTS (SELECT 1 FROM public.mcp_servers WHERE name = 'Sequential Thinking MCP');

INSERT INTO public.mcp_servers (name, description, provider, categories, server_type, connection_url, auth_required, auth_type) 
SELECT 'EdgeOne Pages MCP', 'Deploy HTML content to EdgeOne Pages and get public URLs', 'mcpservers', ARRAY['Deployment'], 'remote', 'https://remote.mcpservers.org/edgeone-pages/mcp', false, 'none'
WHERE NOT EXISTS (SELECT 1 FROM public.mcp_servers WHERE name = 'EdgeOne Pages MCP');

-- Update some metadata
UPDATE mcp_servers SET votes = FLOOR(RANDOM() * 30 + 5) WHERE votes = 0;
UPDATE mcp_servers SET stars = FLOOR(RANDOM() * 500 + 50) WHERE stars = 0;
UPDATE mcp_servers SET is_verified = CASE WHEN provider IN ('modelcontextprotocol', 'recursechat', 'github', 'sentry') THEN true ELSE false END WHERE is_verified IS NULL; 