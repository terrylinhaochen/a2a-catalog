
-- Delete duplicate agents, keeping only the earliest created one
DELETE FROM public.agents a1
USING public.agents a2
WHERE a1.name = a2.name 
  AND a1.provider = a2.provider
  AND a1.created_at > a2.created_at;

-- Clean up any orphaned votes for deleted agents
DELETE FROM public.agent_votes 
WHERE agent_id NOT IN (SELECT id FROM public.agents);
