
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
          description: 'The comprehensive discovery platform for AI agents supporting the Agent-to-Agent (A2A) protocol and Model Context Protocol (MCP) servers',
          potentialAction: [
            {
              '@type': 'SearchAction',
              target: 'https://a2acatalog.com/agents?search={search_term_string}',
              'query-input': 'required name=search_term_string'
            },
            {
              '@type': 'SearchAction',
              target: 'https://a2acatalog.com/mcps?search={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          ],
          mainEntity: {
            '@type': 'ItemList',
            name: 'A2A Agents and MCP Servers',
            description: 'Comprehensive catalog of AI agents and MCP servers',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'A2A Protocol Agents',
                description: 'AI agents implementing the Agent-to-Agent protocol for seamless interoperability'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'MCP Servers',
                description: 'Model Context Protocol servers for enhanced AI context sharing'
              }
            ]
          },
          about: [
            {
              '@type': 'Thing',
              name: 'Agent-to-Agent Protocol',
              description: 'A protocol for AI agent interoperability and communication',
              sameAs: ['https://a2a-protocol.org/latest/']
            },
            {
              '@type': 'Thing',
              name: 'Model Context Protocol',
              description: 'A protocol for sharing context between AI models and applications',
              sameAs: ['https://modelcontextprotocol.io/']
            }
          ],
          keywords: 'A2A, Agent-to-Agent, AI agents, MCP, Model Context Protocol, AI interoperability, agent discovery, agent catalog',
          ...data
        };

      case 'organization':
        return {
          ...baseData,
          '@type': 'Organization',
          name: 'A2A Agent Catalog',
          url: 'https://a2acatalog.com',
          logo: 'https://a2acatalog.com/logo.png',
          description: 'The comprehensive discovery platform for AI agents supporting the Agent-to-Agent (A2A) protocol and Model Context Protocol (MCP) servers',
          sameAs: [
            'https://github.com/a2aproject/A2A',
            'https://a2a-protocol.org/latest/',
            'https://modelcontextprotocol.io/'
          ],
          foundingDate: '2024',
          areaServed: 'Worldwide',
          knowsAbout: [
            'Agent-to-Agent Protocol',
            'Model Context Protocol',
            'AI Agent Interoperability',
            'Multi-Agent Systems',
            'AI Agent Discovery',
            'Protocol Implementation',
            'Agent Communication',
            'Context Sharing'
          ],
          ...data
        };

      case 'softwareApplication':
        return {
          ...baseData,
          '@type': 'SoftwareApplication',
          name: data.name || 'AI Agent',
          applicationCategory: data.applicationCategory || 'AI Agent',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          },
          applicationSubCategory: data.type === 'mcp' ? 'MCP Server' : 'A2A Agent',
          softwareVersion: data.version || '1.0',
          releaseNotes: data.description,
          programmingLanguage: data.programmingLanguage || ['JavaScript', 'Python', 'TypeScript'],
          runtimePlatform: data.runtimePlatform || ['Web Browser', 'Node.js', 'Cloud'],
          supportingData: {
            '@type': 'DataFeed',
            name: 'Agent Protocol Support',
            description: data.type === 'mcp' ? 'Supports Model Context Protocol for context sharing' : 'Supports Agent-to-Agent protocol for interoperability'
          },
          featureList: data.skills || data.categories || [],
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url || 'https://a2acatalog.com'
          },
          articleSection: data.category || 'AI Agents',
          keywords: data.keywords || 'A2A, Agent-to-Agent, AI agents, MCP, Model Context Protocol',
          about: [
            {
              '@type': 'Thing',
              name: 'AI Agent Technology'
            },
            {
              '@type': 'Thing', 
              name: 'Protocol Interoperability'
            }
          ],
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
