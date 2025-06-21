
-- Add Security MCP servers
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

-- Security servers
('Ghidra MCP by LaurieWired', 'Model Context Protocol server for Ghidra that enables LLMs to autonomously reverse engineer applications', 'LaurieWired', 'https://github.com/LaurieWired/GhidraMCP', ARRAY['Security', 'Reverse Engineering'], ARRAY['ghidra_integration', 'binary_analysis', 'decompilation', 'reverse_engineering'], 0, NOW(), NOW()),
('1Password MCP Server', 'MCP server that enables secure credential retrieval from 1Password to be used by Agentic AI', 'dkvdm', 'https://github.com/dkvdm/onepassword-mcp-server', ARRAY['Security', 'Credentials'], ARRAY['credential_management', 'onepassword_integration', 'secure_access'], 0, NOW(), NOW()),
('Authenticator MCP', 'Secure MCP server that enables AI agents to interact with the Authenticator App', 'firstorderai', 'https://github.com/firstorderai/authenticator_mcp', ARRAY['Security', 'Authentication'], ARRAY['authenticator_app', 'two_factor_auth', 'security_codes'], 0, NOW(), NOW()),
('Ghidra MCP by 13bm', 'MCP server for integrating Ghidra with AI assistants for binary analysis and reverse engineering', '13bm', 'https://github.com/13bm/GhidraMCP', ARRAY['Security', 'Reverse Engineering'], ARRAY['binary_analysis', 'function_inspection', 'memory_exploration', 'import_export_analysis'], 0, NOW(), NOW()),
('ROADrecon MCP Server', 'MCP server for analyzing ROADrecon gather results from Azure tenant enumeration', 'atomicchonk', 'https://github.com/atomicchonk/roadrecon_mcp_server', ARRAY['Security', 'Azure'], ARRAY['azure_enumeration', 'tenant_analysis', 'roadrecon_integration'], 0, NOW(), NOW()),
('DNSTwist MCP', 'MCP server for dnstwist, a powerful DNS fuzzing tool that helps detect typosquatting and phishing', 'BurtTheCoder', 'https://github.com/BurtTheCoder/mcp-dnstwist', ARRAY['Security', 'DNS Analysis'], ARRAY['dns_fuzzing', 'typosquatting_detection', 'phishing_detection'], 0, NOW(), NOW()),
('Maigret MCP', 'MCP server for maigret, a powerful OSINT tool that collects user account information from various public sources', 'BurtTheCoder', 'https://github.com/BurtTheCoder/mcp-maigret', ARRAY['Security', 'OSINT'], ARRAY['osint_investigations', 'username_search', 'social_networks'], 0, NOW(), NOW()),
('Shodan MCP', 'MCP server for querying the Shodan API and Shodan CVEDB for device searches and vulnerability queries', 'BurtTheCoder', 'https://github.com/BurtTheCoder/mcp-shodan', ARRAY['Security', 'Threat Intelligence'], ARRAY['shodan_api', 'device_search', 'vulnerability_scanning', 'ip_lookup'], 0, NOW(), NOW()),
('VirusTotal MCP', 'MCP server for querying the VirusTotal API for URL scanning, file hash analysis, and IP reports', 'BurtTheCoder', 'https://github.com/BurtTheCoder/mcp-virustotal', ARRAY['Security', 'Malware Analysis'], ARRAY['virustotal_api', 'url_scanning', 'file_analysis', 'ip_reports'], 0, NOW(), NOW()),
('Binary Ninja MCP', 'Binary Ninja plugin and MCP server that integrates with MCP clients for automated binary analysis', 'fosdickio', 'https://github.com/fosdickio/binary_ninja_mcp', ARRAY['Security', 'Reverse Engineering'], ARRAY['binary_ninja', 'binary_analysis', 'reverse_engineering', 'automation'], 0, NOW(), NOW()),
('ORKL Security MCP', 'MCP server for querying the ORKL API for threat reports, threat actors, and intelligence sources', 'fr0gger', 'https://github.com/fr0gger/MCP_Security', ARRAY['Security', 'Threat Intelligence'], ARRAY['orkl_api', 'threat_reports', 'threat_actors', 'intelligence_sources'], 0, NOW(), NOW()),
('Cortex MCP Server', 'Rust-based MCP server to integrate Cortex for observable analysis and automated security responses', 'gbrigandi', 'https://github.com/gbrigandi/mcp-server-cortex', ARRAY['Security', 'SIEM'], ARRAY['cortex_integration', 'observable_analysis', 'security_responses'], 0, NOW(), NOW()),
('TheHive MCP Server', 'Rust-based MCP server to integrate TheHive for collaborative security incident response and case management', 'gbrigandi', 'https://github.com/gbrigandi/mcp-server-thehive', ARRAY['Security', 'Incident Response'], ARRAY['thehive_integration', 'incident_response', 'case_management'], 0, NOW(), NOW()),
('Wazuh MCP Server', 'Rust-based MCP server bridging Wazuh SIEM with AI assistants for real-time security alerts and event data', 'gbrigandi', 'https://github.com/gbrigandi/mcp-server-wazuh', ARRAY['Security', 'SIEM'], ARRAY['wazuh_integration', 'security_alerts', 'event_data', 'siem_analysis'], 0, NOW(), NOW()),
('Intruder MCP', 'MCP server to access Intruder for identifying, understanding, and fixing security vulnerabilities', 'intruder-io', 'https://github.com/intruder-io/intruder-mcp', ARRAY['Security', 'Vulnerability Management'], ARRAY['vulnerability_scanning', 'security_assessment', 'infrastructure_security'], 0, NOW(), NOW()),
('VMS MCP Server', 'MCP server designed to connect to CCTV recording programs for retrieving video streams and controlling VMS software', 'jyjune', 'https://github.com/jyjune/mcp_vms', ARRAY['Security', 'Video Surveillance'], ARRAY['cctv_integration', 'video_streams', 'vms_control'], 0, NOW(), NOW()),
('Security Audit MCP', 'Powerful MCP server that audits npm package dependencies for security vulnerabilities', 'qianniuspace', 'https://github.com/qianniuspace/mcp-security-audit', ARRAY['Security', 'Package Security'], ARRAY['npm_audit', 'dependency_scanning', 'vulnerability_detection'], 0, NOW(), NOW()),
('Semgrep MCP', 'Allow AI agents to scan code for security vulnerabilites using Semgrep', 'semgrep', 'https://github.com/semgrep/mcp', ARRAY['Security', 'Code Analysis'], ARRAY['code_security', 'static_analysis', 'vulnerability_scanning'], 0, NOW(), NOW()),
('CyberChef API MCP', 'MCP server for interacting with the CyberChef server API to utilize CyberChef operations', 'slouchd', 'https://github.com/slouchd/cyberchef-api-mcp-server', ARRAY['Security', 'Data Analysis'], ARRAY['cyberchef_api', 'data_transformation', 'cryptographic_operations'], 0, NOW(), NOW()),
('IDA Pro MCP', 'MCP server for IDA Pro allowing binary analysis with AI assistants and automated malware analysis reports', 'mrexodia', 'https://github.com/mrexodia/ida-pro-mcp', ARRAY['Security', 'Reverse Engineering'], ARRAY['ida_pro', 'binary_analysis', 'malware_analysis', 'decompilation'], 0, NOW(), NOW()),
('RAD Security MCP', 'MCP server for RAD Security providing AI-powered security insights for Kubernetes and cloud environments', 'rad-security', 'https://github.com/rad-security/mcp-server', ARRAY['Security', 'Cloud Security'], ARRAY['kubernetes_security', 'cloud_security', 'rad_security'], 0, NOW(), NOW()),
('SecOps MCP', 'All-in-one security testing toolbox bringing together popular open source security tools through MCP', 'securityfortech', 'https://github.com/securityfortech/secops-mcp', ARRAY['Security', 'Penetration Testing'], ARRAY['pentesting', 'security_testing', 'bug_bounty', 'threat_hunting'], 0, NOW(), NOW()),
('CVE-Search MCP', 'MCP server for querying the CVE-Search API with comprehensive access to CVE data', 'roadwy', 'https://github.com/roadwy/cve-search_mcp', ARRAY['Security', 'Vulnerability Management'], ARRAY['cve_search', 'vulnerability_database', 'vendor_products'], 0, NOW(), NOW()),
('OSV MCP', 'Access the OSV (Open Source Vulnerabilities) database for vulnerability information', 'StacklokLabs', 'https://github.com/StacklokLabs/osv-mcp', ARRAY['Security', 'Vulnerability Management'], ARRAY['osv_database', 'vulnerability_queries', 'package_security'], 0, NOW(), NOW()),
('Recon MCP', 'Conversational recon interface and MCP server powered by httpx and asnmap for domain analysis', 'nickpending', 'https://github.com/nickpending/mcp-recon', ARRAY['Security', 'Reconnaissance'], ARRAY['domain_analysis', 'security_headers', 'certificate_analysis', 'asn_lookup'], 0, NOW(), NOW()),
('Volatility MCP', 'MCP server for Volatility 3.x allowing memory forensics analysis with AI assistant', 'Gaffx', 'https://github.com/Gaffx/volatility-mcp', ARRAY['Security', 'Digital Forensics'], ARRAY['memory_forensics', 'volatility_framework', 'forensic_analysis'], 0, NOW(), NOW()),
('Attestable MCP Server', 'MCP server running inside a trusted execution environment (TEE) with remote attestation', 'co-browser', 'https://github.com/co-browser/attestable-mcp-server', ARRAY['Security', 'Trust'], ARRAY['trusted_execution', 'remote_attestation', 'ra_tls'], 0, NOW(), NOW()),
('JADX AI MCP', 'JADX decompiler plugin and MCP Server that integrates with MCP for live reverse engineering support', 'zinja-coder', 'https://github.com/zinja-coder/jadx-ai-mcp', ARRAY['Security', 'Reverse Engineering'], ARRAY['jadx_decompiler', 'android_analysis', 'reverse_engineering'], 0, NOW(), NOW()),
('APKTool MCP Server', 'MCP server for APK Tool to provide automation in reverse engineering of Android APKs', 'zinja-coder', 'https://github.com/zinja-coder/apktool-mcp-server', ARRAY['Security', 'Mobile Security'], ARRAY['apktool_integration', 'android_apk', 'mobile_security'], 0, NOW(), NOW()),

