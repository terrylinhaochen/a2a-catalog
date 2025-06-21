
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
  agents?: Array<{name: string; description: string}>;
}

const SEO = ({
  title = 'A2A Agent Catalog - Discover AI Agents with Agent-to-Agent Protocol',
  description = 'The comprehensive discovery platform for AI agents supporting the Agent-to-Agent (A2A) protocol. Find, evaluate, and integrate AI agents into your applications.',
  keywords = 'A2A, Agent-to-Agent, AI agents, artificial intelligence, agent discovery, agent catalog, interoperability, Google A2A protocol, AI collaboration, AutoGen, LangGraph, CrewAI, LlamaIndex, Semantic Kernel, MindsDB, Marvin, Azure AI Foundry, AG2, MCP, expense report agent, currency conversion, image generation, file parsing, contact extraction, travel agent, video generation, analytics agent, telemetry, birthday planner, authentication, movie agent, coder agent, TMDB API, code generation, multi-turn interactions, web form handling, streaming updates, tool usage, file upload, database queries, Microsoft framework, Python agents, JavaScript agents, TypeScript agents',
  image = 'https://a2acatalog.com/og-image.png',
  url = 'https://a2acatalog.com',
  type = 'website',
  noIndex = false,
  agents = []
}: SEOProps) => {
  // Generate agent-specific keywords if agents are provided
  const agentKeywords = agents?.map(agent => 
    `${agent.name}, ${agent.description.toLowerCase()}`
  ).join(', ');
  
  const finalKeywords = agentKeywords ? `${keywords}, ${agentKeywords}` : keywords;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={url} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Enhanced Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="A2A Agent Catalog" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@a2acatalog" />
      
      {/* Additional SEO meta tags */}
      <meta name="author" content="A2A Agent Catalog" />
      <meta name="publisher" content="A2A Agent Catalog" />
      <meta name="copyright" content="A2A Agent Catalog" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Mobile optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Search engine specific */}
      <meta name="googlebot" content="index,follow" />
      <meta name="bingbot" content="index,follow" />
      <meta name="slurp" content="index,follow" />
    </Helmet>
  );
};

export default SEO;
