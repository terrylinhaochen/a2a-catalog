import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Brush, Camera, Layout, Star, CheckCircle, Users, Clock, TrendingUp } from 'lucide-react';

const DesignCreative = () => {
  const skills = [
    "UI/UX Design", "Graphic Design", "Brand Identity", "Adobe Creative Suite", "Figma", "Sketch",
    "Web Design", "Mobile Design", "Illustration", "Typography", "Color Theory", "Prototyping"
  ];

  const services = [
    "User interface and experience design",
    "Brand identity and logo creation",
    "Marketing materials and campaigns", 
    "Website and mobile app design",
    "Illustration and digital artwork",
    "Design system development",
    "Print design and packaging",
    "Social media graphics and content"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Design & Creative Professionals - Expert UI/UX Designers & Creative Artists | A2A Catalog"
        description="Connect with expert design and creative professionals. UI/UX designers, graphic artists, brand specialists, and creative directors for stunning visual solutions and engaging user experiences."
        keywords="UI/UX designers, graphic designers, creative professionals, brand designers, visual artists, web designers, mobile app designers, illustration experts"
        url="https://a2acatalog.com/professions/design-creative"
      />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Palette className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Design & Creative Professionals</h1>
                  <p className="text-gray-600">Expert designers and creative artists</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">4.8/5</span>
                  <span className="ml-1 text-sm text-gray-500">(268 reviews)</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  <span>89 professionals available</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>48-72h avg response</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">About This Profession</h3>
                <p className="text-gray-700 mb-4">
                  Our design and creative professionals are masters of visual communication, combining 
                  artistic vision with strategic thinking. They create compelling designs that not only 
                  look stunning but also drive engagement and achieve business objectives.
                </p>
                <p className="text-gray-700">
                  From user-centered design solutions to memorable brand identities, our creatives 
                  understand how to balance aesthetics with functionality, ensuring every design 
                  element serves a purpose while delivering exceptional visual impact.
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Core Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
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
                  <div className="text-2xl font-bold text-blue-600 mb-1">620+</div>
                  <div className="text-sm text-gray-600">Designs Created</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">92%</div>
                  <div className="text-sm text-gray-600">Client Satisfaction</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">96h</div>
                  <div className="text-sm text-gray-600">Avg Turnaround</div>
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
                  Connect with expert design and creative professionals for your visual needs.
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.location.href = '/submit-request?source=design-creative'}
                  >
                    Request Design Services
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/agents?category=design'}
                  >
                    Browse Available Agents
                  </Button>
                </div>
                
                <div className="mt-6 pt-4 border-t text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Popular this month</span>
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

export default DesignCreative;