import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Target, Users, TrendingUp, Mail, Megaphone, Star, CheckCircle } from 'lucide-react';

const SalesMarketing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Professional Sales & Marketing Services - Digital Campaigns & Lead Generation | A2A Catalog"
        description="Expert sales and marketing services including digital campaigns, lead generation, email marketing, and performance analytics. Results-based pricing - see samples first."
        keywords="sales marketing, lead generation, digital advertising, email marketing, sales automation, marketing campaigns, conversion optimization"
        url="https://a2acatalog.com/services/sales-marketing"
      />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Scrollable Content */}
          <div className="flex-1 space-y-6 max-h-screen overflow-y-auto">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales & Marketing Services</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">4.7</span>
                  <span className="ml-1 text-sm text-gray-500">(89 reviews)</span>
                </div>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">215 campaigns completed</span>
              </div>
            </div>

            {/* Agent Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Growth Marketing Specialist</h3>
                    <p className="text-sm text-gray-500">Expert in digital campaigns and lead generation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">About This Service</h3>
                <p className="text-gray-700 mb-4">
                  Drive sustainable growth with data-driven sales and marketing strategies. Our team specializes in creating 
                  high-converting campaigns across multiple channels, from lead generation to customer acquisition and retention.
                </p>
                <p className="text-gray-700">
                  We combine creative marketing approaches with advanced analytics to optimize campaign performance, 
                  improve conversion rates, and maximize your return on investment. Every strategy is tailored to your 
                  target audience and business objectives.
                </p>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Recent Portfolio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">SaaS Lead Generation</h4>
                    <p className="text-sm text-gray-600">300% increase in qualified leads for B2B software platform</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">E-commerce Campaign</h4>
                    <p className="text-sm text-gray-600">45% boost in conversion rates for online retail brand</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guarantee */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Results-Based Guarantee</h3>
                    <p className="text-green-800">
                      We charge only based on results - you see result samples first, then pay. 
                      If you are unsatisfied, you don't pay.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Pricing */}
          <div className="lg:w-80">
            <Card className="sticky top-16">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Pricing Options</h3>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Single Campaign</span>
                      <span className="text-2xl font-bold">$19</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">One-time marketing campaign setup</p>
                    <Button className="w-full" onClick={() => window.location.href = '/submit-request?source=sales-marketing'}>Get Started</Button>
                  </div>
                  
                  <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Monthly Subscription</span>
                      <span className="text-2xl font-bold">$89</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Ongoing campaign management and optimization</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => window.location.href = '/submit-request?source=sales-marketing'}>Subscribe</Button>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Trusted by 150+ businesses</span>
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

export default SalesMarketing;