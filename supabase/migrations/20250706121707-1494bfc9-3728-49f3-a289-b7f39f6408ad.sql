-- Add email column to work_requests table for easier access
ALTER TABLE public.work_requests 
ADD COLUMN user_email TEXT;

-- Create index for better performance
CREATE INDEX idx_work_requests_user_email ON public.work_requests(user_email);

-- Update trigger to automatically populate user_email from auth.users
CREATE OR REPLACE FUNCTION public.populate_work_request_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_email_var TEXT;
BEGIN
  -- Get user email from auth.users
  SELECT email INTO user_email_var 
  FROM auth.users 
  WHERE id = NEW.user_id;
  
  -- Set the email in the work_requests record
  NEW.user_email = user_email_var;
  
  RETURN NEW;
END;
$$;

-- Create trigger to auto-populate email on insert
CREATE TRIGGER populate_work_request_email_trigger
  BEFORE INSERT ON public.work_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.populate_work_request_email();