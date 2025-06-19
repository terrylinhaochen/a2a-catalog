
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'website' | 'organization' | 'softwareApplication' | 'article';
  data?: Record<string, any>;
}

const StructuredData = ({ type, data = {} }: StructuredDataProps) => {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
    };

    switch (type) {
      case 'website':
        return {
          ...baseData,
          '@type': 'WebSite',
          name: 'A2A Agent Catalog',
          url: 'https://a2acatalog.com',
          description: 'The comprehensive discovery platform for AI agents supporting the Agent-to-Agent (A2A) protocol',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://a2acatalog.com/agents?search={search_term_string}',
            'query-input': 'required name=search_term_string'
          },
          ...data
        };

      case 'organization':
        return {
          ...baseData,
          '@type': 'Organization',
          name: 'A2A Agent Catalog',
          url: 'https://a2acatalog.com',
          logo: 'https://a2acatalog.com/logo.png',
          description: 'The comprehensive discovery platform for AI agents supporting the Agent-to-Agent (A2A) protocol',
          sameAs: [
            'https://github.com/google-a2a/A2A',
            'https://google-a2a.github.io/A2A/latest/'
          ],
          ...data
        };

      case 'softwareApplication':
        return {
          ...baseData,
          '@type': 'SoftwareApplication',
          name: data.name || 'AI Agent',
          applicationCategory: 'WebApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          },
          ...data
        };

      case 'article':
        return {
          ...baseData,
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          author: {
            '@type': 'Organization',
            name: 'A2A Agent Catalog'
          },
          publisher: {
            '@type': 'Organization',
            name: 'A2A Agent Catalog',
            logo: {
              '@type': 'ImageObject',
              url: 'https://a2acatalog.com/logo.png'
            }
          },
          datePublished: data.datePublished || new Date().toISOString(),
          dateModified: data.dateModified || new Date().toISOString(),
          ...data
        };

      default:
        return baseData;
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
    </Helmet>
  );
};

export default StructuredData;
