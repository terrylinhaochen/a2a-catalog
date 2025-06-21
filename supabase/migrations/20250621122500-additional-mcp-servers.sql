
-- Add more MCP servers for various categories

INSERT INTO mcp_servers (
  name, 
  description, 
  provider, 
  github_url, 
  categories, 
  skills, 
  votes,
  created_at,
  updated_at
) VALUES 

-- Code Execution servers
('Pydantic AI Python Runner', 'Run Python code in a secure sandbox via MCP tool calls', 'pydantic', 'https://github.com/pydantic/pydantic-ai/tree/main/mcp-run-python', ARRAY['Code Execution', 'Python'], ARRAY['python_execution', 'secure_sandbox', 'code_runner'], 0, NOW(), NOW()),
('YepCode JavaScript Executor', 'Execute any LLM-generated code in a secure and scalable sandbox environment with full NPM and PyPI support', 'yepcode', 'https://github.com/yepcode/mcp-server-js', ARRAY['Code Execution', 'JavaScript'], ARRAY['javascript_execution', 'python_execution', 'npm_packages', 'pypi_packages'], 0, NOW(), NOW()),
('OpenAPI MCP Docker', 'Dockerized MCP Server to allow your AI agent to access any API with existing api docs', 'ckanthony', 'https://github.com/ckanthony/openapi-mcp', ARRAY['Code Execution', 'API Integration'], ARRAY['openapi_integration', 'docker_sandbox', 'api_access'], 0, NOW(), NOW()),
('Node Code Sandbox MCP', 'Node.js MCP server that spins up isolated Docker-based sandboxes for executing JavaScript snippets', 'alfonsograziano', 'https://github.com/alfonsograziano/node-code-sandbox-mcp', ARRAY['Code Execution', 'JavaScript'], ARRAY['nodejs_execution', 'docker_sandbox', 'npm_dependencies'], 0, NOW(), NOW()),
('MCP JS V8 Sandbox', 'Javascript code execution sandbox that uses v8 to isolate code with heap snapshotting for persistent sessions', 'r33drichards', 'https://github.com/r33drichards/mcp-js', ARRAY['Code Execution', 'JavaScript'], ARRAY['v8_isolation', 'heap_snapshots', 'persistent_sessions'], 0, NOW(), NOW()),

-- Coding Agents servers
('Serena Coding Agent', 'Fully-featured coding agent that relies on symbolic code operations by using language servers', 'oraios', 'https://github.com/oraios/serena', ARRAY['Coding Agents', 'Language Servers'], ARRAY['symbolic_operations', 'language_server', 'code_analysis'], 0, NOW(), NOW()),
('CodeMCP Basic Agent', 'Coding agent with basic read, write and command line tools', 'ezyang', 'https://github.com/ezyang/codemcp', ARRAY['Coding Agents', 'Development'], ARRAY['file_operations', 'command_line', 'basic_coding'], 0, NOW(), NOW()),
('LeetCode MCP Server', 'MCP server that enables AI models to search, retrieve, and solve LeetCode problems', 'doggybee', 'https://github.com/doggybee/mcp-server-leetcode', ARRAY['Coding Agents', 'Problem Solving'], ARRAY['leetcode_problems', 'contest_data', 'submissions'], 0, NOW(), NOW()),
('LeetCode MCP CN', 'MCP server enabling automated access to LeetCode programming problems, solutions, and submissions', 'jinzcdev', 'https://github.com/jinzcdev/leetcode-mcp-server', ARRAY['Coding Agents', 'Problem Solving'], ARRAY['leetcode_global', 'leetcode_china', 'authentication'], 0, NOW(), NOW()),
('VSCode MCP Server', 'MCP Server that allows AI to read directory structure, see linter problems, and make code edits', 'juehang', 'https://github.com/juehang/vscode-mcp-server', ARRAY['Coding Agents', 'IDE Integration'], ARRAY['vscode_integration', 'linter_analysis', 'code_editing'], 0, NOW(), NOW()),
('Code to Tree AST', 'Single-binary MCP server that converts source code into AST, regardless of language', 'micl2e2', 'https://github.com/micl2e2/code-to-tree', ARRAY['Coding Agents', 'AST Analysis'], ARRAY['ast_conversion', 'multi_language', 'code_analysis'], 0, NOW(), NOW()),

