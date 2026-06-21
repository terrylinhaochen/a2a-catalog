
import { useState, useEffect } from 'react';
import { catalogAgents, catalogCategories } from '@/data/catalog';

export interface Agent {
  id: string;
  name: string;
  description: string;
  provider: string;
  logo?: string;
  categories: string[];
  skills: string[];
  votes: number;
  is_verified?: boolean;
  auth_type?: 'API Key' | 'OAuth' | 'Bearer Token' | 'Basic Auth';
  endpoint?: string;
  documentation?: string;
  examples?: string[];
  featured?: boolean;
  status?: 'working' | 'reference' | 'roadmap' | 'deprecated';
  status_note?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  // GitHub-style fields
  stars?: number;
  forks?: number;
  last_updated?: string;
  github_url?: string;
  deployment_instructions?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count?: number;
}

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const fetchAgents = async (options?: { 
    limit?: number; 
    offset?: number; 
    search?: string; 
    categories?: string[]; 
    sortBy?: string; 
  }) => {
    let data = [...catalogAgents];

    if (options?.search) {
      const query = options.search.toLowerCase();
      data = data.filter((agent) =>
        agent.name.toLowerCase().includes(query) ||
        agent.description.toLowerCase().includes(query) ||
        agent.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    if (options?.categories?.length) {
      data = data.filter((agent) =>
        options.categories!.some((category) => agent.categories.includes(category))
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

    setAgents(data);
    return { data, count };
  };

  const fetchCategories = async () => {
    setCategories(catalogCategories);
  };

  const addAgent = async (agentData: Omit<Agent, 'id' | 'votes' | 'created_at' | 'updated_at'>) => {
    const data: Agent = {
      ...agentData,
      id: `local-${Date.now()}`,
      votes: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setAgents(prev => [...prev, data]);
    return { data, error: null };
  };

  const voteForAgent = async (agentId: string, _userId?: string) => {
    setAgents(prev => prev.map(agent =>
      agent.id === agentId ? { ...agent, votes: agent.votes + 1 } : agent
    ));
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(false);
      await Promise.all([fetchAgents(), fetchCategories()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    agents,
    categories,
    loading,
    error,
    addAgent,
    voteForAgent,
    refetch: () => Promise.all([fetchAgents(), fetchCategories()])
  };
};
