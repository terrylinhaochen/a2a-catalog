
import React from 'react';
import { Heart, ChevronUp, ExternalLink, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    description: string;
    provider: string;
    logo?: string;
    categories: string[];
    skills: string[];
    votes: number;
    isVerified?: boolean;
    authType?: string;
  };
  onVote?: (agentId: string, voteType: 'up' | 'down') => void;
  compact?: boolean;
}

const AgentCard = ({ agent, onVote, compact = false }: AgentCardProps) => {
  const handleVote = (voteType: 'up' | 'down') => {
    if (onVote) {
      onVote(agent.id, voteType);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
              {agent.logo ? (
                <img src={agent.logo} alt={agent.name} className="w-8 h-8 rounded" />
              ) : (
                <span className="text-purple-600 font-semibold text-lg">
                  {agent.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {agent.name}
                </h3>
                {agent.isVerified && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">{agent.provider}</p>
            </div>
          </div>

          {/* Voting */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('up')}
              className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-gray-600">{agent.votes}</span>
          </div>
        </div>

        {/* Description */}
        <p className={`text-gray-600 mb-4 ${compact ? 'line-clamp-2' : 'line-clamp-3'}`}>
          {agent.description}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {agent.categories.slice(0, compact ? 2 : 3).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {agent.categories.length > (compact ? 2 : 3) && (
            <Badge variant="outline" className="text-xs">
              +{agent.categories.length - (compact ? 2 : 3)}
            </Badge>
          )}
        </div>

        {/* Skills */}
        {!compact && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {agent.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {skill}
                </span>
              ))}
              {agent.skills.length > 4 && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  +{agent.skills.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {agent.authType && (
              <span className="flex items-center space-x-1">
                <span>🔐</span>
                <span>{agent.authType}</span>
              </span>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
