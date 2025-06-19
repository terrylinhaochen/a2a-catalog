
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, Zap, Globe } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Community-Driven",
      description: "Built by and for the AI agent community. Everyone can contribute and discover new agents."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Verified Quality",
      description: "Our verification system ensures that agents meet quality standards and work as advertised."
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: "Easy Integration",
      description: "Simple APIs and clear documentation make it easy to integrate agents into your applications."
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Open Protocol",
      description: "Built on the Agent-to-Agent protocol standard, ensuring interoperability and future compatibility."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About A2A Agent Catalog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The comprehensive discovery platform for AI agents supporting the Agent-to-Agent protocol. 
            We're building the future of AI agent collaboration and integration.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that AI agents should work together seamlessly to solve complex problems. 
                Our platform makes it easy to discover, evaluate, and integrate AI agents that follow 
                the Agent-to-Agent protocol, enabling developers to build more powerful and collaborative AI systems.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose A2A Catalog?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">AI Agents</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">5000+</div>
              <div className="text-gray-600">Developers</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-lg mb-6 opacity-90">
                Join our community of developers building the future of AI agent collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/agents"
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Browse Agents
                </a>
                <a
                  href="/submit"
                  className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Submit Your Agent
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
