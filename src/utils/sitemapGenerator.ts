import { Agent } from '@/hooks/useAgents';
import { McpServer } from '@/hooks/useMcpServers';

export const generateSitemapXML = (agents: Agent[], mcpServers: McpServer[]): string => {
  const baseUrl = 'https://a2acatalog.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/agents', priority: '0.9', changefreq: 'daily' },
    { url: '/mcps', priority: '0.9', changefreq: 'daily' },
    { url: '/docs', priority: '0.8', changefreq: 'weekly' },
    { url: '/categories', priority: '0.7', changefreq: 'weekly' },
    { url: '/submit', priority: '0.6', changefreq: 'monthly' },
    { url: '/orchestrate', priority: '0.7', changefreq: 'weekly' },
    { url: '/frameworks/autogen', priority: '0.7', changefreq: 'monthly' },
    { url: '/frameworks/langgraph', priority: '0.7', changefreq: 'monthly' },
    { url: '/frameworks/crewai', priority: '0.7', changefreq: 'monthly' },
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add individual agent pages
  agents.forEach(agent => {
    const agentUrl = `/agents/${agent.id}`;
    const lastMod = agent.updated_at ? new Date(agent.updated_at).toISOString().split('T')[0] : currentDate;
    
    sitemap += `
  <url>
    <loc>${baseUrl}${agentUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;
    
    if (agent.logo) {
      sitemap += `
    <image:image>
      <image:loc>${agent.logo}</image:loc>
      <image:title>${agent.name}</image:title>
      <image:caption>${agent.description}</image:caption>
    </image:image>`;
    }
    
    sitemap += `
  </url>`;
  });

  // Add individual MCP server pages
  mcpServers.forEach(mcpServer => {
    const mcpUrl = `/mcps/${mcpServer.id}`;
    const lastMod = mcpServer.updated_at ? new Date(mcpServer.updated_at).toISOString().split('T')[0] : currentDate;
    
    sitemap += `
  <url>
    <loc>${baseUrl}${mcpUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;
    
    if (mcpServer.logo) {
      sitemap += `
    <image:image>
      <image:loc>${mcpServer.logo}</image:loc>
      <image:title>${mcpServer.name}</image:title>
      <image:caption>${mcpServer.description}</image:caption>
    </image:image>`;
    }
    
    sitemap += `
  </url>`;
  });

  // Add category-specific pages
  const categories = [...new Set([...agents.flatMap(a => a.categories), ...mcpServers.flatMap(m => m.categories)])];
  categories.forEach(category => {
    if (category) {
      sitemap += `
  <url>
    <loc>${baseUrl}/agents?category=${encodeURIComponent(category)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/mcps?category=${encodeURIComponent(category)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

export const downloadSitemap = (sitemapXML: string) => {
  const blob = new Blob([sitemapXML], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};