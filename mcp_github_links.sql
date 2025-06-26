-- MCP Server Project Names and GitHub Repositories for README Update
-- Run this in your Supabase SQL Editor

-- Get all MCP servers with their GitHub repositories
SELECT 
    name as "Project Name",
    COALESCE(github_url, repository_url) as "GitHub Repository",
    server_type as "Type",
    provider as "Provider"
FROM public.mcp_servers 
WHERE (github_url IS NOT NULL OR repository_url IS NOT NULL)
ORDER BY name;

-- Get remote MCP servers with endpoints and GitHub
SELECT 
    name as "Project Name",
    connection_url as "Endpoint",
    COALESCE(github_url, repository_url) as "GitHub Repository",
    auth_type as "Auth Type"
FROM public.mcp_servers 
WHERE server_type = 'remote' AND connection_url IS NOT NULL
ORDER BY name;

-- Get local MCP servers with GitHub repositories
SELECT 
    name as "Project Name",
    COALESCE(github_url, repository_url) as "GitHub Repository",
    provider as "Provider",
    categories as "Categories"
FROM public.mcp_servers 
WHERE server_type = 'local' AND (github_url IS NOT NULL OR repository_url IS NOT NULL)
ORDER BY name;

-- Export format for easy copy-paste to README
SELECT 
    '- **' || name || '** - ' || COALESCE(description, 'MCP Server') || E'\n  - **GitHub:** ' || COALESCE(github_url, repository_url) as markdown_format
FROM public.mcp_servers 
WHERE (github_url IS NOT NULL OR repository_url IS NOT NULL)
ORDER BY name; 