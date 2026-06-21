import { useState, useEffect } from 'react';
import { catalogWorkflows } from '@/data/catalog';

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
  status?: 'working' | 'reference' | 'roadmap' | 'deprecated';
  status_note?: string;
  
  // Workflow-specific fields
  filename: string;
  trigger_type: string; // 'manual', 'webhook', 'scheduled', 'complex'
  complexity: string; // 'low', 'medium', 'high'
  node_count: number;
  workflow_json: unknown;
  
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
  const [loading, setLoading] = useState(false);

  const fetchWorkflows = async (options?: { 
    limit?: number; 
    offset?: number; 
    search?: string; 
    categories?: string[]; 
    sortBy?: string; 
  }) => {
    let data = [...catalogWorkflows];

    if (options?.search) {
      const query = options.search.toLowerCase();
      data = data.filter((workflow) =>
        workflow.name.toLowerCase().includes(query) ||
        workflow.description.toLowerCase().includes(query) ||
        workflow.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    if (options?.categories?.length) {
      data = data.filter((workflow) =>
        options.categories!.some((category) => workflow.categories.includes(category))
      );
    }

    switch (options?.sortBy) {
      case 'newest':
        data.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
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

    setWorkflows(data);
    setLoading(false);
    return { data, count };
  };

  const voteForWorkflow = async (workflowId: string, _userId?: string) => {
    setWorkflows(prev => prev.map(workflow =>
      workflow.id === workflowId ? { ...workflow, votes: workflow.votes + 1 } : workflow
    ));
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
