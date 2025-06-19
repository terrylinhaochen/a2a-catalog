
import React, { useState } from 'react';
import { Upload, Link, Check, AlertCircle, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Submit = () => {
  const [submissionType, setSubmissionType] = useState<'url' | 'manual'>('url');
  const [formData, setFormData] = useState({
    agentUrl: '',
    name: '',
    description: '',
    provider: '',
    endpoint: '',
    categories: [] as string[],
    skills: [] as string[],
    authType: 'none',
    documentation: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const availableCategories = [
    'Data & Analytics', 'Content Generation', 'Image Processing', 
    'Communication', 'Business Intelligence', 'Development',
    'Marketing', 'Customer Service', 'Finance', 'Research'
  ];

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl border p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Agent Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for contributing to the A2A Agent Catalog. Your submission is now under review 
              and will be published once it passes our validation checks.
            </p>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Automated validation of Agent Card format</li>
                  <li>• Connectivity test to your agent endpoint</li>
                  <li>• Manual review by our team (1-2 business days)</li>
                  <li>• Publication to the catalog upon approval</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/agents">
                  <Button>Browse Other Agents</Button>
                </a>
                <a href="/submit">
                  <Button variant="outline">Submit Another Agent</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Submit an Agent</h1>
          <p className="text-gray-600">
            Add your A2A-compliant agent to the catalog and make it discoverable to the community
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border p-8">
          {/* Submission Type Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How would you like to submit?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setSubmissionType('url')}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  submissionType === 'url' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Link className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Agent Card URL</h3>
                <p className="text-gray-600 text-sm">
                  Provide your agent's /.well-known/agent.json URL and we'll automatically import the details
                </p>
              </button>
              
              <button
                onClick={() => setSubmissionType('manual')}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  submissionType === 'manual' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Upload className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Manual Entry</h3>
                <p className="text-gray-600 text-sm">
                  Manually enter your agent's information if you don't have an Agent Card URL
                </p>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {submissionType === 'url' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Card URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.agentUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, agentUrl: e.target.value }))}
                  placeholder="https://your-agent.com/.well-known/agent.json"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  We'll automatically parse your Agent Card and validate the format
                </p>
              </div>
            ) : (
              <>
                {/* Manual Entry Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agent Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provider/Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.provider}
                      onChange={(e) => setFormData(prev => ({ ...prev, provider: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe what your agent does and its key capabilities..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agent Endpoint URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.endpoint}
                    onChange={(e) => setFormData(prev => ({ ...prev, endpoint: e.target.value }))}
                    placeholder="https://api.your-agent.com/v1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categories *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableCategories.map((category) => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills/Capabilities *
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="e.g., weather_forecast, data_analysis"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    />
                    <Button type="button" onClick={handleAddSkill}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Authentication */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Authentication Type
                  </label>
                  <select
                    value={formData.authType}
                    onChange={(e) => setFormData(prev => ({ ...prev, authType: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="none">No Authentication</option>
                    <option value="api-key">API Key</option>
                    <option value="oauth">OAuth 2.0</option>
                    <option value="bearer">Bearer Token</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documentation URL
                  </label>
                  <input
                    type="url"
                    value={formData.documentation}
                    onChange={(e) => setFormData(prev => ({ ...prev, documentation: e.target.value }))}
                    placeholder="https://docs.your-agent.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-2">Submission Guidelines</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your agent must be A2A protocol compliant</li>
                    <li>• Provide accurate and complete information</li>
                    <li>• Ensure your agent endpoint is accessible and functional</li>
                    <li>• Include comprehensive documentation</li>
                    <li>• Follow community guidelines for descriptions and naming</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Agent'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Submit;
