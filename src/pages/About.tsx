import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ExternalLink, Network, Plug, ShieldCheck, Workflow } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const layers = [
    {
      icon: <Network className="w-6 h-6 text-blue-700" />,
      title: 'A2A: agent-to-agent communication',
      body: 'A2A standardizes how opaque agents discover each other, exchange messages, manage tasks, stream updates, return artifacts, and coordinate work across frameworks or vendors.',
      href: '/agents',
    },
    {
      icon: <Plug className="w-6 h-6 text-emerald-700" />,
      title: 'MCP: tools, resources, and context',
      body: 'MCP standardizes how LLM applications connect to tools, resources, prompts, and client features such as sampling, roots, and elicitation.',
      href: '/tools',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-violet-700" />,
      title: 'Skills: reusable task packages',
      body: 'Agent Skills package task-specific instructions, scripts, references, and assets so agents can load the right capability only when needed.',
      href: '/workflows',
    },
    {
      icon: <Workflow className="w-6 h-6 text-amber-700" />,
      title: 'Tasks: long-running work',
      body: 'Task patterns cover status, resumability, retry semantics, expiry, human review, and call-now/fetch-later workflows for production agents.',
      href: '/workflows',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-700" />,
      title: 'Operations: safety and audit',
      body: 'Production systems need explicit consent, least privilege, authenticated discovery, secure tool use, telemetry, and audit trails around agent actions.',
      href: '/mcp-faq',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Protocol Map - A2A, MCP, Agent Skills, and Task Patterns"
        description="A concise map of the agent interoperability stack: A2A for peer agents, MCP for tools and resources, Skills for reusable task packages, and task lifecycle patterns."
        keywords="A2A protocol, MCP, Agent Skills, agent tasks, multi-agent systems"
        url="https://a2acatalog.com/about"
      />
      <StructuredData
        type="article"
        data={{
          title: 'Protocol Map - A2A, MCP, Agent Skills, and Task Patterns',
          description: 'A map of A2A, MCP, Agent Skills, and task lifecycle patterns for multi-agent systems.',
          url: 'https://a2acatalog.com/about',
        }}
      />

      <Navbar />

      <main>
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-6">
                Protocol map for agent interoperability
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                The catalog tracks the current split between peer-agent communication, tool access, reusable Skills, and long-running task behavior. A2A and MCP solve different parts of the stack, while Skills make agent workflows portable and easier to reuse.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-gray-950 hover:bg-gray-800">
                  <Link to="/agents">
                    Start with A2A
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://a2a-protocol.org/latest/specification/" target="_blank" rel="noopener noreferrer">
                    A2A Spec
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {layers.map((layer) => (
                <Card key={layer.title} className="rounded-lg border-gray-200">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {layer.icon}
                      <CardTitle className="text-xl">{layer.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-5 leading-relaxed">{layer.body}</p>
                    <Link to={layer.href} className="inline-flex items-center text-sm font-medium text-gray-950">
                      Open related entries
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-950 mb-8">Reference Sources</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                ['A2A Specification', 'https://a2a-protocol.org/latest/specification/'],
                ['A2A and MCP', 'https://a2a-protocol.org/latest/topics/a2a-and-mcp/'],
                ['MCP Specification', 'https://modelcontextprotocol.io/specification/2025-06-18'],
                ['Agent Skills', 'https://agentskills.io/specification'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-200 p-4 text-gray-700 hover:text-gray-950 hover:border-gray-300 transition-colors"
                >
                  <span className="inline-flex items-center font-medium">
                    {label}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
