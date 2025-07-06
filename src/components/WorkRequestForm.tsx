import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Upload, X, FileText, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WorkRequestFormProps {
  source?: string;
  simplified?: boolean;
}

const WorkRequestForm = ({ source = 'general', simplified = false }: WorkRequestFormProps) => {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (userId: string): Promise<string[]> => {
    const uploadPromises = files.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('work-requests')
        .upload(fileName, file);

      if (error) throw error;
      return fileName;
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast.error('Please describe what task you want to complete');
      return;
    }

    if (!user) {
      // Redirect to auth page if not logged in
      navigate('/auth');
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload files if any
      let fileUrls: string[] = [];
      if (files.length > 0) {
        fileUrls = await uploadFiles(user.id);
      }

      // Save work request to database
      const { error } = await supabase
        .from('work_requests')
        .insert({
          user_id: user.id,
          description: description.trim(),
          file_urls: fileUrls,
          service_source: source
        });

      if (error) throw error;

      // Get the created request ID and redirect to chat
      const { data: requestData } = await supabase
        .from('work_requests')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (requestData?.id) {
        navigate(`/chat?request_id=${requestData.id}`);
      } else {
        toast.success('Work request submitted successfully!');
      }
      
      setDescription('');
      setFiles([]);
    } catch (error) {
      console.error('Error submitting work request:', error);
      toast.error('Failed to submit work request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* Glassmorphism Form Container */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Area with integrated controls */}
          <div className="relative">
            <Textarea
              placeholder="Describe what task you want to complete or a workflow you have"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[120px] bg-white/90 backdrop-blur-sm border-0 rounded-2xl px-6 py-4 pl-16 pr-16 text-gray-900 placeholder:text-gray-500 resize-none focus:ring-2 focus:ring-white/30"
              required
            />
            
            {/* Upload Button - Left side */}
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-4 left-4 h-10 w-10 rounded-full bg-gray-600 hover:bg-gray-700 p-0 transition-colors"
            >
              <Upload className="h-4 w-4" />
            </Button>
            
            {/* Submit Button - Right side */}
            <Button 
              type="submit" 
              className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white text-gray-900 hover:bg-white/90 p-0 transition-colors"
              disabled={isSubmitting}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
            />
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-white/70" />
                    <span className="text-sm text-white/90 truncate">{file.name}</span>
                    <span className="text-xs text-white/60">
                      ({(file.size / 1024 / 1024).toFixed(1)} MB)
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-6 w-6 p-0 hover:bg-white/20 text-white/70 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

        </form>
      </div>
    </div>
  );
};

export default WorkRequestForm;