-- Social Media servers
('Macrocosmos MCP', 'Access real-time X/Reddit/YouTube data directly in LLM applications with search and filtering', 'macrocosm-os', 'https://github.com/macrocosm-os/macrocosmos-mcp', ARRAY['Social Media', 'Data Analytics'], ARRAY['twitter_data', 'reddit_data', 'youtube_data', 'real_time_search'], 0, NOW(), NOW()),
('Twitter MCP Comprehensive', 'All-in-one Twitter management solution providing timeline access, messaging, and sentiment analysis', 'kunallunia', 'https://github.com/LuniaKunal/mcp-twitter', ARRAY['Social Media', 'Twitter'], ARRAY['twitter_management', 'timeline_access', 'sentiment_analysis', 'direct_messaging'], 0, NOW(), NOW()),
('Facebook MCP Server', 'Integrates with Facebook Pages for direct management of posts, comments, and engagement metrics', 'HagaiHen', 'https://github.com/HagaiHen/facebook-mcp-server', ARRAY['Social Media', 'Facebook'], ARRAY['facebook_pages', 'post_management', 'engagement_metrics', 'graph_api'], 0, NOW(), NOW()),
('Bluesky Social MCP', 'MCP server for interacting with Bluesky via the atproto client', 'gwbischof', 'https://github.com/gwbischof/bluesky-social-mcp', ARRAY['Social Media', 'Bluesky'], ARRAY['bluesky_integration', 'atproto_client', 'social_posting'], 0, NOW(), NOW()),

