
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Server, Plus, Trash2, Settings, Play, Square } from 'lucide-react';
import { toast } from 'sonner';

interface McpServer {
  id: string;
  name: string;
  connection_url: string;
  server_type: string; // Changed from 'local' | 'remote' to string
  install_command?: string;
  run_command?: string;
  port?: number;
  auth_required: boolean;
  auth_type: string; // Changed from 'oauth' | 'api_key' | 'none' to string
  status: 'connected' | 'disconnected' | 'connecting';
}

const McpDashboard = () => {
  const [servers, setServers] = useState<McpServer[]>([]);
  const [newServer, setNewServer] = useState<Omit<McpServer, 'id' | 'status'>>({
    name: '',
    connection_url: '',
    server_type: 'remote',
    install_command: '',
    run_command: '',
    port: 8080,
    auth_required: false,
    auth_type: 'none',
  });
  const [selectedServer, setSelectedServer] = useState<McpServer | null>(null);

  useEffect(() => {
    // Initialize with empty servers array - no mock data
    setServers([]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewServer({ ...newServer, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setNewServer({ ...newServer, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewServer({ ...newServer, [e.target.name]: e.target.checked });
  };

  const addServer = () => {
    const newId = Math.random().toString(36).substring(7);
    const serverToAdd: McpServer = { ...newServer, id: newId, status: 'disconnected' };
    setServers([...servers, serverToAdd]);
    setNewServer({
      name: '',
      connection_url: '',
      server_type: 'remote',
      install_command: '',
      run_command: '',
      port: 8080,
      auth_required: false,
      auth_type: 'none',
    });
    toast.success('Server added successfully!');
  };

  const deleteServer = (id: string) => {
    setServers(servers.filter((server) => server.id !== id));
    toast.success('Server deleted successfully!');
  };

  const connectServer = (id: string) => {
    setServers(
      servers.map((server) =>
        server.id === id ? { ...server, status: 'connecting' } : server
      )
    );
    // Simulate connection
    setTimeout(() => {
      setServers(
        servers.map((server) =>
          server.id === id ? { ...server, status: 'connected' } : server
        )
      );
      toast.success('Server connected successfully!');
    }, 2000);
  };

  const disconnectServer = (id: string) => {
    setServers(
      servers.map((server) =>
        server.id === id ? { ...server, status: 'disconnected' } : server
      )
    );
    toast.success('Server disconnected successfully!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">MCP Server Dashboard</h1>

      {/* Server List */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Existing Servers</h2>
        {servers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Server className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No servers configured yet. Add your first MCP server below.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servers.map((server) => (
              <Card key={server.id}>
                <CardHeader>
                  <CardTitle>{server.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>URL: {server.connection_url}</p>
                  <Badge variant="secondary">{server.status}</Badge>
                  <div className="flex justify-end space-x-2 mt-4">
                    {server.status === 'disconnected' ? (
                      <Button onClick={() => connectServer(server.id)}><Play className="w-4 h-4 mr-2" />Connect</Button>
                    ) : server.status === 'connected' ? (
                      <Button variant="destructive" onClick={() => disconnectServer(server.id)}><Square className="w-4 h-4 mr-2" />Disconnect</Button>
                    ) : (
                      <Button variant="secondary" disabled><Server className="w-4 h-4 mr-2" />Connecting...</Button>
                    )}
                    <Button variant="outline" onClick={() => setSelectedServer(server)}><Settings className="w-4 h-4 mr-2" />Edit</Button>
                    <Button variant="destructive" onClick={() => deleteServer(server.id)}><Trash2 className="w-4 h-4 mr-2" />Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Add Server Form */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Add New Server</h2>
        <Card>
          <CardHeader>
            <CardTitle>Server Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={newServer.name}
                  onChange={handleInputChange}
                  placeholder="Server Name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="connection_url">
                  Connection URL
                </label>
                <Input
                  type="text"
                  name="connection_url"
                  value={newServer.connection_url}
                  onChange={handleInputChange}
                  placeholder="http://localhost:8080"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="server_type">
                  Server Type
                </label>
                <Select onValueChange={(value) => handleSelectChange(value, 'server_type')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select server type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="local">Local</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newServer.server_type === 'local' && (
                <>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="install_command">
                      Install Command
                    </label>
                    <Input
                      type="text"
                      name="install_command"
                      value={newServer.install_command || ''}
                      onChange={handleInputChange}
                      placeholder="npm install"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="run_command">
                      Run Command
                    </label>
                    <Input
                      type="text"
                      name="run_command"
                      value={newServer.run_command || ''}
                      onChange={handleInputChange}
                      placeholder="npm start"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="port">
                      Port
                    </label>
                    <Input
                      type="number"
                      name="port"
                      value={newServer.port || 8080}
                      onChange={handleInputChange}
                      placeholder="8080"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="auth_required">
                  Authentication Required
                </label>
                <input
                  type="checkbox"
                  name="auth_required"
                  checked={newServer.auth_required}
                  onChange={handleCheckboxChange}
                  className="mr-2 leading-tight"
                />
              </div>

              {newServer.auth_required && (
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="auth_type">
                    Authentication Type
                  </label>
                  <Select onValueChange={(value) => handleSelectChange(value, 'auth_type')}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select auth type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oauth">OAuth</SelectItem>
                      <SelectItem value="api_key">API Key</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button onClick={addServer}><Plus className="w-4 h-4 mr-2" />Add Server</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Edit Server Modal */}
      {selectedServer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Server</h3>
            <Input placeholder="Name" value={selectedServer.name} />
            <Textarea placeholder="Description" className="mt-2" />
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" onClick={() => setSelectedServer(null)}>Cancel</Button>
              <Button>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default McpDashboard;
