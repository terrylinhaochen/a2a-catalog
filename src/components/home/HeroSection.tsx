
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Code, Palette, BarChart3, PenTool, Headphones, Calculator, Star } from 'lucide-react';

const HeroSection = () => {
  const serviceCategories = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Development & AI",
      rating: "4.9/5",
      skills: "+453 skills",
      color: "bg-purple-50 border-purple-200",
      description: "Full-stack development, AI integration, machine learning models, and intelligent automation solutions."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Design & Creative",
      rating: "4.8/5", 
      skills: "+268 skills",
      color: "bg-blue-50 border-blue-200",
      description: "UI/UX design, graphic design, branding, and creative content with AI-assisted workflows."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Sales & Marketing",
      rating: "4.7/5",
      skills: "+192 skills", 
      color: "bg-indigo-50 border-indigo-200",
      description: "Digital marketing campaigns, lead generation, sales automation, and performance analytics."
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Writing & Translation",
      rating: "4.9/5",
      skills: "+305 skills",
      color: "bg-purple-50 border-purple-200",
      description: "Content writing, technical documentation, copywriting, and multilingual translation services."
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Admin & Customer Support", 
      rating: "4.8/5",
      skills: "+208 skills",
      color: "bg-blue-50 border-blue-200",
      description: "Virtual assistance, customer service automation, administrative tasks, and support workflows."
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Finance & Accounting",
      rating: "4.7/5", 
      skills: "+114 skills",
      color: "bg-indigo-50 border-indigo-200",
      description: "Financial analysis, bookkeeping automation, budget planning, and compliance reporting."
    }
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      {/* Hero Text */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Tell us what you need.
          <br />
          Our agents will take it from here.
        </h1>
        
        {/* Search Section */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="Search for any service..."
              className="w-full h-16 text-lg pl-6 pr-16 rounded-2xl bg-white shadow-lg border-0"
            />
            <Button 
              size="lg" 
              className="absolute right-2 top-2 h-12 w-12 rounded-xl bg-gray-900 hover:bg-gray-800 p-0"
            >
              <Search className="w-6 h-6" />
            </Button>
          </div>
          
          {/* Example Service Tags */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-4 py-2 text-sm rounded-full">
              website development →
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-4 py-2 text-sm rounded-full">
              architecture & interior design →
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-4 py-2 text-sm rounded-full">
              UGC videos →
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-4 py-2 text-sm rounded-full">
              video editing →
            </Badge>
          </div>
        </div>
      </div>

      {/* Service Categories Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Hire for anything, from quick to longer jobs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceCategories.map((category, index) => (
            <Card key={index} className={`hover:shadow-lg transition-shadow cursor-pointer ${category.color}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium">{category.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">{category.skills}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
