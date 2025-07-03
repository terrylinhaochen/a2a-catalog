import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Eye, Target, BarChart3, Search, Users } from 'lucide-react';

const CompetitorAnalysis = () => {
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Market Intelligence",
      description: "Comprehensive analysis of competitor strategies, positioning, and market share"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Pricing Analysis",
      description: "Detailed pricing comparisons and competitive pricing strategies"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Digital Presence Audit",
      description: "Website analysis, SEO performance, and social media strategy evaluation"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Strategic Insights",
      description: "Actionable recommendations based on competitive landscape analysis"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customer Analysis",
      description: "Understanding competitor customer base and engagement strategies"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth Tracking",
      description: "Monitor competitor growth patterns and market expansion strategies"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Competitor Analysis Services | A2A Catalog"
        description="Professional competitor analysis and market intelligence services. See results first, then pay. If unsatisfied, you don't pay."
        keywords="competitor analysis, market research, competitive intelligence, business analysis"
        url="https://a2acatalog.com/services/competitor-analysis"
      />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Competitor Analysis Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get comprehensive insights into your competitive landscape with professional market analysis. 
            Understand your competitors' strategies, identify opportunities, and make informed business decisions.
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
              <h3 className="font-semibold text-xl text-gray-900 mb-4">Detailed Analysis Report</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Competitor landscape overview</li>
                <li>• Pricing strategy analysis</li>
                <li>• Product/service comparison</li>
                <li>• Market positioning assessment</li>
                <li>• Digital marketing analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-4">Strategic Recommendations</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Competitive advantages identification</li>
                <li>• Market opportunities analysis</li>
                <li>• Risk assessment and mitigation</li>
                <li>• Growth strategy recommendations</li>
                <li>• Action plan development</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Understand Your Competition?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get professional competitor analysis with our results-based guarantee. 
            See samples first, pay only if satisfied.
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            Start Your Analysis
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompetitorAnalysis;