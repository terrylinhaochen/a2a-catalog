
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

const SEO = ({
  title = 'A2A Agent Catalog - Discover AI Agents with Agent-to-Agent Protocol',
  description = 'The comprehensive discovery platform for AI agents supporting the Agent-to-Agent (A2A) protocol. Find, evaluate, and integrate AI agents into your applications.',
  keywords = 'A2A, Agent-to-Agent, AI agents, artificial intelligence, agent discovery, agent catalog, interoperability, Google A2A protocol, AI collaboration',
  image = 'https://a2acatalog.com/og-image.png',
  url = 'https://a2acatalog.com',
  type = 'website',
  noIndex = false
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="A2A Agent Catalog" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