-- Command Line servers
('iTerm MCP Server', 'Model Context Protocol server that provides access to iTerm for running commands and analysis', 'ferrislucas', 'https://github.com/ferrislucas/iterm-mcp', ARRAY['Command Line', 'Terminal'], ARRAY['iterm_integration', 'command_execution', 'terminal_analysis'], 0, NOW(), NOW()),
('MCP Commands Server', 'Run any command with run_command and run_script tools', 'g0t4', 'https://github.com/g0t4/mcp-server-commands', ARRAY['Command Line', 'Execution'], ARRAY['command_execution', 'script_running', 'shell_access'], 0, NOW(), NOW()),
('Safe Python Executor', 'Safe Python interpreter based on HF Smolagents LocalPythonExecutor', 'maxim-saplin', 'https://github.com/maxim-saplin/mcp_safe_local_python_executor', ARRAY['Command Line', 'Python'], ARRAY['python_execution', 'safe_interpreter', 'smolagents'], 0, NOW(), NOW()),
('CLI MCP Server', 'Command line interface with secure execution and customizable security policies', 'MladenSU', 'https://github.com/MladenSU/cli-mcp-server', ARRAY['Command Line', 'Security'], ARRAY['secure_execution', 'security_policies', 'cli_interface'], 0, NOW(), NOW()),
('Terminal MCP DeepSeek', 'DeepSeek MCP-like Server for Terminal operations', 'OthmaneBlial', 'https://github.com/OthmaneBlial/term_mcp_deepseek', ARRAY['Command Line', 'AI Integration'], ARRAY['deepseek_integration', 'terminal_operations', 'ai_commands'], 0, NOW(), NOW()),
('MCP Shell Server', 'Secure shell command execution server implementing the Model Context Protocol', 'tumf', 'https://github.com/tumf/mcp-shell-server', ARRAY['Command Line', 'Security'], ARRAY['secure_shell', 'command_execution', 'mcp_protocol'], 0, NOW(), NOW()),
('PyATS MCP Server', 'Cisco pyATS server enabling structured, model-driven interaction with network devices', 'automateyournetwork', 'https://github.com/automateyournetwork/pyATS_MCP', ARRAY['Command Line', 'Networking'], ARRAY['cisco_pyats', 'network_devices', 'model_driven'], 0, NOW(), NOW()),
('Desktop Commander MCP', 'Swiss-army-knife that can manage/execute programs and read/write/search/edit code and text files', 'wonderwhy-er', 'https://github.com/wonderwhy-er/DesktopCommanderMCP', ARRAY['Command Line', 'Desktop Management'], ARRAY['program_management', 'file_operations', 'desktop_control'], 0, NOW(), NOW()),
('SSH MCP Server', 'MCP server exposing SSH control for Linux and Windows servers with password or SSH key authentication', 'tufantunc', 'https://github.com/tufantunc/ssh-mcp', ARRAY['Command Line', 'Remote Access'], ARRAY['ssh_control', 'remote_execution', 'key_authentication'], 0, NOW(), NOW()),

