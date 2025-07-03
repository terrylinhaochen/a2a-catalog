import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, BookOpen, Search, BarChart3, FileText, Lightbulb } from 'lucide-react';

const LiteratureResearch = () => {
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Comprehensive Research",
      description: "Thorough literature searches across academic databases and reputable sources"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Literature Reviews",
      description: "Systematic analysis and synthesis of existing research and publications"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Data Analysis",
      description: "Statistical analysis and interpretation of research data and findings"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Research Reports",
      description: "Professional research reports with citations and methodology"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Insights & Recommendations",
      description: "Actionable insights and evidence-based recommendations"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Meta-Analysis",
      description: "Advanced statistical analysis combining multiple research studies"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Literature Review & Research Services | A2A Catalog"
        description="Professional academic research and literature review services. Comprehensive analysis and evidence-based insights. See results first, then pay."
        keywords="literature review, academic research, data analysis, research reports, meta-analysis"
        url="https://a2acatalog.com/services/literature-research"
      />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <Code className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Literature Review & Research Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Professional academic research and literature review services. Get comprehensive analysis, 
            evidence-based insights, and systematic reviews to support your projects and decision-making.
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
              <h3 className="font-semibold text-xl text-gray-900 mb-4">Research Deliverables</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Comprehensive literature review</li>
                <li>• Annotated bibliography</li>
                <li>• Research methodology framework</li>
                <li>• Data analysis and visualization</li>
                <li>• Evidence synthesis report</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-4">Quality Assurance</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Peer-reviewed source validation</li>
                <li>• Systematic search methodology</li>
                <li>• Statistical analysis verification</li>
                <li>• Citation accuracy check</li>
                <li>• Research ethics compliance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Evidence-Based Insights?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get professional literature review and research services with our results-based guarantee. 
            See samples first, pay only if satisfied.
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            Start Your Research
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LiteratureResearch;