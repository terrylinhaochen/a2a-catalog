
import React from 'react';
import { Heart, ChevronUp, ExternalLink, Star, Users, GitFork, Clock, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

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
    is_verified?: boolean;
    auth_type?: string;
    stars?: number;
    forks?: number;
    last_updated?: string;
    github_url?: string;
    deployment_instructions?: string;
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
    <div className={`bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg group flex flex-col ${compact ? 'h-64' : 'h-96'}`}>
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1 pr-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              {agent.logo ? (
                <img src={agent.logo} alt={agent.name} className="w-8 h-8 rounded" />
              ) : (
                <span className="text-purple-600 font-semibold text-lg">
                  {agent.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors truncate" title={agent.name}>
                  {agent.name}
                </h3>
                {agent.is_verified && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 truncate" title={agent.provider}>{agent.provider}</p>
            </div>
          </div>

          {/* Voting */}
          <div className="flex flex-col items-center space-y-1 flex-shrink-0">
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

        {/* GitHub Stats */}
        {!compact && (agent.stars !== undefined || agent.forks !== undefined || agent.last_updated) && (
          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
            {agent.stars !== undefined && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>{agent.stars}</span>
                <span>Stars</span>
              </div>
            )}
            {agent.forks !== undefined && (
              <div className="flex items-center space-x-1">
                <GitFork className="w-4 h-4" />
                <span>{agent.forks}</span>
                <span>Forks</span>
              </div>
            )}
            {agent.last_updated && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{agent.last_updated}</span>
              </div>
            )}
          </div>
        )}

        {/* Description - with fixed height and overflow handling */}
        <div className={`mb-4 flex-shrink-0 ${compact ? 'h-10' : 'h-16'}`}>
          <p className={`text-gray-600 ${compact ? 'line-clamp-2' : 'line-clamp-3'} text-sm leading-relaxed`}>
            {agent.description}
          </p>
        </div>

        {/* Categories - fixed height section */}
        <div className="mb-4 flex-shrink-0 h-6">
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Skills - show only top 2 tags */}
        {!compact && agent.skills.length > 0 && (
          <div className="mb-4 flex-shrink-0">
            <div className="flex flex-wrap gap-2">
              {agent.skills.slice(0, 2).map((skill) => (
                <span
                  key={skill}
                  className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  title={skill}
                >
                  {skill}
                </span>
              ))}
              {agent.skills.length > 2 && (
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                  +{agent.skills.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Spacer to push footer to bottom */}
        <div className="flex-grow"></div>

        {/* Footer - always at bottom */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {/* Empty space for balance */}
          </div>
          
          <div className="flex items-center space-x-2">
            {agent.github_url && (
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                asChild
              >
                <a href={agent.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-1" />
                  View on GitHub
                </a>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              asChild
            >
              <Link to={`/agents/${agent.id}`}>
                <ExternalLink className="w-4 h-4 mr-1" />
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
