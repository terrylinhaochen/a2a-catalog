import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Workflow {
  id: string;
  name: string;
  description: string;
  provider: string;
  categories: string[];
  skills: string[];
  integrations: string[];
  votes: number;
  is_verified: boolean;
  featured: boolean;
  
  // Workflow-specific fields
  filename: string;
  trigger_type: string; // 'manual', 'webhook', 'scheduled', 'complex'
  complexity: string; // 'low', 'medium', 'high'
  node_count: number;
  workflow_json: any;
  
  // Statistics and metadata
  total_nodes: number;
  active_nodes: number;
  inactive_nodes: number;
  
  // URLs and references
  github_url?: string;
  documentation?: string;
  diagram_url?: string;
  logo?: string; // For compatibility with GenericCard
  
  // Timestamps
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const useWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkflows = async (options?: { 
    limit?: number; 
    offset?: number; 
    search?: string; 
    categories?: string[]; 
    sortBy?: string; 
  }) => {
    try {
      let query = supabase
        .from('workflows')
        .select('*', { count: 'exact' });

      // Apply search filter
      if (options?.search) {
        query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
      }

      // Apply category filter
      if (options?.categories && options.categories.length > 0) {
        query = query.overlaps('categories', options.categories);
      }

      // Apply sorting
      switch (options?.sortBy) {
        case 'popular':
          query = query.order('votes', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'alphabetical':
          query = query.order('name', { ascending: true });
          break;
        default:
          query = query.order('votes', { ascending: false });
      }

      // Apply pagination
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 9) - 1);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching workflows:', error);
        toast.error('Failed to load workflows');
        return { data: [], count: 0 };
      }

      console.log(`✅ Loaded ${data?.length || 0} workflows (total: ${count})`);
      setWorkflows(data || []);
      return { data: data || [], count: count || 0 };
    } catch (error) {
      console.error('Error fetching workflows:', error);
      toast.error('Failed to load workflows');
      return { data: [], count: 0 };
    } finally {
      setLoading(false);
    }
  };

  const voteForWorkflow = async (workflowId: string, userId: string) => {
    try {
      // Check if user has already voted
      const { data: existingVote } = await supabase
        .from('workflow_votes')
        .select('id')
        .eq('workflow_id', workflowId)
        .eq('user_id', userId)
        .single();

      if (existingVote) {
        // Remove vote
        await supabase
          .from('workflow_votes')
          .delete()
          .eq('workflow_id', workflowId)
          .eq('user_id', userId);

        // Decrease vote count
        await supabase
          .from('workflows')
          .update({ votes: workflows.find(w => w.id === workflowId)!.votes - 1 })
          .eq('id', workflowId);
      } else {
        // Add vote
        await supabase
          .from('workflow_votes')
          .insert({ workflow_id: workflowId, user_id: userId });

        // Increase vote count
        await supabase
          .from('workflows')
          .update({ votes: workflows.find(w => w.id === workflowId)!.votes + 1 })
          .eq('id', workflowId);
      }

      // Refresh workflows data
      await fetchWorkflows();
    } catch (error) {
      console.error('Error voting for workflow:', error);
      throw error;
    }
  };

  const getWorkflowsByCategory = (category: string) => {
    return workflows.filter(workflow => 
      workflow.categories.includes(category)
    );
  };

  const getWorkflowsByComplexity = (complexity: string) => {
    return workflows.filter(workflow => 
      workflow.complexity === complexity
    );
  };

  const getWorkflowsByTriggerType = (triggerType: string) => {
    return workflows.filter(workflow => 
      workflow.trigger_type === triggerType
    );
  };

  const getWorkflowsByIntegration = (integration: string) => {
    return workflows.filter(workflow => 
      workflow.integrations.includes(integration)
    );
  };

  const getFeaturedWorkflows = () => {
    return workflows.filter(workflow => workflow.featured);
  };

  const getWorkflowStatistics = () => {
    const stats = {
      total: workflows.length,
      byTriggerType: {} as Record<string, number>,
      byComplexity: {} as Record<string, number>,
      byCategory: {} as Record<string, number>,
      topIntegrations: {} as Record<string, number>,
      featured: workflows.filter(w => w.featured).length,
      verified: workflows.filter(w => w.is_verified).length,
      averageNodes: workflows.reduce((sum, w) => sum + w.node_count, 0) / workflows.length || 0
    };

    workflows.forEach(workflow => {
      // Count by trigger type
      stats.byTriggerType[workflow.trigger_type] = (stats.byTriggerType[workflow.trigger_type] || 0) + 1;
      
      // Count by complexity
      stats.byComplexity[workflow.complexity] = (stats.byComplexity[workflow.complexity] || 0) + 1;
      
      // Count by categories
      workflow.categories.forEach(cat => {
        stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;
      });
      
      // Count by integrations
      workflow.integrations.forEach(integration => {
        stats.topIntegrations[integration] = (stats.topIntegrations[integration] || 0) + 1;
      });
    });

    return stats;
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  return {
    workflows,
    loading,
    voteForWorkflow,
    getWorkflowsByCategory,
    getWorkflowsByComplexity,
    getWorkflowsByTriggerType,
    getWorkflowsByIntegration,
    getFeaturedWorkflows,
    getWorkflowStatistics,
    refetch: fetchWorkflows
  };
};