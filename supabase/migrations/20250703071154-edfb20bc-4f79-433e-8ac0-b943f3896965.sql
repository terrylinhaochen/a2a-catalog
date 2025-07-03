-- Add service_source column to work_requests table to track which service page users submitted from
ALTER TABLE public.work_requests 
ADD COLUMN service_source text DEFAULT 'general';