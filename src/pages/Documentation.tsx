
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Code, Book, Zap, Settings, Users, Shield, Globe, Workflow } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            A2A Protocol Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The Agent-to-Agent (A2A) protocol is an open standard enabling communication and 
            interoperability between AI agents built on diverse frameworks by different companies 
            running on separate servers.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="why-a2a">Why A2A?</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Book className="w-5 h-5 text-purple-600" />
                    <CardTitle>What is the A2A Protocol?</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    The Agent2Agent (A2A) protocol addresses a critical challenge in the AI landscape: 
                    enabling gen AI agents, built on diverse frameworks by different companies running on 
                    separate servers, to communicate and collaborate effectively - as agents, not just as tools.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Discover Capabilities</h4>
                      <p className="text-purple-700 text-sm">Agents can discover each other's capabilities through standardized agent cards.</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Negotiate Interactions</h4>
                      <p className="text-blue-700 text-sm">Support for text, forms, media, and various interaction modalities.</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Secure Collaboration</h4>
                      <p className="text-green-700 text-sm">Collaborate on long-running tasks while maintaining security.</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-2">Preserve Opacity</h4>
                      <p className="text-orange-700 text-sm">Operate without exposing internal state, memory, or tools.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Settings className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Standardized Communication</h4>
                        <p className="text-sm text-gray-600">JSON-RPC 2.0 over HTTP(S)</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Agent Discovery</h4>
                        <p className="text-sm text-gray-600">Via "Agent Cards" detailing capabilities</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Workflow className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Flexible Interaction</h4>
                        <p className="text-sm text-gray-600">Synchronous, streaming (SSE), and async push</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Enterprise-Ready</h4>
                        <p className="text-sm text-gray-600">Security, authentication, and observability</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="why-a2a" className="mt-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Why A2A Protocol?</CardTitle>
                  <CardDescription>
                    As AI agents become more prevalent, their ability to interoperate is crucial for building 
                    complex, multi-functional applications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Globe className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Break Down Silos</h3>
                        <p className="text-gray-600">Connect agents across different ecosystems and platforms, enabling seamless collaboration regardless of the underlying technology stack.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Workflow className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Enable Complex Collaboration</h3>
                        <p className="text-gray-600">Allow specialized agents to work together on tasks that a single agent cannot handle alone, creating powerful multi-agent workflows.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Promote Open Standards</h3>
                        <p className="text-gray-600">Foster a community-driven approach to agent communication, encouraging innovation and broad adoption across the industry.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Preserve Opacity</h3>
                        <p className="text-gray-600">Allow agents to collaborate without needing to share internal memory, proprietary logic, or specific tool implementations, enhancing security and protecting intellectual property.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Design Principles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Embrace Agentic Capabilities</h4>
                      <p className="text-sm text-gray-600">Focus on enabling agents to collaborate in their natural, unstructured modalities without sharing memory, tools, and context.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Build on Existing Standards</h4>
                      <p className="text-sm text-gray-600">Built on HTTP, SSE, JSON-RPC for easier integration with existing IT stacks.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Secure by Default</h4>
                      <p className="text-sm text-gray-600">Designed to support enterprise-grade authentication and authorization.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Support Long-Running Tasks</h4>
                      <p className="text-sm text-gray-600">Flexible support for quick tasks to deep research that may take hours or days.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Modality Agnostic</h4>
                      <p className="text-sm text-gray-600">Support for various modalities, including audio and video streaming.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="how-it-works" className="mt-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>How A2A Works</CardTitle>
                  <CardDescription>
                    A2A facilitates communication between a "client" agent and a "remote" agent through several key capabilities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                          <h4 className="font-semibold text-purple-900 mb-2">1. Capability Discovery</h4>
                          <p className="text-purple-700 text-sm">Agents advertise their capabilities using an "Agent Card" in JSON format, allowing client agents to identify the best agent for a task.</p>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-semibold text-blue-900 mb-2">2. Task Management</h4>
                          <p className="text-blue-700 text-sm">Communication is oriented towards task completion with defined lifecycle. Tasks can be completed immediately or managed as long-running operations.</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <h4 className="font-semibold text-green-900 mb-2">3. Collaboration</h4>
                          <p className="text-green-700 text-sm">Agents can send each other messages to communicate context, replies, artifacts, or user instructions securely.</p>
                        </div>
                        
                        <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                          <h4 className="font-semibold text-orange-900 mb-2">4. UX Negotiation</h4>
                          <p className="text-orange-700 text-sm">Messages include "parts" with specified content types, allowing negotiation of UI capabilities like iframes, video, web forms.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Real-World Example: Candidate Sourcing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      Hiring a software engineer can be significantly simplified with A2A collaboration. Within a unified interface, 
                      a hiring manager can task their agent to find candidates matching a job listing, location, and skill set.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                        <span>Agent receives candidate sourcing request with specific criteria</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                        <span>Interacts with specialized agents to source potential candidates</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                        <span>Presents candidates and schedules interviews automatically</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                        <span>Engages additional agents for background checks</span>
                      </div>
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
                  <h3 className="text-lg font-semibold mb-3">Example A2A Integration</h3>
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`// Example A2A agent discovery and task creation
const discoverAgent = async (capability) => {
  const response = await fetch('https://api.a2a-registry.com/agents', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
      'A2A-Version': '1.0'
    },
    params: {
      capability: capability
    }
  });
  return response.json();
};

// Create a task for an agent
const createTask = async (agentEndpoint, taskData) => {
  const response = await fetch(\`\${agentEndpoint}/tasks\`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
      'A2A-Version': '1.0'
    },
    body: JSON.stringify({
      task: taskData,
      callback_url: 'https://your-app.com/callbacks',
      user_context: {
        user_id: 'user123',
        preferences: {}
      }
    })
  });
  return response.json();
};`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Agent Card Structure</h3>
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`{
  "agent_id": "example-agent-v1",
  "name": "Example AI Agent",
  "description": "Specialized agent for data analysis",
  "version": "1.0.0",
  "capabilities": [
    "data_analysis",
    "chart_generation",
    "report_creation"
  ],
  "supported_modalities": ["text", "json", "images"],
  "authentication": {
    "type": "bearer_token",
    "required": true
  },
  "endpoints": {
    "task_creation": "/tasks",
    "status_check": "/tasks/{task_id}/status",
    "results": "/tasks/{task_id}/results"
  },
  "rate_limits": {
    "requests_per_minute": 100,
    "concurrent_tasks": 10
  }
}`}
                    </pre>
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
                    <CardTitle>A2A Protocol API Reference</CardTitle>
                  </div>
                  <CardDescription>
                    Complete API reference for the A2A protocol
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Base Protocol</h4>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">JSON-RPC 2.0 over HTTP(S)</code>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Core Endpoints</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">POST</Badge>
                          <code className="text-sm">/rpc</code>
                          <span className="text-sm text-gray-600">Main JSON-RPC endpoint</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">GET</Badge>
                          <code className="text-sm">/agent-card</code>
                          <span className="text-sm text-gray-600">Get agent capabilities</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">POST</Badge>
                          <code className="text-sm">/tasks</code>
                          <span className="text-sm text-gray-600">Create new task</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">GET</Badge>
                          <code className="text-sm">/tasks/{taskId}</code>
                          <span className="text-sm text-gray-600">Get task status</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">SSE</Badge>
                          <code className="text-sm">/tasks/{taskId}/stream</code>
                          <span className="text-sm text-gray-600">Stream task updates</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>JSON-RPC Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">agent.discover</h4>
                      <p className="text-sm text-gray-600 mb-2">Discover available agents and their capabilities</p>
                      <code className="text-xs bg-gray-100 p-2 rounded block">
                        {"{ \"method\": \"agent.discover\", \"params\": { \"capabilities\": [\"nlp\", \"analysis\"] } }"}
                      </code>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">task.create</h4>
                      <p className="text-sm text-gray-600 mb-2">Create a new task for an agent</p>
                      <code className="text-xs bg-gray-100 p-2 rounded block">
                        {"{ \"method\": \"task.create\", \"params\": { \"agent_id\": \"example-agent\", \"payload\": {...} } }"}
                      </code>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">task.status</h4>
                      <p className="text-sm text-gray-600 mb-2">Check the status of a running task</p>
                      <code className="text-xs bg-gray-100 p-2 rounded block">
                        {"{ \"method\": \"task.status\", \"params\": { \"task_id\": \"task-123\" } }"}
                      </code>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">message.send</h4>
                      <p className="text-sm text-gray-600 mb-2">Send a message between agents</p>
                      <code className="text-xs bg-gray-100 p-2 rounded block">
                        {"{ \"method\": \"message.send\", \"params\": { \"recipient\": \"agent-id\", \"content\": {...} } }"}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Format</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`// Successful Response
{
  "jsonrpc": "2.0",
  "id": "request-123",
  "result": {
    "task_id": "task-456",
    "status": "created",
    "agent_id": "example-agent-v1",
    "created_at": "2024-12-19T10:30:00Z",
    "estimated_completion": "2024-12-19T10:35:00Z"
  }
}

// Error Response
{
  "jsonrpc": "2.0",
  "id": "request-123",
  "error": {
    "code": -32602,
    "message": "Invalid params",
    "data": {
      "field": "agent_id",
      "reason": "Agent not found"
    }
  }
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent className="p-12">
              <h3 className="text-2xl font-bold mb-4">Ready to Build with A2A?</h3>
              <p className="text-lg mb-6 opacity-90">
                Join the growing ecosystem of developers building interoperable AI agents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/google-a2a/A2A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  View Specification
                </a>
                <a
                  href="/submit"
                  className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Submit Your Agent
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Documentation;
