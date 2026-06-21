
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Code, Zap, Users } from 'lucide-react';

const AutoGen = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="AutoGen Status - Microsoft Agent Framework and AG2 Paths"
        description="AutoGen is now maintenance-mode. New Microsoft users should evaluate Microsoft Agent Framework; conversational AutoGen-style users can also evaluate AG2."
        keywords="AutoGen maintenance mode, Microsoft Agent Framework, AG2, A2A protocol, multi-agent conversations"
        url="https://a2acatalog.com/frameworks/autogen"
      />
      
      <StructuredData 
        type="article"
        data={{
          title: "AutoGen Status - Microsoft Agent Framework and AG2 Paths",
          description: "Guide to the current AutoGen replacement paths for A2A and MCP work.",
          keywords: "AutoGen, A2A protocol, multi-agent conversations, collaborative AI",
          category: "AI Framework",
          url: "https://a2acatalog.com/frameworks/autogen"
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-950">
              AutoGen Is Now a Migration Decision
              <span className="block text-gray-600">Microsoft Agent Framework or AG2</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Microsoft marks AutoGen as maintenance-mode. New Microsoft-backed production work should start with Microsoft Agent Framework; AG2 remains the community AutoGen-style path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gray-950 hover:bg-gray-800">
                <Link to="/agents?search=Microsoft%20Agent%20Framework">Browse MAF Entry</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://learn.microsoft.com/en-us/agent-framework/overview/" target="_blank" rel="noopener noreferrer">
                  Microsoft Agent Framework
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Current Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-gray-700 mb-4" />
                <CardTitle>Microsoft Agent Framework</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Use this for new Microsoft-backed production work that needs stable APIs, A2A, MCP, state, telemetry, and connectors.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Code className="w-12 h-12 text-gray-700 mb-4" />
                <CardTitle>AG2</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Use this for active community AutoGen-style conversation patterns, then add an A2A boundary for external delegation.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="w-12 h-12 text-gray-700 mb-4" />
                <CardTitle>Existing AutoGen Apps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Keep running stable apps, but plan migration if you need new framework features, enterprise support, A2A, or MCP.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Use Cases */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Useful A2A Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Code review and debugging workflows",
              "Research and analysis pipelines",
              "Customer service automation",
              "Content creation and editing",
              "Data processing and validation",
              "Educational tutoring systems"
            ].map((useCase, index) => (
              <Card key={index} className="border-l-4 border-l-gray-300">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-4 flex-shrink-0"></div>
                    <span className="font-medium text-gray-800">{useCase}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Explore Current Agent Paths</h2>
          <p className="text-xl text-gray-300 mb-8">
            Compare sample adapters and task patterns before deciding how to expose a conversational agent through A2A.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-gray-950 hover:bg-gray-100">
              <Link to="/agents?search=AG2">View AG2 Agents</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-950 bg-transparent">
              <Link to="/workflows">View Task Patterns</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AutoGen;
