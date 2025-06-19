
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  user_id?: string;
  created_at?: string;
  updated_at?: string;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = async () => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('votes', { ascending: false });

      if (error) throw error;
      setAgents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agents');
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      
      // Add count of agents for each category
      const categoriesWithCount = await Promise.all(
        (data || []).map(async (category) => {
          const { count } = await supabase
            .from('agents')
            .select('*', { count: 'exact', head: true })
            .contains('categories', [category.name]);
          
          return { ...category, count: count || 0 };
        })
      );
      
      setCategories(categoriesWithCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    }
  };

  const addAgent = async (agentData: Omit<Agent, 'id' | 'votes' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .insert(agentData)
        .select()
        .single();

      if (error) throw error;
      
      setAgents(prev => [...prev, data]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'Failed to add agent' };
    }
  };

  const voteForAgent = async (agentId: string, userId: string) => {
    try {
      // Check if user already voted
      const { data: existingVote } = await supabase
        .from('agent_votes')
        .select('id')
        .eq('agent_id', agentId)
        .eq('user_id', userId)
        .single();

      if (existingVote) {
        // Remove vote
        await supabase
          .from('agent_votes')
          .delete()
          .eq('agent_id', agentId)
          .eq('user_id', userId);

        // Decrease vote count
        const { error: updateError } = await supabase
          .from('agents')
          .update({ votes: agents.find(a => a.id === agentId)!.votes - 1 })
          .eq('id', agentId);

        if (updateError) throw updateError;
      } else {
        // Add vote
        await supabase
          .from('agent_votes')
          .insert([{ agent_id: agentId, user_id: userId }]);

        // Increase vote count
        const { error: updateError } = await supabase
          .from('agents')
          .update({ votes: agents.find(a => a.id === agentId)!.votes + 1 })
          .eq('id', agentId);

        if (updateError) throw updateError;
      }

      // Refresh agents
      await fetchAgents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to vote');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
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
