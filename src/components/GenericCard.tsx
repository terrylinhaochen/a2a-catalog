
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Expand, CheckCircle, Star, GitFork } from 'lucide-react';
import { Agent } from '@/hooks/useAgents';
import { McpServer } from '@/hooks/useMcpServers';

interface GenericCardProps {
  item: Agent | McpServer;
  onVote: (id: string, voteType: 'up' | 'down') => void;
  compact?: boolean;
  type: 'agent' | 'mcp';
}

const GenericCard = ({ item, onVote, compact = false, type }: GenericCardProps) => {
  const isAgent = type === 'agent';
  const detailsPath = isAgent ? `/agents/${item.id}` : `/mcps/${item.id}`;

  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-200 ${compact ? 'flex flex-row' : ''}`}>
      <CardHeader className={compact ? 'pb-2 flex-shrink-0' : 'pb-3'}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {item.logo && (
              <img
                src={item.logo}
                alt={`${item.name} logo`}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div>
              <CardTitle className="text-lg leading-tight flex items-center gap-2">
                <Link
                  to={detailsPath}
                  className="hover:text-purple-600 transition-colors"
                >
                  {item.name}
                </Link>
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

        {item.categories && item.categories.length > 0 && (
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
              onClick={() => onVote(item.id, 'up')}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
            >
              <Heart className="w-4 h-4" />
              <span>{item.votes}</span>
            </Button>
            
            {item.stars !== undefined && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>{item.stars}</span>
              </div>
            )}
            
            {item.forks !== undefined && (
              <div className="flex items-center space-x-1">
                <GitFork className="w-4 h-4" />
                <span>{item.forks}</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link
                to={detailsPath}
                className="text-gray-500 hover:text-gray-700"
              >
                <Expand className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GenericCard;