-- Communication servers
('Nostr MCP Server', 'Nostr MCP server that allows interaction with Nostr, enabling posting notes and more', 'AbdelStark', 'https://github.com/AbdelStark/nostr-mcp', ARRAY['Communication', 'Social'], ARRAY['nostr_protocol', 'note_posting', 'decentralized_social'], 0, NOW(), NOW()),
('MCP Twikit Twitter', 'Interact with Twitter search and timeline using Twikit integration', 'adhikasp', 'https://github.com/adhikasp/mcp-twikit', ARRAY['Communication', 'Social Media'], ARRAY['twitter_search', 'timeline_data', 'social_media'], 0, NOW(), NOW()),
('AgentMail Toolkit', 'MCP server to create inboxes on the fly to send, receive, and take actions on email', 'agentmail-toolkit', 'https://github.com/agentmail-to/agentmail-toolkit/tree/main/mcp', ARRAY['Communication', 'Email'], ARRAY['email_management', 'inbox_creation', 'email_actions'], 0, NOW(), NOW()),
('MCP Google Tasks', 'MCP server to interface with the Google Tasks API', 'arpitbatra123', 'https://github.com/arpitbatra123/mcp-googletasks', ARRAY['Communication', 'Productivity'], ARRAY['google_tasks', 'task_management', 'productivity_tools'], 0, NOW(), NOW()),
('Mac Messages MCP', 'MCP server that securely interfaces with your iMessage database for querying and analyzing conversations', 'carterlasalle', 'https://github.com/carterlasalle/mac_messages_mcp', ARRAY['Communication', 'macOS'], ARRAY['imessage_integration', 'conversation_analysis', 'contact_management'], 0, NOW(), NOW()),
('Telegram MCP Rust', 'Telegram API integration for accessing user data, managing dialogs, and handling messages', 'chaindead', 'https://github.com/chaindead/telegram-mcp', ARRAY['Communication', 'Messaging'], ARRAY['telegram_api', 'dialog_management', 'message_handling'], 0, NOW(), NOW()),
('Telegram MCP Python', 'Telegram API integration for accessing user data, managing dialogs, and sending messages', 'chigwell', 'https://github.com/chigwell/telegram-mcp', ARRAY['Communication', 'Messaging'], ARRAY['telegram_integration', 'message_sending', 'user_data'], 0, NOW(), NOW()),
('Inbox Zero MCP', 'MCP server for Inbox Zero adding functionality on top of Gmail for email management', 'elie222', 'https://github.com/elie222/inbox-zero/tree/main/apps/mcp-server', ARRAY['Communication', 'Email'], ARRAY['gmail_integration', 'email_replies', 'follow_up_tracking'], 0, NOW(), NOW()),
('Ntfy Me MCP', 'Ntfy MCP server for sending/fetching ntfy notifications to your self-hosted ntfy server from AI Agents', 'gitmotion', 'https://github.com/gitmotion/ntfy-me-mcp', ARRAY['Communication', 'Notifications'], ARRAY['ntfy_integration', 'self_hosted', 'push_notifications'], 0, NOW(), NOW()),
('WeCom Bot MCP', 'MCP server application that sends various types of messages to the WeCom group robot', 'gotoolkits', 'https://github.com/gotoolkits/wecombot', ARRAY['Communication', 'Enterprise'], ARRAY['wecom_integration', 'group_messaging', 'enterprise_chat'], 0, NOW(), NOW()),
('iMessage Query FastMCP', 'MCP server that provides safe access to your iMessage database with phone number validation', 'hannesrudolph', 'https://github.com/hannesrudolph/imessage-query-fastmcp-mcp-server', ARRAY['Communication', 'macOS'], ARRAY['imessage_query', 'phone_validation', 'attachment_handling'], 0, NOW(), NOW()),
('ACP MCP Adapter', 'MCP server acting as an adapter into the ACP ecosystem, bridging communication protocols', 'i-am-bee', 'https://github.com/i-am-bee/acp-mcp', ARRAY['Communication', 'Protocol Bridge'], ARRAY['acp_integration', 'protocol_bridge', 'agent_communication'], 0, NOW(), NOW()),
('Mattermost MCP Host', 'MCP server providing access to Mattermost teams, channels and messages with bot integration', 'jagan-shanmugam', 'https://github.com/jagan-shanmugam/mattermost-mcp-host', ARRAY['Communication', 'Team Chat'], ARRAY['mattermost_integration', 'team_management', 'bot_integration'], 0, NOW(), NOW()),
('WhatsApp MCP', 'MCP server for searching your personal WhatsApp messages, contacts and sending messages', 'lharries', 'https://github.com/lharries/whatsapp-mcp', ARRAY['Communication', 'Messaging'], ARRAY['whatsapp_search', 'message_sending', 'contact_management'], 0, NOW(), NOW()),
('LINE Bot MCP Server', 'Official MCP Server for Integrating LINE Official Account', 'line', 'https://github.com/line/line-bot-mcp-server', ARRAY['Communication', 'Messaging'], ARRAY['line_integration', 'official_account', 'bot_messaging'], 0, NOW(), NOW()),
('MCP GSuite Integration', 'Integration with Gmail and Google Calendar for comprehensive GSuite access', 'MarkusPfundstein', 'https://github.com/MarkusPfundstein/mcp-gsuite', ARRAY['Communication', 'Google'], ARRAY['gmail_integration', 'calendar_management', 'gsuite_tools'], 0, NOW(), NOW()),
('Slack MCP Server Powerful', 'The most powerful MCP server for Slack Workspaces with comprehensive features', 'korotovsky', 'https://github.com/korotovsky/slack-mcp-server', ARRAY['Communication', 'Team Chat'], ARRAY['slack_workspace', 'advanced_features', 'team_collaboration'], 0, NOW(), NOW()),
('VRChat MCP Server', 'MCP server for interacting with the VRChat API to retrieve friends, worlds, and avatar information', 'sawa-zen', 'https://github.com/sawa-zen/vrchat-mcp', ARRAY['Communication', 'Gaming'], ARRAY['vrchat_api', 'friends_management', 'world_info'], 0, NOW(), NOW()),
('Google Calendar MCP', 'MCP server to interface with the Google Calendar API based on TypeScript', 'takumi0706', 'https://github.com/takumi0706/google-calendar-mcp', ARRAY['Communication', 'Calendar'], ARRAY['google_calendar', 'event_management', 'calendar_integration'], 0, NOW(), NOW()),
('Ntfy MCP Notifications', 'MCP server that keeps you informed by sending notifications on phone using ntfy', 'teddyzxcv', 'https://github.com/teddyzxcv/ntfy-mcp', ARRAY['Communication', 'Notifications'], ARRAY['ntfy_notifications', 'phone_alerts', 'notification_service'], 0, NOW(), NOW()),
('DIDLogic MCP', 'MCP server for DIDLogic adding functionality to manage SIP endpoints, numbers and destinations', 'userad', 'https://github.com/UserAd/didlogic_mcp', ARRAY['Communication', 'VoIP'], ARRAY['didlogic_integration', 'sip_management', 'voip_endpoints'], 0, NOW(), NOW()),
('GTasks MCP', 'MCP server to manage Google Tasks with comprehensive task management features', 'zcaceres', 'https://github.com/zcaceres/gtasks-mcp', ARRAY['Communication', 'Productivity'], ARRAY['google_tasks', 'task_management', 'productivity'], 0, NOW(), NOW()),
('Microsoft Teams MCP', 'MCP server that integrates Microsoft Teams messaging with read, post, mention capabilities', 'InditexTech', 'https://github.com/InditexTech/mcp-teams-server', ARRAY['Communication', 'Enterprise'], ARRAY['teams_integration', 'messaging', 'enterprise_chat'], 0, NOW(), NOW()),
('MS 365 MCP Server', 'MCP server that connects to the whole Microsoft 365 suite using Graph API', 'softeria', 'https://github.com/softeria/ms-365-mcp-server', ARRAY['Communication', 'Microsoft'], ARRAY['office365_integration', 'graph_api', 'microsoft_suite'], 0, NOW(), NOW()),
('YCloud WhatsApp MCP', 'MCP server for WhatsApp Business Platform by YCloud', 'YCloud-Developers', 'https://github.com/YCloud-Developers/ycloud-whatsapp-mcp-server', ARRAY['Communication', 'Business'], ARRAY['whatsapp_business', 'ycloud_platform', 'business_messaging'], 0, NOW(), NOW()),
('Product Hunt MCP', 'MCP server for Product Hunt to interact with trending posts, comments, collections, and users', 'jaipandya', 'https://github.com/jaipandya/producthunt-mcp-server', ARRAY['Communication', 'Social'], ARRAY['producthunt_api', 'trending_posts', 'community_data'], 0, NOW(), NOW()),

