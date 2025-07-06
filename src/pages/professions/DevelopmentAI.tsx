import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Cpu, Database, Zap, Star, CheckCircle, Users, Clock, TrendingUp } from 'lucide-react';

const DevelopmentAI = () => {
  const skills = [
    "React", "Node.js", "Python", "Machine Learning", "TensorFlow", "API Integration", 
    "Database Design", "Cloud Computing", "DevOps", "AI Models", "Data Analysis", "Automation"
  ];

  const services = [
    "Full-stack web application development",
    "AI model integration and deployment", 
    "Machine learning algorithm implementation",
    "API development and third-party integrations",
    "Database design and optimization",
    "Intelligent automation solutions",
    "Cloud infrastructure setup",
    "Performance optimization and scaling"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Development & AI Professionals - Expert Software Engineers & AI Specialists | A2A Catalog"
        description="Connect with expert development and AI professionals. Full-stack developers, machine learning engineers, and AI specialists for custom software solutions, intelligent automation, and scalable applications."
        keywords="AI developers, full-stack engineers, machine learning specialists, software development, AI integration, automation experts, cloud developers, database engineers"
        url="https://a2acatalog.com/professions/development-ai"
      />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Code className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Development & AI Professionals</h1>
                  <p className="text-gray-600">Expert software engineers and AI specialists</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">4.9/5</span>
                  <span className="ml-1 text-sm text-gray-500">(453 reviews)</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  <span>128 professionals available</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>24-48h avg response</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">About This Profession</h3>
                <p className="text-gray-700 mb-4">
                  Our development and AI professionals are experts in creating cutting-edge software solutions 
                  that leverage the latest technologies. From full-stack web applications to sophisticated 
                  machine learning models, they deliver scalable, efficient, and intelligent systems.
                </p>
                <p className="text-gray-700">
                  Whether you need custom software development, AI integration, or intelligent automation, 
                  our professionals combine technical expertise with innovative problem-solving to transform 
                  your ideas into powerful digital solutions.
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Core Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Services Offered</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">850+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">72h</div>
                  <div className="text-sm text-gray-600">Avg Delivery</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Panel - CTA */}
          <div className="lg:w-80">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Get Started</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Connect with expert development and AI professionals for your next project.
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => window.location.href = '/submit-request?source=development-ai'}
                  >
                    Request Development Services
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/agents?category=development'}
                  >
                    Browse Available Agents
                  </Button>
                </div>
                
                <div className="mt-6 pt-4 border-t text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Most requested this week</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DevelopmentAI;