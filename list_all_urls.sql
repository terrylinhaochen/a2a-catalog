-- List all Agent and MCP Server URLs from Supabase Database
-- Run this in your Supabase SQL Editor to see all URLs

-- ========================================
-- AGENTS TABLE - All URLs and Endpoints
-- ========================================

SELECT 
    'AGENT' as type,
    name,
    provider,
    endpoint as url,
    documentation,
    auth_type,
    categories,
    is_verified,
    votes
FROM public.agents 
WHERE endpoint IS NOT NULL OR documentation IS NOT NULL
ORDER BY name;

-- ========================================
-- MCP SERVERS TABLE - All URLs and Endpoints  
-- ========================================

SELECT 
    'MCP SERVER' as type,
    name,
    provider,
    CASE 
        WHEN server_type = 'remote' THEN connection_url
        ELSE github_url
    END as url,
    CASE 
        WHEN server_type = 'remote' THEN 'Remote MCP Endpoint'
        ELSE 'GitHub Repository'
    END as url_type,
    server_type,
    auth_type,
    categories,
    is_verified,
    votes
FROM public.mcp_servers 
WHERE (connection_url IS NOT NULL OR github_url IS NOT NULL)
ORDER BY name;

-- ========================================
-- SUMMARY STATISTICS
-- ========================================

SELECT 
    'SUMMARY' as type,
    'Total Agents with URLs' as metric,
    COUNT(*) as count
FROM public.agents 
WHERE endpoint IS NOT NULL OR documentation IS NOT NULL

UNION ALL

SELECT 
    'SUMMARY' as type,
    'Total MCP Servers with URLs' as metric,
    COUNT(*) as count
FROM public.mcp_servers 
WHERE connection_url IS NOT NULL OR github_url IS NOT NULL

UNION ALL

SELECT 
    'SUMMARY' as type,
    'Remote MCP Servers' as metric,
    COUNT(*) as count
FROM public.mcp_servers 
WHERE server_type = 'remote' AND connection_url IS NOT NULL

UNION ALL

SELECT 
    'SUMMARY' as type,
    'Local MCP Servers with GitHub' as metric,
    COUNT(*) as count
FROM public.mcp_servers 
WHERE server_type = 'local' AND github_url IS NOT NULL;

-- ========================================
-- REMOTE MCP SERVERS ONLY (Ready to Connect)
-- ========================================

SELECT 
    name,
    provider,
    connection_url as endpoint,
    auth_type,
    categories,
    description
FROM public.mcp_servers 
WHERE server_type = 'remote' AND connection_url IS NOT NULL
ORDER BY name;

-- ========================================
-- AGENTS WITH ENDPOINTS (Ready to Connect)
-- ========================================

SELECT 
    name,
    provider,
    endpoint,
    auth_type,
    categories,
    description
FROM public.agents 
WHERE endpoint IS NOT NULL
ORDER BY name; 