import { Link } from 'react-router-dom';
import { BookOpen, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gray-950 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A2A</span>
              </div>
              <span className="text-xl font-bold text-gray-950">Agent Catalog</span>
            </Link>
            <p className="text-gray-600 max-w-md mb-4">
              Discovery catalog for Agent2Agent communication, MCP tools, Agent Skills, and task patterns for multi-agent systems.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/a2aproject/A2A" className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="A2A GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://a2a-protocol.org/latest/" className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="A2A documentation">
                <BookOpen className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-950 mb-4">Catalog</h3>
            <ul className="space-y-2">
              <li><Link to="/agents" className="text-gray-600 hover:text-gray-950 transition-colors">A2A Agents</Link></li>
              <li><Link to="/tools" className="text-gray-600 hover:text-gray-950 transition-colors">MCP Tools</Link></li>
              <li><Link to="/workflows" className="text-gray-600 hover:text-gray-950 transition-colors">Task Patterns</Link></li>
              <li><Link to="/framework-comparison" className="text-gray-600 hover:text-gray-950 transition-colors">Frameworks</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-950 mb-4">Official Sources</h3>
            <ul className="space-y-2">
              <li><a href="https://a2a-protocol.org/latest/specification/" className="text-gray-600 hover:text-gray-950 transition-colors">A2A Specification</a></li>
              <li><a href="https://modelcontextprotocol.io/specification/2025-06-18" className="text-gray-600 hover:text-gray-950 transition-colors">MCP Specification</a></li>
              <li><a href="https://agentskills.io/specification" className="text-gray-600 hover:text-gray-950 transition-colors">Agent Skills</a></li>
              <li><a href="https://developers.openai.com/codex/skills" className="text-gray-600 hover:text-gray-950 transition-colors">OpenAI Skills</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-gray-500 text-sm">
            Updated for A2A v1.0.1, MCP 2025-06-18, and current Agent Skills conventions.
          </p>
          <Link to="/about" className="text-gray-500 hover:text-gray-800 text-sm transition-colors">Protocol Map</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
