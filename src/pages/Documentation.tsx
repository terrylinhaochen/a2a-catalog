
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Code, Book, Zap, Settings } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about using and contributing to the A2A Agent Catalog.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="submission">Submission</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Book className="w-5 h-5 text-purple-600" />
                    <CardTitle>What is A2A Protocol?</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    The Agent-to-Agent (A2A) protocol is a standardized communication framework that enables 
                    AI agents to interact, collaborate, and share information seamlessly.
                  </p>
                  <div className="space-y-2">
                    <Badge variant="outline">Standardized Communication</Badge>
                    <Badge variant="outline">Interoperability</Badge>
                    <Badge variant="outline">Scalable Architecture</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <CardTitle>Getting Started</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
                      <span>Browse available agents</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
                      <span>Review agent documentation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
                      <span>Integrate using our SDKs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">4</div>
                      <span>Test and deploy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integration" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Integration Guide</CardTitle>
                <CardDescription>
                  Learn how to integrate A2A agents into your applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Authentication Methods</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">API Key</h4>
                      <p className="text-sm text-gray-600">Simple key-based authentication for quick integration.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">OAuth 2.0</h4>
                      <p className="text-sm text-gray-600">Secure OAuth flow for production applications.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Bearer Token</h4>
                      <p className="text-sm text-gray-600">Token-based authentication with expiration.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Basic Auth</h4>
                      <p className="text-sm text-gray-600">Username/password authentication for legacy systems.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Example Integration</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`// Example API call to an A2A agent
const response = await fetch('https://api.agent.example/v1/process', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
    'A2A-Version': '1.0'
  },
  body: JSON.stringify({
    input: 'Your input data',
    parameters: {
      model: 'gpt-4',
      temperature: 0.7
    }
  })
});

const result = await response.json();
console.log(result);`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submission" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Agent Submission Guidelines</CardTitle>
                <CardDescription>
                  How to submit your AI agent to the A2A Catalog
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Agent must implement the A2A protocol specification</li>
                    <li>• Provide comprehensive API documentation</li>
                    <li>• Include usage examples and test cases</li>
                    <li>• Specify authentication method and requirements</li>
                    <li>• Ensure agent is publicly accessible or provide sandbox</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Submission Process</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">1</div>
                      <div>
                        <p className="font-medium">Fill out the submission form</p>
                        <p className="text-sm text-gray-600">Provide all required information about your agent</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">2</div>
                      <div>
                        <p className="font-medium">Technical review</p>
                        <p className="text-sm text-gray-600">Our team will review your agent for compliance and quality</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">3</div>
                      <div>
                        <p className="font-medium">Testing and validation</p>
                        <p className="text-sm text-gray-600">Automated and manual testing to ensure functionality</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">4</div>
                      <div>
                        <p className="font-medium">Publication</p>
                        <p className="text-sm text-gray-600">Your agent goes live in the catalog</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="mt-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Code className="w-5 h-5 text-purple-600" />
                    <CardTitle>A2A Catalog API</CardTitle>
                  </div>
                  <CardDescription>
                    Programmatic access to the agent catalog
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Base URL</h4>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">https://api.a2a-catalog.com/v1</code>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Endpoints</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">GET</Badge>
                          <code className="text-sm">/agents</code>
                          <span className="text-sm text-gray-600">List all agents</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">GET</Badge>
                          <code className="text-sm">/agents/{id}</code>
                          <span className="text-sm text-gray-600">Get agent details</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">GET</Badge>
                          <code className="text-sm">/categories</code>
                          <span className="text-sm text-gray-600">List all categories</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">POST</Badge>
                          <code className="text-sm">/agents/{id}/vote</code>
                          <span className="text-sm text-gray-600">Vote for an agent</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Format</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`{
  "data": {
    "id": "agent-123",
    "name": "Example Agent",
    "description": "An example AI agent",
    "provider": "Example Corp",
    "categories": ["Natural Language", "Analysis"],
    "auth_type": "API Key",
    "endpoint": "https://api.example.com/v1",
    "votes": 42,
    "is_verified": true
  },
  "meta": {
    "total": 1,
    "page": 1,
    "per_page": 10
  }
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Documentation;
