import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Palette, BarChart3, PenTool, Headphones, Calculator, Star } from 'lucide-react';

const ServiceCategories = () => {
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hire for anything, from quick to longer jobs
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      </div>
    </section>
  );
};

export default ServiceCategories;