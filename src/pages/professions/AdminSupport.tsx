import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Headphones, Phone, FileText, Calendar, Star, CheckCircle, Users, Clock, TrendingUp } from 'lucide-react';

const AdminSupport = () => {
  const skills = [
    "Customer Service", "Virtual Assistance", "Data Entry", "Email Management", "Scheduling", "CRM Systems",
    "Live Chat Support", "Order Processing", "Document Management", "Administrative Tasks", "Research", "Communication"
  ];

  const services = [
    "24/7 customer support and helpdesk",
    "Virtual assistant and administrative support",
    "Email management and communication",
    "Data entry and database management",
    "Appointment scheduling and calendar management",
    "Order processing and fulfillment",
    "Research and information gathering",
    "Document preparation and filing"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Admin & Customer Support Professionals - Expert Virtual Assistants & Support Specialists | A2A Catalog"
        description="Connect with expert admin and customer support professionals. Virtual assistants, customer service specialists, and administrative experts for efficient business operations and exceptional customer experiences."
        keywords="virtual assistants, customer support specialists, admin professionals, customer service experts, virtual office support, administrative assistants, helpdesk agents"
        url="https://a2acatalog.com/professions/admin-support"
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
                  <Headphones className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Admin & Customer Support Professionals</h1>
                  <p className="text-gray-600">Expert virtual assistants and support specialists</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">4.8/5</span>
                  <span className="ml-1 text-sm text-gray-500">(208 reviews)</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  <span>76 professionals available</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>12-24h avg response</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">About This Profession</h3>
                <p className="text-gray-700 mb-4">
                  Our admin and customer support professionals are the backbone of efficient business operations. 
                  They provide comprehensive administrative support and exceptional customer service that keeps 
                  your business running smoothly while your customers stay satisfied.
                </p>
                <p className="text-gray-700">
                  From handling day-to-day administrative tasks to providing world-class customer support, 
                  our professionals ensure your business maintains high operational standards and delivers 
                  outstanding customer experiences across all touchpoints.
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Core Skills & Capabilities</h3>
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
                  <div className="text-2xl font-bold text-blue-600 mb-1">2,400+</div>
                  <div className="text-sm text-gray-600">Tickets Resolved</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
                  <div className="text-sm text-gray-600">Customer Satisfaction</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">2h</div>
                  <div className="text-sm text-gray-600">Avg Response Time</div>
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
                  Connect with expert admin and customer support professionals.
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.location.href = '/submit-request?source=admin-support'}
                  >
                    Request Support Services
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/agents?category=support'}
                  >
                    Browse Available Agents
                  </Button>
                </div>
                
                <div className="mt-6 pt-4 border-t text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>High demand service</span>
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

export default AdminSupport;