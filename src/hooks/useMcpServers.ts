import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface McpServer {
  id: string;
  name: string;
  description: string;
  provider: string;
  logo?: string;
  categories: string[];
  skills: string[];
  votes: number;
  is_verified?: boolean;
  github_url?: string;
  stars?: number;
  forks?: number;
  last_updated?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  package_name?: string;
  repository_url?: string;
  server_type?: 'local' | 'remote';
  connection_url?: string; // For remote servers
  install_command?: string; // For local servers
  run_command?: string; // For local servers
  port?: number; // Default port for local servers
  auth_required?: boolean;
  auth_type?: 'oauth' | 'api_key' | 'none';
}

export const useMcpServers = () => {
  const [mcpServers, setMcpServers] = useState<McpServer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMcpServers = async () => {
    try {
      const { data, error } = await supabase
        .from('mcp_servers')
        .select('*')
        .order('votes', { ascending: false });

      if (error) throw error;
      setMcpServers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch MCP servers');
      console.error('Error fetching MCP servers:', err);
    }
  };

  const voteForMcpServer = async (mcpServerId: string, userId: string) => {
    try {
      console.log('Voting for MCP server:', mcpServerId, 'by user:', userId);
      
      // Check if user already voted
      const { data: existingVote, error: voteCheckError } = await supabase
        .from('mcp_server_votes')
        .select('id')
        .eq('mcp_server_id', mcpServerId)
        .eq('user_id', userId)
        .maybeSingle();

      if (voteCheckError) {
        console.error('Error checking existing vote:', voteCheckError);
        throw voteCheckError;
      }

      const currentMcpServer = mcpServers.find(s => s.id === mcpServerId);
      if (!currentMcpServer) {
        throw new Error('MCP Server not found');
      }

      if (existingVote) {
        console.log('Removing existing vote');
        // Remove vote
        const { error: deleteError } = await supabase
          .from('mcp_server_votes')
          .delete()
          .eq('mcp_server_id', mcpServerId)
          .eq('user_id', userId);

        if (deleteError) throw deleteError;

        // Decrease vote count
        const newVoteCount = Math.max(0, currentMcpServer.votes - 1);
        const { error: updateError } = await supabase
          .from('mcp_servers')
          .update({ votes: newVoteCount })
          .eq('id', mcpServerId);

        if (updateError) throw updateError;

        // Update local state immediately
        setMcpServers(prev => prev.map(server => 
          server.id === mcpServerId 
            ? { ...server, votes: newVoteCount }
            : server
        ));
      } else {
        console.log('Adding new vote');
        // Add vote
        const { error: insertError } = await supabase
          .from('mcp_server_votes')
          .insert([{ mcp_server_id: mcpServerId, user_id: userId }]);

        if (insertError) throw insertError;

        // Increase vote count
        const newVoteCount = currentMcpServer.votes + 1;
        const { error: updateError } = await supabase
          .from('mcp_servers')
          .update({ votes: newVoteCount })
          .eq('id', mcpServerId);

        if (updateError) throw updateError;

        // Update local state immediately
        setMcpServers(prev => prev.map(server => 
          server.id === mcpServerId 
            ? { ...server, votes: newVoteCount }
            : server
        ));
      }

      console.log('Vote operation completed successfully');
    } catch (err) {
      console.error('Error in voteForMcpServer:', err);
      setError(err instanceof Error ? err.message : 'Failed to vote');
      throw err;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchMcpServers();
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    mcpServers,
    loading,
    error,
    voteForMcpServer,
    refetch: fetchMcpServers
  };
};
