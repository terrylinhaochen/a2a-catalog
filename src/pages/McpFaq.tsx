import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const McpFaq = () => {
  const faqData = [
    {
      question: 'What is Model Context Protocol (MCP)?',
      answer:
        'MCP is an open protocol for connecting LLM applications to external tools, data, resources, and reusable prompts. The current specification uses JSON-RPC messages between hosts, clients, and servers, with explicit lifecycle, authorization, and security requirements.',
    },
    {
      question: 'What does an MCP server provide?',
      answer:
        'MCP servers expose server-side capabilities such as tools, resources, and prompts. MCP clients can also expose client-side features such as sampling, roots, and elicitation, depending on the host application.',
    },
    {
      question: 'How is MCP different from A2A?',
      answer:
        'A2A is for communication between peer agents and opaque agentic applications. MCP is for connecting a model or agent runtime to tools, data, prompts, and resources. They are complementary: agents can coordinate through A2A while using MCP internally for tool and context access.',
    },
    {
      question: 'What changed in the 2025-06-18 MCP specification?',
      answer:
        'The 2025-06-18 specification organizes the protocol around JSON-RPC, lifecycle management, authorization, tools, resources, prompts, sampling, roots, elicitation, progress, cancellation, logging, and security principles.',
    },
    {
      question: 'What are MCP Tasks?',
      answer:
        'Tasks are a roadmap direction for long-running or asynchronous agent work where a caller may request work now and fetch results later. Current roadmap work calls out retry semantics, expiry policies, and clearer lifecycle behavior as production gaps to solve.',
    },
    {
      question: 'What are MCP Server Cards?',
      answer:
        'Server Cards are a roadmap item for structured MCP server metadata, likely exposed through well-known URLs, so registries, browsers, and hosts can discover server capabilities before connecting.',
    },
    {
      question: 'What security model should MCP implementations follow?',
      answer:
        'The specification emphasizes user consent and control, data privacy, tool safety, and sampling controls. In production, that usually means least privilege, explicit authorization, careful handling of sensitive data, and auditable tool execution.',
    },
    {
      question: 'Where do Agent Skills fit?',
      answer:
        'Skills package reusable task instructions, scripts, references, and assets. They are not a replacement for MCP or A2A; they make agent behavior more reusable while MCP connects to tools and A2A connects agents to one another.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="MCP FAQ - Model Context Protocol, Tasks, Server Cards, and Skills"
        description="Current FAQ for MCP servers, A2A vs MCP, task primitives, server cards, security, and Agent Skills."
        keywords="MCP FAQ, Model Context Protocol, MCP Tasks, MCP Server Cards, A2A vs MCP, Agent Skills"
        url="https://a2acatalog.com/mcp-faq"
      />
      
      <StructuredData 
        type="article"
        data={{
          title: 'MCP FAQ - Model Context Protocol, Tasks, Server Cards, and Skills',
          description: 'FAQ covering MCP servers, A2A vs MCP, task primitives, server cards, security, and Agent Skills.',
          keywords: 'MCP FAQ, Model Context Protocol, MCP servers, A2A, Agent Skills',
          category: 'FAQ',
          url: 'https://a2acatalog.com/mcp-faq',
        }}
      />
      
      <Navbar />
      
      <div className="bg-gray-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="w-14 h-14 text-blue-300 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              MCP FAQ
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Practical answers for Model Context Protocol, A2A integration, task primitives, server cards, security, and Skills.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Model Context Protocol FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>MCP Tools Catalog</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Browse MCP specifications, servers, registry work, task primitives, and production-hardening patterns.</p>
                <a href="/tools" className="text-blue-700 hover:underline">Explore MCP Tools</a>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Official MCP Spec</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Read the 2025-06-18 Model Context Protocol specification directly from the MCP project.</p>
                <a href="https://modelcontextprotocol.io/specification/2025-06-18" className="text-blue-700 hover:underline">Open Specification</a>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>MCP Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Track transport evolution, Tasks, governance, server cards, observability, and enterprise readiness.</p>
                <a href="https://modelcontextprotocol.io/development/roadmap" className="text-blue-700 hover:underline">Open Roadmap</a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default McpFaq;
