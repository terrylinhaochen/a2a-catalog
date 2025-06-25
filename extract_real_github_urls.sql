-- Extract real GitHub URLs from the database for accurate README linking
-- Run this in your Supabase SQL Editor

-- Get all MCP servers with their real GitHub URLs
SELECT 
    name,
    provider,
    github_url,
    repository_url,
    server_type,
    categories
FROM public.mcp_servers 
WHERE github_url IS NOT NULL OR repository_url IS NOT NULL
ORDER BY name;

-- Get all agents with their real GitHub URLs (from examples array)
SELECT 
    name,
    provider,
    examples,
    endpoint,
    documentation,
    categories
FROM public.agents 
WHERE examples IS NOT NULL AND array_length(examples, 1) > 0
ORDER BY name;

-- Get MCP servers by category with real GitHub URLs
SELECT 
    unnest(categories) as category,
    name,
    provider,
    COALESCE(github_url, repository_url) as github_url,
    server_type
FROM public.mcp_servers 
WHERE (github_url IS NOT NULL OR repository_url IS NOT NULL)
ORDER BY category, name;

-- Get remote MCP servers with their connection URLs
SELECT 
    name,
    provider,
    connection_url,
    auth_type,
    categories
FROM public.mcp_servers 
WHERE server_type = 'remote' AND connection_url IS NOT NULL
ORDER BY name; 