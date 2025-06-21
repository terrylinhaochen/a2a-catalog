
import React from 'react';
import { Button } from '@/components/ui/button';
import GenericCard from '@/components/GenericCard';
import { Agent } from '@/hooks/useAgents';

interface AgentsGridProps {
  agents: Agent[];
  viewMode: 'grid' | 'list';
  searchQuery: string;
  selectedCategories: string[];
  onVote: (agentId: string, voteType: 'up' | 'down') => void;
  onClearFilters: () => void;
}

const AgentsGrid = ({
  agents,
  viewMode,
  searchQuery,
  selectedCategories,
  onVote,
  onClearFilters
}: AgentsGridProps) => {
  if (agents.length > 0) {
    return (
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
        : 'space-y-4'
      }>
        {agents.map((agent) => (
          <GenericCard 
            key={agent.id} 
            item={agent} 
            onVote={onVote}
            compact={viewMode === 'list'}
            type="agent"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No agents found</h3>
      <p className="text-gray-600 mb-4">
        Try adjusting your search criteria or removing some filters
      </p>
      <Button 
        variant="outline"
        onClick={onClearFilters}
      >
        Clear all filters
      </Button>
    </div>
  );
};

export default AgentsGrid;
