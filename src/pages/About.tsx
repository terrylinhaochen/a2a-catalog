
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  Building2, 
  Network, 
  Target, 
  ArrowRight,
  CheckCircle,
  Star,
  Code,
  BookOpen,
  ExternalLink,
  Workflow,
  TrendingUp
} from 'lucide-react';

const About = () => {
  const partners = [
    "Atlassian", "Box", "Cohere", "Intuit", "Langchain", "MongoDB", "PayPal", 
    "Salesforce", "SAP", "ServiceNow", "UKG", "Workday", "Accenture", "BCG", 
    "Capgemini", "Cognizant", "Deloitte", "HCLTech", "Infosys", "KPMG", 
    "McKinsey", "PwC", "TCS", "Wipro"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section with Glassmorphism */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl mb-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative p-12 md:p-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Technology Partners
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              A2A is supported by industry leaders across technology and consulting, working together to build the future of agent interoperability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <a href="/agents">Browse Agents</a>
              </Button>
              <Button size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-purple-600" asChild>
                <a href="/docs" rel="noopener noreferrer">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Technology Partners */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Technology Partners & Service Providers
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            A2A is supported by industry leaders across technology and consulting
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {partners.map((partner, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {partner}
              </Badge>
            ))}
          </div>
        </section>

        {/* Ready to Get Started - Glassmorphism Card */}
        <Card className="backdrop-blur-m bg-white/70 border border-white/20 shadow-xl mt-20">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join the growing ecosystem of developers and enterprises creating the future of AI collaboration. 
              Discover, integrate, and deploy A2A-compatible agents today.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/agents">Browse Agents</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/submit">Submit Your Agent</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default About;
