import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenTool, Globe, FileText, Users, BookOpen, Zap } from 'lucide-react';

const WritingTranslation = () => {
  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Content Writing",
      description: "High-quality blog posts, articles, and web content that engages your audience"
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Copywriting",
      description: "Persuasive marketing copy that converts visitors into customers"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Technical Documentation",
      description: "Clear, comprehensive documentation for products and services"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Translation Services",
      description: "Professional translation services for multiple languages and markets"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social Media Content",
      description: "Engaging social media posts and content strategies"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "SEO Optimization",
      description: "Content optimized for search engines and user engagement"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Writing & Translation Services | A2A Catalog"
        description="Professional writing and translation services. Content creation, copywriting, and multilingual support. See results first, then pay."
        keywords="content writing, copywriting, translation, technical documentation, SEO writing"
        url="https://a2acatalog.com/services/writing-translation"
      />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <PenTool className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Writing & Translation Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Professional writing and translation services to help you communicate effectively across languages and markets. 
            From content creation to technical documentation, we deliver quality that resonates.
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
              <h3 className="font-semibold text-xl text-gray-900 mb-4">Content Creation</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Original, engaging content</li>
                <li>• SEO-optimized writing</li>
                <li>• Brand voice consistency</li>
                <li>• Multiple content formats</li>
                <li>• Plagiarism-free guarantee</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-4">Translation & Localization</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Native speaker translations</li>
                <li>• Cultural localization</li>
                <li>• Technical accuracy</li>
                <li>• Multiple language pairs</li>
                <li>• Quality assurance review</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Enhance Your Content?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get professional writing and translation services with our results-based guarantee. 
            See samples first, pay only if satisfied.
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            Start Your Project
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WritingTranslation;