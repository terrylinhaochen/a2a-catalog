
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Bot, Briefcase } from 'lucide-react';

const CrewAI = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="CrewAI A2A Agents - Role-Based Multi-Agent Teams & Agent-to-Agent Protocol"
        description="Build role-based multi-agent teams with CrewAI implementing A2A protocol. Create specialized agent crews with defined roles and collaborative workflows."
        keywords="CrewAI, CrewAI agents, A2A protocol, role-based agents, multi-agent teams, agent crews, Agent-to-Agent, collaborative AI, team automation"
        url="https://a2acatalog.com/frameworks/crewai"
      />
      
      <StructuredData 
        type="article"
        data={{
          title: "CrewAI A2A Agents - Role-Based Multi-Agent Teams",
          description: "Comprehensive guide to CrewAI agents implementing the Agent-to-Agent protocol for role-based multi-agent teams and collaborative workflows.",
          keywords: "CrewAI, A2A protocol, role-based agents, multi-agent teams, agent crews",
          category: "AI Framework",
          url: "https://a2acatalog.com/frameworks/crewai"
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-900 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CrewAI A2A Agents
              <span className="block text-orange-300">Role-Based Multi-Agent Teams</span>
            </h1>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Build specialized multi-agent teams with CrewAI implementing the Agent-to-Agent protocol for role-based collaboration and task delegation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-orange-900 hover:bg-gray-100">
                <Link to="/agents?search=CrewAI">Browse CrewAI Agents</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-900 bg-transparent">
                <a href="https://crewai.com/" target="_blank" rel="noopener noreferrer">
                  Official Documentation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose CrewAI for A2A?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-orange-600 mb-4" />
                <CardTitle>Role-Based Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Create specialized agent teams with defined roles and responsibilities, all connected via A2A protocol for seamless collaboration.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Bot className="w-12 h-12 text-orange-600 mb-4" />
                <CardTitle>Task Delegation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Efficient task delegation and management between agents using A2A protocol for optimal workflow distribution.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Briefcase className="w-12 h-12 text-orange-600 mb-4" />
                <CardTitle>Business Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Purpose-built for business automation with agents that understand real-world processes and A2A interoperability.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Use Cases */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular CrewAI A2A Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Content creation teams",
              "Marketing campaign automation",
              "Business process optimization",
              "Project management workflows",
              "Sales pipeline automation",
              "Customer support crews"
            ].map((useCase, index) => (
              <Card key={index} className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-4 flex-shrink-0"></div>
                    <span className="font-medium text-gray-800">{useCase}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build with CrewAI?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Explore our catalog of CrewAI agents or contribute your own A2A-compliant agent crews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Link to="/agents?search=CrewAI">View CrewAI Agents</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent">
              <Link to="/submit">Submit Your Agent</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CrewAI;
