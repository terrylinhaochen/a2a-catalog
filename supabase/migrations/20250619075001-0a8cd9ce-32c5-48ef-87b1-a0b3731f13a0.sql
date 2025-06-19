
-- Add the missing columns to the agents table for GitHub-style information
ALTER TABLE public.agents 
ADD COLUMN IF NOT EXISTS stars INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS forks INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_updated TEXT,
ADD COLUMN IF NOT EXISTS github_url TEXT,
ADD COLUMN IF NOT EXISTS deployment_instructions TEXT;

-- Now insert the 17 A2A protocol agents
INSERT INTO public.agents (
  name, description, provider, categories, skills, votes, stars, forks, 
  last_updated, created_at, updated_at, github_url, deployment_instructions,
  auth_type, featured
) VALUES 
-- Agent #1: DZYCD LISTLLProtocol
(
  'DZYCD LISTLLProtocol: TLL Multi-Agent Protocol',
  'First posted on 2025-05-30, this repository enables intelligent agent collaboration with secure message exchange and API connectivity.',
  'DZYCD',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['API Integration', 'Message Passing', 'Protocol Implementation', 'Agent Communication', 'Authentication', 'Agent Collaboration'],
  0, 0, 0,
  '2025-05-30',
  '2025-05-30T00:00:00Z',
  '2025-05-30T00:00:00Z',
  'https://github.com/DZYCD/LISTLLProtocol',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
),
-- Agent #2: Implementing Multi-Agent System with A2A Protocol
(
  'Implementing Multi-Agent System with A2A Protocol',
  'Demonstrates a multi-agent system with A2A communication, featuring a ''Flight Booking Agent'' and ''Travel Planner Agent'', published on 05/31/2025.',
  'akshaykokane',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Travel Planning', 'Flight Booking', 'Agent Communication', 'Agent Collaboration'],
  0, 0, 0,
  '2025-06-07',
  '2025-06-07T00:00:00Z',
  '2025-06-07T00:00:00Z',
  'https://github.com/akshaykokane/Implementing-Multi-Agent-With-A2A-SemanticKernel',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
),
-- Agent #3: Automated Travel Planner A2A
(
  'Automated Travel Planner A2A',
  'AI-powered travel planner using A2A protocol with agent discovery and asynchronous message passing; first commit on 2025-05-27.',
  'melisasvr',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Travel Planning', 'Agent Communication', 'Agent Discovery', 'Asynchronous Processing', 'Artificial Intelligence'],
  0, 0, 0,
  '2025-05-27',
  '2025-05-27T00:00:00Z',
  '2025-05-27T00:00:00Z',
  'https://github.com/melisasvr/Automated-Travel-Planner-A2A',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
),
-- Agent #4: ScienceOne-AI Agent Interaction Protocol
(
  'ScienceOne-AI Agent Interaction Protocol',
  'A Rust implementation of a multi-agent system for scientific data analysis with direct agent-to-agent communication, including experimental design and data visualization agents.',
  'rustscientists',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Agent Communication', 'Agent Collaboration', 'Artificial Intelligence'],
  0, 0, 0,
  '2025-05-30',
  '2025-05-30T00:00:00Z',
  '2025-05-30T00:00:00Z',
  'https://github.com/rustscientists/ScienceOne-AI',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
),
-- Agent #5: a2a-python-currency
(
  'a2a-python-currency: CurrencyAgent Implementation with A2A Python SDK',
  'A Python implementation demonstrating Agent-to-Agent (A2A) protocol using CurrencyAgent for real-time currency conversion, showcasing multi-agent communication patterns. First commit on 2025-06-02.',
  'vishalmysore',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Protocol Implementation', 'Agent Communication'],
  0, 0, 0,
  '2025-06-02',
  '2025-06-02T00:00:00Z',
  '2025-06-02T00:00:00Z',
  'https://github.com/vishalmysore/a2a-python-currency',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
),
-- Agent #6: fcan Framework
(
  'fcan: Framework for Ollama LLM Agents in A2A Networks',
  'Framework implementing A2A protocol for Ollama LLM agents, enabling distributed agent networks with message routing and service discovery. Initial commit made on 2025-06-09.',
  'seungjun-green',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Protocol Implementation', 'Agent Communication', 'Agent Discovery'],
  0, 0, 0,
  '2025-06-09',
  '2025-06-09T00:00:00Z',
  '2025-06-09T00:00:00Z',
  'https://github.com/seungjun-green/fcan',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
),
-- Agent #7: A2A MCP Playwright
(
  'A2A MCP Playwright for Web Automation',
  'Integrates A2A protocol with Model Context Protocol (MCP) and Playwright for automated web interactions, demonstrating multi-agent coordination in web automation tasks. First commit on 2025-06-06.',
  'vishalmysore',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Protocol Implementation', 'Agent Communication'],
  0, 0, 0,
  '2025-06-06',
  '2025-06-06T00:00:00Z',
  '2025-06-06T00:00:00Z',
  'https://github.com/vishalmysore/a2a-mcp-playwright',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
),
-- Agent #8: a2a-mcp-with-security
(
  'vishalmysore/a2a-mcp-with-security',
  'A2A protocol implementation with enhanced security features and MCP integration, focusing on secure agent-to-agent communication patterns. Repository created on 2025-06-06.',
  'vishalmysore',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Protocol Implementation', 'Agent Communication', 'Security'],
  0, 0, 0,
  '2025-06-06',
  '2025-06-06T00:00:00Z',
  '2025-06-06T00:00:00Z',
  'https://github.com/vishalmysore/a2a-mcp-with-security',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
),
-- Agent #9: mcp-connector
(
  'vishalmysore/mcp-connector: Java Connector for Model Context Protocol',
  'Java-based connector implementing Model Context Protocol (MCP) with A2A integration, enabling Java applications to participate in agent-to-agent networks. Created on 2025-06-05.',
  'vishalmysore',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Protocol Implementation', 'Agent Communication'],
  0, 0, 0,
  '2025-06-05',
  '2025-06-05T00:00:00Z',
  '2025-06-05T00:00:00Z',
  'https://github.com/vishalmysore/mcp-connector',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
),
-- Agent #10: A2A and MCP Integration Example
(
  'A2A and MCP Integration Example',
  'Comprehensive example demonstrating integration between Agent-to-Agent (A2A) protocol and Model Context Protocol (MCP), showcasing best practices for multi-protocol agent systems. First posted on 2025-06-04.',
  'vishalmysore',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Protocol Implementation', 'Agent Communication'],
  0, 0, 0,
  '2025-06-04',
  '2025-06-04T00:00:00Z',
  '2025-06-04T00:00:00Z',
  'https://github.com/vishalmysore/a2a-mcp-integration-example',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
),
-- Agent #11: a2a_llama_index_file_chat
(
  'sing1ee/a2a_llama_index_file_chat',
  'Integration of A2A protocol with LlamaIndex for file-based chat applications, enabling agents to collaboratively process and discuss document contents. Repository established on 2025-06-04.',
  'sing1ee',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Protocol Implementation', 'Agent Communication', 'Agent Collaboration'],
  0, 0, 0,
  '2025-06-04',
  '2025-06-04T00:00:00Z',
  '2025-06-04T00:00:00Z',
  'https://github.com/sing1ee/a2a_llama_index_file_chat',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
),
-- Agent #12: a2a-inspector
(
  'google-a2a/a2a-inspector',
  'Official Google A2A inspector tool for monitoring and debugging agent-to-agent communications, providing insights into message flows and protocol compliance. Released on 2025-06-03.',
  'google-a2a',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Protocol Implementation', 'Agent Communication'],
  0, 0, 0,
  '2025-06-03',
  '2025-06-03T00:00:00Z',
  '2025-06-03T00:00:00Z',
  'https://github.com/google-a2a/a2a-inspector',
  'Refer to repository README for deployment instructions',
  'API Key',
  true
),
-- Agent #13: mcp-rag-server
(
  'vishalmysore/mcp-rag-server',
  'RAG (Retrieval Augmented Generation) server implementation with MCP and A2A protocol support, enabling multi-agent knowledge retrieval and sharing capabilities. First commit on 2025-06-02.',
  'vishalmysore',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Protocol Implementation', 'Agent Communication'],
  0, 0, 0,
  '2025-06-02',
  '2025-06-02T00:00:00Z',
  '2025-06-02T00:00:00Z',
  'https://github.com/vishalmysore/mcp-rag-server',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
),
-- Agent #14: A2A MCP Playwright Web Automation Agent
(
  'A2A MCP Playwright Web Automation Agent',
  'Specialized web automation agent combining A2A protocol, Model Context Protocol, and Playwright for coordinated browser automation tasks across multiple agents. Repository created on 2025-06-01.',
  'vishalmysore',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Protocol Implementation', 'Agent Communication'],
  0, 0, 0,
  '2025-06-01',
  '2025-06-01T00:00:00Z',
  '2025-06-01T00:00:00Z',
  'https://github.com/vishalmysore/a2a-mcp-playwright-agent',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
),
-- Agent #15: a2a-samples
(
  'a2a-samples: Agent2Agent Protocol Code Samples',
  'Comprehensive collection of code samples and examples demonstrating various implementations of the Agent2Agent protocol, serving as a reference for developers building A2A systems. Published on 2025-05-31.',
  'google-a2a',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Protocol Implementation', 'Agent Communication'],
  0, 0, 0,
  '2025-05-31',
  '2025-05-31T00:00:00Z',
  '2025-05-31T00:00:00Z',
  'https://github.com/google-a2a/a2a-samples',
  'Refer to repository README for deployment instructions',
  'API Key',
  true
),
-- Agent #16: a2a-js
(
  'google-a2a/a2a-js',
  'Official JavaScript SDK for Google''s Agent-to-Agent (A2A) protocol, providing client libraries and utilities for building A2A-compatible agents in JavaScript environments. Initial release on 2025-05-30.',
  'google-a2a',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Protocol Implementation', 'Agent Communication'],
  0, 0, 0,
  '2025-05-30',
  '2025-05-30T00:00:00Z',
  '2025-05-30T00:00:00Z',
  'https://github.com/google-a2a/a2a-js',
  'Refer to repository README for deployment instructions',
  'API Key',
  true
),
-- Agent #17: A2A MCP Integration
(
  'A2A MCP Integration',
  'Demonstrates seamless integration between Agent-to-Agent protocol and Model Context Protocol, showcasing interoperability patterns for multi-agent systems. Repository established on 2025-05-30.',
  'vishalmysore',
  ARRAY['Agent-to-Agent Protocol', 'Multi-Agent System'],
  ARRAY['Protocol Implementation', 'Agent Communication'],
  0, 0, 0,
  '2025-05-30',
  '2025-05-30T00:00:00Z',
  '2025-05-30T00:00:00Z',
  'https://github.com/vishalmysore/a2a-mcp-integration',
  'Refer to repository README for deployment instructions',
  'API Key',
  false
);
