import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Globe, Shield, Zap, Users, MessageSquare, Workflow, Eye, Clock, ExternalLink, Play, BookOpen, Code, Download } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import SEOAdmin from '@/components/SEOAdmin';

const Documentation = () => {
  useSEO({
    title: 'Documentation - A2A Catalog | API Docs & Integration Guide',
    description: 'Complete documentation for A2A Catalog including API reference, integration guides, and developer resources for building A2A compatible agents.',
    keywords: ['A2A documentation', 'API docs', 'integration guide', 'developer resources', 'agent development'],
    type: 'website'
  });

  const designPrinciples = [
    {
      icon: <Zap className="w-5 h-5 text-purple-600" />,
      title: "Embrace agentic capabilities",
      description: "A2A focuses on enabling agents to collaborate in their natural, unstructured modalities, even when they don't share memory, tools and context."
    },
    {
      icon: <Globe className="w-5 h-5 text-purple-600" />,
      title: "Build on existing standards",
      description: "The protocol is built on top of existing, popular standards including HTTP, SSE, JSON-RPC, which means it's easier to integrate with existing IT stacks."
    },
    {
      icon: <Shield className="w-5 h-5 text-purple-600" />,
      title: "Secure by default",
      description: "A2A is designed to support enterprise-grade authentication and authorization, with parity to OpenAPI's authentication schemes at launch."
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-600" />,
      title: "Support for long-running tasks",
      description: "Designed to support scenarios from quick tasks to deep research that may take hours or days, with real-time feedback and state updates."
    },
    {
      icon: <Eye className="w-5 h-5 text-purple-600" />,
      title: "Modality agnostic",
      description: "The agentic world isn't limited to just text, which is why we've designed A2A to support various modalities, including audio and video streaming."
    }
  ];

  const keyCapabilities = [
    {
      icon: <MessageSquare className="w-5 h-5 text-blue-600" />,
      title: "Capability Discovery",
      description: "Agents can advertise their capabilities using an 'Agent Card' in JSON format, allowing client agents to identify the best agent for a task."
    },
    {
      icon: <Workflow className="w-5 h-5 text-blue-600" />,
      title: "Task Management",
      description: "Communication oriented towards task completion with defined lifecycle, supporting both immediate and long-running tasks with status synchronization."
    },
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      title: "Collaboration",
      description: "Agents can send each other messages to communicate context, replies, artifacts, or user instructions."
    },
    {
      icon: <Eye className="w-5 h-5 text-blue-600" />,
      title: "User Experience Negotiation",
      description: "Each message includes 'parts' with specified content types, allowing agents to negotiate formats and UI capabilities like iframes, video, web forms."
    }
  ];

  const partners = [
    "Atlassian", "Box", "Cohere", "Intuit", "Langchain", "MongoDB", "PayPal", 
    "Salesforce", "SAP", "ServiceNow", "UKG", "Workday", "Accenture", "BCG", 
    "Capgemini", "Cognizant", "Deloitte", "HCLTech", "Infosys", "KPMG", 
    "McKinsey", "PwC", "TCS", "Wipro"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about A2A Catalog and agent integration.
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              <TabsTrigger value="seo">SEO Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* A New Era of Agent Interoperability */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  A New Era of Agent Interoperability
                </h2>
                
                <div className="space-y-6 text-gray-700">
                  <p>
                    AI agents offer a unique opportunity to help people be more productive by autonomously handling many daily recurring or complex tasks. Today, enterprises are increasingly building and deploying autonomous agents to help scale, automate and enhance processes throughout the workplace–from ordering new laptops, to aiding customer service representatives, to assisting in supply chain planning.
                  </p>
                  
                  <p>
                    To maximize the benefits from agentic AI, it is critical for these agents to be able to collaborate in a dynamic, multi-agent ecosystem across siloed data systems and applications. Enabling agents to interoperate with each other, even if they were built by different vendors or in a different framework, will increase autonomy and multiply productivity gains, while lowering long-term costs.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                    <p className="text-blue-800 font-medium">
                      <strong>Google has launched a new, open protocol called Agent2Agent (A2A)</strong>, with support and contributions from more than 50 technology partners and leading service providers. The A2A protocol allows AI agents to communicate with each other, securely exchange information, and coordinate actions on top of various enterprise platforms or applications.
                    </p>
                  </div>
                </div>
              </section>

              {/* Technology Partners */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Technology Partners & Service Providers
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  A2A is supported by industry leaders across technology and consulting
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {partners.map((partner, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {partner}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Design Principles */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  A2A Design Principles
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {designPrinciples.map((principle, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3">
                          {principle.icon}
                          <CardTitle className="text-lg">{principle.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">
                          {principle.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* How A2A Works */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  How A2A Works
                </h2>
                
                <div className="space-y-6 mb-8">
                  <p className="text-gray-700">
                    A2A facilitates communication between a "client" agent and a "remote" agent. A client agent is responsible for formulating and communicating tasks, while the remote agent is responsible for acting on those tasks in an attempt to provide the correct information or take the correct action.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {keyCapabilities.map((capability, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3">
                          {capability.icon}
                          <CardTitle className="text-lg">{capability.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">
                          {capability.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              {/* API Reference */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  API Reference
                </h2>
                
                <div className="space-y-6 text-gray-700">
                  <p>
                    A2A provides a comprehensive API for agent communication and collaboration. The API is designed to be flexible and extensible, allowing developers to build custom solutions and integrate A2A into their existing systems.
                  </p>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="integration" className="space-y-6">
              {/* Integration Guide */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Integration Guide
                </h2>
                
                <div className="space-y-6 text-gray-700">
                  <p>
                    A2A provides a step-by-step guide for integrating A2A into your existing systems. The guide covers everything from setting up the A2A protocol to configuring your agents and applications.
                  </p>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              {/* Examples */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Examples
                </h2>
                
                <div className="space-y-6 text-gray-700">
                  <p>
                    A2A provides a variety of examples to help developers get started with A2A. The examples cover everything from simple agent communication to complex agent collaboration.
                  </p>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="troubleshooting" className="space-y-6">
              {/* Troubleshooting */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Troubleshooting
                </h2>
                
                <div className="space-y-6 text-gray-700">
                  <p>
                    A2A provides a variety of troubleshooting resources to help developers resolve issues with A2A. The resources cover everything from common errors to advanced troubleshooting techniques.
                  </p>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <SEOAdmin />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Documentation;
