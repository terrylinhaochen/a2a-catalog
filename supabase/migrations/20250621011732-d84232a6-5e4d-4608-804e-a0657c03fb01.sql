
-- First, let's clean up any duplicate agents and reset vote counts
-- Remove any agents that might be duplicates or test data
DELETE FROM agents WHERE name IN (
  'Test Agent',
  'Sample Agent',
  'Demo Agent'
);

-- Reset all vote counts to reasonable numbers and clear any invalid votes
UPDATE agents SET votes = FLOOR(RANDOM() * 50 + 10) WHERE votes > 100;

-- Clean up any orphaned votes (votes without valid user_id or agent_id)
DELETE FROM agent_votes WHERE user_id IS NULL OR agent_id IS NULL;

-- Remove duplicate votes (same user voting multiple times for same agent)
DELETE FROM agent_votes a USING agent_votes b 
WHERE a.id < b.id 
AND a.user_id = b.user_id 
AND a.agent_id = b.agent_id;

-- Update verification status - only keep Google, Microsoft, and major framework providers as verified
UPDATE agents SET is_verified = CASE 
  WHEN provider IN ('Google', 'Microsoft', 'LangChain', 'AutoGen', 'CrewAI', 'LlamaIndex') THEN true
  ELSE false
END;

-- Ensure vote counts match actual votes in agent_votes table
UPDATE agents SET votes = (
  SELECT COUNT(*) 
  FROM agent_votes 
  WHERE agent_votes.agent_id = agents.id
);
