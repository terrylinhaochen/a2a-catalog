
import { useEffect } from 'react';
import { useAgents } from '@/hooks/useAgents';
import { generateSitemap } from '@/utils/sitemap';

const Sitemap = () => {
  const { agents } = useAgents();

  useEffect(() => {
    // Generate the sitemap XML
    const sitemapXML = generateSitemap(agents);
    
    // Create a new Response with XML content type
    const response = new Response(sitemapXML, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });

    // Replace the current page content with the XML
    document.open();
    document.write(sitemapXML);
    document.close();
  }, [agents]);

  return null; // This component doesn't render anything visible
};

export default Sitemap;
