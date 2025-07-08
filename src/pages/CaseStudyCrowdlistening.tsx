import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  BarChart3, 
  MessageCircle, 
  TrendingUp, 
  Users, 
  Search,
  ArrowRight,
  ExternalLink,
  Calendar,
  Target,
  Lightbulb,
  Shield
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const CaseStudyCrowdlistening = () => {
  const insights = [
    {
      category: "Communication Issues",
      percentage: 65,
      description: "Communication during the crisis was inadequate and left passengers stranded without information",
      mentions: 427
    },
    {
      category: "Compensation Concerns", 
      percentage: 23,
      description: "Compensation offered was insufficient compared to the disruption experienced",
      mentions: 318
    },
    {
      category: "Policy Improvements",
      percentage: 12,
      description: "Subsequent policy changes show the airline is making an effort to improve",
      mentions: 86
    }
  ];

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Ask Any Question",
      description: "Enter a question about any topic to analyze what people are saying online."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Get Instant Analysis", 
      description: "Our AI analyzes thousands of comments to identify common opinions and sentiments."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Discover Insights",
      description: "See key themes, sentiment breakdown, and actionable takeaways from the crowd."
    }
  ];

  const useCases = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Reputation Intelligence",
      description: "Monitor brand perception and respond effectively to critical incidents.",
      features: [
        "Track sentiment during key market events",
        "Identify urgent issues requiring immediate action", 
        "Receive early alerts for potential challenges"
      ]
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Product Development",
      description: "Convert customer feedback into product roadmap priorities.",
      features: [
        "Detect emerging pain points before affecting retention",
        "Prioritize enhancements based on conversation volume",
        "Identify unexpected use cases and adaptations"
      ]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Emerging Topic Discovery", 
      description: "Uncover trends before they reach mainstream awareness.",
      features: [
        "Identify rising topics before they peak",
        "Spot early signals of changing preferences",
        "Surface untapped narrative opportunities"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Case Study: Crowdlistening - Social Insights Platform | A2A Catalog"
        description="Explore how Crowdlistening transforms social conversations into actionable insights through AI-powered sentiment analysis and crowd intelligence."
        keywords="crowdlistening, social insights, sentiment analysis, AI platform, case study"
        url="https://a2acatalog.com/case-study/crowdlistening"
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              Case Study
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Inspiring insights, amplifying voices
            </h1>
            <p className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover What The Crowd Thinks
            </p>
            <p className="text-xl text-white/80 mb-12 max-w-4xl mx-auto">
              Transform social conversations into actionable insights. Understand sentiment and identify key narratives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-full font-medium"
                onClick={() => window.open('https://crowdlistening.com', '_blank')}
              >
                Start Analyzing
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-full font-medium bg-transparent"
              >
                Explore Examples
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Analysis Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Sample Analysis
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              How did consumers respond to United Airlines' handling of the 2024 system outage?
            </p>
          </div>

          {/* Sentiment Overview */}
          <Card className="mb-12 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Sentiment Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">12%</div>
                  <div className="text-lg font-medium text-gray-900">Positive</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">23%</div>
                  <div className="text-lg font-medium text-gray-900">Neutral</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">65%</div>
                  <div className="text-lg font-medium text-gray-900">Negative</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Opinions */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Common Opinions</h3>
            <div className="space-y-6">
              {insights.map((insight, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-lg text-gray-900 mb-3 leading-relaxed">
                          {insight.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          Mentioned by approximately {insight.mentions} people
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Uncover actionable insights from social feedback
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              With Crowdlistening, you can analyze customer opinions, identify patterns, and understand sentiment at scale — whether from social media, reviews, or internal feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Transform Social Insights Into Strategic Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how organizations leverage our platform to gain competitive advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      {useCase.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {useCase.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {useCase.description}
                  </p>
                  <ul className="space-y-3">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Engagement Prediction Feature */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">
              NEW FEATURE
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Predict Social Engagement
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Simulate how your content will perform before publishing using AI agents trained on real-world behavior data.
            </p>
          </div>

          <Card className="bg-white shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Content Comparison</h3>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">A</span>
                        <span className="font-medium">Original Content</span>
                        <Badge variant="outline">Baseline</Badge>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Introducing our new product line with improved features and better performance. Check it out today!
                      </p>
                    </div>
                    <div className="border border-green-500 rounded-lg p-4 bg-green-50">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">B</span>
                        <span className="font-medium">AI-Optimized Version</span>
                        <Badge className="bg-green-100 text-green-700">Winner (+68% Engagement)</Badge>
                      </div>
                      <p className="text-gray-700 text-sm">
                        🚀 JUST LAUNCHED: Experience our revolutionary new product line! 2x faster, 3x more efficient, and designed with YOU in mind. Limited time offer - see why customers are switching today! #GameChanger
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Engagement Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Likes</span>
                      <span className="font-bold">87</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Comments</span>
                      <span className="font-bold">34</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shares</span>
                      <span className="font-bold">28</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Clicks</span>
                      <span className="font-bold">63</span>
                    </div>
                    <hr />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">AI Confidence</span>
                      <span className="font-bold text-green-600">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Prediction accuracy</span>
                      <span className="font-bold text-purple-600">Prediction accuracy</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Social Intelligence?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join organizations worldwide using Crowdlistening to turn social conversations into strategic advantages.
            </p>
            <Button 
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-full font-medium"
              onClick={() => window.open('https://crowdlistening.com', '_blank')}
            >
              Get Started with Crowdlistening
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyCrowdlistening;