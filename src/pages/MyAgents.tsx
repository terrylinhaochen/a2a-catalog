
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useAgents } from '@/hooks/useAgents';
import { useToast } from '@/hooks/use-toast';

const MyAgents = () => {
  const { user } = useAuth();
  const { agents, loading } = useAgents();
  const { toast } = useToast();

  // Filter agents to show only those created by the current user
  const myAgents = agents.filter(agent => agent.user_id === user?.id);

  const handleDeleteAgent = async (agentId: string) => {
    // TODO: Implement delete functionality when needed
    toast({
      title: "Feature Coming Soon",
      description: "Agent deletion will be available soon.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Agents</h1>
            <p className="text-gray-600 mt-2">
              Manage the AI agents you've submitted to the catalog
            </p>
          </div>
          <Link to="/submit">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Submit New Agent
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">{myAgents.length}</div>
              <div className="text-sm text-gray-600">Total Agents</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {myAgents.reduce((total, agent) => total + agent.votes, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Votes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {myAgents.filter(agent => agent.is_verified).length}
              </div>
              <div className="text-sm text-gray-600">Verified Agents</div>
            </CardContent>
          </Card>
        </div>

        {/* Agents List */}
        {myAgents.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No agents yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't submitted any agents to the catalog yet. Ready to share your AI agent with the community?
              </p>
              <Link to="/submit">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Your First Agent
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {myAgents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <div className="flex space-x-2">
                      {agent.is_verified && (
                        <Badge variant="secondary" className="text-green-600 bg-green-50">
                          Verified
                        </Badge>
                      )}
                      {agent.featured && (
                        <Badge variant="secondary" className="text-purple-600 bg-purple-50">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{agent.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-1">
                      {agent.categories.slice(0, 3).map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                      {agent.categories.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{agent.categories.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Votes: {agent.votes}</span>
                      <span>Provider: {agent.provider}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Link to={`/agents/${agent.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast({
                          title: "Feature Coming Soon",
                          description: "Agent editing will be available soon.",
                        })}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteAgent(agent.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyAgents;
