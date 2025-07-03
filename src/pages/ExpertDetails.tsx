import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ExternalLink, CheckCircle, MapPin, DollarSign, Clock, Star } from 'lucide-react';
import { useExperts } from '@/hooks/useExperts';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const ExpertDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { experts, voteForExpert } = useExperts();
  const { user } = useAuth();
  
  const expert = experts.find(e => e.id === id);

  const handleVote = async () => {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    if (expert) {
      try {
        await voteForExpert(expert.id, user.id);
        toast.success('Vote recorded successfully!');
      } catch (error) {
        console.error('Voting error:', error);
        toast.error('Failed to record vote. Please try again.');
      }
    }
  };

  if (!expert) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Expert not found</h1>
            <p className="text-gray-600">The expert you're looking for doesn't exist.</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    {expert.avatar_url && (
                      <img
                        src={expert.avatar_url}
                        alt={expert.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        {expert.name}
                        {expert.is_verified && (
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        )}
                      </CardTitle>
                      <p className="text-gray-600">{expert.provider}</p>
                      {expert.location && (
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <MapPin className="w-4 h-4" />
                          {expert.location}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button onClick={handleVote} variant="outline" className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    {expert.votes}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-700">{expert.description}</p>
                </div>

                {expert.skills && expert.skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {expert.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {expert.categories && expert.categories.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {expert.categories.map((category) => (
                        <Badge key={category} variant="outline">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing & Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hire This Expert</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {expert.hourly_rate && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">${expert.hourly_rate}/hour</span>
                  </div>
                )}
                
                {expert.availability && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>{expert.availability}</span>
                  </div>
                )}

                {expert.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{expert.rating}/5.0 ({expert.reviews_count} reviews)</span>
                  </div>
                )}

                {expert.experience_years && (
                  <div className="text-sm text-gray-600">
                    {expert.experience_years} years of experience
                  </div>
                )}

                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Contact Expert
                </Button>
              </CardContent>
            </Card>

            {/* Links */}
            {(expert.portfolio_url || expert.github_url || expert.linkedin_url) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {expert.portfolio_url && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={expert.portfolio_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Portfolio
                      </a>
                    </Button>
                  )}
                  
                  {expert.github_url && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={expert.github_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  
                  {expert.linkedin_url && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={expert.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExpertDetails;