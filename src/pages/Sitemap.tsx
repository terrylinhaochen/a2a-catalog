
import { useEffect } from 'react';
import { useAgents } from '@/hooks/useAgents';
import { generateSitemap } from '@/utils/sitemap';

const Sitemap = () => {
  const { agents } = useAgents();

  useEffect(() => {
    // Generate and serve the sitemap XML
    const sitemapXML = generateSitemap(agents);
    
    // Set the content type to XML
    document.contentType = 'application/xml';
    
    // Replace the entire document with the sitemap XML
    document.open();
    document.write(sitemapXML);
    document.close();
  }, [agents]);

  return null; // This component doesn't render anything visible
};

export default Sitemap;
