
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, GitFork, Clock, Github, Shield, Key, Globe, FileText, Users, Heart, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { useAgents } from '@/hooks/useAgents';
import { useAuth } from '@/contexts/AuthContext';

const AgentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { agents, voteForAgent } = useAgents();
  const { user } = useAuth();
  
  const agent = agents.find(a => a.id === id);

  const handleVote = async () => {
    if (!user || !agent) return;
    await voteForAgent(agent.id, user.id);
  };

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-6xl mb-4">🤖</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Agent Not Found</h1>
            <p className="text-gray-600 mb-6">The agent you're looking for doesn't exist.</p>
            <Link to="/agents">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Agents
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${agent.name} - AI Agent | AI Agent Marketplace`}
        description={`${agent.description} Discover ${agent.name} by ${agent.provider} with capabilities in ${agent.skills?.slice(0, 3).join(', ')}. Part of our AI Agent Marketplace supporting A2A protocol.`}
        url={`https://a2acatalog.com/agents/${agent.id}`}
        image={agent.logo}
        type="article"
      />
      
      <StructuredData 
        type="softwareApplication"
        data={{
          '@type': 'SoftwareApplication',
          name: agent.name,
          description: agent.description,
          applicationCategory: 'AI Agent',
          operatingSystem: 'Web',
          author: {
            '@type': 'Organization',
            name: agent.provider
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: Math.min(5, Math.max(1, agent.votes / 10 + 3)),
            reviewCount: agent.votes,
            bestRating: 5,
            worstRating: 1
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          },
          programmingLanguage: ['Python', 'JavaScript', 'TypeScript'],
          runtimePlatform: ['Web Browser', 'Node.js', 'Cloud'],
          featureList: agent.skills || [],
          keywords: agent.categories?.join(', '),
          url: `https://a2acatalog.com/agents/${agent.id}`,
          downloadUrl: agent.github_url,
          codeRepository: agent.github_url,
          ...(agent.github_url && { sameAs: [agent.github_url] }),
          ...(agent.documentation && { documentation: agent.documentation }),
          ...(agent.endpoint && { serviceUrl: agent.endpoint })
        }}
      />
      
      <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/agents">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Agents
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                      {agent.logo ? (
                        <img src={agent.logo} alt={agent.name} className="w-10 h-10 rounded" />
                      ) : (
                        <span className="text-purple-600 font-bold text-2xl">
                          {agent.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-2xl">{agent.name}</CardTitle>
                        {agent.is_verified && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {agent.featured && (
                          <Badge variant="default" className="bg-yellow-500">
                            ⭐ Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600">{agent.provider}</p>
                    </div>
                  </div>
                  
                  {/* Vote Button */}
                  <div className="flex flex-col items-center space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleVote}
                      className="flex flex-col items-center h-auto p-3 hover:bg-green-50 hover:text-green-600"
                    >
                      <ChevronUp className="w-5 h-5" />
                      <span className="text-sm font-medium">{agent.votes}</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-base mb-6">
                  {agent.description}
                </CardDescription>

                {/* GitHub Stats */}
                {(agent.stars !== undefined || agent.forks !== undefined || agent.last_updated) && (
                  <div className="flex items-center space-x-6 mb-6 p-4 bg-gray-50 rounded-lg">
                    {agent.stars !== undefined && (
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium">{agent.stars}</span>
                        <span className="text-gray-600">Stars</span>
                      </div>
                    )}
                    {agent.forks !== undefined && (
                      <div className="flex items-center space-x-2">
                        <GitFork className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">{agent.forks}</span>
                        <span className="text-gray-600">Forks</span>
                      </div>
                    )}
                    {agent.last_updated && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600">Updated {agent.last_updated}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.categories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Skills & Capabilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deployment Instructions */}
                {agent.deployment_instructions && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Deployment</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">{agent.deployment_instructions}</p>
                    </div>
                  </div>
                )}

                {/* Examples */}
                {agent.examples && agent.examples.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Examples</h3>
                    <div className="space-y-2">
                      {agent.examples.map((example, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded border-l-4 border-purple-500">
                          <code className="text-sm">{example}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* GitHub Link */}
                {agent.github_url && (
                  <Button asChild variant="outline" className="w-full">
                    <a href={agent.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                )}

                {/* Documentation */}
                {agent.documentation && (
                  <Button asChild variant="outline" className="w-full">
                    <a href={agent.documentation} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      Documentation
                    </a>
                  </Button>
                )}

                {/* API Endpoint */}
                {agent.endpoint && (
                  <Button asChild variant="outline" className="w-full">
                    <a href={agent.endpoint} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      API Endpoint
                    </a>
                  </Button>
                )}

                <Separator />

                {/* Technical Details */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Technical Details</h4>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Provider</span>
                    <span className="text-sm font-medium">{agent.provider}</span>
                  </div>

                  {agent.created_at && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Created</span>
                      <span className="text-sm font-medium">
                        {new Date(agent.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </>
  );
};

export default AgentDetails;
