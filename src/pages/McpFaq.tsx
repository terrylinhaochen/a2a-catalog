
import React from 'react';
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
      question: "What is Model Context Protocol (MCP)?",
      answer: "Model Context Protocol (MCP) is a standardized protocol that enables AI models and applications to share context information seamlessly. It facilitates better communication between different AI systems by providing a common framework for context sharing and memory management."
    },
    {
      question: "How do MCP servers work with Claude AI?",
      answer: "MCP servers integrate with Claude AI by providing contextual information and tools that enhance Claude's capabilities. They act as bridges between Claude and external data sources, allowing for more informed and context-aware responses."
    },
    {
      question: "What's the difference between A2A agents and MCP servers?",
      answer: "A2A (Agent-to-Agent) agents focus on inter-agent communication and collaboration, while MCP servers specialize in context sharing and memory management. A2A enables agents to work together, while MCP helps AI models maintain and access relevant context."
    },
    {
      question: "How to set up an MCP server?",
      answer: "Setting up an MCP server involves: 1) Installing the MCP SDK, 2) Defining your context sharing endpoints, 3) Implementing the MCP protocol handlers, 4) Configuring security and authentication, and 5) Testing the integration with your AI applications."
    },
    {
      question: "Can MCP servers work with multiple AI models?",
      answer: "Yes, MCP servers are designed to be model-agnostic and can work with various AI models and applications that support the Model Context Protocol standard, including Claude, GPT models, and other compatible AI systems."
    },
    {
      question: "What are the benefits of using MCP for AI applications?",
      answer: "MCP provides several benefits: improved context continuity, better memory management, enhanced AI responses through relevant context, standardized integration patterns, and the ability to share context across different AI applications and sessions."
    },
    {
      question: "How secure are MCP servers?",
      answer: "MCP servers implement various security measures including authentication, encryption, access controls, and data validation. The protocol includes built-in security features to protect sensitive context information during transmission and storage."
    },
    {
      question: "What programming languages support MCP?",
      answer: "MCP has SDK support for multiple programming languages including Python, JavaScript/TypeScript, Go, and Java. The protocol specification allows for implementation in virtually any programming language."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="MCP Server FAQ - Model Context Protocol Questions & Answers"
        description="Get answers to frequently asked questions about Model Context Protocol (MCP) servers, setup, integration with Claude AI, and context sharing best practices."
        keywords="MCP FAQ, Model Context Protocol questions, MCP server setup, Claude MCP integration, context sharing FAQ, MCP troubleshooting"
        url="https://a2acatalog.com/mcp-faq"
      />
      
      <StructuredData 
        type="article"
        data={{
          title: "MCP Server FAQ - Model Context Protocol Questions & Answers",
          description: "Comprehensive FAQ covering Model Context Protocol servers, setup, integration, and best practices for context sharing with AI models.",
          keywords: "MCP FAQ, Model Context Protocol, MCP servers, context sharing",
          category: "FAQ",
          url: "https://a2acatalog.com/mcp-faq"
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 text-purple-300 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              MCP Server FAQ
              <span className="block text-purple-300">Frequently Asked Questions</span>
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Get answers to the most common questions about Model Context Protocol servers, setup, and integration.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Model Context Protocol FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
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

      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>MCP Servers Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Browse our comprehensive directory of MCP servers for various use cases and integrations.</p>
                <a href="/mcps" className="text-purple-600 hover:underline">Explore MCP Servers →</a>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Read detailed documentation about implementing and using MCP servers.</p>
                <a href="/docs" className="text-purple-600 hover:underline">Read Docs →</a>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Submit Your MCP Server</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Share your MCP server with the community and help others discover your solution.</p>
                <a href="/submit" className="text-purple-600 hover:underline">Submit Server →</a>
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
