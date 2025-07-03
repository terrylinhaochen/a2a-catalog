import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Target, Users, TrendingUp, Mail, Megaphone } from 'lucide-react';

const SalesMarketing = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Lead Generation",
      description: "Identify and qualify high-quality leads to fuel your sales pipeline"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Marketing",
      description: "Create and execute effective email campaigns that convert"
    },
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: "Digital Advertising",
      description: "Manage and optimize paid campaigns across multiple platforms"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customer Research",
      description: "Understand your target audience and market positioning"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Track, measure, and optimize marketing campaign performance"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Sales Automation",
      description: "Streamline sales processes and improve conversion rates"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Sales & Marketing Services | A2A Catalog"
        description="Professional sales and marketing services. Digital campaigns, lead generation, and performance analytics. See results first, then pay."
        keywords="sales marketing, lead generation, digital advertising, email marketing, sales automation"
        url="https://a2acatalog.com/services/sales-marketing"
      />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sales & Marketing Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Drive growth with professional sales and marketing services. From lead generation to conversion optimization, 
            we help you build effective campaigns that deliver measurable results.
          </p>
          
          {/* Guarantee Badge */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Results-Based Guarantee</h3>
            <p className="text-gray-700">
              We charge only based on results - you see result samples first, then pay. If you are unsatisfied, you don't pay.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What You Get Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-4">Campaign Development</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Marketing strategy development</li>
                <li>• Target audience identification</li>
                <li>• Content creation and copywriting</li>
                <li>• Multi-channel campaign setup</li>
                <li>• A/B testing implementation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-4">Performance & Optimization</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Real-time performance tracking</li>
                <li>• Conversion rate optimization</li>
                <li>• ROI analysis and reporting</li>
                <li>• Campaign optimization recommendations</li>
                <li>• Monthly performance reviews</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get professional sales and marketing services with our results-based guarantee. 
            See samples first, pay only if satisfied.
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            Start Your Campaign
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SalesMarketing;