-- Sports servers
('Ball Dont Lie MCP', 'MCP server that integrates balldontlie API to provide NBA, NFL and MLB information', 'mikechao', 'https://github.com/mikechao/balldontlie-mcp', ARRAY['Sports', 'API Integration'], ARRAY['nba_data', 'nfl_data', 'mlb_data', 'sports_statistics'], 0, NOW(), NOW()),
('FirstCycling MCP', 'Access cycling race data, results, and statistics through natural language from firstcycling.com', 'r-huijts', 'https://github.com/r-huijts/firstcycling-mcp', ARRAY['Sports', 'Cycling'], ARRAY['cycling_data', 'race_results', 'rider_information'], 0, NOW(), NOW()),
('Strava MCP', 'Model Context Protocol server that connects to Strava API for accessing fitness data through LLMs', 'r-huijts', 'https://github.com/r-huijts/strava-mcp', ARRAY['Sports', 'Fitness'], ARRAY['strava_api', 'fitness_data', 'activity_tracking'], 0, NOW(), NOW()),
('AFL MCP Server', 'MCP server that integrates with Squiggle API for Australian Football League data and statistics', 'willvelida', 'https://github.com/willvelida/mcp-afl-server', ARRAY['Sports', 'Australian Football'], ARRAY['afl_data', 'squiggle_api', 'team_standings', 'match_results'], 0, NOW(), NOW()),
('MLB API MCP', 'MCP server that acts as a proxy to the MLB API for player info, stats, and game information', 'guillochon', 'https://github.com/guillochon/mlb-api-mcp', ARRAY['Sports', 'Baseball'], ARRAY['mlb_api', 'player_stats', 'game_information', 'baseball_data'], 0, NOW(), NOW()),

