import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, BarChart3, PenTool, Calculator, Star, MessageSquare, TrendingUp } from 'lucide-react';

const ServiceCategories = () => {
  const serviceCategories = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Development & AI",
      rating: "4.9/5",
      skills: "+453 skills",
      color: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200",
      description: "Full-stack development, AI integration, machine learning models, and intelligent automation solutions."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Sales & Marketing",
      rating: "4.7/5",
      skills: "+192 skills", 
      color: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200",
      description: "Digital marketing campaigns, lead generation, sales automation, and performance analytics."
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Writing & Translation",
      rating: "4.9/5",
      skills: "+305 skills",
      color: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200",
      description: "Content writing, technical documentation, copywriting, and multilingual translation services."
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Finance & Accounting",
      rating: "4.7/5", 
      skills: "+114 skills",
      color: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200",
      description: "Financial analysis, bookkeeping automation, budget planning, and compliance reporting."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hire for anything, from quick to longer jobs
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {serviceCategories.map((category, index) => (
            <Card key={index} className={`hover:shadow-xl transition-all duration-300 cursor-pointer ${category.color} border-2`}>
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
        <div className="text-center mb-8">
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
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg"
                    className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-full font-medium"
                    asChild
                  >
                    <a href="https://crowdlistening.com" target="_blank" rel="noopener noreferrer">
                      Visit Crowdlistening.com
                    </a>
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-purple-800 text-white hover:bg-purple-700 px-8 py-3 rounded-full font-medium border-purple-800"
                  >
                    Learn More
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