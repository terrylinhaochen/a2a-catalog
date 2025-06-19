
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Search } from 'lucide-react';
import { useAgents } from '@/hooks/useAgents';
import { downloadSitemap, generateRobotsTxt } from '@/utils/sitemap';
import { useToast } from '@/hooks/use-toast';

const SEOAdmin = () => {
  const { agents } = useAgents();
  const { toast } = useToast();

  const handleDownloadSitemap = () => {
    downloadSitemap(agents);
    toast({
      title: "Sitemap Downloaded",
      description: "sitemap.xml has been downloaded to your device."
    });
  };

  const handleCopyRobotsTxt = async () => {
    const robotsContent = generateRobotsTxt();
    try {
      await navigator.clipboard.writeText(robotsContent);
      toast({
        title: "Robots.txt Copied",
        description: "The robots.txt content has been copied to your clipboard."
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard. Please copy manually.",
        variant: "destructive"
      });
    }
  };

  const handleSEOAnalysis = () => {
    const currentUrl = window.location.href;
    const seoCheckerUrl = `https://www.seoptimer.com/${encodeURIComponent(currentUrl)}`;
    window.open(seoCheckerUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">SEO Management</h2>
        <p className="text-muted-foreground">
          Tools for managing search engine optimization and site visibility.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Sitemap Generation
            </CardTitle>
            <CardDescription>
              Generate and download XML sitemap for search engines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Includes {agents.length} agent pages plus static pages
              </p>
              <Button onClick={handleDownloadSitemap} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Sitemap
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Robots.txt
            </CardTitle>
            <CardDescription>
              Generate robots.txt content for crawler instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Includes sitemap reference and crawl guidelines
              </p>
              <Button onClick={handleCopyRobotsTxt} variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Copy Robots.txt
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              SEO Analysis
            </CardTitle>
            <CardDescription>
              Analyze current page SEO performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Check page optimization and get improvement suggestions
              </p>
              <Button onClick={handleSEOAnalysis} variant="outline" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Analyze SEO
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SEO Implementation Status</CardTitle>
          <CardDescription>Current SEO features active on the site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Meta Tags</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Open Graph</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Structured Data</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Canonical URLs</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOAdmin;
