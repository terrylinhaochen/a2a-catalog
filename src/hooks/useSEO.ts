
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateSEO, generateStructuredData, SEOConfig } from '@/utils/seo';

export const useSEO = (config: SEOConfig) => {
  const location = useLocation();

  useEffect(() => {
    // Update SEO tags
    updateSEO({
      ...config,
      canonical: `${window.location.origin}${location.pathname}`
    });

    // Generate appropriate structured data based on page
    if (location.pathname === '/') {
      generateStructuredData('website');
    } else if (location.pathname === '/about') {
      generateStructuredData('organization');
    } else {
      generateStructuredData('software');
    }

    // Clean up function to reset title when component unmounts
    return () => {
      document.title = 'A2A Catalog - AI Agent Marketplace';
    };
  }, [config, location.pathname]);
};
