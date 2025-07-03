import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Code, Palette, BarChart3, PenTool, Headphones, Calculator, Star } from 'lucide-react';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState<'find' | 'upload'>('find');

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Main Purple Card */}
        <Card className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-12 lg:p-20">
            <div className="max-w-4xl">
              {/* Hero Text - Left aligned inside the card */}
              <div className="mb-12">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                  Tell us what you need.
                  <br />
                  Our agents will take it from here.
                </h1>
              </div>
              
              {/* Glassmorphism Card - Left aligned and wider */}
              <div className="max-w-2xl">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20 shadow-xl h-80">
                  {/* Toggle Buttons */}
                  <div className="flex gap-2 mb-6 bg-white/10 p-1 rounded-full">
                    <Button
                      onClick={() => setActiveTab('find')}
                      className={`flex-1 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                        activeTab === 'find'
                          ? 'bg-white text-purple-900 shadow-lg'
                          : 'bg-transparent text-white hover:bg-white/20'
                      }`}
                    >
                      Find Skills
                    </Button>
                    <Button
                      onClick={() => setActiveTab('upload')}
                      className={`flex-1 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                        activeTab === 'upload'
                          ? 'bg-white text-purple-900 shadow-lg'
                          : 'bg-transparent text-white hover:bg-white/20'
                      }`}
                    >
                      Upload Agents
                    </Button>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative mb-6">
                    <Input
                      type="text"
                      placeholder="Search by role, skills, or keywords"
                      className="w-full h-14 text-base pl-6 pr-16 rounded-full bg-white/90 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500"
                    />
                    <Button 
                      size="sm"
                      className="absolute right-2 top-2 h-10 w-10 rounded-full bg-purple-600 hover:bg-purple-700 p-0"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Upload Agents Content */}
                  {activeTab === 'upload' && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <p className="text-white/90 text-sm mb-4 leading-relaxed">
                        Build your agent workflow with MCP & A2A Agents.
                      </p>
                      <Button 
                        size="lg"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-sm font-medium"
                      >
                        Submit your agent workflow
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;
