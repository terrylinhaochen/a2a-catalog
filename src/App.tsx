
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/sonner';
import Index from './pages/Index';
import Agents from './pages/Agents';
import AgentDetails from './pages/AgentDetails';
import McpServers from './pages/McpServers';
import McpDetails from './pages/McpDetails';
import Categories from './pages/Categories';
import About from './pages/About';
import Explore from './pages/Explore';
import Submit from './pages/Submit';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import MyAgents from './pages/MyAgents';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// New framework and FAQ page imports
import AutoGen from './pages/frameworks/AutoGen';
import LangGraph from './pages/frameworks/LangGraph';
import CrewAI from './pages/frameworks/CrewAI';
import McpFaq from './pages/McpFaq';
import FrameworkComparison from './pages/FrameworkComparison';
import Hire from './pages/Hire';
import Experts from './pages/Experts';
import ExpertDetails from './pages/ExpertDetails';

// Answer pages
import CompetitiveAnalysis from './pages/answers/CompetitiveAnalysis';
import CustomerSegmentation from './pages/answers/CustomerSegmentation';
import ConversionOptimization from './pages/answers/ConversionOptimization';
import SocialAutomation from './pages/answers/SocialAutomation';

// Guide pages
import BusinessIntelligence from './pages/guides/BusinessIntelligence';
import CustomerSupport from './pages/guides/CustomerSupport';
import MarketResearch from './pages/guides/MarketResearch';
import ContentStrategy from './pages/guides/ContentStrategy';

// Service pages
import CompetitorAnalysis from './pages/services/CompetitorAnalysis';
import SalesMarketing from './pages/services/SalesMarketing';
import WritingTranslation from './pages/services/WritingTranslation';
import LiteratureResearch from './pages/services/LiteratureResearch';
import SubmitRequest from './pages/SubmitRequest';
import Chat from './pages/Chat';

// Profession pages
import DevelopmentAI from './pages/professions/DevelopmentAI';
import DesignCreative from './pages/professions/DesignCreative';
import AdminSupport from './pages/professions/AdminSupport';
import FinanceAccounting from './pages/professions/FinanceAccounting';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/:id" element={<AgentDetails />} />
              <Route path="/mcps" element={<McpServers />} />
              <Route path="/mcps/:id" element={<McpDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/hire" element={<Hire />} />
              <Route path="/experts" element={<Experts />} />
              <Route path="/experts/:id" element={<ExpertDetails />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/about" element={<About />} />
              <Route path="/submit" element={<ProtectedRoute><Submit /></ProtectedRoute>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/my-agents" element={<ProtectedRoute><MyAgents /></ProtectedRoute>} />
              
              {/* New framework and FAQ pages */}
              <Route path="/frameworks/autogen" element={<AutoGen />} />
              <Route path="/frameworks/langgraph" element={<LangGraph />} />
              <Route path="/frameworks/crewai" element={<CrewAI />} />
              <Route path="/mcp-faq" element={<McpFaq />} />
              <Route path="/framework-comparison" element={<FrameworkComparison />} />
              
              {/* Service pages */}
              <Route path="/services/competitor-analysis" element={<CompetitorAnalysis />} />
              <Route path="/services/sales-marketing" element={<SalesMarketing />} />
              <Route path="/services/writing-translation" element={<WritingTranslation />} />
              <Route path="/services/literature-research" element={<LiteratureResearch />} />
              <Route path="/submit-request" element={<ProtectedRoute><SubmitRequest /></ProtectedRoute>} />
              <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
              
              {/* Profession pages */}
              <Route path="/professions/development-ai" element={<DevelopmentAI />} />
              <Route path="/professions/design-creative" element={<DesignCreative />} />
              <Route path="/professions/admin-support" element={<AdminSupport />} />
              <Route path="/professions/finance-accounting" element={<FinanceAccounting />} />
              
              {/* Answer pages */}
              <Route path="/answers/how-to-conduct-effective-competitive-analysis" element={<CompetitiveAnalysis />} />
              <Route path="/answers/best-practices-for-ai-powered-customer-segmentation" element={<CustomerSegmentation />} />
              <Route path="/answers/how-to-optimize-conversion-rates-with-ai-insights" element={<ConversionOptimization />} />
              <Route path="/answers/social-media-automation-strategies-that-work" element={<SocialAutomation />} />
              
              {/* Guide pages */}
              <Route path="/guides/complete-guide-to-ai-powered-business-intelligence" element={<BusinessIntelligence />} />
              <Route path="/guides/building-scalable-customer-support-with-ai-agents" element={<CustomerSupport />} />
              <Route path="/guides/advanced-market-research-using-ai-tools" element={<MarketResearch />} />
              <Route path="/guides/content-strategy-automation-for-modern-businesses" element={<ContentStrategy />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </AuthProvider>
        </Router>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
