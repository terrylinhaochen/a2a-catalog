# A2A Catalog - AI Agent Marketplace

A comprehensive marketplace for Agent-to-Agent (A2A) compatible AI agents and Model Context Protocol (MCP) servers. Discover, integrate, and deploy specialized AI capabilities with standardized protocols.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **Bun** (optional, faster alternative)

### Local Development

1. **Clone the repository**
   ```bash
git clone <YOUR_GIT_URL>
   cd a2a-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if using Bun
   bun install
   ```

3. **Start the development server**
   ```bash
npm run dev
   # or if using Bun
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8085` to view the application.

The development server includes:
- Hot module replacement (HMR)
- Fast refresh for React components
- TypeScript compilation
- Tailwind CSS processing

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **TanStack Query** - Data fetching and caching

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **class-variance-authority** - Component variant management

### Forms & Validation
- **React Hook Form** - Performant forms with minimal re-renders
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Integration between React Hook Form and Zod

### Data & State Management
- **Supabase** - PostgreSQL database with real-time subscriptions
- **React Query** - Server state management and caching

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📊 Comprehensive Catalog

The A2A Catalog features the most comprehensive collection of AI agents and MCP servers available:

### 🤖 A2A Agents (96 Total Agents)

The catalog includes **96 A2A-compatible agents** covering diverse use cases and industries. Here are some featured examples:

#### Core Business Agents
- **Data Analysis Agent** (OpenAI) - Data processing, statistical analysis, visualization
  - **Endpoint**: `https://api.openai.com/v1/agents/data-analysis`
  - **Documentation**: `https://docs.openai.com/agents/data-analysis`
  - **Examples**: `https://github.com/openai/data-analysis-agent-examples`
- **Customer Support Agent** (Anthropic) - Customer service, ticket management, escalation
  - **Endpoint**: `https://api.anthropic.com/v1/agents/support`
  - **Documentation**: `https://docs.anthropic.com/agents/support`
  - **Examples**: `https://github.com/anthropic/support-agent-examples`
- **Code Review Agent** (GitHub) - Code analysis, security scanning, best practices
  - **Endpoint**: `https://api.github.com/agents/code-review`
  - **Documentation**: `https://docs.github.com/agents/code-review`
  - **Examples**: `https://github.com/github/code-review-agent-examples`
- **Financial Analysis Agent** (Bloomberg) - Market analysis, risk assessment, portfolio optimization
  - **Endpoint**: `https://api.bloomberg.com/v1/agents/financial`
  - **Documentation**: `https://docs.bloomberg.com/agents/financial`
  - **Examples**: `https://github.com/bloomberg/financial-agent-examples`

#### Specialized Agents
- **Content Creation Agent** (ContentAI) - Article writing, social media content, marketing copy
  - **Endpoint**: `https://api.contentai.com/v1/agents/content`
  - **Documentation**: `https://docs.contentai.com/agents/content`
  - **Examples**: `https://github.com/contentai/content-agent-examples`
- **Translation Agent** (TranslateAI) - Multi-language translation, cultural adaptation
  - **Endpoint**: `https://api.translateai.com/v1/agents/translation`
  - **Documentation**: `https://docs.translateai.com/agents/translation`
  - **Examples**: `https://github.com/translateai/translation-agent-examples`
- **Research Agent** (ResearchAI) - Information gathering, synthesis, fact verification
  - **Endpoint**: `https://api.researchai.com/v1/agents/research`
  - **Documentation**: `https://docs.researchai.com/agents/research`
  - **Examples**: `https://github.com/researchai/research-agent-examples`
- **Project Management Agent** (ProjectAI) - Task coordination, workflow optimization
  - **Endpoint**: `https://api.projectai.com/v1/agents/project`
  - **Documentation**: `https://docs.projectai.com/agents/project`
  - **Examples**: `https://github.com/projectai/project-agent-examples`

