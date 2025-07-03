-- Create experts table for the skills catalog
CREATE TABLE public.experts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  provider TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  categories TEXT[] DEFAULT '{}',
  hourly_rate INTEGER,
  experience_years INTEGER,
  portfolio_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  avatar_url TEXT,
  location TEXT,
  availability TEXT,
  featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  votes INTEGER DEFAULT 0,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.experts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view experts" 
ON public.experts 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert experts" 
ON public.experts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own experts" 
ON public.experts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own experts" 
ON public.experts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create expert votes table
CREATE TABLE public.expert_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  expert_id UUID,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on expert votes
ALTER TABLE public.expert_votes ENABLE ROW LEVEL SECURITY;

-- Create policies for expert votes
CREATE POLICY "Users can view all expert votes" 
ON public.expert_votes 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can vote on experts" 
ON public.expert_votes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expert votes" 
ON public.expert_votes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_experts_updated_at
BEFORE UPDATE ON public.experts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();