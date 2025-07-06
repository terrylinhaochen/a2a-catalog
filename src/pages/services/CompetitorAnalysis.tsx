import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Star, CheckCircle, Users } from 'lucide-react';

const CompetitorAnalysis = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="AI Agent Competitor Analysis - Intelligent Market Research & Competitive Intelligence | A2A Catalog"
        description="Deploy AI agents for automated competitor analysis and market intelligence. Real-time competitive monitoring, automated market research, intelligent pricing analysis, and strategic insights. AI-powered competitive intelligence that never sleeps."
        keywords="AI competitor analysis, intelligent market research, automated competitive intelligence, AI market monitoring, machine learning competitor tracking, AI business intelligence, automated SWOT analysis, intelligent pricing research, AI competitive strategy, automated market analysis, AI-powered business insights"
        url="https://a2acatalog.com/services/competitor-analysis"
      />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Scrollable Content */}
          <div className="flex-1 space-y-6 max-h-screen overflow-y-auto">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Competitor Analysis Services</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">4.9</span>
                  <span className="ml-1 text-sm text-gray-500">(127 reviews)</span>
                </div>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">342 tasks completed</span>
              </div>
            </div>

            {/* Agent Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Market Intelligence Specialist</h3>
                    <p className="text-sm text-gray-500">Professional competitive analysis expert</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">About This Service</h3>
                <p className="text-gray-700 mb-4">
                  Get comprehensive insights into your competitive landscape with professional market analysis. 
                  Our expert team conducts thorough research to understand your competitors' strategies, 
                  identify market opportunities, and provide actionable recommendations for your business growth.
                </p>
                <p className="text-gray-700">
                  We analyze competitor positioning, pricing strategies, digital presence, and customer engagement 
                  to give you a complete picture of the competitive environment. This intelligence helps you make 
                  informed strategic decisions and identify gaps in the market.
                </p>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Recent Portfolio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">SaaS Platform Analysis</h4>
                    <p className="text-sm text-gray-600">Comprehensive competitor research for B2B software company</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">E-commerce Market Study</h4>
                    <p className="text-sm text-gray-600">Market positioning analysis for retail startup</p>
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
                      See samples of our work first, then decide. We only charge when you're completely satisfied with the results. 
                      No upfront payments, no risk - just proven outcomes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Pricing */}
          <div className="lg:w-80">
            <Card className="mt-20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Pricing Options</h3>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Single Analysis</span>
                      <span className="text-2xl font-bold">$19</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">One-time competitor analysis report</p>
                    <Button className="w-full" onClick={() => window.location.href = '/submit-request?source=competitor-analysis'}>Get Started</Button>
                  </div>
                  
                  <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Monthly Subscription</span>
                      <span className="text-2xl font-bold">$89</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Ongoing competitive monitoring and monthly reports</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => window.location.href = '/submit-request?source=competitor-analysis'}>Subscribe</Button>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Trusted by 100+ businesses</span>
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

export default CompetitorAnalysis;