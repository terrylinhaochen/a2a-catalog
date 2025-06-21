
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
      console.error('Error fetching agents:', err);
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
      console.error('Error fetching categories:', err);
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
      console.log('Voting for agent:', agentId, 'by user:', userId);
      
      // Check if user already voted
      const { data: existingVote, error: voteCheckError } = await supabase
        .from('agent_votes')
        .select('id')
        .eq('agent_id', agentId)
        .eq('user_id', userId)
        .maybeSingle();

      if (voteCheckError) {
        console.error('Error checking existing vote:', voteCheckError);
        throw voteCheckError;
      }

      const currentAgent = agents.find(a => a.id === agentId);
      if (!currentAgent) {
        throw new Error('Agent not found');
      }

      if (existingVote) {
        console.log('Removing existing vote');
        // Remove vote
        const { error: deleteError } = await supabase
          .from('agent_votes')
          .delete()
          .eq('agent_id', agentId)
          .eq('user_id', userId);

        if (deleteError) throw deleteError;

        // Decrease vote count
        const newVoteCount = Math.max(0, currentAgent.votes - 1);
        const { error: updateError } = await supabase
          .from('agents')
          .update({ votes: newVoteCount })
          .eq('id', agentId);

        if (updateError) throw updateError;

        // Update local state immediately
        setAgents(prev => prev.map(agent => 
          agent.id === agentId 
            ? { ...agent, votes: newVoteCount }
            : agent
        ));
      } else {
        console.log('Adding new vote');
        // Add vote
        const { error: insertError } = await supabase
          .from('agent_votes')
          .insert([{ agent_id: agentId, user_id: userId }]);

        if (insertError) throw insertError;

        // Increase vote count
        const newVoteCount = currentAgent.votes + 1;
        const { error: updateError } = await supabase
          .from('agents')
          .update({ votes: newVoteCount })
          .eq('id', agentId);

        if (updateError) throw updateError;

        // Update local state immediately
        setAgents(prev => prev.map(agent => 
          agent.id === agentId 
            ? { ...agent, votes: newVoteCount }
            : agent
        ));
      }

      console.log('Vote operation completed successfully');
    } catch (err) {
      console.error('Error in voteForAgent:', err);
      setError(err instanceof Error ? err.message : 'Failed to vote');
      throw err; // Re-throw so the UI can handle the error
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
