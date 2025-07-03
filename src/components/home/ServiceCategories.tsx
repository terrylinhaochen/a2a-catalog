import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, BarChart3, PenTool, Star, MessageSquare, TrendingUp } from 'lucide-react';

const ServiceCategories = () => {
  const serviceCategories = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Competitor Analysis",
      rating: "4.9/5",
      skills: "+285 skills",
      color: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200",
      description: "Comprehensive competitor research, market analysis, pricing strategies, and competitive intelligence gathering.",
      slug: "competitor-analysis"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Sales & Marketing",
      rating: "4.7/5",
      skills: "+192 skills", 
      color: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200",
      description: "Digital marketing campaigns, lead generation, sales automation, and performance analytics.",
      slug: "sales-marketing"
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Writing & Translation",
      rating: "4.9/5",
      skills: "+305 skills",
      color: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200",
      description: "Content writing, technical documentation, copywriting, and multilingual translation services.",
      slug: "writing-translation"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Literature Review & Research",
      rating: "4.8/5", 
      skills: "+156 skills",
      color: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200",
      description: "Academic research, literature reviews, data analysis, and comprehensive research reports.",
      slug: "literature-research"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hire for anything, from quick to longer jobs
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {serviceCategories.map((category, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-xl transition-all duration-300 cursor-pointer ${category.color} border-2`}
              onClick={() => window.location.href = `/services/${category.slug}`}
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-white rounded-xl shadow-sm">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-3">{category.title}</h3>
                    <p className="text-gray-600 text-base mb-4 leading-relaxed">{category.description}</p>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-base font-semibold text-gray-800">{category.rating}</span>
                      </div>
                      <span className="text-base text-gray-600 font-medium">{category.skills}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Listening Component */}
        <div className="text-center mb-8 pt-16">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Client Case Study - Social Listening
          </h3>
        </div>
        
        <Card className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <div className="p-3 bg-white/20 rounded-full mr-4">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <div className="p-3 bg-white/20 rounded-full">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Social Listening with Crowdlistening
                </h3>
                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                  Extract actionable insights from social conversations and understand what your audience is really saying. 
                  Our AI-powered social listening platform delivers faster performance predictions than traditional A/B testing.
                </p>
                <div className="flex justify-center lg:justify-start">
                  <Button 
                    size="lg"
                    className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-full font-medium"
                    asChild
                  >
                    <a href="https://crowdlistening.com" target="_blank" rel="noopener noreferrer">
                      Visit Crowdlistening.com
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-white/90">Real-time conversation analysis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-white/90">Sentiment and trend detection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-white/90">Predictive performance insights</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span className="text-white/90">Multi-platform social monitoring</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServiceCategories;