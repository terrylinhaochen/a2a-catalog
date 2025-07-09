import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, BookOpen, TrendingUp, Users, MessageCircle, FileText, Lightbulb, Target } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Explore = () => {
  const aiAnswers = [
    {
      question: "How to conduct effective competitive analysis?",
      category: "Business Strategy",
      answers: 847,
      icon: <TrendingUp className="w-5 h-5" />,
      tag: "Popular"
    },
    {
      question: "Best practices for AI-powered customer segmentation",
      category: "Marketing",
      answers: 623,
      icon: <Users className="w-5 h-5" />,
      tag: "Trending"
    },
    {
      question: "How to optimize conversion rates with AI insights?",
      category: "Sales",
      answers: 492,
      icon: <Target className="w-5 h-5" />,
      tag: "Expert"
    },
    {
      question: "Social media automation strategies that work",
      category: "Digital Marketing",
      answers: 385,
      icon: <MessageCircle className="w-5 h-5" />,
      tag: "New"
    }
  ];

  const businessGuides = [
    {
      title: "Complete Guide to AI-Powered Business Intelligence",
      description: "Learn how to leverage artificial intelligence for data-driven business decisions, automated reporting, and predictive analytics.",
      readTime: "12 min read",
      category: "AI & Analytics",
      icon: <Brain className="w-6 h-6" />,
      difficulty: "Intermediate"
    },
    {
      title: "Building Scalable Customer Support with AI Agents",
      description: "Step-by-step guide to implementing AI chatbots and automated support systems that enhance customer experience.",
      readTime: "15 min read", 
      category: "Customer Success",
      icon: <MessageCircle className="w-6 h-6" />,
      difficulty: "Beginner"
    },
    {
      title: "Advanced Market Research Using AI Tools",
      description: "Comprehensive methodology for conducting market research, competitor analysis, and trend identification using AI-powered tools.",
      readTime: "18 min read",
      category: "Market Research",
      icon: <TrendingUp className="w-6 h-6" />,
      difficulty: "Advanced"
    },
    {
      title: "Content Strategy Automation for Modern Businesses",
      description: "How to create, optimize, and distribute content at scale using AI-driven content management and distribution systems.",
      readTime: "10 min read",
      category: "Content Marketing",
      icon: <FileText className="w-6 h-6" />,
      difficulty: "Intermediate"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Explore - AI Answers & Business Guides | A2A Catalog"
        description="Discover AI-powered answers from experts and in-depth business guides covering strategy, marketing, sales, and automation topics."
        keywords="AI answers, business guides, expert insights, automation, strategy, marketing"
        url="https://a2acatalog.com/explore"
      />
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Purple Card */}
          <Card className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-10 lg:p-14">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  🔍 EXPLORE PAGE - Expert Insights
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Discover AI-powered answers and comprehensive business guides to help you make informed decisions and grow your business.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Answers Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Answers
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by AI, answered by Experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {aiAnswers.map((item, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border-gray-200"
                onClick={() => window.location.href = `/answers/${item.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        {item.icon}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {item.tag}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">{item.answers} answers</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{item.category}</p>
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 p-0">
                    View Answers →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="px-8">
              Browse All Answers
            </Button>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Guides
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In-depth guides covering business topics
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {businessGuides.map((guide, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200"
                onClick={() => window.location.href = `/guides/${guide.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      {guide.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {guide.category}
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                            guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}
                        >
                          {guide.difficulty}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-xl text-gray-900 mb-3 leading-tight">
                        {guide.title}
                      </h3>
                      <p className="text-gray-600 text-base mb-4 leading-relaxed">
                        {guide.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{guide.readTime}</span>
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 p-0">
                          Read Guide →
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="px-8">
              View All Guides
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-3xl p-12 text-center">
            <Lightbulb className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Need Expert Help?
            </h3>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Can't find what you're looking for? Our expert team can provide personalized answers and custom solutions.
            </p>
            <Button 
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-full font-medium"
              onClick={() => window.location.href = '/hire'}
            >
              Get Expert Help
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Explore;