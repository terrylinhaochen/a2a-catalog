import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Code, Palette, BarChart3, PenTool, Headphones, Calculator, Star, Upload, ArrowRight, X, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState<'find' | 'upload'>('find');
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

      // Redirect to chat page with the request ID
      const requestId = (await supabase
        .from('work_requests')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()).data?.id;

      if (requestId) {
        navigate(`/chat?request_id=${requestId}`);
      } else {
        toast.success('Our agent team has received your task and will let you know if we have clarification questions, check your email for updates!');
      }
      
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
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Purple Card */}
        <Card className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-10 lg:p-14">
            <div className="max-w-4xl">
              {/* Hero Text - Left aligned inside the card */}
              <div className="mb-12">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                  Tell us what you need.
                  <br />
                  Our agents will take it from here.
                </h1>
              </div>
              
              {/* Glassmorphism Card - Left aligned and wider */}
              <div className="max-w-2xl">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl h-72">
                  {/* Toggle Buttons */}
                  <div className="flex gap-2 mb-6 bg-white/10 p-1 rounded-full">
                    <Button
                      onClick={() => setActiveTab('find')}
                      className={`flex-1 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                        activeTab === 'find'
                          ? 'bg-white text-purple-900 shadow-lg'
                          : 'bg-transparent text-white hover:bg-white/20'
                      }`}
                    >
                      Find Skills
                    </Button>
                    <Button
                      onClick={() => setActiveTab('upload')}
                      className={`flex-1 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                        activeTab === 'upload'
                          ? 'bg-white text-purple-900 shadow-lg'
                          : 'bg-transparent text-white hover:bg-white/20'
                      }`}
                    >
                      Upload Agents
                    </Button>
                  </div>
                  
                  {/* Task Description Input - For Find Skills */}
                  {activeTab === 'find' && (
                    <div className="space-y-4">
                      <form onSubmit={handleSubmit}>
                        <div className="relative">
                          <Textarea
                            placeholder="Describe what task you want to complete or a workflow you have"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-20 text-base pl-6 pr-20 py-4 rounded-xl bg-white/90 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500 resize-none"
                            required
                          />
                          
                          {/* Upload Button */}
                          <Button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-3 right-14 h-8 w-8 rounded-full bg-gray-600 hover:bg-gray-700 p-0 transition-colors"
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                          
                          {/* Submit Button */}
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
                      </form>

                      {/* File List */}
                      {files.length > 0 && (
                        <div className="space-y-2 max-h-20 overflow-y-auto">
                          {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-3 w-3 text-white/70" />
                                <span className="text-xs text-white/90 truncate">{file.name}</span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="h-4 w-4 p-0 hover:bg-white/20 text-white/70 hover:text-white"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Upload Agents Content */}
                  {activeTab === 'upload' && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <p className="text-white/90 text-sm mb-4 leading-relaxed">
                        Build your agent workflow with AI-powered automation, with
                        thousands of capabilities available instantly.
                      </p>
                      <Button 
                        size="lg"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-sm font-medium"
                        onClick={() => navigate('/submit')}
                      >
                        Submit your agent workflow
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;