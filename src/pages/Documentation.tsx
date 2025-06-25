
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  MessageSquare, 
  Workflow, 
  Eye, 
  Clock,
  ExternalLink,
  Code,
  Network,
  Wrench
} from 'lucide-react';

const Documentation = () => {
  const designPrinciples = [
    {
      icon: <Zap className="w-5 h-5 text-purple-600" />,
      title: "Embrace agentic capabilities",
      description: "A2A focuses on enabling agents to collaborate in their natural, unstructured modalities, even when they don't share memory, tools and context."
    },
    {
      icon: <Globe className="w-5 h-5 text-purple-600" />,
      title: "Build on existing standards",
      description: "The protocol is built on top of existing, popular standards including HTTP/HTTPS, JSON, REST APIs, OAuth 2.0, and OpenAPI/Swagger, ensuring familiar patterns for developers and reducing the learning curve for implementation."
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
    },
    {
      icon: <Code className="w-5 h-5 text-purple-600" />,
      title: "Developer experience first",
      description: "Simple APIs, comprehensive documentation, rich tooling, and community support make A2A easy to implement and debug across multiple programming languages."
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section with Glassmorphism */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl mb-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative p-12 md:p-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              A2A Agent Catalog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              The comprehensive discovery platform for AI agents supporting the Agent-to-Agent (A2A) protocol. 
              Built with support from 50+ technology partners to create a new era of Agent Interoperability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <a href="/agents">Browse Agents</a>
              </Button>
              <Button size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-purple-600" asChild>
                <a href="https://google-a2a.github.io/A2A/latest/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Official Documentation
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div className="prose prose-lg max-w-none">
          {/* Platform Overview */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Enabling Seamless Agent Discovery
            </h2>
            
            <div className="space-y-6 text-gray-700">
              <p>
                We believe that AI agents should work together seamlessly to solve complex problems. 
                Our platform makes it easy to discover, evaluate, and integrate AI agents that follow 
                the Agent-to-Agent protocol, enabling developers to build more powerful and collaborative AI systems.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <p className="text-blue-800 font-medium">
                  <strong>A2A Agent Catalog</strong> serves as the central hub for discovering and connecting 
                  A2A-compatible agents, making it easier for developers and enterprises to build 
                  interoperable AI ecosystems that maximize productivity and innovation.
                </p>
              </div>
            </div>
          </section>

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

          {/* A2A Protocol Overview Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              A2A Protocol Overview
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Understanding the foundation of agent interoperability
            </p>
            
            {/* Protocol Overview */}
            <div className="mb-12">
              <div className="space-y-6 text-gray-700">
                <p>
                  The <strong>Agent2Agent (A2A) Protocol</strong> is an open standard designed to enable seamless 
                  communication and collaboration between AI agents. In a world where agents are built using diverse 
                  frameworks and by different vendors, A2A provides a common language, breaking down silos and 
                  fostering interoperability.
                </p>
                
                <p>
                  A2A is an open protocol that complements Anthropic's Model Context Protocol (MCP), which provides 
                  helpful tools and context to agents. Drawing on Google's internal expertise in scaling agentic 
                  systems, the A2A protocol addresses the challenges identified in deploying large-scale, 
                  multi-agent systems for enterprise customers.
                </p>
              </div>
            </div>

            {/* What A2A Enables */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What A2A Enables</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-6 h-6 text-purple-600" />
                      <CardTitle className="text-lg">Cross-Platform Connectivity</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Connect agents built on different platforms (LangGraph, CrewAI, Semantic Kernel, custom solutions)
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <Workflow className="w-6 h-6 text-purple-600" />
                      <CardTitle className="text-lg">Task Delegation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Enable agents to delegate sub-tasks, exchange information, and coordinate actions
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-6 h-6 text-purple-600" />
                      <CardTitle className="text-lg">Secure Interaction</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Agents interact without sharing internal memory, tools, or proprietary logic
                    </p>
                  </CardContent>
                </Card>
              </div>
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
        </div>

        {/* Ready to Build with A2A - Glassmorphism Card */}
        <Card className="backdrop-blur-md bg-white/70 border border-white/20 shadow-xl mt-20">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Build with A2A
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start building interoperable AI agents today with the A2A protocol. Join the growing ecosystem of developers and enterprises creating the future of AI collaboration.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/agents">Browse Agents</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/submit">Submit Your Agent</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Documentation;
