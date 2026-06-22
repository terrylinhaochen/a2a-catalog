import { BarChart3, MessageSquare, Search, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SocialListeningCaseStudy = () => {
  const capabilities = [
    'Real-time conversation analysis',
    'Sentiment and trend detection',
    'Predictive performance insights',
    'Multi-platform social monitoring',
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
            Client Case Study - Social Listening
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-950">
            Social Listening with Crowdlistening
          </h2>
        </div>

        <Card className="border-gray-200 rounded-lg">
          <CardContent className="p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="w-11 h-11 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-gray-700" />
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Extract actionable insights from social conversations and understand what your audience is really saying. Our AI-powered social listening platform delivers faster performance predictions than traditional A/B testing.
                </p>

                <Button asChild variant="outline">
                  <a href="https://crowdlistening.com" target="_blank" rel="noopener noreferrer">
                    Learn More
                  </a>
                </Button>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {capabilities.map((capability, index) => {
                    const Icon = index % 2 === 0 ? Search : BarChart3;
                    return (
                      <div key={capability} className="bg-white border border-gray-200 rounded-lg p-4">
                        <Icon className="w-5 h-5 text-gray-700 mb-3" />
                        <p className="text-sm font-medium text-gray-900">{capability}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SocialListeningCaseStudy;