-- Customer Data Platforms servers
('Iaptic MCP Server', 'Connect with iaptic to ask about your Customer Purchases, Transaction data and App Revenue statistics', 'iaptic', 'https://github.com/iaptic/mcp-server-iaptic', ARRAY['Customer Data Platforms', 'Analytics'], ARRAY['customer_purchases', 'transaction_data', 'revenue_statistics'], 0, NOW(), NOW()),
('Open Data MCP', 'Connect any Open Data to any LLM with Model Context Protocol', 'OpenDataMCP', 'https://github.com/OpenDataMCP/OpenDataMCP', ARRAY['Customer Data Platforms', 'Open Data'], ARRAY['open_data', 'data_integration', 'llm_connection'], 0, NOW(), NOW()),
('Inoyu MCP Unomi', 'MCP server to access and update profiles on an Apache Unomi CDP server', 'sergehuber', 'https://github.com/sergehuber/inoyu-mcp-unomi-server', ARRAY['Customer Data Platforms', 'Apache'], ARRAY['apache_unomi', 'profile_management', 'cdp_integration'], 0, NOW(), NOW()),
('Tinybird MCP', 'MCP server to interact with a Tinybird Workspace from any MCP client', 'tinybirdco', 'https://github.com/tinybirdco/mcp-tinybird', ARRAY['Customer Data Platforms', 'Analytics'], ARRAY['tinybird_workspace', 'real_time_analytics', 'data_apis'], 0, NOW(), NOW()),
('AntV Chart MCP', 'Model Context Protocol server for generating visual charts using AntV', '@antv', 'https://github.com/antvis/mcp-server-chart', ARRAY['Customer Data Platforms', 'Visualization'], ARRAY['chart_generation', 'antv_charts', 'data_visualization'], 0, NOW(), NOW());

-- Update vote counts for the new entries
UPDATE mcp_servers SET votes = FLOOR(RANDOM() * 30 + 5) WHERE votes = 0;
UPDATE mcp_servers SET stars = FLOOR(RANDOM() * 500 + 50) WHERE stars = 0;
UPDATE mcp_servers SET is_verified = CASE 
  WHEN provider IN ('pydantic', 'yepcode', 'line', 'InditexTech', '@antv', 'iaptic') THEN true 
  ELSE false 
END WHERE is_verified = false;
