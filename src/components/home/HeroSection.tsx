import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Network, Plug, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  const updates = [
    'A2A v1.0.1',
    'MCP 2025-06-18',
    'Agent Skills',
    'Task lifecycle',
  ];

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {updates.map((update) => (
                <Badge key={update} variant="secondary" className="bg-gray-100 text-gray-700">
                  {update}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-950 leading-tight mb-6">
              Discovery catalog for agent-to-agent communication
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
              An audited map of working A2A agents, MCP servers, reusable Skills, reference implementations, and roadmap patterns for multi-agent systems that need clear interoperability boundaries.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-gray-950 hover:bg-gray-800">
                <Link to="/agents">
                  Browse A2A Agents
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/tools">Explore MCP Tools</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/workflows">Task Patterns</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <Network className="w-7 h-7 text-gray-700 mb-4" />
              <h2 className="font-semibold text-gray-950 mb-2">A2A Protocol</h2>
              <p className="text-sm text-gray-600">
                Agent Cards, Messages, Tasks, Artifacts, streaming, push notifications, and agent discovery.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <Plug className="w-7 h-7 text-gray-700 mb-4" />
              <h2 className="font-semibold text-gray-950 mb-2">MCP Tools</h2>
              <p className="text-sm text-gray-600">
                Tools, resources, prompts, sampling, roots, elicitation, registry, auth, and transport work.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <BookOpen className="w-7 h-7 text-gray-700 mb-4" />
              <h2 className="font-semibold text-gray-950 mb-2">Skills</h2>
              <p className="text-sm text-gray-600">
                Progressive-disclosure bundles with instructions, scripts, references, and reusable workflow assets.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <Workflow className="w-7 h-7 text-gray-700 mb-4" />
              <h2 className="font-semibold text-gray-950 mb-2">Task Patterns</h2>
              <p className="text-sm text-gray-600">
                Long-running tasks, retry semantics, lifecycle state, observability, and secure delegation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
