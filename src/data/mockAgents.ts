export interface Agent {
  id: string;
  name: string;
  description: string;
  provider: string;
  logo?: string;
  categories: string[];
  skills: string[];
  votes: number;
  isVerified?: boolean;
  authType?: string;
  endpoint?: string;
  documentation?: string;
  examples?: string[];
  featured?: boolean;
  // New GitHub-style fields
  stars?: number;
  forks?: number;
  lastUpdated?: string;
  githubUrl?: string;
  deploymentInstructions?: string;
}

export const mockAgents: Agent[] = [
  {
    id: "google-maps-agent",
    name: "Google Maps Agent",
    description: "An open-source Agent2Agent (A2A) compliant server that provides Google Maps capabilities to other agents via a standardized protocol. Enables location search, routing, place details, and geocoding services.",
    provider: "Google Developer Community",
    categories: ["Location Services", "Maps & Navigation"],
    skills: ["geocoding", "routing", "place_search", "location_services"],
    votes: 89,
    isVerified: true,
    authType: "API Key",
    featured: true,
    stars: 14,
    forks: 1,
    lastUpdated: "May 22, 2025",
    githubUrl: "https://github.com/google-a2a/maps-agent",
    deploymentInstructions: "1. Clone the repository\n2. Install dependencies with npm install\n3. Set your Google Maps API key in .env\n4. Run npm start to launch the A2A server\n5. Agent will be available at http://localhost:3000"
  },
  {
    id: "weather-pro",
    name: "Weather Pro",
    description: "Advanced weather analysis agent providing detailed forecasts, historical data, and climate insights with global coverage and real-time updates.",
    provider: "WeatherTech Inc",
    categories: ["Data & Analytics", "Environment"],
    skills: ["weather_forecast", "climate_analysis", "historical_data", "alerts"],
    votes: 156,
    isVerified: true,
    authType: "API Key",
    featured: true,
    stars: 42,
    forks: 8,
    lastUpdated: "June 15, 2025",
    githubUrl: "https://github.com/weathertech/weather-pro-agent",
    deploymentInstructions: "Deploy using Docker or npm. Requires weather API credentials."
  },
  {
    id: "content-genie",
    name: "Content Genie",
    description: "AI-powered content generation agent specializing in blog posts, social media content, and marketing copy with brand voice adaptation.",
    provider: "ContentCorp",
    categories: ["Content Generation", "Marketing"],
    skills: ["blog_writing", "social_media", "copywriting", "seo_optimization"],
    votes: 203,
    isVerified: true,
    authType: "OAuth",
    featured: true,
    stars: 67,
    forks: 12,
    lastUpdated: "June 18, 2025",
    githubUrl: "https://github.com/contentcorp/content-genie",
    deploymentInstructions: "Requires OpenAI API key and brand configuration files."
  },
  {
    id: "image-artist",
    name: "Image Artist",
    description: "Creative image generation and manipulation agent supporting multiple art styles, photo editing, and custom artwork creation.",
    provider: "VisualAI Studios",
    categories: ["Image Processing", "Creative"],
    skills: ["image_generation", "photo_editing", "art_styles", "image_enhancement"],
    votes: 142,
    isVerified: false,
    authType: "API Key"
  },
  {
    id: "customer-support-ai",
    name: "Customer Support AI",
    description: "Intelligent customer service agent with multi-language support, ticket routing, and knowledge base integration for 24/7 support.",
    provider: "ServiceBot",
    categories: ["Customer Service", "Communication"],
    skills: ["multilingual_support", "ticket_routing", "knowledge_base", "sentiment_analysis"],
    votes: 178,
    isVerified: true,
    authType: "OAuth"
  },
  {
    id: "code-reviewer",
    name: "Code Reviewer",
    description: "Automated code review agent that analyzes code quality, security vulnerabilities, and suggests improvements across multiple programming languages.",
    provider: "DevTools Inc",
    categories: ["Development", "Code Analysis"],
    skills: ["code_review", "security_analysis", "performance_optimization", "best_practices"],
    votes: 167,
    isVerified: true,
    authType: "API Key"
  },
  {
    id: "financial-advisor",
    name: "Financial Advisor",
    description: "Personal finance management agent providing investment advice, budget analysis, and financial planning with real-time market data.",
    provider: "FinanceAI",
    categories: ["Finance", "Business Intelligence"],
    skills: ["investment_advice", "budget_analysis", "market_data", "financial_planning"],
    votes: 134,
    isVerified: true,
    authType: "OAuth"
  },
  {
    id: "translation-master",
    name: "Translation Master",
    description: "Professional translation agent supporting 100+ languages with context awareness, cultural nuances, and document translation capabilities.",
    provider: "Linguatech",
    categories: ["Language", "Communication"],
    skills: ["translation", "localization", "context_analysis", "document_processing"],
    votes: 198,
    isVerified: true,
    authType: "API Key"
  },
  {
    id: "email-assistant",
    name: "Email Assistant",
    description: "Intelligent email management agent that drafts responses, categorizes emails, schedules follow-ups, and manages your inbox efficiently.",
    provider: "MailBot Pro",
    categories: ["Productivity", "Communication"],
    skills: ["email_drafting", "inbox_management", "scheduling", "email_categorization"],
    votes: 145,
    isVerified: false,
    authType: "OAuth"
  },
  {
    id: "social-media-manager",
    name: "Social Media Manager",
    description: "Comprehensive social media management agent that creates content, schedules posts, analyzes engagement, and manages multiple platforms.",
    provider: "SocialAI",
    categories: ["Marketing", "Social Media"],
    skills: ["content_creation", "post_scheduling", "engagement_analysis", "multi_platform"],
    votes: 172,
    isVerified: true,
    authType: "OAuth"
  },
  {
    id: "research-assistant",
    name: "Research Assistant",
    description: "Academic and business research agent that gathers information, cites sources, summarizes findings, and creates comprehensive reports.",
    provider: "ResearchPro",
    categories: ["Research", "Content Generation"],
    skills: ["information_gathering", "source_citation", "report_generation", "fact_checking"],
    votes: 161,
    isVerified: true,
    authType: "API Key"
  },
  {
    id: "voice-synthesizer",
    name: "Voice Synthesizer",
    description: "Advanced text-to-speech agent with natural voice generation, multiple voice options, and audio format customization for various applications.",
    provider: "VoiceAI Labs",
    categories: ["Audio Processing", "Accessibility"],
    skills: ["text_to_speech", "voice_cloning", "audio_formats", "natural_speech"],
    votes: 128,
    isVerified: false,
    authType: "API Key"
  }
];

export const categories = [
  {
    id: "data-analytics",
    name: "Data & Analytics",
    description: "Agents specialized in data processing, analysis, and insights generation",
    count: 3,
    icon: "📊"
  },
  {
    id: "content-generation",
    name: "Content Generation",
    description: "AI agents for creating written content, articles, and marketing materials",
    count: 3,
    icon: "✍️"
  },
  {
    id: "image-processing",
    name: "Image Processing",
    description: "Agents for image generation, editing, and visual content creation",
    count: 1,
    icon: "🎨"
  },
  {
    id: "communication",
    name: "Communication",
    description: "Agents for messaging, translation, and interpersonal communication",
    count: 4,
    icon: "💬"
  },
  {
    id: "business-intelligence",
    name: "Business Intelligence",
    description: "Agents focused on business analytics and decision support",
    count: 2,
    icon: "📈"
  },
  {
    id: "development",
    name: "Development",
    description: "Agents for software development, code review, and technical tasks",
    count: 1,
    icon: "💻"
  }
];
