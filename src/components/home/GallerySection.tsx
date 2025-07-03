
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GenericCard from '@/components/GenericCard';
import { Agent } from '@/hooks/useAgents';
import { McpServer } from '@/hooks/useMcpServers';

interface GallerySectionProps {
  filteredItems: (Agent | McpServer)[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleVote: (itemId: string, voteType: 'up' | 'down') => Promise<void>;
  getItemType: (item: Agent | McpServer) => 'agent' | 'mcp';
  agents: Agent[];
}

const GallerySection = ({
  filteredItems,
  loading,
  searchQuery,
  setSearchQuery,
  handleVote,
  getItemType,
  agents
}: GallerySectionProps) => {
  return (
    <div className="relative max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-16">
      {/* Gallery Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Agent Skill Gallery
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover AI agents and MCP servers with specialized skills to supercharge your workflows
        </p>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <GenericCard 
                item={item} 
                type={getItemType(item)}
                onVote={handleVote} 
              />
            </div>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12 bg-white border border-gray-200 mb-12">
          <CardContent>
            <p className="text-gray-500 mb-4">No items found matching your search.</p>
            <Button onClick={() => setSearchQuery('')} variant="outline">
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}

      {/* View All Links */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" asChild className="bg-purple-600 text-white hover:bg-purple-700 border-purple-600">
          <Link to="/agents">View All Agents</Link>
        </Button>
        <Button variant="outline" asChild className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600">
          <Link to="/mcps">View All MCP Servers</Link>
        </Button>
      </div>
    </div>
  );
};

export default GallerySection;
