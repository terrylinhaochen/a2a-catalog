-- Remove non-MCP entries from the database
-- Run this in your Supabase SQL Editor

-- Remove non-MCP entries from mcp_servers table
-- These are the entries that don't have "MCP" in their name and are not actual MCP servers

DELETE FROM public.mcp_servers 
WHERE name IN (
    'Deep Wiki',
    'Figma', 
    'GitHub Copilot',
    'Linear',
    'Notion',
    'Sentry',
    'Slack',
    'Zapier'
);

-- Remove non-MCP entries from agents table
-- These are the entries that are actually MCP servers, not A2A agents

DELETE FROM public.agents 
WHERE name IN (
    'Asana MCP',
    'CoinGecko MCP',
    'DeepWiki MCP',
    'EdgeOne Pages MCP',
    'Fetch MCP',
    'GitHub Copilot MCP',
    'Globalping MCP',
    'Intercom MCP',
    'Linear MCP',
    'Neon MCP',
    'PayPal MCP',
    'Sentry MCP',
    'Sequential Thinking MCP',
    'Square MCP'
);

-- Verify the cleanup
SELECT 
    'Remaining MCP Servers' as table_name,
    COUNT(*) as count
FROM public.mcp_servers

UNION ALL

SELECT 
    'Remaining Agents' as table_name,
    COUNT(*) as count
FROM public.agents; 