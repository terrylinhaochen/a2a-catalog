import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code, Zap } from 'lucide-react';

const GettingStartedSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Started with A2A</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about the Agent-to-Agent protocol and start building interoperable AI agents
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardHeader className="text-center pb-4">
              <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Documentation</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Explore the official A2A protocol documentation and specification
              </p>
              <Button asChild className="w-full bg-purple-900 hover:bg-purple-800">
                <a href="https://google-a2a.github.io/A2A/latest/" target="_blank" rel="noopener noreferrer">
                  Read Docs
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardHeader className="text-center pb-4">
              <Code className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Examples</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Browse working examples and sample implementations
              </p>
              <Button asChild className="w-full bg-purple-900 hover:bg-purple-800">
                <a href="https://github.com/google-a2a/A2A" target="_blank" rel="noopener noreferrer">
                  View Examples
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardHeader className="text-center pb-4">
              <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Tutorials</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Follow step-by-step guides to implement A2A in your projects
              </p>
              <Button asChild className="w-full bg-purple-900 hover:bg-purple-800">
                <a href="https://google-a2a.github.io/A2A/latest/tutorials/python/" target="_blank" rel="noopener noreferrer">
                  Start Learning
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GettingStartedSection;
