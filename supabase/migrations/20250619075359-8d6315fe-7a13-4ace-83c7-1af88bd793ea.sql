
-- Add "Other" category for agents that don't fit existing categories
INSERT INTO public.categories (id, name, description, icon) VALUES
('other', 'Other', 'Agents that don''t fit into other specific categories', '🔧')
ON CONFLICT (id) DO NOTHING;

-- Update some agents to have better categorization
UPDATE public.agents 
SET categories = ARRAY['Development', 'Agent-to-Agent Protocol']
WHERE name LIKE '%mcp-connector%' OR name LIKE '%a2a-js%';

UPDATE public.agents 
SET categories = ARRAY['Development', 'Agent-to-Agent Protocol'] 
WHERE name LIKE '%a2a-samples%';

UPDATE public.agents 
SET categories = ARRAY['Finance', 'Agent-to-Agent Protocol']
WHERE name LIKE '%currency%';

UPDATE public.agents 
SET categories = ARRAY['Data & Analytics', 'Agent-to-Agent Protocol']
WHERE name LIKE '%ScienceOne%';

UPDATE public.agents 
SET categories = ARRAY['Productivity', 'Agent-to-Agent Protocol']
WHERE name LIKE '%mcp-rag%';

UPDATE public.agents 
SET categories = ARRAY['Development', 'Agent-to-Agent Protocol']
WHERE name LIKE '%inspector%';

UPDATE public.agents 
SET categories = ARRAY['Communication', 'Agent-to-Agent Protocol']
WHERE name LIKE '%file_chat%';

-- Set remaining agents that still only have generic categories to include "Other"
UPDATE public.agents 
SET categories = ARRAY['Other', 'Agent-to-Agent Protocol']
WHERE categories = ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'] 
AND name NOT LIKE '%Travel%' 
AND name NOT LIKE '%currency%' 
AND name NOT LIKE '%ScienceOne%' 
AND name NOT LIKE '%mcp-rag%' 
AND name NOT LIKE '%inspector%' 
AND name NOT LIKE '%file_chat%'
AND name NOT LIKE '%mcp-connector%' 
AND name NOT LIKE '%a2a-js%'
AND name NOT LIKE '%a2a-samples%';