-- Support & Service Management servers
('Freshdesk MCP', 'MCP server that integrates with Freshdesk for AI models to interact with support operations', 'effytech', 'https://github.com/effytech/freshdesk_mcp', ARRAY['Support & Service Management', 'Customer Support'], ARRAY['freshdesk_integration', 'support_operations', 'ticket_management'], 0, NOW(), NOW()),
('Jira MCP Go', 'Go-based MCP connector for Jira enabling AI assistants to perform common Jira operations', 'nguyenvanduocit', 'https://github.com/nguyenvanduocit/jira-mcp', ARRAY['Support & Service Management', 'Project Management'], ARRAY['jira_integration', 'issue_management', 'sprint_planning', 'workflow_transitions'], 0, NOW(), NOW()),
('Atlassian MCP', 'MCP server for Atlassian products supporting Confluence and Jira with comprehensive management tools', 'sooperset', 'https://github.com/sooperset/mcp-atlassian', ARRAY['Support & Service Management', 'Atlassian'], ARRAY['confluence_integration', 'jira_integration', 'content_management', 'workspace_management'], 0, NOW(), NOW()),

-- Translation Services servers
('Lara Translate MCP', 'MCP Server for Lara Translate API enabling powerful translation with language detection', 'translated', 'https://github.com/translated/lara-mcp', ARRAY['Translation Services', 'Language Processing'], ARRAY['translation_api', 'language_detection', 'context_aware_translation'], 0, NOW(), NOW()),
('Weblate MCP', 'Comprehensive MCP server for Weblate translation management with AI assistant integration', 'mmntm', 'https://github.com/mmntm/weblate-mcp', ARRAY['Translation Services', 'Project Management'], ARRAY['weblate_integration', 'translation_management', 'project_management'], 0, NOW(), NOW()),

-- Text-to-Speech servers
('Kokoro TTS MCP', 'MCP Server using open weight Kokoro TTS models to convert text-to-speech with MP3 output', 'mberg', 'https://github.com/mberg/kokoro-tts-mcp', ARRAY['Text-to-Speech', 'Audio Generation'], ARRAY['text_to_speech', 'kokoro_tts', 'mp3_conversion', 's3_upload'], 0, NOW(), NOW()),
('Voice MCP', 'Complete voice interaction server supporting speech-to-text, text-to-speech, and real-time conversations', 'mbailey', 'https://github.com/mbailey/voice-mcp', ARRAY['Text-to-Speech', 'Voice Processing'], ARRAY['speech_to_text', 'text_to_speech', 'voice_conversations', 'livekit_integration'], 0, NOW(), NOW()),

-- Travel & Transportation servers
('Airbnb MCP Server', 'Provides tools to search Airbnb and get listing details', 'openbnb-org', 'https://github.com/openbnb-org/mcp-server-airbnb', ARRAY['Travel & Transportation', 'Accommodation'], ARRAY['airbnb_search', 'listing_details', 'accommodation_booking'], 0, NOW(), NOW()),
('National Parks MCP', 'National Park Service API integration for park details, alerts, visitor centers, and events', 'KyrieTangSheng', 'https://github.com/KyrieTangSheng/mcp-server-nationalparks', ARRAY['Travel & Transportation', 'Tourism'], ARRAY['national_parks', 'park_information', 'visitor_services', 'events'], 0, NOW(), NOW()),
('NS Travel MCP', 'Access Dutch Railways (NS) travel information, schedules, and real-time updates', 'r-huijts', 'https://github.com/r-huijts/ns-mcp-server', ARRAY['Travel & Transportation', 'Public Transport'], ARRAY['dutch_railways', 'train_schedules', 'real_time_updates'], 0, NOW(), NOW()),
('TripAdvisor MCP', 'MCP server enabling LLMs to interact with Tripadvisor API for location data, reviews, and photos', 'pab1it0', 'https://github.com/pab1it0/tripadvisor-mcp', ARRAY['Travel & Transportation', 'Tourism'], ARRAY['tripadvisor_api', 'location_data', 'reviews', 'travel_photos'], 0, NOW(), NOW()),
('National Rail MCP', 'MCP server for UK National Rail trains service providing schedules and live travel information', 'lucygoodchild', 'https://github.com/lucygoodchild/mcp-national-rail', ARRAY['Travel & Transportation', 'Public Transport'], ARRAY['uk_rail', 'train_schedules', 'realtime_trains'], 0, NOW(), NOW()),

