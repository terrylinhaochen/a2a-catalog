import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronUp, ExternalLink, FileText, GitBranch, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useWorkflows } from '@/hooks/useWorkflows';

const WorkflowDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { workflows, voteForWorkflow } = useWorkflows();
  const workflow = workflows.find((item) => item.id === id);

  const handleVote = async () => {
    if (!workflow) return;
    await voteForWorkflow(workflow.id);
  };

  if (!workflow) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <GitBranch className="w-14 h-14 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Task Pattern Not Found</h1>
            <p className="text-gray-600 mb-6">The task pattern you're looking for is not in this catalog.</p>
            <Button asChild>
              <Link to="/workflows">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Task Patterns
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${workflow.name} - Task Pattern Catalog`}
        description={`${workflow.description} Catalog entry for ${workflow.skills.slice(0, 3).join(', ')}.`}
        url={`https://a2acatalog.com/workflows/${workflow.id}`}
        type="article"
      />
      <StructuredData
        type="softwareApplication"
        data={{
          '@type': 'SoftwareApplication',
          name: workflow.name,
          description: workflow.description,
          applicationCategory: 'Agent Task Pattern',
          author: {
            '@type': 'Organization',
            name: workflow.provider,
          },
          featureList: workflow.skills,
          keywords: workflow.categories.join(', '),
          url: `https://a2acatalog.com/workflows/${workflow.id}`,
          codeRepository: workflow.github_url,
          documentation: workflow.documentation,
        }}
      />

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button asChild variant="ghost">
              <Link to="/workflows">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Task Patterns
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-2xl">{workflow.name}</CardTitle>
                        {workflow.is_verified && (
                          <ShieldCheck className="w-5 h-5 text-gray-700" />
                        )}
                        {workflow.featured && <Badge>Featured</Badge>}
                      </div>
                      <p className="text-gray-600">{workflow.provider}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleVote}
                      className="flex flex-col items-center h-auto p-3 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <ChevronUp className="w-5 h-5" />
                      <span className="text-sm font-medium">{workflow.votes}</span>
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-base mb-6">
                    {workflow.description}
                  </CardDescription>

                  {workflow.status && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline" className="capitalize">{workflow.status}</Badge>
                        <span className="text-sm font-medium text-gray-900">Verification status</span>
                      </div>
                      {workflow.status_note && (
                        <p className="text-sm text-gray-600">{workflow.status_note}</p>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="text-sm text-gray-500 mb-1">Complexity</div>
                      <div className="font-semibold capitalize">{workflow.complexity}</div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="text-sm text-gray-500 mb-1">Trigger</div>
                      <div className="font-semibold capitalize">{workflow.trigger_type}</div>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="text-sm text-gray-500 mb-1">Nodes</div>
                      <div className="font-semibold">{workflow.node_count}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {workflow.categories.map((category) => (
                        <Badge key={category} variant="secondary">{category}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Capabilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {workflow.skills.map((skill) => (
                        <span key={skill} className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {workflow.integrations.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Integrations</h3>
                      <div className="flex flex-wrap gap-2">
                        {workflow.integrations.map((integration) => (
                          <Badge key={integration} variant="outline">{integration}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">References</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {workflow.documentation && (
                    <Button asChild variant="outline" className="w-full">
                      <a href={workflow.documentation} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-4 h-4 mr-2" />
                        Documentation
                      </a>
                    </Button>
                  )}
                  {workflow.github_url && (
                    <Button asChild variant="outline" className="w-full">
                      <a href={workflow.github_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Source
                      </a>
                    </Button>
                  )}

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Catalog Metadata</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Provider</span>
                      <span className="text-sm font-medium text-right">{workflow.provider}</span>
                    </div>
                    {workflow.updated_at && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Updated</span>
                        <span className="text-sm font-medium">{new Date(workflow.updated_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WorkflowDetails;
