-- Temporarily disable RLS for workflow import
ALTER TABLE public.workflows DISABLE ROW LEVEL SECURITY;

-- Test insert
INSERT INTO public.workflows (
  name, description, provider, categories, skills, integrations, filename,
  trigger_type, complexity, node_count, workflow_json, total_nodes,
  active_nodes, inactive_nodes, is_verified, featured, user_id
) VALUES (
  'Test Workflow', 'A test workflow', 'n8n', ARRAY['Uncategorized'], 
  ARRAY['test'], ARRAY['test'], 'test.json', 'manual', 'low', 1, 
  '{"test": true}', 1, 1, 0, true, false, null
);

-- Clean up test
DELETE FROM public.workflows WHERE filename = 'test.json';

-- Re-enable RLS
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;