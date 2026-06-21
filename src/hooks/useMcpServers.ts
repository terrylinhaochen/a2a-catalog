
import { useState, useEffect } from 'react';
import { catalogMcpServers } from '@/data/catalog';

export interface McpServer {
  id: string;
  name: string;
  description: string;
  provider: string;
  logo?: string;
  categories: string[];
  skills: string[];
  votes: number;
  is_verified?: boolean;
  github_url?: string;
  stars?: number;
  forks?: number;
  last_updated?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  documentation?: string;
  package_name?: string;
  repository_url?: string;
  server_type?: string; // Changed from 'local' | 'remote' to string to match database
  connection_url?: string; // For remote servers
  install_command?: string; // For local servers
  run_command?: string; // For local servers
  port?: number; // Default port for local servers
  auth_required?: boolean;
  auth_type?: string; // Changed from 'oauth' | 'api_key' | 'none' to string to match database
  featured?: boolean; // Added featured property
  status?: 'working' | 'reference' | 'roadmap' | 'deprecated';
  status_note?: string;
}

export const useMcpServers = () => {
  const [mcpServers, setMcpServers] = useState<McpServer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const fetchMcpServers = async (options?: { 
    limit?: number; 
    offset?: number; 
    search?: string; 
    categories?: string[]; 
    sortBy?: string; 
  }) => {
    let data = [...catalogMcpServers];

    if (options?.search) {
      const query = options.search.toLowerCase();
      data = data.filter((server) =>
        server.name.toLowerCase().includes(query) ||
        server.description.toLowerCase().includes(query) ||
        server.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    if (options?.categories?.length) {
      data = data.filter((server) =>
        options.categories!.some((category) => server.categories.includes(category))
      );
    }

    switch (options?.sortBy) {
      case 'newest':
        data.sort((a, b) => new Date(b.created_at || b.last_updated || '').getTime() - new Date(a.created_at || a.last_updated || '').getTime());
        break;
      case 'alphabetical':
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popular':
      default:
        data.sort((a, b) => b.votes - a.votes);
        break;
    }

    const count = data.length;
    if (options?.offset !== undefined || options?.limit !== undefined) {
      const start = options.offset || 0;
      const end = options.limit ? start + options.limit : undefined;
      data = data.slice(start, end);
    }

    setMcpServers(data);
    return { data, count };
  };

  const voteForMcpServer = async (mcpServerId: string, _userId?: string) => {
    setMcpServers(prev => prev.map(server =>
      server.id === mcpServerId ? { ...server, votes: server.votes + 1 } : server
    ));
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(false);
      await fetchMcpServers();
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    mcpServers,
    loading,
    error,
    voteForMcpServer,
    refetch: fetchMcpServers
  };
};
