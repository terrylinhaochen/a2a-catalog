
-- Create a new table for MCP servers with similar structure to agents
CREATE TABLE public.mcp_servers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  provider text NOT NULL,
  logo text,
  categories text[] DEFAULT '{}',
  skills text[] DEFAULT '{}',
  votes integer DEFAULT 0,
  is_verified boolean DEFAULT false,
  github_url text,
  stars integer DEFAULT 0,
  forks integer DEFAULT 0,
  last_updated text,
  user_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  package_name text, -- For npm package name like @recursechat/mcp-server-apple-shortcuts
  repository_url text -- GitHub repository URL
);

-- Add Row Level Security
ALTER TABLE public.mcp_servers ENABLE ROW LEVEL SECURITY;

-- Create policies similar to agents table
CREATE POLICY "Users can view all mcp_servers" 
  ON public.mcp_servers 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create mcp_servers" 
  ON public.mcp_servers 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mcp_servers" 
  ON public.mcp_servers 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mcp_servers" 
  ON public.mcp_servers 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create votes table for MCP servers
CREATE TABLE public.mcp_server_votes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mcp_server_id uuid REFERENCES public.mcp_servers(id) ON DELETE CASCADE,
  user_id uuid,
  created_at timestamp with time zone DEFAULT now()
);

-- Add RLS for MCP server votes
ALTER TABLE public.mcp_server_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all mcp_server_votes" 
  ON public.mcp_server_votes 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can create mcp_server_votes" 
  ON public.mcp_server_votes 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can delete their own mcp_server_votes" 
  ON public.mcp_server_votes 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Insert sample MCP servers from Browser Control category
INSERT INTO public.mcp_servers (name, description, provider, categories, github_url, package_name, repository_url) VALUES
('Apple Shortcuts MCP Server', 'Integrates with macOS Shortcuts for automation via MCP', 'recursechat', ARRAY['Browser Control', 'Automation'], 'https://github.com/recursechat/mcp-server-apple-shortcuts', '@recursechat/mcp-server-apple-shortcuts', 'https://github.com/recursechat/mcp-server-apple-shortcuts'),
('Azure OpenAI Web Browsing', 'Implements minimal web browsing using Azure OpenAI and Playwright', 'kimtth', ARRAY['Browser Control', 'Web Browsing'], 'https://github.com/kimtth/mcp-aoai-web-browsing', '@kimtth/mcp-aoai-web-browsing', 'https://github.com/kimtth/mcp-aoai-web-browsing'),
('Web Search MCP', 'Provides web search capabilities using Google results without requiring API keys', 'pskill9', ARRAY['Browser Control', 'Search'], 'https://github.com/pskill9/web-search', '@pskill9/web-search', 'https://github.com/pskill9/web-search'),
('Browser Use MCP Server', 'Packages browser-use as an MCP server, with Docker support for Chromium and VNC', 'co-browser', ARRAY['Browser Control', 'Docker'], 'https://github.com/co-browser/browser-use-mcp-server', '@co-browser/browser-use-mcp-server', 'https://github.com/co-browser/browser-use-mcp-server'),
('Playwright Python MCP', 'Leverages Playwright via Python, optimized for large language models', 'blackwhite084', ARRAY['Browser Control', 'Python'], 'https://github.com/blackwhite084/playwright-plus-python-mcp', '@blackwhite084/playwright-plus-python-mcp', 'https://github.com/blackwhite084/playwright-plus-python-mcp'),
('Playwright MCP Server', 'Utilizes Playwright for web automation and data extraction within an MCP framework', 'executeautomation', ARRAY['Browser Control', 'Automation'], 'https://github.com/executeautomation/mcp-playwright', '@executeautomation/playwright-mcp-server', 'https://github.com/executeautomation/mcp-playwright'),
('Automata Playwright MCP', 'Controls web browsers via Playwright through MCP commands', 'automatalabs', ARRAY['Browser Control', 'Web Automation'], 'https://github.com/Automata-Labs-team/MCP-Server-Playwright', '@automatalabs/mcp-server-playwright', 'https://github.com/Automata-Labs-team/MCP-Server-Playwright'),
('Official Puppeteer Server', 'Automates web interactions and scraping using Puppeteer (part of the official servers collection)', 'modelcontextprotocol', ARRAY['Browser Control', 'Web Scraping'], 'https://github.com/modelcontextprotocol/servers', 'modelcontextprotocol/server-puppeteer', 'https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer'),
('YouTube Transcript MCP', 'Extracts subtitles and transcripts from YouTube videos for AI processing', 'kimtaeyoon83', ARRAY['Browser Control', 'Media Processing'], 'https://github.com/kimtaeyoon83/mcp-server-youtube-transcript', '@kimtaeyoon83/mcp-server-youtube-transcript', 'https://github.com/kimtaeyoon83/mcp-server-youtube-transcript');

-- Update vote counts based on some reasonable distribution
UPDATE mcp_servers SET votes = FLOOR(RANDOM() * 30 + 5);
UPDATE mcp_servers SET stars = FLOOR(RANDOM() * 500 + 50);
UPDATE mcp_servers SET is_verified = CASE WHEN provider IN ('modelcontextprotocol', 'recursechat') THEN true ELSE false END;
