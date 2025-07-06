import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import WorkRequestForm from '@/components/WorkRequestForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
      title: "Competitor Analysis",
      description: "Comprehensive competitor research, market analysis, pricing strategies, and competitive intelligence gathering.",
      image: "🎯",
      color: "from-purple-500 to-blue-500",
      slug: "competitor-analysis"
    },
    {
      title: "Sales & Marketing",
      description: "Digital marketing campaigns, lead generation, sales automation, and performance analytics.", 
      image: "📈",
      color: "from-blue-500 to-indigo-500",
      slug: "sales-marketing"
    },
    {
      title: "Writing & Translation",
      description: "Content writing, technical documentation, copywriting, and multilingual translation services.",
      image: "✍️", 
      color: "from-indigo-500 to-purple-500",
      slug: "writing-translation"
    },
    {
      title: "Literature Review & Research",
      description: "Academic research, literature reviews, data analysis, and comprehensive research reports.",
      image: "📚",
      color: "from-purple-500 to-pink-500",
      slug: "literature-research"
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
        title="Work - Professional AI Agents & Human-Mediated Services | A2A Catalog"
        description="Scale your workforce with human-mediated AI agents. Expert services for competitor analysis, sales & marketing, writing, and research. Results-based pricing."
        keywords="AI agents, human-mediated AI, professional services, competitor analysis, sales marketing, content writing, research services"
        url="https://a2acatalog.com/hire"
      />
      
      <StructuredData 
        type="website"
        data={{
          title: "Work - Human-Mediated AI Agents",
          description: "Scale your professional workforce with human-mediated AI agents for any task.",
          keywords: "AI agents, human-mediated AI, freelance marketplace",
          url: "https://a2acatalog.com/hire"
        }}
       />
       
       <Navbar />
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         {/* Hero Section with Glassmorphism */}
         <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl mb-20">
           <div className="absolute inset-0 bg-black/20"></div>
           <div className="relative p-12 md:p-16 text-center">
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
               Scale your professional workforce with human-mediated AI agents
             </h1>
             
              <div className="max-w-4xl mx-auto mb-8">
                <WorkRequestForm />
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  user research
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  competitor analysis
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  content creation
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  lead compilation
                </Badge>
              </div>

           </div>
         </div>

         {/* Trending Services */}
         <h2 className="text-3xl font-bold text-gray-900 mb-8">Trending services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingServices.map((service, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
                onClick={() => window.location.href = `/services/${service.slug}`}
              >
                <div className={`h-32 bg-gradient-to-br ${service.color} flex items-center justify-center text-4xl`}>
                  {service.image}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
         </div>

          {/* Professional Categories */}
          <div className="py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hire expert professionals across all disciplines
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card 
                className="hover:shadow-lg transition-shadow cursor-pointer bg-purple-50 border-purple-200"
                onClick={() => window.location.href = '/professions/development-ai'}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <Code className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">Development & AI Professionals</h3>
                      <p className="text-gray-600 text-sm mb-3">Full-stack developers, AI specialists, and software engineers for custom solutions.</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-sm font-medium">4.9/5</span>
                        </div>
                        <span className="text-sm text-gray-600">128 professionals</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-lg transition-shadow cursor-pointer bg-blue-50 border-blue-200"
                onClick={() => window.location.href = '/professions/design-creative'}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <Palette className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">Design & Creative Professionals</h3>
                      <p className="text-gray-600 text-sm mb-3">UI/UX designers, graphic artists, and creative specialists for visual excellence.</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-sm font-medium">4.8/5</span>
                        </div>
                        <span className="text-sm text-gray-600">89 professionals</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-lg transition-shadow cursor-pointer bg-indigo-50 border-indigo-200"
                onClick={() => window.location.href = '/services/sales-marketing'}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">Sales & Marketing Specialists</h3>
                      <p className="text-gray-600 text-sm mb-3">Growth marketers, sales experts, and campaign specialists for business expansion.</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-sm font-medium">4.7/5</span>
                        </div>
                        <span className="text-sm text-gray-600">67 professionals</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-lg transition-shadow cursor-pointer bg-purple-50 border-purple-200"
                onClick={() => window.location.href = '/services/writing-translation'}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <PenTool className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">Writing & Translation Experts</h3>
                      <p className="text-gray-600 text-sm mb-3">Content creators, technical writers, and multilingual translation specialists.</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-sm font-medium">4.9/5</span>
                        </div>
                        <span className="text-sm text-gray-600">94 professionals</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-lg transition-shadow cursor-pointer bg-blue-50 border-blue-200"
                onClick={() => window.location.href = '/professions/admin-support'}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <Headphones className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">Admin & Support Professionals</h3>
                      <p className="text-gray-600 text-sm mb-3">Virtual assistants, customer service experts, and administrative specialists.</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-sm font-medium">4.8/5</span>
                        </div>
                        <span className="text-sm text-gray-600">76 professionals</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-lg transition-shadow cursor-pointer bg-indigo-50 border-indigo-200"
                onClick={() => window.location.href = '/professions/finance-accounting'}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">Finance & Accounting Experts</h3>
                      <p className="text-gray-600 text-sm mb-3">Financial analysts, certified accountants, and bookkeeping specialists.</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-sm font-medium">4.7/5</span>
                        </div>
                        <span className="text-sm text-gray-600">42 professionals</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-left">
              <Button variant="link" className="text-purple-600 hover:text-purple-700 p-0 text-lg underline">
                View all professions
              </Button>
            </div>
          </div>

         {/* CTA Section - Purple Glassmorphism Card */}
         <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl mt-20">
           <div className="absolute inset-0 bg-black/20"></div>
           <div className="relative p-12 md:p-16 text-center">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
               Human-mediated AI agents at your fingertips
             </h2>
             <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
               Connect with expert agents who combine AI efficiency with human oversight for superior results.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                 Browse Agents
               </Button>
               <Button size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-purple-600">
                 Start Hiring
               </Button>
             </div>
           </div>
         </div>
       </div>

      <Footer />
    </div>
  );
};

export default Hire;