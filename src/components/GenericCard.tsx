
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ExternalLink, CheckCircle, Star, GitFork } from 'lucide-react';
import { Agent } from '@/hooks/useAgents';
import { McpServer } from '@/hooks/useMcpServers';
import { Workflow } from '@/hooks/useWorkflows';

interface GenericCardProps {
  item: Agent | McpServer | Workflow;
  onVote: (id: string, voteType: 'up' | 'down') => void;
  compact?: boolean;
  type: 'agent' | 'mcp' | 'workflow';
}

const GenericCard = ({ item, onVote, compact = false, type }: GenericCardProps) => {
  const getDetailsPath = () => {
    switch (type) {
      case 'agent': return `/agents/${item.id}`;
      case 'workflow': return `/workflows/${item.id}`;
      default: return `/mcps/${item.id}`;
    }
  };
  const detailsPath = getDetailsPath();
  
  // Type-safe property access
  const logo = 'logo' in item ? item.logo : ('avatar_url' in item ? item.avatar_url : undefined);
  const stars = 'stars' in item ? item.stars : undefined;
  const forks = 'forks' in item ? item.forks : undefined;

  return (
    <Link to={detailsPath} className="block h-full">
      <Card className={`h-full hover:shadow-lg transition-all duration-200 cursor-pointer ${compact ? 'flex flex-row' : ''}`}>
        <CardHeader className={compact ? 'pb-2 flex-shrink-0' : 'pb-3'}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              {logo && (
                <img
                  src={logo as string}
                  alt={`${item.name} logo`}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div>
                <CardTitle className="text-lg leading-tight flex items-center gap-2">
                  <span className="hover:text-purple-600 transition-colors">
                    {item.name}
                  </span>
                  {item.is_verified && (
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  )}
                </CardTitle>
                <p className="text-sm text-gray-500">{item.provider}</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className={`space-y-3 ${compact ? 'flex-1' : ''}`}>
          <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>

          {/* Skills Display */}
          {item.skills && item.skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200">
                  {skill}
                </Badge>
              ))}
              {item.skills.length > 3 && (
                <Badge variant="outline" className="text-xs text-purple-600 border-purple-300">
                  +{item.skills.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Categories as fallback if no skills */}
          {(!item.skills || item.skills.length === 0) && item.categories && item.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.categories.slice(0, 3).map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
              {item.categories.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{item.categories.length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onVote(item.id, 'up');
                }}
                className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
              >
                <Heart className="w-4 h-4" />
                <span>{item.votes}</span>
              </Button>
              
              {stars !== undefined && (
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>{stars}</span>
                </div>
              )}
              
              {forks !== undefined && (
                <div className="flex items-center space-x-1">
                  <GitFork className="w-4 h-4" />
                  <span>{forks}</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GenericCard;
