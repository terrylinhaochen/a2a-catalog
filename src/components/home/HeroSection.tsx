
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Code, Palette, BarChart3, PenTool, Headphones, Calculator, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-20">
        <div className="max-w-2xl">
          {/* Hero Text */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-12 leading-tight">
            Tell us what you need.
            <br />
            Our agents will take it from here.
          </h1>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 px-8 py-4 rounded-full text-lg font-medium"
            >
              Find Agents
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-medium"
            >
              Browse Capabilities
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <Input
              type="text"
              placeholder="Search by role, skills, or keywords"
              className="w-full h-16 text-lg pl-6 pr-20 rounded-full bg-white/95 backdrop-blur-sm shadow-lg border-0"
            />
            <Button 
              size="lg" 
              className="absolute right-2 top-2 h-12 px-8 rounded-full bg-primary hover:bg-primary/90"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
          
          {/* Bottom Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <p className="text-white/90 text-lg mb-6 leading-relaxed">
              Build your agent workflow with AI-powered automation, with
              thousands of capabilities available instantly.
            </p>
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-medium"
            >
              Submit your agent workflow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
