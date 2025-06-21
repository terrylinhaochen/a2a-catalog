
-- Insert additional agents from the awesome A2A list
INSERT INTO public.agents (name, description, provider, categories, skills, votes, is_verified, github_url, documentation, featured) VALUES

-- Official Python Samples
('Weather Agent', 'Weather-query agent with HTTP server for real-time weather information', 'Google A2A Samples', ARRAY['Weather', 'Data'], ARRAY['Weather queries', 'HTTP server', 'API integration'], 15, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/a2a-adk-app/weather_agent', 'https://github.com/google-a2a/a2a-samples', true),

('Travel Agency Agent', 'Multi-agent collaboration system for comprehensive travel planning scenarios', 'Google A2A Samples', ARRAY['Travel', 'Planning'], ARRAY['Multi-agent coordination', 'Travel planning', 'Collaboration'], 12, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/a2a_mcp', 'https://github.com/google-a2a/a2a-samples', true),

('Analytics Workflow Agent', 'Multi-agent orchestration system for complex data analytics scenarios', 'Google A2A Samples', ARRAY['Analytics', 'Data'], ARRAY['Data analysis', 'Multi-agent orchestration', 'Workflow management'], 18, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/analytics', 'https://github.com/google-a2a/a2a-samples', true),

('Birthday Planner Agent', 'ADK edition multi-step birthday party planning assistant', 'Google A2A Samples', ARRAY['Planning', 'Events'], ARRAY['Event planning', 'Multi-step workflows', 'Party coordination'], 10, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/birthday_planner_adk', 'https://github.com/google-a2a/a2a-samples', false),

('Calendar Agent', 'Comprehensive calendar management agent that reads, writes, and books meeting slots', 'Google A2A Samples', ARRAY['Productivity', 'Calendar'], ARRAY['Calendar management', 'Meeting scheduling', 'Time management'], 14, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/birthday_planner_adk/calendar_agent', 'https://github.com/google-a2a/a2a-samples', false),

('CrewAI Collaboration Agent', 'Demonstrates multi-role collaboration capabilities using CrewAI framework', 'Google A2A Samples', ARRAY['Collaboration', 'AI'], ARRAY['Multi-role collaboration', 'Team coordination', 'CrewAI integration'], 16, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/crewai', 'https://github.com/google-a2a/a2a-samples', true),

('LangGraph Dialogue Agent', 'Uses LangGraph to orchestrate sophisticated multi-turn dialogue systems', 'Google A2A Samples', ARRAY['Conversation', 'AI'], ARRAY['Multi-turn dialogue', 'LangGraph integration', 'Conversation orchestration'], 20, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/langgraph', 'https://github.com/google-a2a/a2a-samples', true),

('LlamaIndex File QA Agent', 'Q&A retrieval system over local files using LlamaIndex', 'Google A2A Samples', ARRAY['Knowledge', 'QA'], ARRAY['File Q&A', 'Document retrieval', 'LlamaIndex integration'], 13, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/llama_index_file_chat', 'https://github.com/google-a2a/a2a-samples', false),

('MindsDB Predictor Agent', 'Calls MindsDB for advanced prediction and intelligent querying', 'Google A2A Samples', ARRAY['Prediction', 'Database'], ARRAY['Machine learning predictions', 'Database querying', 'MindsDB integration'], 11, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/mindsdb', 'https://github.com/google-a2a/a2a-samples', false),

('Semantic Kernel Orchestrator', 'Orchestrates tools and workflows using Microsoft Semantic Kernel', 'Google A2A Samples', ARRAY['Orchestration', 'Tools'], ARRAY['Tool orchestration', 'Semantic Kernel', 'Workflow management'], 17, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/semantickernel', 'https://github.com/google-a2a/a2a-samples', false),

('Travel Planner Agent', 'One-stop comprehensive travel planning and booking assistant', 'Google A2A Samples', ARRAY['Travel', 'Planning'], ARRAY['Travel planning', 'Booking assistance', 'Itinerary creation'], 19, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/travel_planner_agent', 'https://github.com/google-a2a/a2a-samples', true),

('Veo Video Generator', 'Automatically generates high-quality videos using Google Veo API', 'Google A2A Samples', ARRAY['Media', 'Generation'], ARRAY['Video generation', 'Veo API integration', 'Media creation'], 22, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/veo_video_gen', 'https://github.com/google-a2a/a2a-samples', true),

('Autogen Integration Agent', 'Uses Microsoft Autogen as the execution engine for multi-agent scenarios', 'Google A2A Samples', ARRAY['Integration', 'AI'], ARRAY['Microsoft Autogen', 'Multi-agent execution', 'Framework integration'], 15, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/autogen', 'https://github.com/google-a2a/a2a-samples', false),

('Azure AI Foundry Agent', 'Example implementation using Azure AI Foundry SDK', 'Google A2A Samples', ARRAY['Cloud', 'AI'], ARRAY['Azure AI Foundry', 'Cloud integration', 'Enterprise AI'], 14, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/azureaifoundry_sdk', 'https://github.com/google-a2a/a2a-samples', false),

-- Community Implementations
('Google Calendar Agent', 'Standalone A2A agent for comprehensive Google Calendar management', 'Inference Gateway', ARRAY['Productivity', 'Calendar'], ARRAY['Google Calendar', 'OpenAI API', 'Calendar management'], 25, false, 'https://github.com/inference-gateway/google-calendar-agent', 'https://github.com/inference-gateway/google-calendar-agent', true),

('Elkar Task Manager', 'Open-source task management layer for AI agents based on A2A Protocol', 'Elkar AI', ARRAY['Task Management', 'Orchestration'], ARRAY['Task orchestration', 'Agent coordination', 'Workflow management'], 30, false, 'https://github.com/elkar-ai/elkar-a2a', 'https://github.com/elkar-ai/elkar-a2a', true),

('Aira Network Agent', 'A2A network implementation for hosting, registering, and discovering agents', 'Community', ARRAY['Network', 'Discovery'], ARRAY['Agent discovery', 'Network hosting', 'Agent registration'], 18, false, 'https://github.com/IhateCreatingUserNames2/Aira', 'https://github.com/IhateCreatingUserNames2/Aira', false),

('Cognisphere Framework', 'AI agent development framework built on Google ADK for A2A networks', 'Community', ARRAY['Framework', 'Development'], ARRAY['Agent development', 'ADK integration', 'Framework building'], 12, false, 'https://github.com/IhateCreatingUserNames2/Cognisphere', 'https://github.com/IhateCreatingUserNames2/Cognisphere', false),

('Grasp Browser Agent', 'Self-hosted browser agent with built-in MCP and A2A support', 'Aircode Labs', ARRAY['Browser', 'Automation'], ARRAY['Browser automation', 'MCP support', 'Web interaction'], 16, false, 'https://github.com/aircodelabs/grasp', 'https://github.com/aircodelabs/grasp', false),

('SwissKnife Multi-Agent', 'Multi-agent chat application with MCP support and A2A protocol integration', 'Community', ARRAY['Chat', 'Multi-Agent'], ARRAY['Multi-agent chat', 'MCP integration', 'Remote agent connection'], 14, false, 'https://github.com/daltonnyx/swissknife', 'https://github.com/daltonnyx/swissknife', false),

-- TypeScript/JavaScript Agents
('Movie Recommendation Agent', 'Conversational movie recommendation agent built with Genkit SDK', 'Google A2A Samples', ARRAY['Entertainment', 'Recommendation'], ARRAY['Movie recommendations', 'Genkit integration', 'Conversational AI'], 21, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/js/src/agents/movie-agent', 'https://github.com/google-a2a/a2a-samples', true);
