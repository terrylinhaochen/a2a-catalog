import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Server, Workflow } from 'lucide-react';

const ViewAllToolsSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full hover:shadow-lg transition-all duration-200 bg-white border-gray-200">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Explore the Full Catalog
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Move between peer agents, MCP tooling, and reusable task patterns without crossing into unfinished submission flows.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-gray-700" />
                    <span>A2A Agents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-gray-700" />
                    <span>Task Patterns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-gray-700" />
                    <span>MCP Tools</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="default" size="lg" className="bg-gray-950 hover:bg-gray-800">
                  <Link to="/agents" className="flex items-center gap-2">
                    A2A Agents
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg">
                  <Link to="/workflows" className="flex items-center gap-2">
                    Task Patterns
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg">
                  <Link to="/mcps" className="flex items-center gap-2">
                    MCP Tools
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
