
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
      name: "Microsoft Agent Framework",
      description: "Production successor to AutoGen and Semantic Kernel",
      strengths: ["Stable 1.0 APIs", "A2A and MCP interoperability", "State, telemetry, and enterprise connectors"],
      weaknesses: ["Best fit if you are already comfortable with Microsoft/Azure patterns", "Newer ecosystem than LangGraph"],
      bestFor: ["Enterprise orchestration", "Long-running workflows", "Cross-runtime .NET/Python agents"],
      a2aSupport: "Built-in path",
      complexity: "Medium"
    },
    {
      name: "LangGraph",
      description: "Stateful workflows",
      strengths: ["Durable state", "Conditional logic", "Human review checkpoints"],
      weaknesses: ["Steeper learning curve", "A2A endpoint still needs design"],
      bestFor: ["Long-running tasks", "Decision workflows", "Process automation"],
      a2aSupport: "Sample adapter",
      complexity: "High"
    },
    {
      name: "CrewAI",
      description: "Role-based teams with MCP integration",
      strengths: ["Role-based teams", "MCP servers as tools", "Skills and knowledge concepts"],
      weaknesses: ["A2A exposure still needs adapter work", "Team abstraction can hide task state"],
      bestFor: ["Coordinated teams", "Delegated research", "Business workflows"],
      a2aSupport: "MCP working, A2A adapter",
      complexity: "Low"
    },
    {
      name: "AG2",
      description: "Community AutoGen-style conversations",
      strengths: ["Conversational multi-agent loops", "Human-in-the-loop", "Planner-reviewer patterns"],
      weaknesses: ["A2A is an integration boundary, not native runtime behavior", "Less enterprise packaging than MAF"],
      bestFor: ["Reviewer agents", "Research conversations", "Planner-executor tasks"],
      a2aSupport: "Adapter pattern",
      complexity: "Medium"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="A2A Framework Comparison - Microsoft Agent Framework, LangGraph, CrewAI, and AG2"
        description="Compare current framework patterns for A2A and MCP: Microsoft Agent Framework, LangGraph, CrewAI, and AG2."
        keywords="Microsoft Agent Framework, AG2, AutoGen, LangGraph, CrewAI, A2A framework comparison, MCP"
        url="https://a2acatalog.com/framework-comparison"
      />
      
      <StructuredData 
        type="article"
        data={{
          title: "A2A Framework Comparison - Microsoft Agent Framework, LangGraph, CrewAI, and AG2",
          description: "Comparison of current framework patterns for A2A and MCP.",
          keywords: "AutoGen, LangGraph, CrewAI, A2A framework comparison, multi-agent systems",
          category: "Comparison",
          url: "https://a2acatalog.com/framework-comparison"
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-950">
              A2A Framework Patterns
              <span className="block text-gray-600">Microsoft Agent Framework, LangGraph, CrewAI, and AG2</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Microsoft Agent Framework is now the current production path for former AutoGen/Semantic Kernel users. LangGraph, CrewAI, and AG2 remain useful, but usually need explicit A2A adapter boundaries.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {frameworks.map((framework, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">{framework.name}</CardTitle>
                    <Badge variant="secondary">
                      <Check className="w-4 h-4 mr-1" />
                      {framework.a2aSupport}
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
                          <Check className="w-4 h-4 text-gray-700 mr-2" />
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
                          <X className="w-4 h-4 text-gray-500 mr-2" />
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
                          {use}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <Card className="border-gray-200 bg-gray-50">
              <CardHeader>
                <CardTitle className="text-gray-900">Choose Microsoft Agent Framework If...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>You want the current Microsoft production path</li>
                  <li>You need A2A and MCP interoperability in the framework story</li>
                  <li>You need .NET and Python support</li>
                  <li>You care about enterprise state, filters, and telemetry</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-gray-200 bg-gray-50">
              <CardHeader>
                <CardTitle className="text-gray-900">Choose LangGraph If...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>You need complex stateful workflows</li>
                  <li>You need durable task progress and resumability</li>
                  <li>You require advanced conditional logic</li>
                  <li>You are adding human review checkpoints</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-gray-200 bg-gray-50">
              <CardHeader>
                <CardTitle className="text-gray-900">Choose CrewAI If...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>You are modeling a remote agent as a coordinated team</li>
                  <li>You need role-based task delegation</li>
                  <li>You want a clear business workflow abstraction</li>
                  <li>You can map team output into A2A task status and artifacts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-gray-50">
              <CardHeader>
                <CardTitle className="text-gray-900">Choose AG2 If...</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>You need conversational multi-agent interactions</li>
                  <li>You are building reviewer, debate, or planner-executor loops</li>
                  <li>You want a community AutoGen-style framework</li>
                  <li>You can add an A2A adapter around task boundaries</li>
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
