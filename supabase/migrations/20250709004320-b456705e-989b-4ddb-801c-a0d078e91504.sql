-- Create workflows table to replace experts table
CREATE TABLE public.workflows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  provider TEXT NOT NULL,
  categories TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  integrations TEXT[] DEFAULT '{}',
  votes INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  
  -- Workflow-specific fields
  filename TEXT NOT NULL,
  trigger_type TEXT NOT NULL, -- 'manual', 'webhook', 'scheduled', 'complex'
  complexity TEXT NOT NULL, -- 'low', 'medium', 'high'
  node_count INTEGER NOT NULL,
  workflow_json JSONB NOT NULL,
  
  -- Statistics and metadata
  total_nodes INTEGER NOT NULL,
  active_nodes INTEGER NOT NULL,
  inactive_nodes INTEGER NOT NULL,
  
  -- URLs and references
  github_url TEXT,
  documentation TEXT,
  diagram_url TEXT,
  
  -- User and timestamps
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;

-- Create policies for workflows
CREATE POLICY "Anyone can view workflows" 
ON public.workflows 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert workflows" 
ON public.workflows 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own workflows" 
ON public.workflows 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workflows" 
ON public.workflows 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create workflow_votes table
CREATE TABLE public.workflow_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id UUID REFERENCES public.workflows(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(workflow_id, user_id)
);

-- Enable RLS for workflow_votes
ALTER TABLE public.workflow_votes ENABLE ROW LEVEL SECURITY;

-- Create policies for workflow_votes
CREATE POLICY "Users can view all workflow votes" 
ON public.workflow_votes 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can vote on workflows" 
ON public.workflow_votes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workflow votes" 
ON public.workflow_votes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_workflows_updated_at
BEFORE UPDATE ON public.workflows
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();