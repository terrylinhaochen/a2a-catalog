import { Link } from 'react-router-dom';
import { Activity, ArrowRight, BookOpen, Network, Plug, ShieldCheck, Workflow } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ServiceCategories = () => {
  const layers = [
    {
      icon: <Network className="w-6 h-6" />,
      title: 'Agent-to-agent protocol',
      description: 'A2A discovery and communication primitives: Agent Cards, Messages, Tasks, Artifacts, streaming, and push notifications.',
      href: '/agents',
      color: 'text-gray-700 bg-gray-50 border-gray-200',
    },
    {
      icon: <Plug className="w-6 h-6" />,
      title: 'Tool and resource access',
      description: 'MCP servers, registry patterns, tools, resources, prompts, roots, sampling, elicitation, and production transports.',
      href: '/tools',
      color: 'text-gray-700 bg-gray-50 border-gray-200',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Reusable Skills',
      description: 'Task-specific packages with SKILL.md instructions, scripts, references, assets, and progressive-disclosure loading.',
      href: '/workflows',
      color: 'text-gray-700 bg-gray-50 border-gray-200',
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: 'Task lifecycle patterns',
      description: 'Call-now/fetch-later work, resumable tasks, retries, expiry, status updates, human review, and secure delegation.',
      href: '/workflows',
      color: 'text-gray-700 bg-gray-50 border-gray-200',
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Security and governance',
      description: 'User consent, least privilege, identity, enterprise authorization, authenticated cards, and policy boundaries.',
      href: '/mcp-faq',
      color: 'text-gray-700 bg-gray-50 border-gray-200',
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Observability',
      description: 'Tracing, telemetry, audit trails, task status monitoring, and evaluation loops for production multi-agent systems.',
      href: '/framework-comparison',
      color: 'text-gray-700 bg-gray-50 border-gray-200',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-950 mb-3">
            Map the agent stack by capability
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            The catalog separates peer-agent communication from tool access, reusable Skills, long-running task patterns, and the operational controls needed to run them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {layers.map((layer) => (
            <Link key={layer.title} to={layer.href} className="group">
              <Card className="h-full border-gray-200 hover:border-gray-300 hover:shadow-md transition-all rounded-lg">
                <CardContent className="p-6">
                  <div className={`w-11 h-11 rounded-lg border flex items-center justify-center mb-5 ${layer.color}`}>
                    {layer.icon}
                  </div>
                  <h3 className="font-semibold text-xl text-gray-950 mb-3">{layer.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-5">{layer.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-gray-950">
                    Open catalog
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