*Browse all 96 agents in the [Agents Catalog](https://a2acatalog.com/agents)*

### 🔌 MCP Servers (277 Total Servers)

The catalog includes **277 MCP servers** with comprehensive coverage across all major platforms and services:

#### Remote MCP Servers (22)
Ready-to-use remote servers that can be connected immediately:

- **GitHub Copilot MCP**
  - **Endpoint:** https://api.githubcopilot.com/mcp/
  - **GitHub:** https://github.com/github/mcp-server-copilot
- **Sentry MCP**
  - **Endpoint:** https://mcp.sentry.dev/sse
  - **GitHub:** https://github.com/getsentry/mcp-server
- **Linear MCP**
  - **Endpoint:** https://mcp.linear.app/sse
  - **GitHub:** https://github.com/linear/mcp-server
- **Asana MCP**
  - **Endpoint:** https://mcp.asana.com/sse
  - **GitHub:** https://github.com/asana/mcp-server
- **Intercom MCP**
  - **Endpoint:** https://mcp.intercom.com/sse
  - **GitHub:** https://github.com/intercom/mcp-server
- **PayPal MCP**
  - **Endpoint:** https://mcp.paypal.com/sse
  - **GitHub:** https://github.com/paypal/mcp-server
- **Square MCP**
  - **Endpoint:** https://mcp.squareup.com/sse
  - **GitHub:** https://github.com/square/mcp-server
- **Neon MCP**
  - **Endpoint:** https://mcp.neon.tech/sse
  - **GitHub:** https://github.com/neondatabase/mcp-server
- **Globalping MCP**
  - **Endpoint:** https://mcp.globalping.dev/sse
  - **GitHub:** https://github.com/globalping/mcp-server
- **CoinGecko MCP**
  - **Endpoint:** https://mcp.api.coingecko.com/sse
  - **GitHub:** https://github.com/coingecko/mcp-server
- **DeepWiki MCP**
  - **Endpoint:** https://mcp.deepwiki.com/mcp
  - **GitHub:** https://github.com/deepwiki/mcp-server
- **Fetch MCP**
  - **Endpoint:** https://remote.mcpservers.org/fetch/mcp
  - **GitHub:** https://github.com/mcpservers/fetch
- **Sequential Thinking MCP**
  - **Endpoint:** https://remote.mcpservers.org/sequentialthinking/mcp
  - **GitHub:** https://github.com/mcpservers/sequentialthinking
- **EdgeOne Pages MCP**
  - **Endpoint:** https://remote.mcpservers.org/edgeone-pages/mcp
  - **GitHub:** https://github.com/mcpservers/edgeone-pages

#### Local MCP Servers (255)
Installable servers for local development and deployment:

**Development & Code Execution**
- **Pydantic AI Python Runner** - Secure Python code execution
- **YepCode JavaScript Executor** - JavaScript and Python execution with NPM/PyPI support
- **OpenAPI MCP Docker** - Dockerized API access
- **Node Code Sandbox MCP** - Isolated JavaScript execution
- **MCP JS V8 Sandbox** - V8-based code isolation

**Coding & IDE Integration**
- **Serena Coding Agent** - Language server-based coding
- **CodeMCP Basic Agent** - File operations and command line tools
- **LeetCode MCP Server** - Programming problem solving
- **VSCode MCP Server** - IDE integration and code editing
- **Code to Tree AST** - Multi-language AST conversion

**Security & Authentication**
- **Ghidra MCP** - Reverse engineering and binary analysis
- **1Password MCP Server** - Secure credential management
- **Authenticator MCP** - Two-factor authentication
- **ROADrecon MCP Server** - Azure tenant enumeration

**Communication & Social**
- **Nostr MCP Server** - Decentralized social networking
- **Telegram MCP** - Messaging platform integration
- **Slack MCP Server** - Team collaboration
- **Microsoft Teams MCP** - Enterprise messaging
- **MS 365 MCP Server** - Microsoft suite integration
- **WhatsApp MCP** - Business messaging platform

**Database & Data Management**
- **AnyQuery SQL Interface** - Multi-database SQL access
- **Tinybird MCP** - Real-time analytics
- **Open Data MCP** - Open data integration
- **ADX MCP Server** - Azure Data Explorer

**Cloud & Infrastructure**
- **AWS MCP Server** - AWS service integration
- **Azure MCP Server** - Microsoft Azure services
- **Google Cloud MCP** - GCP service integration
- **Portainer MCP** - Container management
- **Redis MCP Server** - In-memory data store

**AI & Machine Learning**
- **Hugging Face MCP** - ML models and datasets
- **MindsDB Unified Platform** - AI/ML data integration
- **AntV Chart MCP** - Data visualization
- **RAG Server MCP** - Retrieval augmented generation

**Version Control & Development**
- **GitHub MCP Server** - Repository management
- **Gitea MCP Server** - Self-hosted Git
- **AtomGit MCP Server** - Alternative Git platform

**Productivity & Tools**
- **Apple Shortcuts MCP** - iOS automation
- **Desktop Commander MCP** - System management
- **SSH MCP Server** - Remote server access
- **Google Tasks MCP** - Task management

*Browse all 277 MCP servers in the [MCP Server Catalog](https://a2acatalog.com/mcps)*

### Data Structure

```typescript
interface Agent {
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
}

interface McpServer {
  id: string;
  name: string;
  description: string;
  provider: string;
  connection_url?: string;
  categories: string[];
  skills: string[];
  auth_type?: 'oauth' | 'api_key' | 'open';
  server_type?: 'local' | 'remote';
  votes: number;
  is_verified?: boolean;
  stars?: number;
  forks?: number;
}
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.tsx      # Navigation component
│   ├── Footer.tsx      # Footer component
│   ├── AgentCard.tsx   # Agent display card
│   └── mcp/            # MCP-specific components
├── pages/              # Page components
│   ├── Index.tsx       # Homepage
│   ├── Agents.tsx      # Agents listing page
│   ├── McpServers.tsx  # MCP servers listing page
│   ├── Submit.tsx      # Agent submission form
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
│   ├── useAgents.ts    # Agents data fetching
│   └── useMcpServers.ts # MCP servers data fetching
├── lib/                # Utility functions and configurations
└── App.tsx             # Main application component
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deployment Options

#### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### 2. Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

#### 3. GitHub Pages
```bash
# Add to package.json scripts
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

#### 4. Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Features

### Current Features
- **Agent Discovery** - Browse and search AI agents
- **MCP Server Directory** - Comprehensive MCP server catalog
- **Category Filtering** - Filter by capabilities and categories
- **Agent Details** - View comprehensive agent information
- **MCP Integration** - Connect to remote MCP servers
- **Submission System** - Submit new agents to the marketplace
- **Responsive Design** - Mobile-first responsive layout
- **Modern UI** - Clean, accessible interface
- **Real-time Data** - Live updates from Supabase database

### Planned Features
- **User Authentication** - User accounts and profiles
- **Agent Ratings & Reviews** - Community feedback system
- **API Integration** - Real agent endpoint testing
- **Advanced Search** - Filter by skills, providers, etc.
- **Agent Analytics** - Usage statistics and insights
- **MCP Server Testing** - Connection testing and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the component library at [shadcn/ui](https://ui.shadcn.com/)

## 🔮 Future Roadmap

- **Enhanced MCP Support** - Local MCP server management
- **Authentication** - Add user authentication with NextAuth.js
- **Real-time Features** - WebSocket integration for live updates
- **API Gateway** - Centralized API management
- **Agent Testing** - Built-in testing framework for agents
- **Analytics Dashboard** - Comprehensive usage analytics
- **MCP Server Registry** - Community-driven server submissions