-- Version Control servers
('Git Ingest MCP', 'Read and analyze GitHub repositories with your LLM', 'adhikasp', 'https://github.com/adhikasp/mcp-git-ingest', ARRAY['Version Control', 'Code Analysis'], ARRAY['github_analysis', 'repository_reading', 'code_analysis'], 0, NOW(), NOW()),
('GitHub Enterprise MCP', 'MCP server for GitHub Enterprise API integration', 'ddukbg', 'https://github.com/ddukbg/github-enterprise-mcp', ARRAY['Version Control', 'Enterprise'], ARRAY['github_enterprise', 'api_integration', 'enterprise_features'], 0, NOW(), NOW()),
('Gitea MCP', 'Interactive with Gitea instances with MCP', 'gitea', 'https://gitea.com/gitea/gitea-mcp', ARRAY['Version Control', 'Git Hosting'], ARRAY['gitea_integration', 'repository_management', 'issue_tracking'], 0, NOW(), NOW()),
('GitHub Official MCP', 'Official GitHub server for integration with repository management, PRs, issues, and more', 'github', 'https://github.com/github/github-mcp-server', ARRAY['Version Control', 'GitHub'], ARRAY['github_integration', 'pull_requests', 'issue_management', 'repository_operations'], 0, NOW(), NOW()),
('GitLab MR MCP', 'Interact seamlessly with issues and merge requests of your GitLab projects', 'kopfrechner', 'https://github.com/kopfrechner/gitlab-mr-mcp', ARRAY['Version Control', 'GitLab'], ARRAY['gitlab_integration', 'merge_requests', 'issue_management'], 0, NOW(), NOW()),
('Git Repository MCP', 'Direct Git repository operations including reading, searching, and analyzing local repositories', 'modelcontextprotocol', 'https://github.com/modelcontextprotocol/servers/tree/main/src/git', ARRAY['Version Control', 'Git Operations'], ARRAY['git_operations', 'repository_analysis', 'local_repositories'], 0, NOW(), NOW()),
('GitLab Platform MCP', 'GitLab platform integration for project management and CI/CD operations', 'modelcontextprotocol', 'https://github.com/modelcontextprotocol/servers/tree/main/src/gitlab', ARRAY['Version Control', 'GitLab'], ARRAY['gitlab_platform', 'project_management', 'cicd_operations'], 0, NOW(), NOW()),
('Gitee MCP', 'Gitee API integration for repository, issue, and pull request management', 'oschina', 'https://github.com/oschina/gitee', ARRAY['Version Control', 'Gitee'], ARRAY['gitee_integration', 'repository_management', 'pull_requests'], 0, NOW(), NOW()),
('Azure DevOps MCP', 'Azure DevOps integration for repository management, work items, and pipelines', 'Tiberriver256', 'https://github.com/Tiberriver256/mcp-server-azure-devops', ARRAY['Version Control', 'Azure DevOps'], ARRAY['azure_devops', 'repository_management', 'work_items', 'pipelines'], 0, NOW(), NOW()),
('AtomGit MCP Server', 'Official AtomGit server for integration with repository management, PRs, issues, and branches', 'kaiyuanxiaobing', 'https://github.com/kaiyuanxiaobing/atomgit-mcp-server', ARRAY['Version Control', 'AtomGit'], ARRAY['atomgit_integration', 'repository_management', 'pull_requests', 'branch_management'], 0, NOW(), NOW());

-- Update vote counts and verification status
UPDATE mcp_servers SET votes = FLOOR(RANDOM() * 35 + 8) WHERE votes = 0;
UPDATE mcp_servers SET stars = FLOOR(RANDOM() * 600 + 75) WHERE stars IS NULL;
UPDATE mcp_servers SET is_verified = CASE 
  WHEN provider IN ('github', 'gitea', 'semgrep', 'intruder-io', 'translated', 'openbnb-org', 'modelcontextprotocol') THEN true 
  ELSE false 
END WHERE is_verified IS NULL OR is_verified = false;
