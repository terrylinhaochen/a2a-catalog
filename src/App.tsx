
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/sonner';
import Index from './pages/Index';
import Agents from './pages/Agents';
import AgentDetails from './pages/AgentDetails';
import Tools from './pages/Tools';
import McpServers from './pages/McpServers';
import McpDetails from './pages/McpDetails';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// New framework and FAQ page imports
import AutoGen from './pages/frameworks/AutoGen';
import LangGraph from './pages/frameworks/LangGraph';
import CrewAI from './pages/frameworks/CrewAI';
import McpFaq from './pages/McpFaq';
import FrameworkComparison from './pages/FrameworkComparison';
import Workflows from './pages/Workflows';
import WorkflowDetails from './pages/WorkflowDetails';

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
              <Route path="/tools" element={<Tools />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/:id" element={<AgentDetails />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/workflows/:id" element={<WorkflowDetails />} />
              <Route path="/mcps" element={<McpServers />} />
              <Route path="/mcps/:id" element={<McpDetails />} />
              <Route path="/about" element={<About />} />
              
              {/* New framework and FAQ pages */}
              <Route path="/frameworks/autogen" element={<AutoGen />} />
              <Route path="/frameworks/langgraph" element={<LangGraph />} />
              <Route path="/frameworks/crewai" element={<CrewAI />} />
              <Route path="/mcp-faq" element={<McpFaq />} />
              <Route path="/framework-comparison" element={<FrameworkComparison />} />
              
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
