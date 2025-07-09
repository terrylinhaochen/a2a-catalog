import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import mermaid from 'mermaid';
import { 
  Heart, 
  ExternalLink, 
  CheckCircle, 
  Download, 
  Play, 
  Clock, 
  Activity, 
  GitBranch,
  Zap,
  FileText,
  BarChart3,
  Workflow,
  Code,
  Settings
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Workflow as WorkflowType } from '@/hooks/useWorkflows';

const WorkflowDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [workflow, setWorkflow] = useState<WorkflowType | null>(null);
  const [loading, setLoading] = useState(true);
  const [mermaidDiagram, setMermaidDiagram] = useState<string>('');
  const [diagramSvg, setDiagramSvg] = useState<string>('');
  
  useEffect(() => {
    const fetchWorkflow = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('workflows')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching workflow:', error);
          setWorkflow(null);
        } else {
          setWorkflow(data);
        }
      } catch (error) {
        console.error('Error fetching workflow:', error);
        setWorkflow(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkflow();
  }, [id]);

  useEffect(() => {
    if (workflow) {
      const diagram = generateMermaidDiagram();
      setMermaidDiagram(diagram);
      
      // Initialize mermaid and render diagram
      mermaid.initialize({ startOnLoad: false, theme: 'default' });
      
      if (diagram) {
        mermaid.render('workflow-diagram', diagram)
          .then(({ svg }) => {
            setDiagramSvg(svg);
          })
          .catch(error => {
            console.error('Mermaid render error:', error);
            setDiagramSvg('');
          });
      }
    }
  }, [workflow]);

  const handleVote = async () => {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    if (workflow) {
      try {
        // Direct vote implementation since we're not using the hook
        const { data: existingVote } = await supabase
          .from('workflow_votes')
          .select('id')
          .eq('workflow_id', workflow.id)
          .eq('user_id', user.id)
          .single();

        if (existingVote) {
          // Remove vote
          await supabase
            .from('workflow_votes')
            .delete()
            .eq('workflow_id', workflow.id)
            .eq('user_id', user.id);

          // Decrease vote count
          await supabase
            .from('workflows')
            .update({ votes: workflow.votes - 1 })
            .eq('id', workflow.id);
            
          setWorkflow({ ...workflow, votes: workflow.votes - 1 });
        } else {
          // Add vote
          await supabase
            .from('workflow_votes')
            .insert({ workflow_id: workflow.id, user_id: user.id });

          // Increase vote count
          await supabase
            .from('workflows')
            .update({ votes: workflow.votes + 1 })
            .eq('id', workflow.id);
            
          setWorkflow({ ...workflow, votes: workflow.votes + 1 });
        }
        
        toast.success('Vote recorded successfully!');
      } catch (error) {
        console.error('Voting error:', error);
        toast.error('Failed to record vote. Please try again.');
      }
    }
  };

  const handleDownload = () => {
    if (!workflow) return;
    
    const dataStr = JSON.stringify(workflow.workflow_json, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = workflow.filename;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const generateMermaidDiagram = () => {
    if (!workflow || !workflow.workflow_json || !workflow.workflow_json.nodes) return '';
    
    const nodes = workflow.workflow_json.nodes || [];
    const connections = workflow.workflow_json.connections || {};
    
    let mermaidCode = 'flowchart TD\n';
    
    // Add nodes
    nodes.forEach((node, index) => {
      if (!node || typeof node !== 'object') return;
      
      // Generate safe node ID
      const nodeId = node.id ? node.id.toString().replace(/[^a-zA-Z0-9]/g, '_') : `node_${index}`;
      const nodeName = node.name || node.type || `Node ${index + 1}`;
      const nodeType = node.type || '';
      
      if (nodeType.toLowerCase().includes('trigger')) {
        mermaidCode += `    ${nodeId}[/"${nodeName}"/]\n`;
      } else if (nodeType.toLowerCase().includes('webhook')) {
        mermaidCode += `    ${nodeId}(("${nodeName}"))\n`;
      } else {
        mermaidCode += `    ${nodeId}["${nodeName}"]\n`;
      }
    });
    
    // Add connections
    Object.entries(connections || {}).forEach(([sourceId, outputs]) => {
      if (!sourceId || !outputs) return;
      
      const sourceNodeId = sourceId.toString().replace(/[^a-zA-Z0-9]/g, '_');
      Object.entries(outputs || {}).forEach(([outputName, targets]) => {
        if (Array.isArray(targets)) {
          targets.forEach(target => {
            if (target && target.node) {
              const targetNodeId = target.node.toString().replace(/[^a-zA-Z0-9]/g, '_');
              mermaidCode += `    ${sourceNodeId} --> ${targetNodeId}\n`;
            }
          });
        }
      });
    });
    
    return mermaidCode;
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTriggerIcon = (triggerType: string) => {
    switch (triggerType) {
      case 'manual': return <Play className="w-4 h-4" />;
      case 'webhook': return <Zap className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'complex': return <GitBranch className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading workflow...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Workflow not found</h1>
            <p className="text-gray-600">The workflow you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Workflow className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        {workflow.name}
                        {workflow.is_verified && (
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        )}
                        {workflow.featured && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                            Featured
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-gray-600">{workflow.provider}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          {getTriggerIcon(workflow.trigger_type)}
                          {workflow.trigger_type}
                        </div>
                        <Badge className={getComplexityColor(workflow.complexity)}>
                          {workflow.complexity} complexity
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleVote} variant="outline" className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    {workflow.votes}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-8">
                  {/* Overview Section */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-700">{workflow.description}</p>
                    </div>

                    {workflow.integrations && workflow.integrations.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Integrations</h3>
                        <div className="flex flex-wrap gap-2">
                          {workflow.integrations.map((integration) => (
                            <Badge key={integration} variant="secondary" className="bg-blue-100 text-blue-700">
                              {integration}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {workflow.skills && workflow.skills.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {workflow.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {workflow.categories && workflow.categories.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                          {workflow.categories.map((category) => (
                            <Badge key={category} variant="outline">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Workflow Diagram Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Workflow Diagram</h3>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      {diagramSvg ? (
                        <div 
                          className="bg-white border rounded-lg p-4 overflow-auto"
                          dangerouslySetInnerHTML={{ __html: diagramSvg }}
                        />
                      ) : (
                        <div className="bg-white border rounded-lg p-4 min-h-96">
                          <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                            {mermaidDiagram}
                          </pre>
                          <p className="text-sm text-gray-500 mt-4">
                            Copy this Mermaid code to visualize the workflow structure in any Mermaid-compatible viewer.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Statistics Section */}
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Workflow Stats
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Nodes:</span>
                            <span className="font-semibold">{workflow.total_nodes}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Active Nodes:</span>
                            <span className="font-semibold text-green-600">{workflow.active_nodes}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Inactive Nodes:</span>
                            <span className="font-semibold text-red-600">{workflow.inactive_nodes}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Trigger Type:</span>
                            <Badge variant="outline">{workflow.trigger_type}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Complexity:</span>
                            <Badge className={getComplexityColor(workflow.complexity)}>
                              {workflow.complexity}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Integration Count
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                         <div className="flex justify-between">
                           <span className="text-gray-600">Total Integrations:</span>
                           <span className="font-semibold">{workflow.integrations?.length || 0}</span>
                         </div>
                         <div className="flex justify-between">
                           <span className="text-gray-600">Categories:</span>
                           <span className="font-semibold">{workflow.categories?.length || 0}</span>
                         </div>
                         <div className="flex justify-between">
                           <span className="text-gray-600">Skills:</span>
                           <span className="font-semibold">{workflow.skills?.length || 0}</span>
                         </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Votes:</span>
                            <span className="font-semibold">{workflow.votes}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  {/* JSON Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Workflow JSON</h3>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="bg-white border rounded-lg p-4 max-h-96 overflow-auto">
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                          {JSON.stringify(workflow.workflow_json, null, 2)}
                        </pre>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(JSON.stringify(workflow.workflow_json, null, 2));
                            toast.success('JSON copied to clipboard!');
                          }}
                        >
                          Copy JSON
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(mermaidDiagram);
                            toast.success('Mermaid diagram copied to clipboard!');
                          }}
                        >
                          Copy Mermaid
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Workflow
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Code className="w-4 h-4 mr-2" />
                  Import to n8n
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Nodes</span>
                  </div>
                  <span className="font-semibold">{workflow.node_count}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTriggerIcon(workflow.trigger_type)}
                    <span className="text-sm">Trigger</span>
                  </div>
                  <span className="font-semibold">{workflow.trigger_type}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Complexity</span>
                  </div>
                  <span className="font-semibold">{workflow.complexity}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Votes</span>
                  </div>
                  <span className="font-semibold">{workflow.votes}</span>
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            {(workflow.documentation || workflow.github_url) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {workflow.documentation && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={workflow.documentation} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-4 h-4 mr-2" />
                        Documentation
                      </a>
                    </Button>
                  )}
                  
                  {workflow.github_url && (
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={workflow.github_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorkflowDetails;