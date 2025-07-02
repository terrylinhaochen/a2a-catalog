import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Star, 
  Code, 
  Palette, 
  BarChart3, 
  PenTool, 
  Headphones, 
  Calculator,
  TrendingUp,
  Users,
  Clock,
  Globe
} from 'lucide-react';

const Hire = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingServices = [
    {
      title: "AI Development",
      description: "Custom AI models, machine learning algorithms, and intelligent automation solutions tailored to your business needs.",
      image: "🤖",
      color: "from-purple-500 to-blue-500",
      skills: ["Machine Learning", "Neural Networks", "API Integration", "Model Training"]
    },
    {
      title: "Agent Creation",
      description: "Human-guided AI agent development with specialized training for customer service, sales, and business automation.", 
      image: "🎯",
      color: "from-blue-500 to-indigo-500",
      skills: ["Conversational AI", "Workflow Automation", "Custom Training", "Integration"]
    },
    {
      title: "Data Analysis",
      description: "Advanced analytics, predictive modeling, and business intelligence solutions with human oversight and interpretation.",
      image: "📊", 
      color: "from-indigo-500 to-purple-500",
      skills: ["Statistical Analysis", "Data Visualization", "Predictive Modeling", "Reporting"]
    },
    {
      title: "Content Creation",
      description: "AI-assisted content writing, copywriting, and creative projects with human editing and quality assurance.",
      image: "✍️",
      color: "from-purple-500 to-pink-500",
      skills: ["Copywriting", "Blog Posts", "Marketing Content", "SEO Optimization"]
    }
  ];

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

  const stats = [
    { number: "1,200", label: "AI agents available", description: "ready to enhance your next project with human oversight and quality assurance." },
    { number: "200", label: "skills represented", description: "across all major industries and technical domains for comprehensive solutions." },
    { number: "15", label: "minutes average", description: "to connect with the perfect human-guided agent for your specific requirements." },
    { number: "100+", label: "satisfied businesses", description: "have successfully scaled their operations using our human-mediated AI solutions." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SEO 
        title="Hire - Human-Mediated AI Agents | A2A Catalog"
        description="Scale your professional workforce with human-mediated AI agents. Connect with expert agents for any task from development to creative work."
        keywords="AI agents, human-mediated AI, freelance AI, professional workforce, agent marketplace"
        url="https://a2acatalog.com/hire"
      />
      
      <StructuredData 
        type="website"
        data={{
          title: "Hire - Human-Mediated AI Agents",
          description: "Scale your professional workforce with human-mediated AI agents for any task.",
          keywords: "AI agents, human-mediated AI, freelance marketplace",
          url: "https://a2acatalog.com/hire"
        }}
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Scale your professional workforce with human-mediated AI agents
          </h1>
          
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for any service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 text-lg pl-6 pr-14 rounded-full bg-white shadow-lg"
              />
              <Button 
                size="lg" 
                className="absolute right-2 top-2 h-10 w-10 rounded-full bg-gray-900 hover:bg-gray-800"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              AI development
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              data analysis
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              content creation
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              agent training
            </Badge>
          </div>
        </div>
      </div>

      {/* Trending Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Trending services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingServices.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className={`h-32 bg-gradient-to-br ${service.color} flex items-center justify-center text-4xl`}>
                {service.image}
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                <div className="flex flex-wrap gap-1">
                  {service.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Make it all happen with human-mediated AI agents
            </h2>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              Join now
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2 border-b-2 border-gray-900 pb-1 inline-block">
                  {stat.label}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Hire for anything, from quick to longer jobs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
        
        <div className="text-left">
          <Button variant="link" className="text-purple-600 hover:text-purple-700 p-0 text-lg underline">
            View more
          </Button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Human-mediated AI agents at your fingertips
          </h2>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-3">
            Start Hiring
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Hire;