import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Server, Workflow } from 'lucide-react';

const ViewAllToolsSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Explore All Tools & Services
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Discover our complete catalog of AI agents, workflows, and professional services
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-600" />
                    <span>AI Agents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-blue-600" />
                    <span>Workflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-green-600" />
                    <span>MCP Servers</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="default" size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link to="/agents" className="flex items-center gap-2">
                    View All Agents
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                  <Link to="/workflows" className="flex items-center gap-2">
                    Browse Workflows
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                  <Link to="/mcps" className="flex items-center gap-2">
                    Explore MCPs
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewAllToolsSection;