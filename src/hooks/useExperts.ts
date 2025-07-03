import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Expert {
  id: string;
  name: string;
  description: string;
  provider: string;
  skills: string[];
  categories: string[];
  hourly_rate?: number;
  experience_years?: number;
  portfolio_url?: string;
  github_url?: string;
  linkedin_url?: string;
  avatar_url?: string;
  logo?: string; // For compatibility with GenericCard
  location?: string;
  availability?: string;
  featured: boolean;
  is_verified: boolean;
  rating: number;
  reviews_count: number;
  votes: number;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const useExperts = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExperts = async () => {
    try {
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching experts:', error);
        toast.error('Failed to load experts');
        return;
      }

      setExperts(data || []);
    } catch (error) {
      console.error('Error fetching experts:', error);
      toast.error('Failed to load experts');
    } finally {
      setLoading(false);
    }
  };

  const voteForExpert = async (expertId: string, userId: string) => {
    try {
      // Check if user has already voted
      const { data: existingVote } = await supabase
        .from('expert_votes')
        .select('id')
        .eq('expert_id', expertId)
        .eq('user_id', userId)
        .single();

      if (existingVote) {
        // Remove vote
        await supabase
          .from('expert_votes')
          .delete()
          .eq('expert_id', expertId)
          .eq('user_id', userId);

        // Decrease vote count
        await supabase
          .from('experts')
          .update({ votes: experts.find(e => e.id === expertId)!.votes - 1 })
          .eq('id', expertId);
      } else {
        // Add vote
        await supabase
          .from('expert_votes')
          .insert({ expert_id: expertId, user_id: userId });

        // Increase vote count
        await supabase
          .from('experts')
          .update({ votes: experts.find(e => e.id === expertId)!.votes + 1 })
          .eq('id', expertId);
      }

      // Refresh experts data
      await fetchExperts();
    } catch (error) {
      console.error('Error voting for expert:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  return {
    experts,
    loading,
    voteForExpert,
    refetch: fetchExperts
  };
};