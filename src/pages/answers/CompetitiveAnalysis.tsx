import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, MessageCircle, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const CompetitiveAnalysis = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="How to Conduct Effective Competitive Analysis | A2A Catalog"
        description="Learn expert strategies for conducting competitive analysis, market research, and competitor intelligence gathering using AI-powered tools."
        keywords="competitive analysis, market research, competitor intelligence, business strategy"
        url="https://a2acatalog.com/answers/how-to-conduct-effective-competitive-analysis"
      />
      
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">Business Strategy</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            How to conduct effective competitive analysis?
          </h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <span>847 expert answers</span>
            <span>•</span>
            <span>Updated recently</span>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Expert Answer Summary</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  1. Identify Your Competitors
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Start by identifying direct competitors (companies offering similar products/services) and indirect competitors 
                  (alternative solutions to the same customer problem). Use tools like SEMrush, Ahrefs, or SimilarWeb to discover 
                  competitors you might have missed.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  2. Analyze Their Products & Services
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Examine competitors' product features, pricing strategies, target markets, and value propositions. 
                  Create a comparison matrix to identify gaps in the market and opportunities for differentiation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  3. Study Their Marketing Strategies
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Analyze their content marketing, social media presence, advertising campaigns, and SEO strategies. 
                  Tools like SpyFu and Facebook Ad Library can reveal their paid advertising approaches.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  4. Monitor Customer Feedback
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Review customer reviews, testimonials, and social media mentions to understand competitor strengths 
                  and weaknesses from the customer perspective. This provides insights into market demands and pain points.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  5. Track Performance Metrics
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Monitor competitors' website traffic, social media engagement, search rankings, and market share. 
                  Set up Google Alerts and use competitive intelligence tools for ongoing monitoring.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Custom Competitive Analysis?</h3>
            <p className="text-gray-700 mb-6">
              Our expert team can conduct comprehensive competitive analysis tailored to your industry and business needs.
            </p>
            <button 
              onClick={() => window.location.href = '/hire'}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Get Expert Help
            </button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default CompetitiveAnalysis;