
-- Create enum for authentication types
CREATE TYPE auth_type AS ENUM ('API Key', 'OAuth', 'Bearer Token', 'Basic Auth');

-- Create agents table
CREATE TABLE public.agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  provider TEXT NOT NULL,
  logo TEXT,
  categories TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  votes INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  auth_type auth_type,
  endpoint TEXT,
  documentation TEXT,
  examples TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create agent votes table
CREATE TABLE public.agent_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(agent_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agents
CREATE POLICY "Anyone can view agents" ON public.agents FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert agents" ON public.agents FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own agents" ON public.agents FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own agents" ON public.agents FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for categories
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- RLS Policies for agent votes
CREATE POLICY "Users can view all votes" ON public.agent_votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can vote" ON public.agent_votes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own votes" ON public.agent_votes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert initial categories
INSERT INTO public.categories (id, name, description, icon) VALUES
('data-analytics', 'Data & Analytics', 'Agents specialized in data processing, analysis, and insights generation', '📊'),
('content-generation', 'Content Generation', 'AI agents for creating written content, articles, and marketing materials', '✍️'),
('image-processing', 'Image Processing', 'Agents for image generation, editing, and visual content creation', '🎨'),
('communication', 'Communication', 'Agents for messaging, translation, and interpersonal communication', '💬'),
('business-intelligence', 'Business Intelligence', 'Agents focused on business analytics and decision support', '📈'),
('development', 'Development', 'Agents for software development, code review, and technical tasks', '💻'),
('environment', 'Environment', 'Agents for weather, climate, and environmental data analysis', '🌍'),
('marketing', 'Marketing', 'Agents for marketing automation, social media, and advertising', '📢'),
('customer-service', 'Customer Service', 'Agents for customer support, helpdesk, and service automation', '🎧'),
('finance', 'Finance', 'Agents for financial analysis, investment advice, and accounting', '💰'),
('language', 'Language', 'Agents for translation, localization, and language processing', '🌐'),
('productivity', 'Productivity', 'Agents for task management, scheduling, and workflow automation', '⚡'),
('social-media', 'Social Media', 'Agents for social media management and engagement', '📱'),
('research', 'Research', 'Agents for academic and business research assistance', '🔍'),
('audio-processing', 'Audio Processing', 'Agents for audio generation, processing, and speech synthesis', '🎵'),
('accessibility', 'Accessibility', 'Agents focused on accessibility and inclusive design', '♿'),
('creative', 'Creative', 'Agents for creative work, art generation, and design', '🎨');
