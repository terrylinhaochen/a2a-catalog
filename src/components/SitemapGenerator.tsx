import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ExternalLink } from 'lucide-react';
import { useAgents } from '@/hooks/useAgents';
import { useMcpServers } from '@/hooks/useMcpServers';
import { generateSitemapXML, downloadSitemap } from '@/utils/sitemapGenerator';

const SitemapGenerator = () => {
  const { agents } = useAgents();
  const { mcpServers } = useMcpServers();

  const handleGenerateSitemap = () => {
    const sitemapXML = generateSitemapXML(agents, mcpServers);
    downloadSitemap(sitemapXML);
  };

  const totalPages = 10 + agents.length + mcpServers.length + 
    [...new Set([...agents.flatMap(a => a.categories), ...mcpServers.flatMap(m => m.categories)])].length * 2;

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Sitemap Generator</CardTitle>
        <CardDescription>
          Generate a comprehensive sitemap including all agents, MCP servers, and category pages for better SEO.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Static Pages:</span> 10
          </div>
          <div>
            <span className="font-medium">Agent Pages:</span> {agents.length}
          </div>
          <div>
            <span className="font-medium">MCP Pages:</span> {mcpServers.length}
          </div>
          <div>
            <span className="font-medium">Total Pages:</span> {totalPages}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleGenerateSitemap} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download Sitemap
          </Button>
          <Button variant="outline" asChild>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Current
            </a>
          </Button>
        </div>
        
        <p className="text-xs text-gray-600">
          The generated sitemap includes individual pages for each agent and MCP server, 
          making them fully indexable by search engines.
        </p>
      </CardContent>
    </Card>
  );
};

export default SitemapGenerator;