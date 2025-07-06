import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, PieChart, Receipt, TrendingUp, Star, CheckCircle, Users, Clock } from 'lucide-react';

const FinanceAccounting = () => {
  const skills = [
    "Financial Analysis", "Bookkeeping", "Tax Preparation", "Budget Planning", "QuickBooks", "Excel",
    "Financial Reporting", "Accounts Payable/Receivable", "Payroll Processing", "Compliance", "Auditing", "Forecasting"
  ];

  const services = [
    "Financial analysis and reporting",
    "Bookkeeping and accounting services",
    "Tax preparation and compliance",
    "Budget planning and forecasting",
    "Payroll processing and management",
    "Financial auditing and reviews",
    "Cash flow management",
    "Investment analysis and planning"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Finance & Accounting Professionals - Expert Financial Analysts & Accounting Specialists | A2A Catalog"
        description="Connect with expert finance and accounting professionals. Financial analysts, certified accountants, and bookkeeping specialists for comprehensive financial management and business growth."
        keywords="financial analysts, accounting professionals, bookkeepers, tax specialists, financial planners, certified accountants, financial consultants, budget analysts"
        url="https://a2acatalog.com/professions/finance-accounting"
      />
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Calculator className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Finance & Accounting Professionals</h1>
                  <p className="text-gray-600">Expert financial analysts and accounting specialists</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">4.7/5</span>
                  <span className="ml-1 text-sm text-gray-500">(114 reviews)</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  <span>42 professionals available</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>24-48h avg response</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">About This Profession</h3>
                <p className="text-gray-700 mb-4">
                  Our finance and accounting professionals bring precision, expertise, and strategic insight 
                  to your financial operations. They ensure your business maintains healthy financial practices 
                  while identifying opportunities for growth and optimization.
                </p>
                <p className="text-gray-700">
                  From comprehensive bookkeeping to advanced financial analysis, our professionals provide 
                  the financial foundation your business needs to thrive. They combine technical expertise 
                  with business acumen to deliver actionable insights and compliant financial management.
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Core Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Services Offered</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">$2.8M+</div>
                  <div className="text-sm text-gray-600">Managed Budgets</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">99%</div>
                  <div className="text-sm text-gray-600">Compliance Rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">156</div>
                  <div className="text-sm text-gray-600">Reports Generated</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Panel - CTA */}
          <div className="lg:w-80">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Get Started</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Connect with expert finance and accounting professionals for your business needs.
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => window.location.href = '/submit-request?source=finance-accounting'}
                  >
                    Request Financial Services
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/agents?category=finance'}
                  >
                    Browse Available Agents
                  </Button>
                </div>
                
                <div className="mt-6 pt-4 border-t text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Tax season ready</span>
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

export default FinanceAccounting;