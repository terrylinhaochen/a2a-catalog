
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export const updateSEO = (config: SEOConfig) => {
  // Update title
  document.title = config.title;

  // Helper function to update or create meta tags
  const updateMetaTag = (property: string, content: string, isProperty = false) => {
    const attribute = isProperty ? 'property' : 'name';
    let tag = document.querySelector(`meta[${attribute}="${property}"]`);
    
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, property);
      document.head.appendChild(tag);
    }
    
    tag.setAttribute('content', content);
  };

  // Basic meta tags
  updateMetaTag('description', config.description);
  if (config.keywords) {
    updateMetaTag('keywords', config.keywords.join(', '));
  }

  // Open Graph tags
  updateMetaTag('og:title', config.title, true);
  updateMetaTag('og:description', config.description, true);
  updateMetaTag('og:type', config.type || 'website', true);
  if (config.ogImage) {
    updateMetaTag('og:image', config.ogImage, true);
  }
  updateMetaTag('og:url', window.location.href, true);

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', config.title);
  updateMetaTag('twitter:description', config.description);
  if (config.ogImage) {
    updateMetaTag('twitter:image', config.ogImage);
  }

  // Canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = config.canonical || window.location.href;

  // Article specific tags
  if (config.type === 'article') {
    if (config.publishedTime) {
      updateMetaTag('article:published_time', config.publishedTime, true);
    }
    if (config.modifiedTime) {
      updateMetaTag('article:modified_time', config.modifiedTime, true);
    }
  }
};

export const generateStructuredData = (type: 'website' | 'organization' | 'software') => {
  const baseUrl = window.location.origin;
  
  let structuredData;
  
  switch (type) {
    case 'website':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "A2A Catalog - AI Agent Marketplace",
        "description": "Comprehensive marketplace for Agent-to-Agent (A2A) compatible AI agents",
        "url": baseUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/agents?search={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      };
      break;
      
    case 'organization':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "A2A Catalog",
        "description": "AI Agent Marketplace for Agent-to-Agent compatible solutions",
        "url": baseUrl,
        "logo": `${baseUrl}/placeholder.svg`,
        "sameAs": []
      };
      break;
      
    case 'software':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "A2A Catalog",
        "description": "Marketplace for discovering and integrating AI agents with standardized A2A protocols",
        "url": baseUrl,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      };
      break;
  }
  
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};
