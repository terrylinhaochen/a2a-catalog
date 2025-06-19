import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  Building2, 
  Network, 
  Target, 
  ArrowRight,
  CheckCircle,
  Star,
  Code,
  BookOpen,
  ExternalLink,
  Workflow,
  TrendingUp
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Community-Driven",
      description: "Built by and for the AI agent community. Everyone can contribute and discover new agents."
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: "Verified Quality",
      description: "Our verification system ensures that agents meet quality standards and work as advertised."
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      title: "Easy Integration",
      description: "Simple APIs and clear documentation make it easy to integrate agents into your applications."
    },
    {
      icon: <Globe className="w-6 h-6 text-purple-600" />,
      title: "Open Protocol",
      description: "Built on the Agent-to-Agent protocol standard, ensuring interoperability and future compatibility."
    }
  ];

  const benefits = [
    "Connect agents built on different platforms (LangGraph, CrewAI, Semantic Kernel, custom solutions)",
    "Enable agents to delegate sub-tasks, exchange information, and coordinate actions",
    "Agents interact without sharing internal memory, tools, or proprietary logic",
    "Foster a more interconnected, powerful, and innovative AI ecosystem",
    "Lower long-term costs while increasing autonomy and productivity gains",
    "Standardized method for managing agents across diverse platforms and cloud environments"
  ];

  const partners = [
    "Atlassian", "Box", "Cohere", "Intuit", "Langchain", "MongoDB", "PayPal", 
    "Salesforce", "SAP", "ServiceNow", "UKG", "Workday", "Accenture", "BCG", 
    "Capgemini", "Cognizant", "Deloitte", "HCLTech", "Infosys", "KPMG", 
    "McKinsey", "PwC", "TCS", "Wipro"
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
              About A2A Agent Catalog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              The comprehensive discovery platform for AI agents supporting the Agent-to-Agent (A2A) protocol. 
              We're building the future of AI agent collaboration and integration in the new era of Agent Interoperability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <a href="/agents">Browse Agents</a>
              </Button>
              <Button size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-purple-600" asChild>
                <a href="https://google-a2a.github.io/A2A/latest/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Learn About A2A
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div className="prose prose-lg max-w-none">
          {/* Mission Section */}
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

          {/* A2A Protocol Section - Reorganized */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              The A2A Protocol
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Understanding the foundation of agent interoperability
            </p>
            
            {/* Protocol Overview */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Protocol Overview</h3>
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

            {/* Key Benefits */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-green-600" />
                      <CardTitle className="text-lg">Ecosystem Growth</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Foster a more interconnected, powerful, and innovative AI ecosystem
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                      <CardTitle className="text-lg">Cost Efficiency</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Lower long-term costs while increasing autonomy and productivity gains
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <Code className="w-6 h-6 text-green-600" />
                      <CardTitle className="text-lg">Standardization</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Standardized method for managing agents across diverse platforms and cloud environments
                    </p>
                  </CardContent>
                </Card>
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

          {/* Platform Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Platform Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4 text-center">
                    <div className="flex justify-center mb-3">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed text-center text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Ready to Get Started - Glassmorphism Card */}
        <Card className="backdrop-blur-md bg-white/70 border border-white/20 shadow-xl mt-20">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join the growing ecosystem of developers and enterprises creating the future of AI collaboration. 
              Discover, integrate, and deploy A2A-compatible agents today.
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

export default About;
