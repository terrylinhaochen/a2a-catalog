-- Extract MCP Server Project Names and GitHub Repositories
-- Run this in your Supabase SQL Editor to get accurate GitHub links

-- Get all MCP servers with their real GitHub URLs and project details
SELECT 
    name as project_name,
    provider,
    COALESCE(github_url, repository_url) as github_repository,
    server_type,
    categories,
    description,
    CASE 
        WHEN server_type = 'remote' THEN connection_url
        ELSE NULL
    END as endpoint_url
FROM public.mcp_servers 
WHERE (github_url IS NOT NULL OR repository_url IS NOT NULL)
ORDER BY name;

-- Get MCP servers by category with GitHub links
SELECT 
    unnest(categories) as category,
    name as project_name,
    provider,
    COALESCE(github_url, repository_url) as github_repository,
    server_type
FROM public.mcp_servers 
WHERE (github_url IS NOT NULL OR repository_url IS NOT NULL)
ORDER BY category, name;

-- Get remote MCP servers only
SELECT 
    name as project_name,
    provider,
    connection_url as endpoint,
    COALESCE(github_url, repository_url) as github_repository,
    auth_type,
    categories
FROM public.mcp_servers 
WHERE server_type = 'remote' AND connection_url IS NOT NULL
ORDER BY name;

-- Get local MCP servers only with GitHub
SELECT 
    name as project_name,
    provider,
    COALESCE(github_url, repository_url) as github_repository,
    categories,
    description
FROM public.mcp_servers 
WHERE server_type = 'local' AND (github_url IS NOT NULL OR repository_url IS NOT NULL)
ORDER BY name;

-- Summary of GitHub repositories by provider
SELECT 
    provider,
    COUNT(*) as total_servers,
    COUNT(CASE WHEN github_url IS NOT NULL THEN 1 END) as with_github_url,
    COUNT(CASE WHEN repository_url IS NOT NULL THEN 1 END) as with_repository_url,
    COUNT(CASE WHEN github_url IS NULL AND repository_url IS NULL THEN 1 END) as missing_github
FROM public.mcp_servers 
GROUP BY provider
ORDER BY total_servers DESC;

-- Find MCP servers with missing GitHub links
SELECT 
    name as project_name,
    provider,
    server_type,
    categories
FROM public.mcp_servers 
WHERE github_url IS NULL AND repository_url IS NULL
ORDER BY name; 