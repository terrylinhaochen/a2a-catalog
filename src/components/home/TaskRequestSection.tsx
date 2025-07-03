import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Upload, X, FileText, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const TaskRequestSection = () => {
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

      // Save work request to database with homepage source
      const { error } = await supabase
        .from('work_requests')
        .insert({
          user_id: user.id,
          description: description.trim(),
          file_urls: fileUrls,
          service_source: 'homepage'
        });

      if (error) throw error;

      toast.success('Request submitted successfully!');
      setDescription('');
      setFiles([]);
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Task Input Form */}
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative">
            <Textarea
              placeholder="Describe what task you want to complete or a workflow you have"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[80px] pl-4 pr-24 py-3 text-lg bg-white/90 backdrop-blur-sm border-white/20 rounded-lg resize-none focus:ring-2 focus:ring-white/30"
              required
            />
            
            {/* Upload Button - Left side */}
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-3 right-16 h-8 w-8 rounded-full bg-gray-600 hover:bg-gray-700 p-0 transition-colors"
            >
              <Upload className="h-4 w-4" />
            </Button>
            
            {/* Submit Button - Right side */}
            <Button 
              type="submit" 
              className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700 p-0 transition-colors"
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
            <div className="mt-4 space-y-2">
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
    </>
  );
};

export default TaskRequestSection;