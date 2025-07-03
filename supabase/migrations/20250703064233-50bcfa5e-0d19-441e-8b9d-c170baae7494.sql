-- Create a table for work requests with file uploads
CREATE TABLE public.work_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  description TEXT NOT NULL,
  file_urls TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.work_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own work requests" 
ON public.work_requests 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own work requests" 
ON public.work_requests 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own work requests" 
ON public.work_requests 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create storage bucket for work request files
INSERT INTO storage.buckets (id, name, public) VALUES ('work-requests', 'work-requests', false);

-- Create storage policies for work request files
CREATE POLICY "Users can view their own work request files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'work-requests' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own work request files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'work-requests' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_work_requests_updated_at
BEFORE UPDATE ON public.work_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();