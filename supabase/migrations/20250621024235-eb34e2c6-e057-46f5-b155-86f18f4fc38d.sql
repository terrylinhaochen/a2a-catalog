
-- Insert additional agents from the A2A Directory
INSERT INTO public.agents (name, description, provider, categories, skills, votes, is_verified, github_url, documentation, featured) VALUES

-- Official Python Samples - Agent Examples
('Google ADK Agent', 'Expense report filling agent showcasing multi-turn interactions and web form handling', 'Google A2A Samples', ARRAY['Business', 'Forms'], ARRAY['Expense reports', 'Multi-turn interactions', 'Web forms'], 18, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/google_adk', 'https://github.com/google-a2a/a2a-samples', true),

('AG2 MCP Agent', 'MCP-enabled agent based on AG2 framework', 'Google A2A Samples', ARRAY['Framework', 'MCP'], ARRAY['AG2 framework', 'MCP integration', 'Multi-agent'], 16, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/ag2', 'https://github.com/google-a2a/a2a-samples', false),

('LangGraph Currency Agent', 'Currency conversion agent with tool usage and streaming updates', 'Google A2A Samples', ARRAY['Finance', 'Tools'], ARRAY['Currency conversion', 'Tool usage', 'Streaming updates'], 20, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/langgraph', 'https://github.com/google-a2a/a2a-samples', true),

('CrewAI Image Generator', 'Image generation agent with multi-turn interactions and image transmission', 'Google A2A Samples', ARRAY['Media', 'Generation'], ARRAY['Image generation', 'Multi-turn interactions', 'File transmission'], 22, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/crewai', 'https://github.com/google-a2a/a2a-samples', true),

('LlamaIndex File Chat', 'File parsing and chat agent with file upload and streaming updates', 'Google A2A Samples', ARRAY['Files', 'Chat'], ARRAY['File parsing', 'File upload', 'Streaming chat'], 19, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/llama_index_file_chat', 'https://github.com/google-a2a/a2a-samples', true),

('Marvin Contact Extractor', 'Contact information extraction agent', 'Google A2A Samples', ARRAY['Data', 'Extraction'], ARRAY['Contact extraction', 'Information processing', 'Data parsing'], 14, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/marvin', 'https://github.com/google-a2a/a2a-samples', false),

('MindsDB Enterprise Agent', 'Enterprise data agent supporting database queries', 'Google A2A Samples', ARRAY['Database', 'Enterprise'], ARRAY['Database queries', 'Enterprise data', 'SQL processing'], 17, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/mindsdb', 'https://github.com/google-a2a/a2a-samples', false),

('Semantic Kernel Travel Agent', 'Travel agent based on Microsoft Semantic Kernel framework', 'Google A2A Samples', ARRAY['Travel', 'Framework'], ARRAY['Travel planning', 'Semantic Kernel', 'Microsoft integration'], 16, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/semantickernel', 'https://github.com/google-a2a/a2a-samples', false),

('AutoGen Framework Agent', 'AutoGen framework example implementation', 'Google A2A Samples', ARRAY['Framework', 'AI'], ARRAY['AutoGen framework', 'Multi-agent collaboration', 'Framework integration'], 15, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/autogen', 'https://github.com/google-a2a/a2a-samples', false),

('Hello World Agent', 'Basic example agent for getting started', 'Google A2A Samples', ARRAY['Tutorial', 'Basic'], ARRAY['Getting started', 'Basic example', 'Tutorial'], 25, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/helloworld', 'https://github.com/google-a2a/a2a-samples', true),

('A2A Telemetry Agent', 'Telemetry data collection and monitoring agent', 'Google A2A Samples', ARRAY['Monitoring', 'Data'], ARRAY['Telemetry collection', 'Data monitoring', 'System metrics'], 13, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/a2a_telemetry', 'https://github.com/google-a2a/a2a-samples', false),

('A2A MCP Protocol Agent', 'Agent demonstrating MCP protocol integration', 'Google A2A Samples', ARRAY['Protocol', 'MCP'], ARRAY['MCP protocol', 'Protocol integration', 'Agent communication'], 14, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/a2a_mcp', 'https://github.com/google-a2a/a2a-samples', false),

('Headless Agent Auth', 'Headless agent authentication example', 'Google A2A Samples', ARRAY['Authentication', 'Security'], ARRAY['Headless authentication', 'OAuth2', 'Security'], 12, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/python/agents/headless_agent_auth', 'https://github.com/google-a2a/a2a-samples', false),

-- JavaScript/TypeScript Examples
('JS Movie Agent', 'Movie information search agent using TMDB API', 'Google A2A Samples', ARRAY['Entertainment', 'API'], ARRAY['Movie search', 'TMDB API', 'Entertainment data'], 21, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/js/src/agents/movie-agent', 'https://github.com/google-a2a/a2a-samples', true),

('JS Coder Agent', 'Code generation agent in JavaScript/TypeScript', 'Google A2A Samples', ARRAY['Code', 'Generation'], ARRAY['Code generation', 'JavaScript', 'Programming assistance'], 18, true, 'https://github.com/google-a2a/a2a-samples/tree/main/samples/js/src/agents/coder', 'https://github.com/google-a2a/a2a-samples', false),

-- Community Implementations - SDKs and Libraries
('A2A Python Official SDK', 'Official Python SDK for the Agent2Agent Protocol', 'Google', ARRAY['SDK', 'Python'], ARRAY['Python SDK', 'Official implementation', 'A2A protocol'], 35, true, 'https://github.com/google/a2a-python', 'https://github.com/google/a2a-python', true),

('A2A JavaScript SDK', 'Official JavaScript SDK for running agentic applications as A2A servers', 'Google A2A', ARRAY['SDK', 'JavaScript'], ARRAY['JavaScript SDK', 'TypeScript', 'A2A server'], 30, true, 'https://github.com/google-a2a/a2a-js', 'https://github.com/google-a2a/a2a-js', true),

('A2A Java Spring Boot', 'Pure Java implementation for Spring Boot applications with client and server', 'Vishal Mysore', ARRAY['SDK', 'Java'], ARRAY['Java implementation', 'Spring Boot', 'Enterprise'], 25, false, 'https://github.com/vishalmysore/a2ajava', 'https://github.com/vishalmysore/a2ajava', false),

('A2A4J Comprehensive', 'Comprehensive Java implementation with server, client, examples, and starter', 'A2AP', ARRAY['SDK', 'Java'], ARRAY['Java framework', 'Comprehensive toolkit', 'Ready to use'], 22, false, 'https://github.com/a2ap/a2a4j', 'https://github.com/a2ap/a2a4j', false),

('Legion A2A TypeScript', 'TypeScript implementation with focus on modularity and extensibility', 'TheRaLabs', ARRAY['SDK', 'TypeScript'], ARRAY['TypeScript', 'Modular design', 'Extensible'], 18, false, 'https://github.com/TheRaLabs/legion-a2a', 'https://github.com/TheRaLabs/legion-a2a', false),

('tRPC A2A Go', 'Go implementation by tRPC team with full client/server support and multiple auth methods', 'tRPC Group', ARRAY['SDK', 'Go'], ARRAY['Go implementation', 'Multiple auth', 'Session management'], 28, false, 'https://github.com/trpc-group/trpc-a2a-go', 'https://github.com/trpc-group/trpc-a2a-go', true),

('Jira A2A Workflow', 'DevOps workflow automation platform using tRPC-A2A-Go framework', 'tuannvm', ARRAY['DevOps', 'Workflow'], ARRAY['DevOps automation', 'Jira integration', 'Workflow management'], 15, false, 'https://github.com/tuannvm/jira-a2a', 'https://github.com/tuannvm/jira-a2a', false),

('A2A Go Library', 'Go library for building A2A servers with example implementations', 'A2A Server', ARRAY['SDK', 'Go'], ARRAY['Go library', 'Server building', 'Examples'], 16, false, 'https://github.com/a2aserver/a2a-go', 'https://github.com/a2aserver/a2a-go', false),

('A2A Rust Implementation', 'Idiomatic Rust implementation following hexagonal architecture principles', 'Emil Lindfors', ARRAY['SDK', 'Rust'], ARRAY['Rust implementation', 'Hexagonal architecture', 'Idiomatic'], 20, false, 'https://github.com/EmilLindfors/a2a-rs', 'https://github.com/EmilLindfors/a2a-rs', false),

('A2A Minimal Python', 'Minimalistic Python SDK for A2A communication', 'pcingola', ARRAY['SDK', 'Python'], ARRAY['Minimal implementation', 'Lightweight', 'Simple API'], 14, false, 'https://github.com/pcingola/a2a_min', 'https://github.com/pcingola/a2a_min', false),

('A2A .NET Implementation', 'C#/.NET implementation of the A2A protocol', 'azixaka', ARRAY['SDK', '.NET'], ARRAY['.NET implementation', 'C# language', 'Windows support'], 13, false, 'https://github.com/azixaka/a2adotnet', 'https://github.com/azixaka/a2adotnet', false),

('NestJS A2A Module', 'Module for integrating A2A protocol into NestJS applications', 'thestupd', ARRAY['Framework', 'NestJS'], ARRAY['NestJS integration', 'Module system', 'Enterprise'], 12, false, 'https://github.com/thestupd/nestjs-a2a', 'https://github.com/thestupd/nestjs-a2a', false),

('Python A2A Easy', 'Easy-to-use Python library for implementing the A2A protocol', 'Manoj Desai', ARRAY['SDK', 'Python'], ARRAY['Easy to use', 'Python library', 'Simple integration'], 11, false, 'https://github.com/themanojdesai/python-a2a', 'https://github.com/themanojdesai/python-a2a', false),

('A2A Lightweight Server', 'Lightweight A2A Python implementation', 'Chris Hay', ARRAY['Server', 'Python'], ARRAY['Lightweight', 'Python server', 'Minimal'], 10, false, 'https://github.com/chrishayuk/a2a-server', 'https://github.com/chrishayuk/a2a-server', false),

('A2A CLI Tool', 'Command-line client for the A2A protocol', 'Chris Hay', ARRAY['CLI', 'Tools'], ARRAY['Command line', 'CLI tool', 'Testing'], 9, false, 'https://github.com/chrishayuk/a2a-cli', 'https://github.com/chrishayuk/a2a-cli', false),

('A2A Test Suite', 'Comprehensive test suite for A2A protocol validation', 'Pretension IO', ARRAY['Testing', 'Validation'], ARRAY['Test suite', 'Protocol validation', 'Quality assurance'], 8, false, 'https://github.com/robert-at-pretension-io/A2A', 'https://github.com/robert-at-pretension-io/A2A', false),

('Artinet SDK', 'JS/TS SDK for A2A Protocol with focus on developer experience', 'Artinet Project', ARRAY['SDK', 'TypeScript'], ARRAY['Developer experience', 'Comprehensive features', 'TypeScript'], 17, false, 'https://github.com/the-artinet-project/artinet-sdk', 'https://github.com/the-artinet-project/artinet-sdk', false),

('A2A Validation Tool', 'Desktop application for testing and validating A2A protocol implementations', 'LLMX', ARRAY['Testing', 'Validation'], ARRAY['Desktop app', 'Protocol testing', 'Validation'], 14, false, 'https://github.com/llmx-de/a2a-validation-tool', 'https://github.com/llmx-de/a2a-validation-tool', false),

-- Community Samples
('A2A Coder Agent', 'Coder Agent implementation with A2A Server and Client', 'sing1ee', ARRAY['Coding', 'Development'], ARRAY['Code generation', 'Development tools', 'A2A implementation'], 16, false, 'https://github.com/sing1ee/a2a-agent-coder', 'https://github.com/sing1ee/a2a-agent-coder', false),

('Agentic Trading', 'Sample application demonstrating Google ADK and A2A interoperability for trading', 'kweinmeister', ARRAY['Finance', 'Trading'], ARRAY['Trading automation', 'Financial data', 'ADK integration'], 13, false, 'https://github.com/kweinmeister/agentic-trading', 'https://github.com/kweinmeister/agentic-trading', false),

('Python A2A Tutorial', 'Comprehensive tutorial for implementing A2A in Python with practical examples', 'sing1ee', ARRAY['Tutorial', 'Education'], ARRAY['Python tutorial', 'Practical examples', 'Learning'], 18, false, 'https://github.com/sing1ee/python-a2a-tutorial', 'https://github.com/sing1ee/python-a2a-tutorial', true),

('A2A Python Currency', 'Tutorial implementation of Currency Agent using A2A Python SDK', 'sing1ee', ARRAY['Tutorial', 'Finance'], ARRAY['Currency conversion', 'Tutorial implementation', 'Python SDK'], 15, false, 'https://github.com/sing1ee/a2a-python-currency', 'https://github.com/sing1ee/a2a-python-currency', false),

('A2A MCP OpenRouter', 'A2A + MCP integration using OpenRouter as LLM provider', 'sing1ee', ARRAY['Integration', 'LLM'], ARRAY['MCP integration', 'OpenRouter', 'LLM provider'], 14, false, 'https://github.com/sing1ee/a2a-mcp-openrouter', 'https://github.com/sing1ee/a2a-mcp-openrouter', false),

('A2A LlamaIndex Chat', 'LlamaIndex-based file chat agent with upload, streaming, and citations', 'sing1ee', ARRAY['Chat', 'Files'], ARRAY['File chat', 'LlamaIndex', 'Streaming responses'], 17, false, 'https://github.com/sing1ee/a2a_llama_index_file_chat', 'https://github.com/sing1ee/a2a_llama_index_file_chat', false);
