
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, GitFork, Clock, Github, Shield, Globe, FileText, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useMcpServers } from '@/hooks/useMcpServers';
import { useAuth } from '@/contexts/AuthContext';

const McpDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { mcpServers, voteForMcpServer } = useMcpServers();
  const { user } = useAuth();
  
  const mcpServer = mcpServers.find(m => m.id === id);

  const handleVote = async () => {
    if (!user || !mcpServer) return;
    await voteForMcpServer(mcpServer.id, user.id);
  };

  if (!mcpServer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-6xl mb-4">🔌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">MCP Server Not Found</h1>
            <p className="text-gray-600 mb-6">The MCP server you're looking for doesn't exist.</p>
            <Link to="/mcps">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to MCP Servers
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/mcps">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to MCP Servers
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
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                      {mcpServer.logo ? (
                        <img src={mcpServer.logo} alt={mcpServer.name} className="w-10 h-10 rounded" />
                      ) : (
                        <span className="text-green-600 font-bold text-2xl">
                          {mcpServer.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-2xl">{mcpServer.name}</CardTitle>
                        {mcpServer.is_verified && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600">{mcpServer.provider}</p>
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
                      <span className="text-sm font-medium">{mcpServer.votes}</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-base mb-6">
                  {mcpServer.description}
                </CardDescription>

                {/* GitHub Stats */}
                {(mcpServer.stars !== undefined || mcpServer.forks !== undefined || mcpServer.last_updated) && (
                  <div className="flex items-center space-x-6 mb-6 p-4 bg-gray-50 rounded-lg">
                    {mcpServer.stars !== undefined && (
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium">{mcpServer.stars}</span>
                        <span className="text-gray-600">Stars</span>
                      </div>
                    )}
                    {mcpServer.forks !== undefined && (
                      <div className="flex items-center space-x-2">
                        <GitFork className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">{mcpServer.forks}</span>
                        <span className="text-gray-600">Forks</span>
                      </div>
                    )}
                    {mcpServer.last_updated && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600">Updated {mcpServer.last_updated}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {mcpServer.categories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Capabilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {mcpServer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
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
                {mcpServer.github_url && (
                  <Button asChild variant="outline" className="w-full">
                    <a href={mcpServer.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                )}

                <Separator />

                {/* Technical Details */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Technical Details</h4>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Provider</span>
                    <span className="text-sm font-medium">{mcpServer.provider}</span>
                  </div>

                  {mcpServer.created_at && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Created</span>
                      <span className="text-sm font-medium">
                        {new Date(mcpServer.created_at).toLocaleDateString()}
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
  );
};

export default McpDetails;
