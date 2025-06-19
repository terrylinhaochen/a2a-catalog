# A2A Catalog - AI Agent Marketplace

A comprehensive marketplace for Agent-to-Agent (A2A) compatible AI agents. Discover, integrate, and deploy specialized AI capabilities with standardized protocols.

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
   Navigate to `http://localhost:5173` to view the application.

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
- **Mock Data** - Currently using static mock data for development
- **React Query** - Server state management and caching

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📊 Current Data Architecture

The application currently uses **mock data** stored in `src/data/mockAgents.ts`. This includes:

- **Agent definitions** with metadata, skills, and categories
- **Category organization** for browsing and filtering
- **Mock statistics** for the marketplace

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
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.tsx      # Navigation component
│   ├── Footer.tsx      # Footer component
│   └── AgentCard.tsx   # Agent display card
├── pages/              # Page components
│   ├── Index.tsx       # Homepage
│   ├── Agents.tsx      # Agents listing page
│   ├── Submit.tsx      # Agent submission form
│   └── NotFound.tsx    # 404 page
├── data/               # Data and mock files
│   └── mockAgents.ts   # Mock agent data
├── hooks/              # Custom React hooks
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
- **Category Filtering** - Filter agents by capabilities
- **Agent Details** - View comprehensive agent information
- **Submission System** - Submit new agents to the marketplace
- **Responsive Design** - Mobile-first responsive layout
- **Modern UI** - Clean, accessible interface

### Planned Features
- **Database Integration** - Replace mock data with real database
- **User Authentication** - User accounts and profiles
- **Agent Ratings & Reviews** - Community feedback system
- **API Integration** - Real agent endpoint testing
- **Advanced Search** - Filter by skills, providers, etc.
- **Agent Analytics** - Usage statistics and insights

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

- **Database Migration** - Implement PostgreSQL with Prisma ORM
- **Authentication** - Add user authentication with NextAuth.js
- **Real-time Features** - WebSocket integration for live updates
- **API Gateway** - Centralized API management
- **Agent Testing** - Built-in testing framework for agents
- **Analytics Dashboard** - Comprehensive usage analytics
