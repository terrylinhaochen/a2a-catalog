-- Replace experts table with workflows table for n8n workflow integration
-- This migration creates a new workflows table and removes the experts table

-- Create workflows table
CREATE TABLE public.workflows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'n8n',
  categories TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  integrations TEXT[] DEFAULT '{}',
  votes INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  
  -- Workflow-specific fields
  filename TEXT UNIQUE NOT NULL,
  trigger_type TEXT, -- 'manual', 'webhook', 'scheduled', 'complex'
  complexity TEXT, -- 'low', 'medium', 'high'
  node_count INTEGER DEFAULT 0,
  workflow_json JSONB,
  
  -- Statistics and metadata
  total_nodes INTEGER DEFAULT 0,
  active_nodes INTEGER DEFAULT 0,
  inactive_nodes INTEGER DEFAULT 0,
  
  -- URLs and references
  github_url TEXT,
  documentation TEXT,
  diagram_url TEXT,
  
  -- Timestamps
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create workflow_votes table to match pattern of other entities
CREATE TABLE public.workflow_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id UUID REFERENCES public.workflows(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(workflow_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_workflows_provider ON public.workflows(provider);
CREATE INDEX idx_workflows_categories ON public.workflows USING GIN(categories);
CREATE INDEX idx_workflows_skills ON public.workflows USING GIN(skills);
CREATE INDEX idx_workflows_integrations ON public.workflows USING GIN(integrations);
CREATE INDEX idx_workflows_trigger_type ON public.workflows(trigger_type);
CREATE INDEX idx_workflows_complexity ON public.workflows(complexity);
CREATE INDEX idx_workflows_featured ON public.workflows(featured);
CREATE INDEX idx_workflows_filename ON public.workflows(filename);
CREATE INDEX idx_workflow_votes_workflow_id ON public.workflow_votes(workflow_id);
CREATE INDEX idx_workflow_votes_user_id ON public.workflow_votes(user_id);

-- Set up Row Level Security (RLS) for workflows
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_votes ENABLE ROW LEVEL SECURITY;

-- RLS policies for workflows table
-- Allow everyone to read workflows
CREATE POLICY "Anyone can read workflows" ON public.workflows
    FOR SELECT USING (true);

-- Allow authenticated users to insert workflows
CREATE POLICY "Authenticated users can insert workflows" ON public.workflows
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL OR auth.role() = 'service_role');

-- Allow users to update their own workflows
CREATE POLICY "Users can update their own workflows" ON public.workflows
    FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own workflows
CREATE POLICY "Users can delete their own workflows" ON public.workflows
    FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for workflow_votes table
-- Allow everyone to read workflow votes
CREATE POLICY "Anyone can read workflow votes" ON public.workflow_votes
    FOR SELECT USING (true);

-- Allow authenticated users to vote
CREATE POLICY "Authenticated users can vote" ON public.workflow_votes
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Allow users to update their own votes
CREATE POLICY "Users can update their own votes" ON public.workflow_votes
    FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own votes
CREATE POLICY "Users can delete their own votes" ON public.workflow_votes
    FOR DELETE USING (auth.uid() = user_id);

-- Create trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_workflows_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER update_workflows_updated_at_trigger
    BEFORE UPDATE ON public.workflows
    FOR EACH ROW
    EXECUTE FUNCTION public.update_workflows_updated_at();

-- Update categories for existing agents and mcp_servers to use new standardized categories
UPDATE public.agents SET categories = ARRAY[
  CASE 
    WHEN 'Productivity' = ANY(categories) OR 'Business' = ANY(categories) THEN 'Business Process Automation'
    WHEN 'Development' = ANY(categories) OR 'Programming' = ANY(categories) THEN 'AI Agent Development'
    WHEN 'Finance' = ANY(categories) OR 'Financial' = ANY(categories) THEN 'Financial & Accounting'
    WHEN 'Integration' = ANY(categories) OR 'API' = ANY(categories) THEN 'Technical Infrastructure & DevOps'
    WHEN 'Content Creation' = ANY(categories) OR 'Creative' = ANY(categories) THEN 'Creative Content & Video Automation'
    WHEN 'Image Generation' = ANY(categories) OR 'Design' = ANY(categories) THEN 'Creative Design Automation'
    WHEN 'Analytics' = ANY(categories) OR 'Data Analysis' = ANY(categories) THEN 'Data Processing & Analysis'
    WHEN 'Chat' = ANY(categories) OR 'Communication' = ANY(categories) THEN 'Communication & Messaging'
    WHEN 'Document Processing' = ANY(categories) OR 'File Management' = ANY(categories) THEN 'Cloud Storage & File Management'
    WHEN 'Travel' = ANY(categories) OR 'Planning' = ANY(categories) THEN 'Business Process Automation'
    WHEN 'Enterprise' = ANY(categories) OR 'Cloud' = ANY(categories) THEN 'Technical Infrastructure & DevOps'
    WHEN 'Marketing' = ANY(categories) OR 'Sales' = ANY(categories) THEN 'Marketing & Advertising Automation'
    WHEN 'CRM' = ANY(categories) THEN 'CRM & Sales'
    WHEN 'Project Management' = ANY(categories) OR 'Management' = ANY(categories) THEN 'Project Management'
    WHEN 'Social Media' = ANY(categories) OR 'Social' = ANY(categories) THEN 'Social Media Management'
    WHEN 'E-commerce' = ANY(categories) OR 'Retail' = ANY(categories) THEN 'E-commerce & Retail'
    WHEN 'Video' = ANY(categories) OR 'Media' = ANY(categories) THEN 'Creative Content & Video Automation'
    WHEN 'DevOps' = ANY(categories) OR 'Infrastructure' = ANY(categories) THEN 'Technical Infrastructure & DevOps'
    WHEN 'Web Scraping' = ANY(categories) OR 'Data Extraction' = ANY(categories) THEN 'Web Scraping & Data Extraction'
    ELSE 'Uncategorized'
  END
] WHERE array_length(categories, 1) > 0;

-- Update categories for MCP servers
UPDATE public.mcp_servers SET categories = ARRAY[
  CASE 
    WHEN 'database' = ANY(categories) OR 'storage' = ANY(categories) THEN 'Data Processing & Analysis'
    WHEN 'web' = ANY(categories) OR 'http' = ANY(categories) THEN 'Web Scraping & Data Extraction'
    WHEN 'file' = ANY(categories) OR 'filesystem' = ANY(categories) THEN 'Cloud Storage & File Management'
    WHEN 'ai' = ANY(categories) OR 'llm' = ANY(categories) THEN 'AI Agent Development'
    WHEN 'communication' = ANY(categories) OR 'messaging' = ANY(categories) THEN 'Communication & Messaging'
    WHEN 'automation' = ANY(categories) OR 'workflow' = ANY(categories) THEN 'Business Process Automation'
    WHEN 'development' = ANY(categories) OR 'dev' = ANY(categories) THEN 'Technical Infrastructure & DevOps'
    WHEN 'analytics' = ANY(categories) OR 'analysis' = ANY(categories) THEN 'Data Processing & Analysis'
    WHEN 'productivity' = ANY(categories) OR 'office' = ANY(categories) THEN 'Business Process Automation'
    WHEN 'crm' = ANY(categories) OR 'sales' = ANY(categories) THEN 'CRM & Sales'
    WHEN 'marketing' = ANY(categories) OR 'advertising' = ANY(categories) THEN 'Marketing & Advertising Automation'
    WHEN 'design' = ANY(categories) OR 'creative' = ANY(categories) THEN 'Creative Design Automation'
    WHEN 'video' = ANY(categories) OR 'media' = ANY(categories) THEN 'Creative Content & Video Automation'
    WHEN 'ecommerce' = ANY(categories) OR 'retail' = ANY(categories) THEN 'E-commerce & Retail'
    WHEN 'finance' = ANY(categories) OR 'financial' = ANY(categories) THEN 'Financial & Accounting'
    WHEN 'project' = ANY(categories) OR 'management' = ANY(categories) THEN 'Project Management'
    WHEN 'social' = ANY(categories) OR 'socialmedia' = ANY(categories) THEN 'Social Media Management'
    WHEN 'scraping' = ANY(categories) OR 'extraction' = ANY(categories) THEN 'Web Scraping & Data Extraction'
    ELSE 'Uncategorized'
  END
] WHERE array_length(categories, 1) > 0;

-- Drop the experts table and its associated vote table
DROP TABLE IF EXISTS public.expert_votes;
DROP TABLE IF EXISTS public.experts;

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workflows TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workflow_votes TO authenticated;
GRANT SELECT ON public.workflows TO anon;
GRANT SELECT ON public.workflow_votes TO anon;