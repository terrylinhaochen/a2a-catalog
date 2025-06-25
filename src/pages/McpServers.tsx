import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ItemCatalog from '@/components/shared/ItemCatalog';

const McpServers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <ItemCatalog
        defaultProtocol="mcp"
        title="MCP Server Catalog - 277 Model Context Protocol Servers"
        description="Discover and integrate 277 Model Context Protocol servers for enhanced AI capabilities. Browse the most comprehensive MCP server directory with 22 remote servers (ready to connect) and 255 local servers (installable) for context sharing, tool integration, and AI model enhancement across various platforms and frameworks."
        url="https://a2acatalog.com/mcps"
      />

      <Footer />
    </div>
  );
};

export default McpServers;
