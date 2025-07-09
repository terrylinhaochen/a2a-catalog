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

  const fetchWorkflows = async (limit?: number) => {
    try {
      // Fetch all workflows - use a high limit to get all 2055 workflows
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit || 5000); // Use 5000 as default limit to ensure we get all workflows

      if (error) {
        console.error('Error fetching workflows:', error);
        toast.error('Failed to load workflows');
        return;
      }

      console.log(`✅ Loaded ${data?.length || 0} workflows`);
      setWorkflows(data || []);
    } catch (error) {
      console.error('Error fetching workflows:', error);
      toast.error('Failed to load workflows');
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