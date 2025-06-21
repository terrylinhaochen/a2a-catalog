
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

const FrameworkComparison = () => {
  const frameworks = [
    {
      name: "AutoGen",
      description: "Multi-agent conversations",
      strengths: ["Conversational AI", "Role-based agents", "Easy setup"],
      weaknesses: ["Limited workflow control", "Less stateful"],
      bestFor: ["Code review", "Research tasks", "Educational systems"],
      a2aSupport: true,
      complexity: "Medium"
    },
    {
      name: "LangGraph",
      description: "Stateful workflows",
      strengths: ["Complex workflows", "State management", "Conditional logic"],
      weaknesses: ["Steeper learning curve", "More complex setup"],
      bestFor: ["Decision workflows", "Process automation", "Complex reasoning"],
      a2aSupport: true,
      complexity: "High"
    },
    {
      name: "CrewAI",
      description: "Role-based teams",
      strengths: ["Business-focused", "Team coordination", "Task delegation"],
      weaknesses: ["Less flexibility", "Newer ecosystem"],
      bestFor: ["Business automation", "Marketing teams", "Content creation"],
      a2aSupport: true,
      complexity: "Low"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="A2A Framework Comparison - AutoGen vs LangGraph vs CrewAI"
        description="Compare AutoGen, LangGraph, and CrewAI frameworks for A2A agent development. Find the best Agent-to-Agent protocol framework for your multi-agent system needs."
        keywords="AutoGen vs LangGraph vs CrewAI, A2A framework comparison, multi-agent framework comparison, Agent-to-Agent protocol frameworks, AI framework comparison"
        url="https://a2acatalog.com/framework-comparison"
      />
      
      <StructuredData 
        type="article"
        data={{
          title: "A2A Framework Comparison - AutoGen vs LangGraph vs CrewAI",
          description: "Comprehensive comparison of leading A2A protocol frameworks including AutoGen, LangGraph, and CrewAI for multi-agent system development.",
          keywords: "AutoGen, LangGraph, CrewAI, A2A framework comparison, multi-agent systems",
          category: "Comparison",
          url: "https://a2acatalog.com/framework-comparison"
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              A2A Framework Comparison
              <span className="block text-indigo-300">AutoGen vs LangGraph vs CrewAI</span>
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Compare the leading Agent-to-Agent protocol frameworks to choose the best solution for your multi-agent system needs.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {frameworks.map((framework, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">{framework.name}</CardTitle>
                    <Badge variant={framework.a2aSupport ? "default" : "secondary"}>
                      {framework.a2aSupport ? <Check className="w-4 h-4 mr-1" /> : <X className="w-4 h-4 mr-1" />}
                      A2A
                    </Badge>
                  </div>
                  <p className="text-gray-600">{framework.description}</p>
                  <Badge variant="outline">
                    Complexity: {framework.complexity}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {framework.strengths.map((strength, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Considerations</h4>
                    <ul className="space-y-1">
                      {framework.weaknesses.map((weakness, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <X className="w-4 h-4 text-red-600 mr-2" />
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Best For</h4>
                    <ul className="space-y-1">
                      {framework.bestFor.map((use, i) => (
                        <li key={i} className="text-sm text-gray-600">
                          • {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Matrix */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Which Framework Should You Choose?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Choose AutoGen If...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-700">
                  <li>• You need conversational multi-agent interactions</li>
                  <li>• Building educational or research applications</li>
                  <li>• Want quick setup and prototyping</li>
                  <li>• Focus on code review and debugging workflows</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Choose LangGraph If...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-green-700">
                  <li>• You need complex stateful workflows</li>
                  <li>• Building decision-making systems</li>
                  <li>• Require advanced conditional logic</li>
                  <li>• Working on process automation</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800">Choose CrewAI If...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-orange-700">
                  <li>• Building business automation tools</li>
                  <li>• Need team-based task delegation</li>
                  <li>• Focus on marketing and content creation</li>
                  <li>• Want business-ready solutions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FrameworkComparison;
