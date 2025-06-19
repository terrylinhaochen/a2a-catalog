
import { Agent } from '@/hooks/useAgents';

export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (agents: Agent[]): string => {
  const baseUrl = window.location.origin;
  const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  const staticPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/`,
      lastmod: now,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/agents`,
      lastmod: now,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/categories`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/about`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/docs`,
      lastmod: now,
      changefreq: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/submit`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.6
    }
  ];

  const agentPages: SitemapEntry[] = agents.map(agent => ({
    url: `${baseUrl}/agents/${agent.id}`,
    lastmod: agent.updated_at ? new Date(agent.updated_at).toISOString().split('T')[0] : now,
    changefreq: 'weekly' as const,
    priority: 0.8
  }));

  const allPages = [...staticPages, ...agentPages];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    ${page.changefreq ? `<changefreq>${page.changefreq}</changefreq>` : ''}
    ${page.priority ? `<priority>${page.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return xmlContent;
};

export const downloadSitemap = (agents: Agent[]) => {
  const sitemapContent = generateSitemap(agents);
  const blob = new Blob([sitemapContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

export const generateRobotsTxt = (): string => {
  const baseUrl = window.location.origin;
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1`;
};
